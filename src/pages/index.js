import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import ProductFeed from '../components/ProductFeed'

export default function Home({ products }) {
    return (
        <div className="bg-gray-100">
            <Head>
                <title>Amazon Clone App</title>
                <meta
                    name="description"
                    content="This is an Amazon Clone application built by Thunder30"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <main className="max-w-screen-2xl mx-auto">
                {/* Banner */}
                <Banner />

                {/* ProductFeed */}
                <ProductFeed products={products} />
            </main>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const products = await fetch('https://fakestoreapi.com/products').then(
        (res) => res.json()
    )
    return {
        props: {
            products,
        },
    }
}
