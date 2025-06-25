import { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdCloseCircle } from "react-icons/io";
import { useUserAuth } from "@/hooks/userAuth";
import NewsLetterForm from "./NewsLetterForm";

const Advertisement = () => {
    const { session, isUser } = useUserAuth();
    const [showAdvertisement, setShowAdvertisement] = useState("");

    const handleAfterSubmissionSuccess = () => {
        // Store in sessionStorage that user has submitted the form
        sessionStorage.setItem('hasSubmittedNewsletter', 'true');
        setShowAdvertisement("");
    }

    useEffect(() => {
        let timer;

        // Check if user has already submitted the form in this session
        const hasSubmitted = sessionStorage.getItem('hasSubmittedNewsletter') === 'true';

        // Only start the timer if we're not showing any advertisement and hasn't submitted
        const startTimer = () => {
            if (!showAdvertisement && !hasSubmitted) {
                timer = setInterval(() => {
                    setShowAdvertisement("intro");
                }, 300000); // Show every 5 minute (300000ms)
            }
        };

        startTimer();

        // Cleanup function to clear the interval
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [showAdvertisement]); // Dependency on showAdvertisement to restart timer when ad is closed

    // Don't show if user is logged in or has already submitted the form
    if (session && isUser) return null;
    if (sessionStorage.getItem('hasSubmittedNewsletter') === 'true') return null;

    return (
        <>
            {/* Overlay */}
            {showAdvertisement && (<div className="fixed z-1000 inset-0 bg-black opacity-20"></div>)}
            {
                showAdvertisement === "intro" && (
                    <div className="lg:max-h-100 max-md:w-full max-w-[300px] md:max-w-180 xl:max-w-120 flex z-1000 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#CDFFD8] to-[#94B9FF] overflow-hidden rounded-xl shadow">

                        {/* Close Button */}
                        <IoMdCloseCircle size={24} onClick={() => setShowAdvertisement("")} className="absolute top-2 right-2 z-50 text-gray-200 hover:text-gray-50 cursor-pointer transition" />

                        <div className="p-4 lg:px-8 lg:py-10 md:w-1/2 flex flex-col justify-center gap-3 lg:gap-6">
                            <h2 className="text-[#212A63] font-black text-xl lg:text-2xl">Is Your Soul Prepared for the Journey?</h2>
                            <p className="lg:text-lg font-semibold">Discover your spiritual readiness for a psychedelic retreat with this quick self-assessment.</p>
                            <Image
                                width={259}
                                height={56}
                                src="/icon/discover-now-btn.png"
                                alt="discover-now"
                                className="cursor-pointer rounded-4xl hover:shadow-2xl"
                                onClick={() => setShowAdvertisement("newsletter-form")}
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
                                src="/image/17.png"
                                alt="advertistment"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                )
            }
            {
                showAdvertisement === "newsletter-form" && (
                    <div className="max-md:w-[90%] max-xl:w-[75%] xl:w-[60%] max-w-230 z-1000 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-visible rounded-xl shadow">
                        {/* Close Button */}
                        <IoMdCloseCircle size={24} onClick={() => setShowAdvertisement("")} className="absolute top-2 right-2 z-50 text-gray-200 hover:text-gray-50 cursor-pointer transition" />
                        <NewsLetterForm onSubmissionSuccess={handleAfterSubmissionSuccess} />
                    </div>
                )
            }
        </>
    );
};

export default Advertisement;