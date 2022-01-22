const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
    const { items, email } = req.body

    const transformedItems = items.map((item) => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: 'usd',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image],
            },
        },
    }))

    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                shipping_address_collection: {
                    allowed_countries: ['GB', 'US', 'CA'],
                },
                shipping_options: [
                    {
                        shipping_rate: 'shr_1KKdMeF5QqVGZuMYnrpgauRw',
                    },
                ],
                line_items: transformedItems,
                metadata: {
                    email,
                    images: JSON.stringify(items.map((item) => item.image)),
                },
                success_url: `${process.env.HOST}/success`,
                cancel_url: `${process.env.HOST}/cancel`,
            })

            res.status(200).json({ id: session.id })
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message)
        }
    }
}
