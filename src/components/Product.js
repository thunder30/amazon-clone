import { useState } from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid'
import NumberFormat from 'react-number-format'
import primeTag from '../../public/Prime-tag-.png'

function Product({
    product: { id, title, description, category, image, price, rating },
}) {
    const [_rating] = useState(Number(rating.rate.toFixed(0)))
    const [hasPrime] = useState(Math.random() < 0.5)
    return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-10">
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">
                {category}
            </p>

            <Image
                src={image}
                alt={title}
                height={200}
                width={200}
                objectFit="contain"
            />

            <h4 className="my-3">{title}</h4>

            <div className="flex items-center">
                {Array(_rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-400" />
                    ))}
                {/* <span>{`${rating.rate} - ${rating.count} ratings`}</span> */}
            </div>

            <p className="text-xs my-2 line-clamp-2">{description}</p>

            <div className="mb-5">
                <NumberFormat
                    thousandSeparator
                    thousandsGroupStyle="thousand"
                    prefix="$"
                    value={price}
                    type="text"
                />
            </div>

            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <Image
                        src={primeTag}
                        alt="prime"
                        width={48}
                        height={48}
                        objectFit="contain"
                    />
                    <p className="text-xs text-gray-500">
                        FREE Next-day Delivery
                    </p>
                </div>
            )}

            <button className="mt-auto button">Add to Basket</button>
        </div>
    )
}

export default Product
