import Image from "next/image";
import Card from "./Card";

const ListCard = ({ title, description, list, footer, image }) => {
    return (
        <Card className="bg-[#94B992]">
            <div className="w-full inter-font text-[#212A63] flex flex-col gap-4">
                {title && (
                    <h2 className="text-2xl lg:text-3xl font-medium">{title}</h2>
                )}
                {description && <p>{description}</p>}
                <div className="flex gap-4 items-center flex-col md:flex-row">
                    {list && (
                        <ul className="max-md:w-full list-disc pl-4 max-md:order-2">
                            {
                                list.map((item, index) => (
                                    <li key={index} className="py-[2px] text-base lg:text-lg" dangerouslySetInnerHTML={{ __html: item }}></li>
                                ))
                            }
                        </ul>
                    )}
                    {image && (
                        <div className="grow md:min-w-44 h-full flex justify-center items-center">
                            <Image src={image} width={312} height={312} className="w-64 h-64 object-contain max-md:order-1" alt="icon" />
                        </div>
                    )}
                </div>
                {footer && <p>{footer}</p>}
            </div>
        </Card>
    )
}

export default ListCard;