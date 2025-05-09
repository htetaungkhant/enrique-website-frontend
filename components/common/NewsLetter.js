import { useState } from 'react';

import { cn } from "@/lib/utils";
import Input, { PhoneNumberInput } from "./Input";
import { SubmitBtn } from "./Button";

const NewsLetter = ({ className }) => {
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const pureData = Object.fromEntries(formData.entries());

        const error = {}
        Object.keys(pureData).map(key => {
            if (key === "mobile-number" && pureData[key].split(" ").length <= 1) {
                // error.push({ [key]: "Require value!" })
                error[key] = "Require value!";
            }
            else if (pureData[key] === "") {
                // error.push({ [key]: "Require value!" })
                error[key] = "Require value!";
            };
        })
        setErrors(error);
        if (error.length > 0) return;

        const finalData = {}
        Object.entries(pureData).map(([key, value]) => {
            if (key === "mobile-number") {
                finalData[key] = value.replaceAll(" ", "");
            }
            else {
                finalData[key] = value
            }
        })

        console.log('Data to submit API', finalData);
    }

    return (
        <section className={cn("relative px-3 py-9 lg:px-10 lg:py-12 xl:py-16 flex justify-center items-center border-t-[1px] border-white bg-center bg-cover bg-no-repeat", className)} style={{ backgroundImage: "url(/image/newsletter-bg.png)" }}>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-55"></div>

            <form onSubmit={handleSubmit} className="relative inter-font text-white flex flex-col max-md:items-center gap-3 lg:gap-5 w-full md:w-3/4 lg:w-3/5 xl:w-[42rem]">
                <h2 className="text-center font-bold text-3xl lg:text-4xl merriweather-font">Lets Evolve and Heal Together</h2>
                <p className="text-center">Explore the transformative power of plant medicine, consciousness expansion, and deep spiritual healing with us.</p>
                <div className="max-md:w-10/12 grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-3 md:gap-x-5">
                    <Input name="first-name" label="First Name" labelClassName="max-md:hidden" placeholder="Enter first name" />
                    <Input name="last-name" label="Last Name" labelClassName="max-md:hidden" placeholder="Enter last name" />
                    <PhoneNumberInput name="mobile-number" label="Mobile Number" customPlaceholder="Enter Mobile Number" />
                    <Input name="email" type="email" label="Email ID" labelClassName="max-md:hidden" placeholder="Enter email ID" />
                    {Object.keys(errors).length > 0 && (
                        <div className='md:col-span-2'>
                            <span className='text-red-500 font-semibold text-center block'>Please fill all required fields with valid data!</span>
                        </div>
                    )}
                    <div className="md:col-span-2 flex justify-center mt-2">
                        <SubmitBtn className="w-fit md:w-3/4" />
                    </div>
                </div>
            </form>
        </section>
    )
}

export default NewsLetter;