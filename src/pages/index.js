import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Amazon Clone App</title>
                <meta
                    name="description"
                    content="This is an Amazon Clone application built by Thunder30"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Header />
            </main>
        </div>
    )
}
