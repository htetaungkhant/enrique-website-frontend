import { useState } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Link from "next/link";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Input, { PasswordInput } from "../Input";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Dropdown from "../Dropdown";
import Datepicker from "../Datepicker";

const SignupForm = ({
    toggleLoginSignup,
}) => {
    const router = useRouter();
    const { query: { auth, email } } = router;

    const [date, setDate] = useState(null);
    const [gender, setGender] = useState();
    const [rememberMe, setRememberMe] = useState(false);
    const [agreeTandP, setAgreeTandP] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);

    const onSignup = (e) => {
        e.preventDefault();

        // check validation and submit to api

        // if api return success
        setApiSuccess(true);
        const query = { ...router.query, auth: "verification", email: "email@test.com" };
        router.push({
            pathname: router.pathname,
            query: query,
        });
    }

    const handleBackToSignup = (e) => {
        e.preventDefault();
        setApiSuccess(false);
        const query = { ...router.query, auth: "signup" };
        delete query.email;
        router.replace({
            pathname: router.pathname,
            query: query,
        });
    }

    const handleResendOTP = (e) => {
        e.preventDefault();
    }

    const handleVerificationAndCreateAccount = (e) => {
        e.preventDefault();
    }

    return (
        <form className="px-3 flex-1 flex flex-col gap-3 justify-center max-lg:text-xs text-sm text-[#2D3748]">
            <h1 className="text-center text-3xl font-bold text-[#484C52]">Sign Up</h1>
            {
                auth === "signup" && (
                    <>
                        <span className="mx-auto px-8 py-2 text-xs rounded-4xl bg-black text-white">Fields cannot be empty</span>
                        <div className="mt-4 xl:mt-8 mx-auto w-full flex flex-col gap-2 lg:gap-3 xl:gap-5">
                            <div className="flex gap-2 lg:gap-3 xl:gap-5 flex-wrap">
                                <Input
                                    label="First Name"
                                    placeholder="Enter First Name"
                                    className="flex-1 min-w-37"
                                    labelClassName="text-sm"
                                    inputClassName="border-[#E6E6E6] text-[#2D3748] placeholder:text-[#848484]"
                                />
                                <Input
                                    label="Last Name"
                                    placeholder="Enter Last Name"
                                    className="flex-1 min-w-37"
                                    labelClassName="text-sm"
                                    inputClassName="border-[#E6E6E6] text-[#2D3748] placeholder:text-[#848484]"
                                />
                            </div>
                            <div className="flex gap-2 lg:gap-3 xl:gap-5 flex-wrap">
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="Enter Email ID"
                                    className="flex-1 min-w-37"
                                    labelClassName="text-sm"
                                    inputClassName="border-[#E6E6E6] text-[#2D3748] placeholder:text-[#848484]"
                                />
                                <Input
                                    label="Phone number"
                                    type="tel"
                                    placeholder="Enter Phone number"
                                    className="flex-1 min-w-37"
                                    labelClassName="text-sm"
                                    inputClassName="border-[#E6E6E6] text-[#2D3748] placeholder:text-[#848484]"
                                />
                            </div>
                            <div className="flex gap-2 lg:gap-3 xl:gap-5 flex-wrap">
                                <PasswordInput
                                    label="Password"
                                    placeholder="Enter password"
                                    className="flex-1 min-w-37"
                                    labelClassName="text-sm"
                                    inputClassName="border-[#E6E6E6] text-[#2D3748] placeholder:text-[#848484]"
                                />
                                <PasswordInput
                                    label="Confirm password"
                                    placeholder="Confirm password"
                                    className="flex-1 min-w-37"
                                    labelClassName="text-sm"
                                    inputClassName="border-[#E6E6E6] text-[#2D3748] placeholder:text-[#848484]"
                                />
                            </div>
                            <div className="flex gap-2 lg:gap-3 xl:gap-5 flex-wrap">
                                <Datepicker
                                    label="Date of Birth"
                                    placeholder="Date of Birth"
                                    value={date}
                                    onChange={setDate}
                                    labelClassName="text-sm"
                                    className="flex-1 min-w-37"
                                />
                                <Dropdown
                                    label="Gender"
                                    options={[
                                        { label: "Male", value: "male" },
                                        { label: "Female", value: "female" },
                                        { label: "Others", value: "others" },
                                    ]}
                                    value={gender}
                                    onChange={setGender}
                                    labelClassName="text-sm"
                                    className="flex-1 min-w-37"
                                />
                            </div>
                            <div className="flex flex-col gap-2 lg:gap-3 py-2 lg:py-4">
                                <Checkbox
                                    label="Remember me"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                    className="w-fit"
                                />
                                <Checkbox
                                    label={<>I agree to all the <Link href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[#212A63]">Terms</Link> and <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#212A63]">Privacy policy</Link></>}
                                    checked={agreeTandP}
                                    onChange={() => setAgreeTandP(!agreeTandP)}
                                    className="w-fit"
                                />
                            </div>
                            <Button
                                title="Sign Up"
                                onClick={onSignup}
                                className="sm:w-[50%] sm:max-w-60 sm:mx-auto sm:py-4 sm:rounded-3xl"
                            >
                                Sign Up
                            </Button>
                            <p className="text-center text-[#2D3748]">Already have an account? <span className="font-bold text-[#212A63] cursor-pointer" onClick={toggleLoginSignup}>Log In</span></p>
                            <Image
                                width={40}
                                height={40}
                                src="/icon/google.png"
                                alt="google"
                                className="mx-auto w-10 h-10 max-lg:w-8 max-lg:h-8 cursor-pointer"
                            />
                        </div>
                    </>
                )
            }
            {
                auth === "verification" && (
                    (!apiSuccess || !email) ?
                        <>
                            <button className="text-[#2D3748] underline cursor-pointer" onClick={handleBackToSignup}>Go back to sign up</button>
                        </>
                        :
                        <div className="mx-auto w-full lg:max-w-85 flex flex-col">
                            <p className="text-center">Verify the Mail and <br />Enter the OTP shared on <span>{email}</span></p>
                            <label className="block mt-8 mb-3 text-[#403D4E] font-medium">OTP</label>
                            <InputOTP maxLength={6} containerClassName="justify-between">
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
                            <button className="ml-auto mt-3 text-xs text-[#949CAB] hover:text-gray-600 cursor-pointer" onClick={handleResendOTP}>Resend OTP</button>
                            <Button className="mx-auto mt-8 min-w-60" onClick={handleVerificationAndCreateAccount}>Verify & Create account</Button>
                        </div>
                )
            }
        </form>
    )
}

export default SignupForm;