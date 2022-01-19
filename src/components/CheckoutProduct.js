import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import NumberFormat from 'react-number-format'
import { useDispatch } from 'react-redux'
import primeTag from '../../public/Prime-tag-.png'
import { addToBasket, removeFromBasket } from '../slices/basketSlice'

function CheckoutProduct({
    product: {
        id,
        title,
        description,
        category,
        image,
        price,
        rating,
        hasPrime,
    },
}) {
    const dispatch = useDispatch()

    const addItemToBasket = () => {
        const product = {
            id,
            title,
            description,
            category,
            image,
            price,
            rating,
            hasPrime,
        }
        dispatch(addToBasket(product))
    }

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }))
    }

    return (
        <div className="grid grid-cols-5">
            <Image
                src={image}
                alt="image product"
                height={200}
                width={200}
                objectFit="contain"
            />

            {/* Midlle */}
            <div className="col-span-3 mx-auto">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className="h-5 text-yellow-400" />
                        ))}
                </div>

                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <NumberFormat
                    thousandSeparator
                    thousandsGroupStyle="thousand"
                    prefix="$"
                    value={price}
                    displayType="text"
                />

                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <Image
                            src={primeTag}
                            alt="prime"
                            width={48}
                            height={48}
                            objectFit="contain"
                            loading="lazy"
                        />
                        <p className="text-xs text-gray-500">
                            FREE Next-day Delivery
                        </p>
                    </div>
                )}
            </div>

            {/* Right */}
            <div className="flex flex-col justify-self-end my-auto space-y-2">
                <button className="button" onClick={addItemToBasket}>
                    Add to Basket
                </button>
                <button className="button" onClick={removeItemFromBasket}>
                    Remove from Basket
                </button>
            </div>
        </div>
    )
}

export default CheckoutProduct
