import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Input, { PhoneNumberInput, Textarea } from "../../common/Input";
import Button from "../../common/Button";
import Checkbox from "../../common/Checkbox";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    mobileNumber: z.string().refine((val) => {
        // Remove any non-digit characters and check if there are digits beyond the country code
        return val.replace(/\D/g, '').length > 1;
    }, "Mobile number is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    message: z.string().min(1, "Message is required"),
});

const HelpAndSupportForm = ({
    className,
}) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agreeTandP, setAgreeTandP] = useState(false);
    const [showPhoneError, setShowPhoneError] = useState(true);

    console.log(decodeURIComponent(router.query.slug));

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            mobileNumber: "",
            email: "",
            message: ""
        }
    });

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

    const onSubmit = async (data) => {
        if (!agreeTandP) {
            toast.error("Please agree to the terms and conditions");
            return;
        }

        try {
            setIsSubmitting(true);

            const body = {
                firstName: data.firstName,
                lastName: data.lastName,
                mobile: data.mobileNumber,
                email: data.email,
                message: data.message
            };

            const response = await fetch("/api/submit-support", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message || "Support request submitted successfully");
                form.reset();
                setShowPhoneError(false);
                setAgreeTandP(false);
            } else {
                toast.error(result.message || "Failed to submit support request");
            }
        } catch (error) {
            toast.error(error?.message || "Failed to submit support request");
        } finally {
            setIsSubmitting(false);
        }
    };

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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col bg-white">
                    <h4 className="p-4 text-black text-lg font-bold bg-gradient-to-r from-[#A7FED3] to-[#64987E]">Help & Support</h4>

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
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                label="Message"
                                                placeholder="Write a Message"
                                                textareaClassName="resize-none"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-xs" />
                                    </FormItem>
                                )}
                            />
                            <Checkbox
                                label={<span className="text-xs">I agree to the <Link target="_blank" href="/terms-and-conditions" className="text-[#032F1F] text-sm font-bold">terms & conditions</Link></span>}
                                checked={agreeTandP}
                                onChange={() => setAgreeTandP(!agreeTandP)}
                                className="w-fit"
                            />
                            <div className="flex justify-center mt-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full disabled:bg-[#212a6380]"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default HelpAndSupportForm;