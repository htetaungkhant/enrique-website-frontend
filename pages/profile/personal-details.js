import { FaRegUserCircle } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";

import ProfilePagesWrapper from "@/components/common/ProfilePagesWrapper";

const PersonalDetailsPage = () => {
    return (
        <ProfilePagesWrapper>
            <div className="lg:ml-[8%] py-10 md:px-5 xl:max-w-250 flex flex-col gap-12 items-center"> {/*  md:max-w-200 */}
                <div className="w-full flex gap-2 xl:gap-3 items-center">
                    <div className="border-2 p-1.5 rounded-full">
                        <FaRegUserCircle className="w-10 h-10 xl:w-12 xl:h-12" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-48">
                        <span className="font-bold text-xl xl:text-2xl">Username</span>
                        <div className="flex items-center justify-between">
                            <span className="flex-1">32 years</span>
                            <TbEdit className="w-5 h-5 xl:w-7 xl:h-7 text-[#96CD78] cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-12 max-lg:flex-col xl:gap-16">
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex justify-between">
                            <h2 className="text-lg xl:text-xl font-bold text-[#8A8A8A]">Contact Details</h2>
                            <TbEdit className="w-5 h-5 xl:w-7 xl:h-7 text-[#96CD78] cursor-pointer" />
                        </div>
                        <div className="bg-white rounded-2xl text-[#494A4A]">
                            <div className="p-4 flex justify-between">
                                <span>Phone Number</span>
                                <span className="font-semibold">9988774433</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span>Email</span>
                                <span className="font-semibold">walter@ymail.com</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex justify-between">
                            <h2 className="text-lg xl:text-xl font-bold text-[#8A8A8A]">Participant Details</h2>
                            <TbEdit className="w-5 h-5 xl:w-7 xl:h-7 text-[#96CD78] cursor-pointer" />
                        </div>
                        <div className="bg-white rounded-2xl text-[#494A4A]">
                            <div className="p-4 flex justify-between">
                                <span>Gender</span>
                                <span className="font-semibold">Male</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span>Blood Group</span>
                                <span className="font-semibold">A Positive</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span>D.O.B</span>
                                <span className="font-semibold">07/09/1992</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProfilePagesWrapper>
    )
}

export default PersonalDetailsPage;