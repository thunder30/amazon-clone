import moment from 'moment'
import Image from 'next/image'
import NumberFormat from 'react-number-format'

function Order({
    order: { id, amountShipping, amount, images, items, timestamp },
}) {
    return (
        <div className="relative border rounded-md ">
            <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div>
                    <p className="font-bold text-xs">ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format('DD/MM/YYYY')}</p>
                </div>

                <div>
                    <p className="text-xs font-bold">TOTAL</p>
                    <p>
                        <NumberFormat
                            thousandSeparator
                            thousandsGroupStyle="thousand"
                            prefix="$"
                            value={amount}
                            displayType="text"
                        />{' '}
                        - Next Day Delivery{' '}
                        <NumberFormat
                            thousandSeparator
                            thousandsGroupStyle="thousand"
                            prefix="$"
                            value={amountShipping}
                            displayType="text"
                        />
                    </p>
                </div>

                <p className="whitespace-nowrap sm:text-xl self-end  flex-1 text-right text-blue-500">
                    {items.length} items
                </p>

                <p className="absolute top-2 right-2 w-40 lg:w-72 text-xs truncate">
                    ORDER #{id}
                </p>
            </div>

            <div className="p-5 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto scro">
                    {images.map((image, _) => (
                        <img
                            key={_}
                            src={image}
                            alt=""
                            className="h-20 sm:h-32 object-contain"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order
