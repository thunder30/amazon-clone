import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid'

function Product({
    product: { id, title, description, category, image, price, rating },
}) {
    return (
        <div>
            <p>{category}</p>

            <Image
                src={image}
                alt={title}
                height={200}
                width={200}
                objectFit="contain"
            />
            <h4>{title}</h4>

            <div className="flex items-center">
                {Array(Number(rating.rate.toFixed(0)))
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-400" />
                    ))}
                {/* <span>{`${rating.rate} - ${rating.count} ratings`}</span> */}
            </div>
        </div>
    )
}

export default Product
