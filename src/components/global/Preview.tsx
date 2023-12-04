type Props = {
    images: string[],
    className?: string
}
export const Preview = ({images, className}: Props) => {
    const remainingImages = images.length - 1;

    return (
        <div
            className={`cursor-pointer relative flex items-center justify-center ${className}`}>
            <img
                src={images[0]}
                alt="Imagem não encontrada"
                className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute bottom-2 right-2 text-white text-sm bg-black bg-opacity-50 p-1 rounded-md">
                +{remainingImages}
            </div>
        </div>
    );
};
