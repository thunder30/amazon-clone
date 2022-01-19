import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import {
    SearchIcon,
    MenuIcon,
    ShoppingCartIcon,
} from '@heroicons/react/outline'
import useSWR from 'swr'
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'

const url = 'https://fakestoreapi.com/products/categories'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Header() {
    const { data: categories, error } = useSWR(url, fetcher)
    const router = useRouter()
    const { data: session, status } = useSession()
    const items = useSelector(selectItems)

    //console.log(`session: `, session)
    //console.log(items)

    if (error) {
        console.log(`Error useSWR -> `, error)
    }
    if (status === 'loading') {
        return <div>Loading...!</div>
    }

    return (
        <header>
            {/* Top nav */}
            <div className="flex items-center bg-amazon p-1 flex-grow py-2">
                {/* Logo */}
                <div
                    className="mt-2 flex items-center flex-grow sm:flex-grow-0"
                    onClick={() => router.push('/')}
                >
                    <Image
                        src="/amazon_logo.png"
                        alt=""
                        width={150}
                        height={40}
                        objectFit="contain"
                        className="cursor-pointer"
                    />
                </div>

                {/* Search */}
                <div className="hidden sm:flex items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 flex-grow cursor-pointer">
                    <input
                        className=" h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none p-2 px-4"
                        type="text"
                        name="search"
                        id="search"
                    />
                    <SearchIcon className="h-12 p-4 text-amazon" />
                </div>

                {/* Right */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    <div className="link" onClick={!session ? signIn : signOut}>
                        <p>
                            {!session
                                ? 'Sign In'
                                : `Hello, ${session.user.name}!`}
                        </p>
                        <p className="font-extrabold md:text-sm">
                            Account & Lists
                        </p>
                    </div>

                    <div className="link">
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>

                    <div
                        className="relative link flex items-center"
                        onClick={() => router.push('/checkout')}
                    >
                        <span className=" absolute top-0 right-0 md:right-10 badge">
                            {items.length}
                        </span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline font-extrabold md:text-sm mt-2">
                            Basket
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom nav */}
            <div className="flex items-center space-x-3 p-2 pl-6 text-white bg-amazon-light text-xs sm:text-sm">
                <p className="link flex items-center">
                    <MenuIcon className="h-6 mr-1" />
                    All
                </p>
                <p className="link">Prime Video</p>
                <p className="link">Amazon Business</p>
                <p className="link">Today&lsquo;s Deals</p>
                {categories &&
                    categories.map((category, i) => (
                        <p key={i} className="link hidden lg:inline-flex">
                            {category[0].toUpperCase() +
                                category.slice(1, category.length)}
                        </p>
                    ))}
            </div>
        </header>
    )
}

export default Header
