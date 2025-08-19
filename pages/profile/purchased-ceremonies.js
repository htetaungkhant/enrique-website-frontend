import { useRouter } from "next/router";
import Image from "next/image";

import ProfilePagesWrapper from "@/components/common/auth/ProfilePagesWrapper";
import CeremonyCard from "@/components/CeremoniesPage/CeremonyCard";
import { getRegisteredCeremoniesByUser } from "@/lib/inhouseAPI/ceremony-route";

export async function getServerSideProps(context) {
  try {
    const response = await getRegisteredCeremoniesByUser({ ...context.req });
    console.log("Ceremonies response:", response);

    return {
      props: {
        ceremonies: response?.ceremonies ?? [],
      },
    };
  } catch (error) {
    console.error("Error fetching ceremonies:", error);
    return {
      props: {
        ceremonies: [],
      },
    };
  }
}

const Purchases = ({ ceremonies }) => {
  const router = useRouter();

  const handleExploreCeremonies = (e) => {
    e.preventDefault();
    router.push("/ceremonies");
  };

  return (
    <ProfilePagesWrapper>
      <div className="py-5 md:px-5 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 md:gap-10 justify-between">
          {!Array.isArray(ceremonies) && (
            <div className="col-span-full text-center text-muted-foreground">
              No ceremonies data available
            </div>
          )}

          {Array.isArray(ceremonies) && ceremonies.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground">
              <div className="pt-5 lg:pt-10 w-full flex flex-col gap-3 items-center">
                <Image
                  src="/icon/empty-courses.png"
                  width={225}
                  height={225}
                  alt="empty-course"
                  className="w-56 h-56 max-lg:w-44 max-lg:h-44 object-contain"
                />
                <h4 className="text-lg font-semibold">No Purchases Yet</h4>
                <p className="text-sm text-[#EFEFEF]">
                  Start exploring our ceremonies
                </p>
                <button
                  type="button"
                  onClick={handleExploreCeremonies}
                  className="mt-3 px-4 py-2 rounded-4xl bg-gradient-to-b from-[#D7F2D5] to-[#5C8959] text-black font-bold cursor-pointer"
                >
                  Explore Ceremonies
                </button>
              </div>
            </div>
          )}

          {Array.isArray(ceremonies) &&
            ceremonies.map((ceremony, index) => (
              <CeremonyCard
                key={`${ceremony.id}-${index}`}
                id={ceremony.id}
                image={ceremony.image?.image}
                title={ceremony.title}
                locations={ceremony.locationCountry}
                startDate={ceremony.startDate}
                endDate={ceremony.endDate}
                learnMoreHref={`/ceremonies/${ceremony.title}`
                  .replaceAll(/\s+/g, "-")
                  .toLowerCase()}
              />
            ))}
        </div>
      </div>
    </ProfilePagesWrapper>
  );
};

export default Purchases;
