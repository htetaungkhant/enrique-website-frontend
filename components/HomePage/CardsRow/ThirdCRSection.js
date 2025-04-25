import Card from "./Card";

const ThirdCRSection = () => {
    return (
        <section className="p-8 flex flex-col gap-6 lg:p-12">
            <h2 className="text-white text-2xl inter-font font-light lg:text-4xl">The Importance of <strong className="font-semibold">Integration</strong></h2>
            <p className="text-white">Integrating a Bufo ceremony is key to lasting growth and well-being. Practice mindfulness, self-reflection, and grounding techniques. Apply insights through daily intention and conscious living.</p>
            <div className="flex flex-wrap justify-between gap-4 ">
                <Card className="flex-1" badgeText="Integration">
                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                        <h2 className="font-normal text-xl md:text-2xl lg:text-3xl"><strong className="font-bold">Grounding</strong> <br />Practices</h2>
                        <p className="text-xs md:text-sm font-medium">Engage in physical activity, meditation, or breathwork to reconnect with your body and process emotions.</p>
                    </div>
                </Card>
                <Card className="flex-1" badgeText="Integration">
                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                        <h2 className="font-normal text-xl md:text-2xl lg:text-3xl"><strong className="font-bold">Time for</strong> <br />Reflection</h2>
                        <p className="text-xs md:text-sm font-medium">Allow space for rest and introspection, giving the experience time to settle naturally.</p>
                    </div>
                </Card>
                <Card className="flex-1" badgeText="Integration">
                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                        <h2 className="font-normal text-xl md:text-2xl lg:text-3xl"><strong className="font-bold">Creative</strong> <br />Expression</h2>
                        <p className="text-xs md:text-sm font-medium">Explore journaling, art therapy, or nonverbal expression to extract deeper meaning from your journey.</p>
                    </div>
                </Card>
                <Card className="flex-1" badgeText="Integration">
                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                        <h2 className="font-normal text-xl md:text-2xl lg:text-3xl"><strong className="font-bold">Daily</strong> <br />Self-Care</h2>
                        <p className="text-xs md:text-sm font-medium">Maintain a personal practice that nurtures your connection to the insights gained during the ceremony.</p>
                    </div>
                </Card>
                <Card className="flex-1" badgeText="Integration">
                    <div className="flex flex-col gap-4 inter-font text-[#022645]">
                        <h2 className="font-normal text-xl md:text-2xl lg:text-3xl"><strong className="font-bold">Community</strong> <br />& Support</h2>
                        <p className="text-xs md:text-sm font-medium">Join integration circles or seek professional guidance to share experiences and receive support in a safe and understanding environment.</p>
                    </div>
                </Card>
            </div>
        </section>
    );
}

export default ThirdCRSection;