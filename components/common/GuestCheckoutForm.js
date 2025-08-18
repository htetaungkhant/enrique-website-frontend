import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoMdCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Input, { PhoneNumberInput } from "./Input";
import Button from "./Button";

const formSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .min(1, "First name is required"),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .min(1, "Last name is required"),
  //   mobileNumber: z.string().refine((val) => {
  //     // Remove any non-digit characters and check if there are digits beyond the country code
  //     return val.replace(/\D/g, "").length > 1;
  //   }, "Mobile number is required"),
  mobileNumber: z
    .object({
      number: z.string().min(7, "Mobile number is required"),
      countryCode: z.string().min(1, "Country code is required"),
    })
    .refine(
      (val) =>
        val.number.replace(/\D/g, "").replace(val.countryCode, "").length >= 6,
      "Mobile number is required"
    ),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  country: z.string().min(1, "Country is required"),
});

const GuestCheckoutForm = ({
  ceremony,
  onSubmissionSuccess,
  open,
  onOpenChange,
}) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: {
        number: "",
        countryCode: "420",
      },
      email: "",
      country: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);

      const body = {
        ceremonyId: ceremony.id,
        name: `${values?.firstName} ${values?.lastName}`,
        email: values?.email,
        // phoneNumber: JSON.stringify(values?.mobileNumber),
        phoneNumber: values?.mobileNumber?.number,
        country: values?.country,
      };
      const response = await fetch("/api/ceremony-stripe-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create payment intent");
      }

      const data = await response.json();

      if (!data.sessionId?.client_secret) {
        throw new Error("Client secret not found in response.");
      }

      form.reset();
      setShowPhoneError(false);
      onOpenChange(false);
      onSubmissionSuccess?.(data);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      toast.error(
        error?.message ||
          error?.response?.data?.message ||
          "Failed to proceed to checkout. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom handler for phone number changes
  const handlePhoneChange = (value, data, event, formattedValue) => {
    const phoneWithoutCode = value.replace(data.dialCode, "");
    form.setValue("mobileNumber", {
      number: value,
      countryCode: data?.dialCode,
    });

    // Only show error if field has been touched and is empty
    if (phoneWithoutCode.length < 6) {
      setShowPhoneError(true);
    } else {
      setShowPhoneError(false);
    }

    form.trigger("mobileNumber");
  };

  const handleClose = () => {
    form.reset();
    setShowPhoneError(false);
    onOpenChange?.(false);

    const query = { ...router.query };
    delete query.checkout;
    router.replace({
      pathname: router.pathname,
      query: query,
    });
  };

  return (
    <>
      {open && (
        <>
          {/* Overlay */}
          <div className="fixed z-950 inset-0 bg-black opacity-20"></div>

          <div className="max-md:w-[90%] max-xl:w-[75%] xl:w-[60%] max-w-230 z-950 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-visible rounded-xl shadow">
            {/* Close Button */}
            <IoMdCloseCircle
              size={24}
              onClick={handleClose}
              className="absolute top-2 right-2 z-50 text-gray-200 hover:text-gray-50 cursor-pointer transition"
            />

            <div className="flex w-full rounded-3xl overflow-y-visible">
              <div
                className="max-xl:hidden rounded-l-xl relative px-24 py-10 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url(/image/OtherSomaticPractices.png)",
                }}
              >
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
                    Guest Details
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
                              value={field.value?.number || "420"}
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

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              label="Country"
                              placeholder="Enter country"
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
          </div>
        </>
      )}
    </>
  );
};

export default GuestCheckoutForm;
