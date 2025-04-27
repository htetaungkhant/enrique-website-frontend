import Card from "./Card";
import UPSection from "@/components/common/UniformPaddingSection";

const CardsRowSection = ({ title, description, cardList }) => {
    return (
        <UPSection className="flex flex-col gap-6">
            {title && <h2 className="text-white text-2xl inter-font font-medium lg:text-4xl" dangerouslySetInnerHTML={{ __html: title }}></h2>}
            {description && <p className="text-white">{description}</p>}
            {
                cardList && (
                    <div className="flex flex-wrap justify-between gap-4 ">
                        {
                            cardList.map((item, index) => (
                                <Card className="flex-1" badgeText={item.badgeText} key={index}>
                                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                                        {item.title && <h2 dangerouslySetInnerHTML={{ __html: item.title }} className="font-semibold text-xl md:text-2xl lg:text-3xl"></h2>}
                                        {item.description && <p className="text-xs md:text-sm font-medium">{item.description}</p>}
                                    </div>
                                </Card>
                            ))
                        }
                    </div>
                )
            }
        </UPSection>
    );
}

export default CardsRowSection;