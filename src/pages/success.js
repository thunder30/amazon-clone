import { CheckCircleIcon } from '@heroicons/react/solid'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

function Success() {
    const router = useRouter()

    return (
        <Layout>
            <div className="flex flex-col p-10 bg-white">
                <div className="flex items-center space-x-2 mb-5">
                    <CheckCircleIcon className="text-green-500 h-10" />
                    <h1 className="text-3xl">
                        Thank you, your order has been comfirmed!
                    </h1>
                </div>
                <p>
                    Thank you for shopping with us. We&apos;ll send a
                    confirmation once your item has shipped., if you would like
                    to check the status of your order(s) please press the link
                    below.
                </p>
                <button
                    onClick={() => router.push('/orders')}
                    className="button mt-8"
                >
                    Go to my orders
                </button>
            </div>
        </Layout>
    )
}

export default Success
