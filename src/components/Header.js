import Image from 'next/image'
import {
    SearchIcon,
    MenuIcon,
    ShoppingCartIcon,
} from '@heroicons/react/outline'

function Header() {
    return (
        <header>
            {/* Top nav */}
            <div className="flex items-center bg-amazon p-1 flex-grow py-2">
                {/* Logo */}
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
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
            </div>
            {/* Bot nav */}
        </header>
    )
}

export default Header
