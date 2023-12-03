import {useState} from "react";
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";

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

    const buttonClasses = 'absolute top-0 h-full bg-black bg-opacity-0 transition duration-300 hover:bg-opacity-20 hover:bg-black'

    return (
        <div className="relative h-full flex items-center justify-center">
            <Button
                onClick={handlePrevImage}
                className={buttonClasses + ' left-0'}
            >
                <ChevronLeft/>
            </Button>
            <img
                src={images[selectedImage]}
                alt={'Imagem não encontrada'}
                className={'w-full h-full object-cover'}
            />
            <Button
                onClick={handleNextImage}
                className={buttonClasses + ' right-0'}
            >
                <ChevronRight/>
            </Button>
        </div>
    )
}