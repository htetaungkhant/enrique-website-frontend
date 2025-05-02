import Footer from "@/components/common/Footer";
import PageHeader from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";
import FacilitatorsCard from "@/components/FacilitatorsPage/FacilitatorsCard";

const dummyData = [
    {
        image: "/dummy-data/1.png",
        name: "Enrique Navarro Rodríguez",
    },
    {
        image: "/dummy-data/2.png",
        name: "Vivek Padalia",
    },
    {
        image: "/dummy-data/3.jpg",
        name: "Shabnam Ananda",
    },
]

const Facilitators = () => {
    return (
        <main>
            <div className="absolute top-0 left-0 w-full z-100 xl:p-12">
                <PageHeader />
            </div>
            <div className="relative">
                <div className="absolute top-0 left-0 right-0 w-full">
                    <div className="h-[100vh] bg-center bg-cover bg-no-repeat" style={{ backgroundImage: 'url(/image/banner.png)' }}>
                    </div>
                    <div className="h-32 bg-gradient-to-b from-[#000000] to-[#00000000]" />
                </div>
                <div className="relative pt-20 xl:pt-40 min-h-[100vh]">
                    <h4 className="text-center max-md:py-10 py-20 pt-10 text-white font-bold merriweather-font uppercase text-2xl xl:text-4xl">Facilitators</h4>
                    <UPSection>
                        <div className="p-0 sm:px-4 md:px-10 lg:px-20 flex flex-col gap-5 md:gap-10 lg:gap-20">
                            {
                                dummyData.map((item, index, arr) => (
                                    index === 0 || (arr.length % 2 === 0 && index === arr.length - 1) ?
                                        <div key={index} className="flex justify-center">
                                            <FacilitatorsCard image={item.image} name={item.name} className="w-full h-auto min-w-72 md:h-96 md:w-72" />
                                        </div>
                                        :
                                        (index + 1) % 2 === 0 ?
                                            null
                                            :
                                            <div key={index} className="flex gap-5 md:gap-10 lg:gap-20 max-md:flex-col max-md:items-center md:justify-between">
                                                {
                                                    [dummyData[index - 1], dummyData[index]].map((innerItem, innerIndex) => (
                                                        <FacilitatorsCard key={innerIndex} image={innerItem.image} name={innerItem.name} className="w-full h-auto min-w-72 md:h-96 md:w-72" />
                                                    ))
                                                }
                                            </div>
                                ))
                            }
                        </div>
                    </UPSection>
                </div>
            </div>
            <Footer className="mt-10" />
        </main>
    )

    // return (
    //     <main className="bg-center bg-cover bg-no-repeat" style={{ backgroundImage: 'url(/image/banner.png)' }}>
    //         <div className="h-[100vh] overflow-y-auto">
    //             <div className="z-100 xl:p-12 relative">
    //                 {/* Overlay */}
    //                 <div className="absolute inset-0 bg-black opacity-55"></div>
    //                 <PageHeader />
    //             </div>
    //             <div className="h-[200vh] relative">
    //                 {/* Overlay */}
    //                 <div className="absolute inset-0 bg-black opacity-55"></div>
    //             </div>
    //             <Footer />
    //         </div>
    //     </main>
    // )
}

export default Facilitators;