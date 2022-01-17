import Product from './Product'

function ProductFeed({ products }) {
    return (
        <div>
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductFeed
