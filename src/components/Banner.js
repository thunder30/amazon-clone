import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import banner1 from '../../public/banner/banner1.jpg'
import banner2 from '../../public/banner/banner2.jpg'
import banner3 from '../../public/banner/banner3.jpg'
import banner4 from '../../public/banner/banner4.jpg'
import primeDay from '../../public/banner/prime-day.gif'

function Banner() {
    return (
        <div className="relative">
            <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}
            >
                <Image
                    loading="lazy"
                    src={banner1}
                    alt="banner"
                    objectFit="contain"
                />
                <Image
                    loading="lazy"
                    src={banner2}
                    alt="banner"
                    objectFit="contain"
                />
                <Image
                    loading="lazy"
                    src={banner3}
                    alt="banner"
                    objectFit="contain"
                />
                <Image
                    loading="lazy"
                    src={banner4}
                    alt="banner"
                    objectFit="contain"
                />
            </Carousel>
        </div>
    )
}

export default Banner
