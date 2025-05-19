import Image from "next/image";

import Input, { PasswordInput } from "../Input";
import Button from "../Button";

const LoginForm = ({
    toggleLoginSignup,
}) => {
    return (
        <form className="px-3 flex-1 flex flex-col gap-3 justify-center max-lg:text-xs text-sm text-[#848484]">
            <h1 className="text-center text-3xl font-bold text-[#484C52]">Login</h1>
            <p className="text-center">Login to continue to our website</p>
            <span className="mx-auto px-8 py-2 text-xs rounded-4xl bg-black text-white">Fields cannot be empty</span>
            <div className="mt-4 xl:mt-8 mx-auto w-full lg:max-w-85 flex flex-col gap-5">
                <Input
                    placeholder="Enter Email or Phone"
                    inputClassName="py-3 px-4 border-[#E6E6E6] text-[#2D3748] placeholder:text-[#848484]"
                />
                <PasswordInput
                    placeholder="Password"
                    inputClassName="py-3 px-4 border-[#E6E6E6] text-[#2D3748] placeholder:text-[#848484]"
                />
                <span className="ml-auto text-[#313C66] hover:underline cursor-pointer">Forgot Password?</span>
                <Button title="Login" onClick={(e) => e.preventDefault()}>Login</Button>
                <p className="text-center text-[#2D3748]">Don’t have an account? <span className="font-bold text-[#212A63] cursor-pointer" onClick={toggleLoginSignup}>Sign up</span></p>
                <Image
                    width={40}
                    height={40}
                    src="/icon/google.png"
                    alt="google"
                    className="mx-auto w-10 h-10 max-lg:w-8 max-lg:h-8 cursor-pointer"
                />
            </div>
        </form>
    )
}

export default LoginForm;