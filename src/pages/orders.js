import { getSession, useSession } from 'next-auth/react'
import Layout from '../components/Layout'
import { getOrders } from '../config/firebase'
import moment from 'moment'
import Order from '../components/Order'

function Orders({ orders }) {
    const { data: session, status } = useSession()
    //console.log(orders)

    return (
        <Layout>
            <div className="p-10 bg-white">
                <h1 className="text-3xl border-b border-yellow-400 mb-2 pb-1">
                    Your Orders
                </h1>
                {session ? (
                    <h2>{orders.length} Orders</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )}
                <div className="mt-5 space-y-4">
                    {orders?.map((order) => (
                        <Order key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Orders

export async function getServerSideProps(ctx) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    // Get the users logged in credentials....
    const session = await getSession(ctx)
    if (!session) {
        return {
            props: {},
        }
    }

    // Firebase db
    const stripeOrders = await getOrders(session.user.email)

    // Stripe orders
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
        }))
    )

    return {
        props: {
            orders,
        },
    }
}
