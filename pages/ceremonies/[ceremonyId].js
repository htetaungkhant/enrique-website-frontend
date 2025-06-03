import Image from "next/image";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoCalendarClear } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { format } from "date-fns";

import Footer from "@/components/common/Footer";
import UPSection from "@/components/common/UniformPaddingSection";
import PageHeader from "@/components/common/PageHeader";
import { getCeremonyDetails } from "@/lib/inhouseAPI/ceremony-route";


export async function getServerSideProps(context) {
    try {
        const { ceremonyId } = context.params;
        const ceremony = await getCeremonyDetails({ ...context.req, body: { id: ceremonyId } });
        if (ceremony.location) {
            try {
                const location = JSON.parse(ceremony.location);
                ceremony.locationCountry = location.country || "";
                ceremony.locationAddress = location.address || "";
            } catch (error) {
                ceremony.locationCountry = ceremony.location || "";
            }
        }
        else {
            ceremony.locationCountry = "";
            ceremony.locationAddress = "";
        }

        if (ceremony.startDate && ceremony.endDate) {
            try {
                ceremony.fromDate = format(new Date(ceremony.startDate), "dd MMM yyyy");
                ceremony.fromTime = format(new Date(ceremony.startDate), "hh:mm a");
                ceremony.toDate = format(new Date(ceremony.endDate), "dd MMM yyyy");
                ceremony.toTime = format(new Date(ceremony.endDate), "hh:mm a");
            } catch (error) {
                console.error("Error formatting time:", error);
                ceremony.fromDate = "";
                ceremony.fromTime = "";
                ceremony.toDate = "";
                ceremony.toTime = "";
            }
        }
        else {
            ceremony.fromDate = "";
            ceremony.fromTime = "";
            ceremony.toDate = "";
            ceremony.toTime = "";
        }

        if (!ceremony) {
            return {
                notFound: true
            };
        }

        return {
            props: {
                ceremony
            }
        };
    } catch (error) {
        console.error("Error fetching ceremony details:", error);
        return {
            notFound: true
        };
    }
}

const CeremonyDetails = ({ ceremony }) => {
    if (!ceremony) {
        return null;
    }

    return (
        <main className="relative min-h-screen flex flex-col justify-between">
            <PageHeader />
            <UPSection className="inter-font text-white pt-28 xl:pt-48">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[65%_30%] justify-between">
                    <div className="flex flex-col gap-10">
                        <h2 className="font-black text-5xl">{ceremony.title}</h2>
                        {
                            Array.isArray(ceremony.hosts) && ceremony.hosts?.length > 0 && (
                                <div>
                                    <p className="font-semibold">Hosts:</p>
                                    <div className="pt-3 flex flex-wrap gap-6 lg:gap-10">
                                        {
                                            ceremony.hosts?.map((host, index) => (
                                                <div key={`${host.title}-${index}`} className="flex items-center gap-3 font-medium">
                                                    {host.image?.image && <Image src={host.image?.image} width={100} height={100} alt="avator" className="w-12 h-12 lg:w-16 lg:h-16 rounded-full" />}
                                                    {host.title && <span className="text-lg">{host.title}</span>}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }
                        <div className="text-lg">
                            {
                                ceremony.locationAddress && (
                                    <div className="flex gap-3 items-center">
                                        <FaLocationDot className="text-[#5AED4A] bg-[#5AED4A59] p-1 rounded-full w-5 h-5" />
                                        <p>{ceremony.locationAddress}</p>
                                    </div>
                                )
                            }
                            {
                                ceremony.locationCountry && (
                                    <div className="flex gap-3 items-center">
                                        <FaLocationDot className="text-[#5AED4A] bg-[#5AED4A59] p-1 rounded-full w-5 h-5" />
                                        <p>{ceremony.locationCountry}</p>
                                    </div>
                                )
                            }
                            {
                                ceremony.fromDate && ceremony.toDate && (
                                    <div className="flex gap-3 items-center">
                                        <IoCalendarClear className="text-[#5AED4A] bg-[#5AED4A59] p-1 rounded-full w-5 h-5" />
                                        <p>From {ceremony.fromDate} to {ceremony.toDate}</p>
                                    </div>
                                )
                            }
                            {
                                ceremony.fromTime && ceremony.toTime && (
                                    <div className="flex gap-3 items-center">
                                        <MdOutlineAccessTimeFilled className="text-[#5AED4A] bg-[#5AED4A59] p-1 rounded-full w-5 h-5" />
                                        <p>{ceremony.fromTime} - {ceremony.toTime}</p>
                                    </div>
                                )
                            }
                        </div>
                        {
                            ceremony.sessionOverview && (
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-bold text-lg">Session Overview</h3>
                                    <p>{ceremony.sessionOverview}</p>
                                </div>
                            )
                        }
                        {
                            Array.isArray(ceremony.extraDetails) && ceremony.extraDetails?.length > 0 && (
                                ceremony.extraDetails?.map((extra, index) => (
                                    <div key={`${extra.title}-${index}`} className="flex flex-col gap-2">
                                        <h3 className="font-bold text-lg">{extra.title}</h3>
                                        {
                                            Array.isArray(extra.points) && extra.points?.length > 0 && (
                                                <ul className="list-disc pl-3">
                                                    {
                                                        extra.points?.map((point, index) => (
                                                            <li key={`${point}-${index}`}>{point}</li>
                                                        ))
                                                    }
                                                </ul>
                                            )
                                        }
                                    </div>
                                ))
                            )
                        }
                    </div>
                    <div>
                        <div className="p-4 rounded-xl bg-white text-[#032F1F] flex flex-col gap-3">
                            <div className="font-bold flex justify-between">
                                <span>Ceremony Fee</span>
                                <span>€ {parseFloat(ceremony.price)?.toFixed(2)}</span>
                            </div>
                            <button className="p-3 inter-font font-bold text-sm text-white rounded-4xl bg-[#212A63] cursor-pointer">
                                Register  Now
                            </button>
                        </div>
                    </div>
                </div>
            </UPSection>
            <Footer className="mt-10" />
        </main>
    )
}

export default CeremonyDetails;