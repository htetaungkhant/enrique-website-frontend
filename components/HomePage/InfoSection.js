import Image from "next/image";

const InfoSection = ({ image, children, smallImage = false, imageAspectRatio= "square", reverse = false }) => {

    // "square", "landscape", "portrait"
    const imageClasses = {
        square: !smallImage ? "h-64 w-64 min-w-64 md:h-96 md:w-96 md:min-w-96" : "h-48 w-48 min-w-48 md:h-72 md:w-72 md:min-w-72",
        landscape: !smallImage ? "h-64 w-64 min-w-64 md:h-68 md:w-96 md:min-w-96" : "h-48 w-48 min-w-48 md:h-52 md:w-72 md:min-w-72",
        portrait: !smallImage ? "h-64 w-64 min-w-64 md:h-96 md:w-80 md:min-w-80" : "h-48 w-48 min-w-48 md:h-72 md:w-56 md:min-w-56",
    };

    return (
        <section className={`flex justify-center items-center md:justify-between gap-10 p-8 lg:gap-20 lg:p-12 flex-col lg:items-start ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
            <div className="order-2 flex flex-col gap-6">
                {children}
            </div>
            {
                image && (
                    <div className="order-1">
                        <Image
                            src={image}
                            width={400}
                            height={400}
                            alt="Info"
                            className={`${imageClasses[imageAspectRatio]} object-cover rounded-tl-[65px] rounded-br-[80px] shadow-lg shadow-[#8A888840]`}
                        />
                    </div>
                )
            }
        </section>
    );
}

export default InfoSection;