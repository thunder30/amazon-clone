import { buffer } from 'micro'
import * as admin from 'firebase-admin'

const serviceAccount = require('../../config/permissions.json')

// Secure a connection to FIREBASE from the backend
const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
      })
    : admin.app()

// Establish connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET

const fulfillOrder = (session) => {
    // save an order in your database
    return app
        .firestore()
        .collection('users')
        .doc(session.metadata.email)
        .collection('orders')
        .doc(session.id)
        .set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            console.log(`Success create order: ${session.id}`)
        })
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req)
        const payload = requestBuffer.toString()
        const sig = req.headers['stripe-signature']

        let event

        // Verify that the EVENT posted came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
        } catch (err) {
            console.log('ERROR', err.message)
            return res.status(400).send(`Webhook Error: ${err.message}`)
        }

        // Handler the checkout.session.completed event
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object
                console.log(session)
                //
                return fulfillOrder(session)
                    .then(() => res.status(200))
                    .catch((err) => {
                        res.status(400).send('Webhook error: ', err.message)
                    })
            }
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Not found',
        })
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}
