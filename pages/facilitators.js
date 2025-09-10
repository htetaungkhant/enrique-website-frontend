import { useState } from "react";
import { HiBadgeCheck } from "react-icons/hi";

import Footer from "@/components/common/Footer";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";
import FacilitatorsCard from "@/components/FacilitatorsPage/FacilitatorsCard";
import FacilitatorsModal from "@/components/FacilitatorsPage/FacilitatorsModal";
import { SwiperCardsRowSection } from "@/components/common/CardsRowSection";
import { getFacilitators } from "@/lib/inhouseAPI/facilitator-route";

export async function getServerSideProps(context) {
  try {
    const facilitators = await getFacilitators(context.req);

    return {
      props: {
        facilitators: facilitators ?? null,
      },
    };
  } catch (error) {
    console.error("Error fetching facilitators:", error);
    return {
      props: {},
    };
  }
}

const FacilitatorsPage = ({ facilitators }) => {
  const [selectedFacilitators, setSelectedFacilitators] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onClickFacilitatorsCard = (facilitator) => {
    setSelectedFacilitators({
      id: facilitator.id,
      image: facilitator.image,
      name: facilitator.fullName,
      role: facilitator.designation,
      about: facilitator.about,
      cardList: facilitator.areaOfExpertise?.map((item) => ({
        badgeText: "Expertise",
        title:
          typeof item.title && item.title.includes("__html")
            ? JSON.parse(item.title)
            : item.title,
        description: item.description,
      })),
      workImpact: facilitator.workAndImpact,
    });
    setIsOpenModal(true);
  };

  const onModalClose = () => {
    setIsOpenModal(false);
  };

  return (
    <main className="relative">
      <PageHeaderWithBanner title="Facilitators" />
      <div className="pt-10" style={{ minHeight: "calc(100vh - 640px)" }}>
        {Array.isArray(facilitators) && facilitators.length > 0 && (
          <UPSection className="relative grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-10">
            {facilitators.map((item, index) => (
              <FacilitatorsCard
                key={`${item.id}-${index}`}
                image={item.image?.image}
                name={item.fullName}
                onReadMoreBtnClick={() => onClickFacilitatorsCard(item)}
                className="w-full h-auto"
              />
            ))}
          </UPSection>
        )}
      </div>
      <Footer className="mt-10" />
      <FacilitatorsModal backdrop isOpen={isOpenModal} onClose={onModalClose}>
        {selectedFacilitators && (
          <div className="flex flex-col inter-font">
            <h2 className="text-center merriweather-font font-bold underline text-4xl">
              {selectedFacilitators.name}
            </h2>
            <p className="my-6 text-center font-semibold text-lg md:text-xl">
              {selectedFacilitators.role}
            </p>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <h4 className="text-2xl md:text-3xl">
                  About <strong>{selectedFacilitators.name}</strong>
                </h4>
                {typeof selectedFacilitators.about === "object" &&
                Object.keys(selectedFacilitators.about).length === 1 &&
                Object.keys(selectedFacilitators.about).includes("__html") ? (
                  <p
                    className="text-xs md:text-sm font-medium"
                    dangerouslySetInnerHTML={selectedFacilitators.about}
                  ></p>
                ) : (
                  <p className="text-xs md:text-sm font-medium">
                    {selectedFacilitators.about}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-5">
                <h4 className="text-2xl md:text-3xl">
                  Area of <strong>Expertise</strong>
                </h4>
                <SwiperCardsRowSection
                  breakpoints={{
                    768: {
                      slidesPerView:
                        selectedFacilitators?.cardList?.length || 3,
                    },
                  }}
                  cardList={selectedFacilitators.cardList}
                  twBadgeBorderColor="border-[#212A63]"
                  twBadgeTextColor="text-[#212A63]"
                  cardClassName="text-[#394885] h-64 md:h-[28rem] lg:h-[24rem] xl:h-[18rem] overflow-x-hidden"
                  className="p-0 lg:p-0"
                />
              </div>
              <div className="flex flex-col gap-5">
                <h4 className="text-2xl md:text-3xl font-bold">
                  Work & Impact
                </h4>
                <ul className="flex flex-col gap-2 md:gap-3">
                  {Array.isArray(selectedFacilitators.workImpact) &&
                    selectedFacilitators.workImpact.length > 0 &&
                    selectedFacilitators.workImpact.map((item, index) => (
                      <li
                        key={`workImpact-${index}`}
                        className="flex gap-3 md:gap-5"
                      >
                        <HiBadgeCheck
                          size={26}
                          color="#2EAC25"
                          className="min-w-6"
                        />
                        <div>
                          {item.title && (
                            <span className="font-bold mr-1">{item.title}</span>
                          )}
                          {item.description && <span>{item.description}</span>}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </FacilitatorsModal>
    </main>
  );

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
};

FacilitatorsPage.isFacilitatorRoute = true;

export default FacilitatorsPage;
