import { useSession } from 'next-auth/react'
import Image from 'next/image'
import NumberFormat from 'react-number-format'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct'
import Layout from '../components/Layout'
import { selectItems, selectTotal } from '../slices/basketSlice'

function Checkout() {
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const { data: session, status } = useSession()
    return (
        <Layout>
            <div className="flex">
                {/* left side */}
                <div className="flex-grow w-5 shadow-sm">
                    <Image
                        src="/banner/Amazon-Prime-Banner.jpg"
                        alt="banner"
                        width={1024}
                        height={250}
                        objectFit="contain"
                    />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0
                                ? 'Your Amazon Basket is empty'
                                : 'Shopping Basket'}
                        </h1>

                        {items.map((item, i) => (
                            <CheckoutProduct key={i} product={item} />
                        ))}
                    </div>
                </div>

                {/* Right side */}
                {items.length > 0 && (
                    <div className="flex flex-col p-10 shadow-md bg-white">
                        <h2 className="whitespace-nowrap">
                            Subtotal ({items.length} items):{' '}
                            <span className="font-bold">
                                <NumberFormat
                                    displayType="text"
                                    value={total}
                                    thousandSeparator
                                    thousandsGroupStyle="thousand"
                                    prefix="$"
                                />
                            </span>
                        </h2>
                        <button
                            disabled={!session}
                            className={`button mt-2 ${
                                !session &&
                                'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                            }`}
                        >
                            {!session
                                ? ' Sign in to checkout'
                                : 'Proceed to checkout'}
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Checkout
