import Banner from '../components/Banner'
import ProductFeed from '../components/ProductFeed'
import Layout from '../components/Layout'
import { useEffect } from 'react'

export default function Home({ products }) {
    return (
        <Layout>
            {/* Banner */}
            <Banner />

            {/* ProductFeed */}
            <ProductFeed products={products} />
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const products = await fetch('https://fakestoreapi.com/products').then(
        (res) => res.json()
    )

    // const categories = await fetch(
    //     'https://fakestoreapi.com/products/categories'
    // ).then((res) => res.json())
    return {
        props: {
            products,
        },
    }
}
