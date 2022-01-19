import Head from 'next/head'
import Header from './Header'

function Layout({ children }) {
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
            <main className="max-w-screen-xl mx-auto">{children}</main>
        </div>
    )
}

export default Layout
