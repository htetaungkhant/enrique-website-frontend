import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn, maskEmail } from "@/lib/utils";
import { useUserAuth } from "@/hooks/userAuth";
import Input, { PasswordInput, PhoneNumberInput } from "../Input";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Dropdown from "../Dropdown";
import Datepicker from "../Datepicker";

const signupSchema = z.object({
    firstName: z.string()
        .min(3, "First name must be at least 3 characters")
        .min(1, "First name is required"),
    lastName: z.string()
        .min(3, "Last name must be at least 3 characters")
        .min(1, "Last name is required"),
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email format"),
    // phone: z.string()
    //     .min(1, "Phone number is required")
    //     .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Invalid phone number"),
    phone: z.string().refine((val) => {
        // Remove any non-digit characters and check if there are digits beyond the country code
        return val.replace(/\D/g, '').length > 1;
    }, "Phone number is required"),
    password: z.string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
    confirmPassword: z.string()
        .min(1, "Please confirm your password"),
    dateOfBirth: z.date({
        required_error: "Date of birth is required",
        invalid_type_error: "Invalid date format",
    }),
    gender: z.string({
        required_error: "Gender is required",
    }),
    rememberMe: z.boolean().optional(),
    agreeTandP: z.boolean().refine((val) => val === true, {
        message: "You must agree to the Terms and Privacy Policy",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const SignupForm = ({
    toggleLoginSignup,
}) => {
    const { signIn } = useUserAuth();
    const router = useRouter();
    const { query: { auth, email } } = router;
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResendingOTP, setIsResendingOTP] = useState(false);
    const [otp, setOtp] = useState("");
    const [serverDate, setServerDate] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState("");

    useEffect(() => {
        const fetchServerDate = async () => {
            try {
                const response = await fetch('/api/utils/get-server-date');
                const data = await response.json();
                setServerDate(new Date(data.date));
            } catch (error) {
                console.error('Failed to fetch server date:', error);
                setServerDate(new Date()); // Fallback to client date
            }
        };

        fetchServerDate();
    }, []);

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            dateOfBirth: undefined,
            gender: undefined,
            rememberMe: false,
            agreeTandP: false,
        },
    });

    const onSignup = async (data) => {
        const body = {
            ...data,
            dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        };
        console.log("Signup data:", body);

        try {
            const response = await fetch("/api/auth/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to sign up");
            }

            toast.success("Account created successfully! Please verify your email.");
            const query = { ...router.query, auth: "verification", email: data.email };
            router.push({
                pathname: router.pathname,
                query: query,
            });
        } catch (error) {
            toast.error(error.message || "Failed to create account");
        }
    };

    const handleBackToSignup = (e) => {
        e.preventDefault();

        const query = { ...router.query, auth: "signup" };
        delete query.email;
        router.replace({
            pathname: router.pathname,
            query: query,
        });
    };

    const handleResendOTP = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Email is required to resend OTP");
            return;
        }

        try {
            setIsResendingOTP(true);
            const response = await fetch("/api/auth/resend-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to resend OTP");
            }

            toast.success("OTP has been sent to your email");
        } catch (error) {
            toast.error(error.message || "Failed to resend OTP");
        } finally {
            setIsResendingOTP(false);
        }
    };

    const handleVerificationAndCreateAccount = async (e) => {
        e.preventDefault();

        if (!email || !otp || otp.length !== 6) {
            toast.error("Please enter the 6-digit OTP code");
            return;
        }

        try {
            setIsVerifying(true);
            const response = await fetch("/api/auth/verify-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to verify email");
            }

            toast.success("Account verified successfully!");
            const query = { ...router.query, auth: "verify-success" };
            delete query.email;
            router.replace({
                pathname: router.pathname,
                query: query,
            });
        } catch (error) {
            toast.error(error.message || "Failed to verify email");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            sessionStorage.setItem("justLoggedIn", "1");

            const path = window.location.pathname;
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.delete("auth");
            const callbackUrl = searchParams.size > 0 ? `${path}?${searchParams.toString()}` : path;
            const options = {
                provider: 'google',
                redirect: false,
                callbackUrl,
            };
            await signIn(options);
        } catch (error) {
            console.error("signin error", error);
            toast.error("An unexpected error occurred");
        }
    };

    // Custom handler for phone number changes
    const handlePhoneChange = (value, data, event, formattedValue) => {
        const phoneWithoutCode = value.replace(data.dialCode, "");
        form.setValue("phone", value);

        // Only show error if field has been touched and is empty
        if (phoneWithoutCode.length === 0) {
            setPhoneNumberError("empty");
        } else if (phoneWithoutCode.length < 9) {
            setPhoneNumberError("short");
        } else {
            setPhoneNumberError("");
        }

        form.trigger("phone");
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSignup)} className="px-3 flex-1 flex flex-col gap-3 justify-center max-lg:text-xs text-sm text-[#2D3748]">
                <h1 className="text-center text-3xl font-bold text-[#484C52]">Sign Up</h1>
                {
                    auth === "signup" && (
                        <>
                            <span className="mx-auto px-8 py-2 text-xs rounded-4xl bg-black text-white">
                                Fields cannot be empty
                            </span>
                            <div className="mt-4 xl:mt-8 mx-auto w-full flex flex-col gap-2 lg:gap-3 xl:gap-5">
                                <div className="flex gap-2 lg:gap-3 xl:gap-5 flex-wrap">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem className="flex-1 min-w-37">
                                                <FormControl>
                                                    <Input
                                                        label="First Name"
                                                        placeholder="Enter First Name"
                                                        labelClassName="text-sm"
                                                        inputClassName="text-[#2D3748] placeholder:text-[#848484]"
                                                        error={form.formState.errors.firstName?.message}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem className="flex-1 min-w-37">
                                                <FormControl>
                                                    <Input
                                                        label="Last Name"
                                                        placeholder="Enter Last Name"
                                                        labelClassName="text-sm"
                                                        inputClassName="text-[#2D3748] placeholder:text-[#848484]"
                                                        error={form.formState.errors.lastName?.message}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex gap-2 lg:gap-3 xl:gap-5 flex-wrap">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="flex-1 min-w-37">
                                                <FormControl>
                                                    <Input
                                                        label="Email"
                                                        type="email"
                                                        placeholder="Enter Email ID"
                                                        labelClassName="text-sm"
                                                        inputClassName="text-[#2D3748] placeholder:text-[#848484]"
                                                        error={form.formState.errors.email?.message}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="flex-1 min-w-37">
                                                <FormControl>
                                                    <PhoneNumberInput
                                                        {...field}
                                                        value={field.value || "420"}
                                                        onChange={handlePhoneChange}
                                                        label="Phone number"
                                                        labelClassName="text-sm"
                                                        customPlaceholder="Enter Phone number"
                                                    />
                                                </FormControl>
                                                {form.formState.isSubmitted && (
                                                    <FormMessage className="-mt-0.5 text-red-400 text-xs">
                                                        {phoneNumberError === "empty" && "Phone number is required"}
                                                        {phoneNumberError === "short" && "Phone number is too short"}
                                                    </FormMessage>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex gap-2 lg:gap-3 xl:gap-5 flex-wrap">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="flex-1 min-w-37">
                                                <FormControl>
                                                    <PasswordInput
                                                        label="Password"
                                                        placeholder="Enter password"
                                                        labelClassName="text-sm"
                                                        inputClassName="text-[#2D3748] placeholder:text-[#848484]"
                                                        error={form.formState.errors.password?.message}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem className="flex-1 min-w-37">
                                                <FormControl>
                                                    <PasswordInput
                                                        label="Confirm password"
                                                        placeholder="Confirm password"
                                                        labelClassName="text-sm"
                                                        inputClassName="text-[#2D3748] placeholder:text-[#848484]"
                                                        error={form.formState.errors.confirmPassword?.message}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex gap-2 lg:gap-3 xl:gap-5 flex-wrap">
                                    <FormField
                                        control={form.control}
                                        name="dateOfBirth"
                                        render={({ field }) => (
                                            <FormItem className="flex-1 min-w-37">
                                                <FormControl>
                                                    <Datepicker
                                                        label="Date of Birth"
                                                        placeholder="Date of Birth"
                                                        value={field.value}
                                                        onChange={(date) => field.onChange(date)}
                                                        labelClassName="text-sm"
                                                        error={form.formState.errors.dateOfBirth?.message}
                                                        disabled={{ after: serverDate }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem className="flex-1 min-w-37">
                                                <FormControl>
                                                    <Dropdown
                                                        label="Gender"
                                                        options={[
                                                            { label: "Male", value: "MALE" },
                                                            { label: "Female", value: "FEMALE" },
                                                            { label: "Others", value: "OTHER" },
                                                        ]}
                                                        value={field.value}
                                                        onChange={(value) => field.onChange(value)}
                                                        labelClassName="text-sm"
                                                        error={form.formState.errors.gender?.message}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 lg:gap-3 py-2 lg:py-4">
                                    <FormField
                                        control={form.control}
                                        name="rememberMe"
                                        render={({ field }) => (
                                            <FormItem className="w-fit">
                                                <FormControl>
                                                    <Checkbox
                                                        label="Remember me"
                                                        checked={field.value}
                                                        onChange={(e) => field.onChange(e.target.checked)}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="agreeTandP"
                                        render={({ field }) => (
                                            <FormItem className="w-fit">
                                                <FormControl>
                                                    <Checkbox
                                                        label={<>I agree to all the <Link href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[#212A63]">Terms</Link> and <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#212A63]">Privacy policy</Link></>}
                                                        checked={field.value}
                                                        onChange={(e) => field.onChange(e.target.checked)}
                                                        error={form.formState.errors.agreeTandP?.message}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    title="Sign Up"
                                    className="sm:w-[50%] sm:max-w-60 sm:mx-auto sm:py-4 sm:rounded-3xl"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? "Signing up..." : "Sign Up"}
                                </Button>
                                <p className="text-center text-[#2D3748]">
                                    Already have an account?{" "}
                                    <span className="font-bold text-[#212A63] cursor-pointer" onClick={toggleLoginSignup}>
                                        Log In
                                    </span>
                                </p>
                                <Image
                                    width={40}
                                    height={40}
                                    src="/icon/google.png"
                                    alt="google"
                                    onClick={handleGoogleLogin}
                                    className="mx-auto w-10 h-10 max-lg:w-8 max-lg:h-8 cursor-pointer"
                                />
                            </div>
                        </>
                    )
                }
                {
                    auth === "verification" && (
                        !email ?
                            <>
                                <button className="text-[#2D3748] underline cursor-pointer" onClick={handleBackToSignup}>Go back to sign up</button>
                            </>
                            :
                            <div className="mx-auto w-full lg:max-w-85 flex flex-col">
                                <p className="text-center">Verify the Mail and <br />Enter the OTP shared on <span className="font-medium">{maskEmail(email)}</span></p>
                                <label className="block mt-8 mb-3 text-[#403D4E] font-medium">OTP</label>
                                <InputOTP
                                    maxLength={6}
                                    containerClassName="justify-between"
                                    value={otp}
                                    onChange={setOtp}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} className="border p-5 rounded-none shadow-none" />
                                    </InputOTPGroup>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={1} className="p-5" />
                                    </InputOTPGroup>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={2} className="p-5" />
                                    </InputOTPGroup>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} className="p-5" />
                                    </InputOTPGroup>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={4} className="p-5" />
                                    </InputOTPGroup>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={5} className="p-5" />
                                    </InputOTPGroup>
                                </InputOTP>
                                <button
                                    className={cn(
                                        "ml-auto mt-3 text-xs text-[#949CAB] hover:text-gray-600 cursor-pointer",
                                        isResendingOTP && "opacity-50 cursor-not-allowed"
                                    )}
                                    onClick={handleResendOTP}
                                    disabled={isResendingOTP}
                                >
                                    {isResendingOTP ? "Sending..." : "Resend OTP"}
                                </button>
                                <Button
                                    title={isVerifying ? "Verifying..." : "Verify & Create account"}
                                    className="mx-auto mt-8 min-w-60 py-4"
                                    onClick={handleVerificationAndCreateAccount}
                                    disabled={isVerifying || !otp || otp.length !== 6}
                                >
                                    {isVerifying ? "Verifying..." : "Verify & Create account"}
                                </Button>
                            </div>
                    )
                }
            </form>
        </Form>
    );
};

export default SignupForm;