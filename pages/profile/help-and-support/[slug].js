import ProfilePagesWrapper from "@/components/common/auth/ProfilePagesWrapper";
import HelpAndSupportForm from "@/components/Profile/HelpAndSupportPage/HelpAndSupportForm";

const HelpAndSupportDetails = () => {
    return (
        <ProfilePagesWrapper>
            <div className="px-[8%] max-lg:px-0 py-8 w-full max-w-300 flex flex-col gap-10 items-center">
                <p className="poppins-font text-2xl md:text-4xl lg:text-5xl text-center font-medium leading-16">Love to hear from you, <br />Get in touch 👋</p>
                <HelpAndSupportForm />
            </div>
        </ProfilePagesWrapper>
    )
}

export default HelpAndSupportDetails;