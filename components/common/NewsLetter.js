import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Input, { PhoneNumberInput } from "./Input";
import { SubmitBtn } from "./Button";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    mobileNumber: z.string().refine((val) => {
        // Remove any non-digit characters and check if there are digits beyond the country code
        return val.replace(/\D/g, '').length > 1;
    }, "Mobile number is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format")
});

const NewsLetter = ({ id, className }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPhoneError, setShowPhoneError] = useState(true);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            mobileNumber: "",
            email: ""
        }
    });

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            // Create the full name from first and last name
            const body = {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email
            };

            const response = await fetch("/api/admin/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                toast.success("Successfully subscribed to newsletter!");
                form.reset();
                setShowPhoneError(false);
            } else {
                toast.error("Failed to subscribe to newsletter");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to subscribe to newsletter");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Custom handler for phone number changes
    const handlePhoneChange = (value, data, event, formattedValue) => {
        const phoneWithoutCode = value.replace(data.dialCode, "");
        form.setValue("mobileNumber", value);

        // Only show error if field has been touched and is empty
        if (phoneWithoutCode.length === 0) {
            setShowPhoneError(true);
        } else {
            setShowPhoneError(false);
        }

        form.trigger("mobileNumber");
    };

    return (
        <section
            id={id}
            className={cn(
                "relative px-3 py-9 lg:px-10 lg:py-12 xl:py-16 flex justify-center items-center border-t-[1px] border-white bg-center bg-cover bg-no-repeat",
                className
            )}
            style={{ backgroundImage: "url(/image/newsletter-bg.png)" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-55"></div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="relative inter-font text-white flex flex-col max-md:items-center gap-3 lg:gap-5 w-full md:w-3/4 lg:w-3/5 xl:w-[42rem]"
                >
                    <h2 className="text-center font-bold text-3xl lg:text-4xl merriweather-font">
                        Lets Evolve and Heal Together
                    </h2>
                    <p className="text-center">
                        Explore the transformative power of plant medicine, consciousness expansion, and deep spiritual healing with us.
                    </p>

                    <div className="max-md:w-10/12 grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-3 md:gap-x-5">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            label="First Name"
                                            labelClassName="max-md:hidden"
                                            placeholder="Enter first name"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400 text-sm mt-1" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            label="Last Name"
                                            labelClassName="max-md:hidden"
                                            placeholder="Enter last name"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400 text-sm mt-1" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="mobileNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <PhoneNumberInput
                                            {...field}
                                            value={field.value}
                                            onChange={handlePhoneChange}
                                            label="Mobile Number"
                                            labelClassName="max-md:hidden"
                                            customPlaceholder="Enter Mobile Number"
                                        />
                                    </FormControl>
                                    {showPhoneError && form.formState.isSubmitted && (
                                        <FormMessage className="text-red-400 text-sm mt-1">
                                            Mobile number is required
                                        </FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            label="Email ID"
                                            labelClassName="max-md:hidden"
                                            placeholder="Enter email ID"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400 text-sm mt-1" />
                                </FormItem>
                            )}
                        />

                        <div className="md:col-span-2 flex justify-center mt-2">
                            <SubmitBtn className="w-fit md:w-3/4" disabled={isSubmitting} />
                        </div>
                    </div>
                </form>
            </Form>
        </section>
    );
};

export default NewsLetter;