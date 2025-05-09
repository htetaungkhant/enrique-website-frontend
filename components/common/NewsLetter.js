import { useState } from 'react';

import { cn } from "@/lib/utils";
import Input, { PhoneNumberInput } from "./Input";
import { SubmitBtn } from "./Button";

const NewsLetter = ({ className }) => {
    const [phone, setPhone] = useState(null);

    return (
        <section className={cn("relative px-3 py-9 lg:px-10 lg:py-12 xl:py-16 flex justify-center items-center border-t-[1px] border-white bg-center bg-cover bg-no-repeat", className)} style={{ backgroundImage: "url(/image/newsletter-bg.png)" }}>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-55"></div>

            <div className="relative inter-font text-white flex flex-col max-md:items-center gap-3 lg:gap-5 w-full md:w-3/4 lg:w-3/5 xl:w-[42rem]">
                <h2 className="text-center font-bold text-3xl lg:text-4xl merriweather-font">Lets Evolve and Heal Together</h2>
                <p className="text-center">Explore the transformative power of plant medicine, consciousness expansion, and deep spiritual healing with us.</p>
                <div className="max-md:w-10/12 grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-3 md:gap-x-5">
                    <Input label="First Name" labelClassName="max-md:hidden" placeholder="Enter first name" />
                    <Input label="Last Name" labelClassName="max-md:hidden" placeholder="Enter last name" />
                    <PhoneNumberInput label="Mobile Number" customPlaceholder="Enter Mobile Number" value={phone} onChange={setPhone} />
                    <Input label="Email ID" labelClassName="max-md:hidden" placeholder="Enter email ID" />
                    <div className="md:col-span-2 flex justify-center mt-2">
                        <SubmitBtn className="w-fit md:w-3/4" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewsLetter;