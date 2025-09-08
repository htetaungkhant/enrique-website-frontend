import { useState } from "react";
import Image from "next/image";
// import { IoMdCloseCircle } from "react-icons/io";
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

const Discount = ({ discountUsers, discountPercent, onSubmissionSuccess }) => {
  const [showDiscount, setShowDiscount] = useState("intro");
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

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const body = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: `+${
          data?.mobileNumber?.countryCode
        }-${data?.mobileNumber?.number?.replace(
          data?.mobileNumber?.countryCode,
          ""
        )}`,
        country: data.country,
      };

      const response = await fetch("/api/admin/ceremony/participant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        sessionStorage.setItem("discounted_user_firstName", data?.firstName);
        sessionStorage.setItem("discounted_user_lastName", data?.lastName);
        sessionStorage.setItem("discounted_user_email", data?.email);
        sessionStorage.setItem(
          "discounted_user_mobile",
          `${data?.mobileNumber?.countryCode}-${data?.mobileNumber?.number}`
        );
        sessionStorage.setItem("discounted_user_country", data?.country);
        if (discountUsers > 0) {
          toast.success("Successfully subscribed to Early Bird Discount!");
        } else {
          toast.error("Early Bird Discount is already full. Try again later.");
        }
        form.reset();
        setShowPhoneError(false);
        setShowDiscount("");
        onSubmissionSuccess?.();
      } else {
        toast.error("Early Bird Discount is already full!");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Early Bird Discount is already full!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (value, data, event, formattedValue) => {
    const phoneWithoutCode = value.replace(data.dialCode, "");
    form.setValue("mobileNumber", {
      number: value,
      countryCode: data?.dialCode,
    });

    if (phoneWithoutCode.length < 6) {
      setShowPhoneError(true);
    } else {
      setShowPhoneError(false);
    }

    form.trigger("mobileNumber");
  };

  return (
    <>
      {/* Overlay */}
      {showDiscount && (
        <div className="fixed z-900 inset-0 bg-black opacity-20"></div>
      )}
      {showDiscount === "intro" && (
        <div className="lg:max-h-100 max-md:w-full max-w-[300px] md:max-w-180 xl:max-w-120 flex z-900 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#CDFFD8] to-[#94B9FF] overflow-hidden rounded-xl shadow">
          {/* Close Button */}
          {/* <IoMdCloseCircle
            size={24}
            onClick={() => setShowDiscount("")}
            className="absolute top-2 right-2 z-50 text-gray-200 hover:text-gray-50 cursor-pointer transition"
          /> */}

          <div className="p-3 lg:px-6 lg:py-6 md:w-1/2 flex flex-col justify-center gap-3 lg:gap-6">
            <h2 className="text-[#212A63] font-black text-xl lg:text-2xl">
              Unlock a 10% Early Bird Discount!
            </h2>
            <div className="text-[10px] lg:text-xs font-medium">
              <p>
                Be among the FIRST 3 to register for our 7-Day Luxury Healing
                Retreat in Ibiza and receive an exclusive 10% off.
              </p>
              <br />
              <p>Reconnect... Heal... Transform...</p>
              <br />
              <p>Book Now—Offer ends with the first 3 registrations!</p>
            </div>
            <Image
              width={259}
              height={56}
              src="/icon/register-now-btn.png"
              alt="register-now"
              className="cursor-pointer rounded-4xl hover:shadow-2xl"
              onClick={() => setShowDiscount("discount-form")}
            />
          </div>
          <div className="max-md:hidden w-1/2 relative">
            <Image
              width={100}
              height={100}
              src="/logo/vertical-logo.png"
              alt="logo"
              className="w-24 h-24 object-contain absolute left-1/2 top-8 -translate-x-1/2"
            />
            <Image
              width={285}
              height={490}
              src="/image/18.png"
              alt="advertistment"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}
      {showDiscount === "discount-form" && (
        <div className="max-md:w-[90%] max-xl:w-[75%] xl:w-[60%] max-w-230 z-900 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-visible rounded-xl shadow">
          {/* Close Button */}
          {/* <IoMdCloseCircle
            size={24}
            onClick={() => setShowDiscount("")}
            className="absolute top-2 right-2 z-50 text-gray-200 hover:text-gray-50 cursor-pointer transition"
          /> */}

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
                            value={
                              field.value?.number ||
                              field.value?.countryCode ||
                              "420"
                            }
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
      )}
    </>
  );
};

export default Discount;
