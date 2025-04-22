import Image from "next/image";

const QuoteSection = ({ image, description, descriptionTextClass = "", author, authorTextClass = "", normal = true }) => {
    return (
        <section className="relative -mt-1">
            <div className={`px-12 py-6 lg:flex lg:flex-row flex flex-col items-center lg:space-x-8 justify-center ${!normal ? "absolute -top-20 left-0 right-0 z-10 bg-transparent" : ""}`}>
                {image && (
                    <Image
                        src={image}
                        width={300}
                        height={300}
                        className="h-[180px] lg:h-[250px] w-auto"
                        alt="author"
                    />
                )}
                <div className={`text-white merriweather-semibold  text-lg lg:text-2xl tracking-wider flex flex-col lg:px-6 lg:items-end ${description ? "border-[#F96CFC] lg:border-l-4" : ""}`}>
                    {
                        description && (
                            <div className={`pt-4 text-center border-[#F96CFC] border-t-4 lg:border-t-0 lg:text-left lg:pt-0 ${descriptionTextClass}`}>
                                {description}
                            </div>
                        )
                    }
                    {
                        author && (
                            <div className={`text-right text-sm mt-4 ${authorTextClass}`}>
                                {author}
                            </div>
                        )
                    }
                </div>
            </div>
            {!normal && <span className="block bg-gradient-to-b from-[rgb(3,2,12)] to-[rgb(20,26,54)] h-64" />}
        </section>
    );
}

export default QuoteSection;