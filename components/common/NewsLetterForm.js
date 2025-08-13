import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Input, { PhoneNumberInput } from "./Input";
import Button from "./Button";

const formSchema = z.object({
    firstName: z.string()
        .min(3, "First name must be at least 3 characters")
        .min(1, "First name is required"),
    lastName: z.string()
        .min(3, "Last name must be at least 3 characters")
        .min(1, "Last name is required"),
    mobileNumber: z.string().refine((val) => {
        // Remove any non-digit characters and check if there are digits beyond the country code
        return val.replace(/\D/g, '').length > 1;
    }, "Mobile number is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format")
});

const NewsLetterForm = ({ className, onSubmissionSuccess }) => {
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
                email: data.email,
                phoneNumber: data.mobileNumber
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
                onSubmissionSuccess?.();
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
        <div
            className={cn(
                "flex w-full rounded-3xl overflow-y-visible",
                className,
            )}
        >
            <div className="max-xl:hidden rounded-l-xl relative px-24 py-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/image/OtherSomaticPractices.png)" }}>
                <div className="absolute inset-0 bg-[#2A6C4BB2] rounded-l-xl"></div>
                <Image
                    src="/logo/vertical-logo.png"
                    width={200}
                    height={260}
                    alt="vertical-logo"
                    className="relative w-30 h-48 object-contain"
                />
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex-1 flex flex-col bg-white max-xl:rounded-l-xl rounded-r-xl"
                >
                    <h4 className="p-4 text-black text-lg font-bold bg-gradient-to-r from-[#A7FED3] to-[#64987E] max-xl:rounded-tl-xl rounded-tr-xl">
                        Participant Details
                    </h4>

                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-3 md:gap-x-5 text-[#1E1E22]">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            label="First Name"
                                            placeholder="Enter first name"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400 text-xs" />
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
                                            placeholder="Enter last name"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400 text-xs" />
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
                                            value={field.value || "420"}
                                            onChange={handlePhoneChange}
                                            label="Mobile Number"
                                            customPlaceholder="Enter Mobile Number"
                                        />
                                    </FormControl>
                                    {showPhoneError && form.formState.isSubmitted && (
                                        <FormMessage className="text-red-400 text-xs">
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
                                            placeholder="Enter email ID"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400 text-xs" />
                                </FormItem>
                            )}
                        />

                        <div className="md:col-span-2 flex flex-col gap-5">
                            <div className="flex justify-center mt-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full disabled:bg-[#212a6380]"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default NewsLetterForm;