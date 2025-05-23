import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import Input, { PhoneNumberInput, Textarea } from "../../common/Input";
import Button from "../../common/Button";
import Checkbox from "../../common/Checkbox";

const HelpAndSupportForm = ({
    className,
}) => {
    const router = useRouter();
    const [agreeTandP, setAgreeTandP] = useState(false);

    console.log(decodeURIComponent(router.query.slug));

    const handleOnSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div
            className={cn(
                "flex w-full rounded-3xl overflow-hidden",
                className,
            )}
        >
            <div className="max-xl:hidden relative px-24 py-28 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/image/OtherSomaticPractices.png)" }}>
                <div className="absolute inset-0 bg-[#2A6C4BB2]"></div>
                <Image
                    src="/logo/vertical-logo.png"
                    width={200}
                    height={260}
                    alt="vertical-logo"
                    className="relative w-30 h-48 object-contain"
                />
            </div>
            <form className="flex-1 flex flex-col bg-white">
                <h4 className="p-4 text-black text-lg font-bold bg-gradient-to-r from-[#A7FED3] to-[#64987E]">Help & Support</h4>
                {/* <div className="p-4">

                </div> */}

                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-3 md:gap-x-5 text-[#1E1E22]">
                    <Input
                        name="first-name"
                        label="First Name"
                        placeholder="Enter first name"
                    />
                    <Input
                        name="last-name"
                        label="Last Name"
                        placeholder="Enter last name"
                    />
                    <PhoneNumberInput
                        name="mobile-number"
                        label="Mobile Number"
                        customPlaceholder="Enter Mobile Number"
                    />
                    <Input
                        name="email"
                        type="email"
                        label="Email ID"
                        placeholder="Enter email ID"
                    />
                    <div className="md:col-span-2 flex flex-col gap-5">
                        <Textarea
                            name="message"
                            label="Message"
                            placeholder="Write a Message"
                            textareaClassName="resize-none"
                        />
                        <Checkbox
                            label={<span className="text-xs">I agree to the <Link target="_blank" href="/terms-and-conditions" className="text-[#032F1F] text-sm font-bold">terms & conditions</Link></span>}
                            checked={agreeTandP}
                            onChange={() => setAgreeTandP(!agreeTandP)}
                            className="w-fit"
                        />
                        <div className="flex justify-center mt-2">
                            <Button
                                disabled
                                type="button"
                                onClick={handleOnSubmit}
                                className="w-full disabled:bg-[#212a6380]"
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default HelpAndSupportForm;