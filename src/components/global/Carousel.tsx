'use client'

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight, Dot} from "lucide-react";

type Props = {
    images: string[]
}
export const Carousel = ({images}: Props) => {
    const [selectedImage, setSelectedImage] = useState(0)

    const handlePrevImage = () => {
        setSelectedImage((prevImage) =>
            prevImage === 0 ? images.length - 1 : prevImage - 1
        );
    };

    const handleNextImage = () => {
        setSelectedImage((prevImage) =>
            prevImage === images.length - 1 ? 0 : prevImage + 1
        );
    };

    const buttonClasses = 'absolute h-full w-1/4 bg-black bg-opacity-0 transition duration-300 hover:bg-opacity-20 hover:bg-black'

    return (
        <div className='relative items-center justify-center flex'>
            <Button
                onClick={handlePrevImage}
                className={buttonClasses + ' left-0'}
            >
                <ChevronLeft/>
            </Button>

            <div className='flex flex-col gap-2 h-full p-4 max-w-min'>
                <img
                    src={images[selectedImage]}
                    alt={'Imagem não encontrada'}
                    className='w-full h-full object-fit object-contain'
                />

                <div className="flex justify-center">
                    {images.map((_, index) => (
                        <Dot
                            key={index}
                            className={`h-8 w-8 ${
                                index === selectedImage
                                    ? "text-opacity-0"
                                    : "text-opacity-200"
                            }`}
                        />
                    ))}
                </div>
            </div>

            <Button
                onClick={handleNextImage}
                className={buttonClasses + ' right-0'}
            >
                <ChevronRight/>
            </Button>
        </div>
    )
}