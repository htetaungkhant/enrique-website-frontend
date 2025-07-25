import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Footer from "@/components/common/Footer";
import UPSection from "@/components/common/UniformPaddingSection";
import PageHeader from "@/components/common/PageHeader";
import YouTubeBanner from "@/components/common/YouTubeBanner";
import { getCourseDetailsByTitle, getCoursesByUser } from "@/lib/inhouseAPI/course-route";
import { useUserAuth } from "@/hooks/userAuth";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import CheckoutForm from "@/components/CourseOfferingsPage/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export async function getServerSideProps(context) {
    try {
        const { courseTitle } = context.params;
        const course = await getCourseDetailsByTitle({ ...context.req, body: { title: courseTitle } });
        const coursesByUser = await getCoursesByUser(context.req);
        const isAlreadyEnrolled = coursesByUser?.some(c => c?.id === course?.id);

        if (!course) {
            return {
                notFound: true
            };
        }

        return {
            props: {
                course,
                isAlreadyEnrolled: isAlreadyEnrolled ? true : false,
            }
        };
    } catch (error) {
        console.error("Error fetching course details:", error);
        return {
            notFound: true
        };
    }
}

const CourseDetails = ({ course, isAlreadyEnrolled }) => {
    const router = useRouter();
    const { session } = useUserAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);

    useEffect(() => {
        const handleStripeCallback = async () => {
            if (!stripePromise || !router.isReady) {
                return;
            }

            const clientSecret = new URLSearchParams(window.location.search).get(
                "payment_intent_client_secret"
            );

            if (!clientSecret) {
                return;
            }

            const stripe = await stripePromise;
            const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

            router.replace(`/course-offerings/${router.query.courseId}`, undefined, { shallow: true });

            switch (paymentIntent.status) {
                case "succeeded":
                    toast.success("Payment succeeded!");
                    await onSuccessfulCheckout(paymentIntent);
                    break;
                case "processing":
                    toast.info("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    toast.error("Your payment was not successful, please try again.");
                    break;
                default:
                    toast.error("Something went wrong.");
                    break;
            }
        };

        handleStripeCallback();
    }, [router.isReady, stripePromise]);

    const handlePurchaseNow = async () => {
        if (!session || session.validationFailed) {
            sessionStorage.setItem("restartCeremonyCheckout", "true");
            router.push({
                pathname: router.pathname,
                query: { ...router.query, auth: "login" }
            });
            return;
        }
        else if (isAlreadyEnrolled) {
            alert("You are already enrolled in this course.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/stripe-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ courseId: course.id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create payment intent');
            }

            const data = await response.json();
            if (!data.sessionId?.client_secret) {
                throw new Error("Client secret not found in response.");
            }
            setClientSecret(data.sessionId.client_secret);
            setShowCheckoutModal(true);
        }
        catch (error) {
            console.error("Error creating payment intent:", error);
            toast.error(error.message || "Failed to proceed to checkout. Please try again.");
        }
        finally {
            setIsLoading(false);
            sessionStorage.removeItem("restartCeremonyCheckout");
        }
    }

    useEffect(() => {
        const restartCeremonyCheckout = sessionStorage.getItem("restartCeremonyCheckout");
        if (session && !session.validationFailed && restartCeremonyCheckout === "true") {
            sessionStorage.removeItem("restartCeremonyCheckout");
            sessionStorage.removeItem("justLoggedIn");
            handlePurchaseNow();
        }
    }, [session]);

    const onSuccessfulCheckout = async (paymentIntent) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/register-course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: course.id, orderId: paymentIntent.id, stripeMetadata: paymentIntent }),
            });

            if (!response.ok) {
                throw new Error('Failed to register for the course');
            }

            const data = await response.json();
            toast.success(data.message || "Course registered successfully!");
            setShowCheckoutModal(false);
            setClientSecret(null);
            router.replace(router.asPath);
        }
        catch (error) {
            console.error("Error registering for course:", error);
            toast.error("Failed to register for the course. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="relative min-h-screen flex flex-col justify-between">
            <PageHeader />
            <UPSection className="inter-font text-white pt-24 lg:pt-36">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[65%_30%] justify-between">
                    <div className="flex flex-col gap-10">
                        <h2 className="font-black text-5xl">{course.title}</h2>
                        <div>
                            <div className="pt-3 flex flex-wrap gap-6 lg:gap-10">
                                <div className="flex items-center gap-3 font-medium">
                                    <Image src={course.createdBy?.image?.image} width={100} height={100} alt="avator" className="w-12 h-12 lg:w-16 lg:h-16 rounded-full" />
                                    <span className="text-lg">{course.createdBy?.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold text-lg">Session Overview</h3>
                            <p>{course.sessionOverview}</p>
                        </div>
                        {
                            Array.isArray(course.extraDetails) && course.extraDetails?.length > 0 && (
                                course.extraDetails?.map((extra, index) => (
                                    <div key={`${extra.title}-${index}`} className="flex flex-col gap-2">
                                        <h3 className="font-bold text-lg">{extra.title}</h3>
                                        {
                                            Array.isArray(extra.points) && extra.points?.length > 0 && (
                                                <ul className="list-disc pl-3">
                                                    {
                                                        extra.points?.map((point, index) => (
                                                            <li key={`${point}-${index}`}>{point}</li>
                                                        ))
                                                    }
                                                </ul>
                                            )
                                        }
                                    </div>
                                ))
                            )
                        }
                        {
                            !session || session?.validationFailed || !isAlreadyEnrolled ?
                                <YouTubeBanner noLink />
                                : Array.isArray(course.classes) && course.classes?.length > 0 ? (
                                    course.classes?.map((video, index) => (
                                        <div key={`${video.id}-${index}`} className="flex flex-col gap-2">
                                            <h3 className="font-bold text-lg">{video.title}</h3>
                                            {
                                                Array.isArray(video.points) && video.points?.length > 0 && (
                                                    <ul className="list-disc pl-3">
                                                        {
                                                            video.points?.map((point, index) => (
                                                                <li key={`${point}-${index}`}>{point}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                            {
                                                video.videoUrl?.video && <YouTubeBanner href={video.videoUrl?.video} />
                                            }
                                        </div>
                                    ))
                                ) :
                                    <p>Class videos are coming soon...</p>
                        }
                    </div>
                    <div className="max-lg:w-[calc(100%-120px)] fixed max-lg:left-5 max-lg:bottom-6 lg:top-36 lg:right-20 lg:min-w-68 lg:max-xl:max-w-72 z-10 lg:max-xl:max-w-72 fixed lg:top-36 lg:right-20">
                        {
                            !isAlreadyEnrolled ? (
                                <div className="p-3 sm:p-4 rounded-xl bg-white text-[#032F1F] flex flex-col gap-3">
                                    <div className="font-bold flex justify-between gap-2 text-[10px] min-[375px]:text-xs md:text-sm lg:text-base">
                                        <span>Course Fee</span>
                                        <span>€ {parseFloat(course.price)?.toFixed(2)}</span>
                                    </div>
                                    <button disabled={isLoading} onClick={handlePurchaseNow} className="p-3 inter-font font-bold text-xs sm:text-sm text-white rounded-lg sm:rounded-4xl bg-[#212A63] cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400">
                                        {isLoading ? 'Processing...' : (!session || session.validationFailed) ? 'Register Now' : "Start Registration"}
                                    </button>
                                </div>
                            )
                                : (
                                    <div className="p-3 sm:p-4 rounded-xl bg-white text-[#032F1F] flex flex-col gap-3">
                                        <div className="font-bold text-[10px] min-[375px]:text-xs md:text-sm lg:text-base">You are already enrolled in this course.</div>
                                        <button onClick={() => router.push('/course-offerings')} className="p-3 inter-font font-bold text-xs sm:text-sm text-white rounded-lg sm:rounded-4xl bg-[#212A63] cursor-pointer">
                                            View All Courses
                                        </button>
                                    </div>
                                )
                        }
                    </div>
                    {/* <div className="max-lg:hidden max-lg:w-full max-lg:max-w-9/10 max-lg:translate-x-[-50%] max-lg:left-1/2 max-lg:top-24 fixed top-36 lg:right-20 lg:min-w-68 max-xl:max-w-72 z-10">
                        {
                            !isAlreadyEnrolled ? (
                                <div className="p-4 rounded-xl bg-white text-[#032F1F] flex flex-col gap-3">
                                    <div className="font-bold flex justify-between gap-2">
                                        <span>Course Fee</span>
                                        <span>€ {parseFloat(course.price)?.toFixed(2)}</span>
                                    </div>
                                    <button disabled={isLoading} onClick={handlePurchaseNow} className="p-3 inter-font font-bold text-sm text-white rounded-4xl bg-[#212A63] cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400">
                                        {isLoading ? 'Processing...' : (!session || session.validationFailed) ? 'Register Now' : "Start Registration"}
                                    </button>
                                </div>
                            )
                                : (
                                    <div className="p-4 rounded-xl bg-white text-[#032F1F] flex flex-col gap-3">
                                        <div className="font-bold">You are already enrolled in this course.</div>
                                        <button onClick={() => router.push('/course-offerings')} className="p-3 inter-font font-bold text-sm text-white rounded-4xl bg-[#212A63] cursor-pointer">
                                            View All Courses
                                        </button>
                                    </div>
                                )
                        }
                    </div> */}
                    {/* <div className="lg:hidden max-lg:w-[calc(100%-120px)] fixed max-lg:left-5 max-lg:bottom-6 lg:top-36 lg:right-20 lg:min-w-68 lg:max-xl:max-w-72 z-10">
                        {
                            !isAlreadyEnrolled ? (
                                <button disabled={isLoading} onClick={handlePurchaseNow} className="uppercase w-full text-black bg-gray-100 hover:bg-[#212A63] hover:text-white p-3 inter-font font-bold text-sm rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 transition-all duration-300 ease-in-out">
                                    {isLoading ? 'Processing...' : (!session || session.validationFailed) ? 'Register Now' : "Start Registration"}
                                </button>
                            )
                                : (
                                    <button onClick={() => router.push('/course-offerings')} className="uppercase w-full text-black bg-gray-100 hover:bg-[#212A63] hover:text-white p-3 inter-font font-bold text-sm rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 transition-all duration-300 ease-in-out">
                                        View All Courses
                                    </button>
                                )
                        }
                    </div> */}
                </div>
            </UPSection>
            <Footer className="mt-10" />
            {clientSecret && showCheckoutModal && (
                <Dialog open={showCheckoutModal} onOpenChange={(open) => {
                    if (!open) {
                        setShowCheckoutModal(false);
                        setClientSecret(null);
                    }
                }}>
                    <DialogContent onPointerDownOutside={(e) => e.preventDefault()} className="bg-transparent border-none p-0 w-full max-w-lg z-110">
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <CheckoutForm
                                course={course}
                                onCancel={() => {
                                    setShowCheckoutModal(false);
                                    setClientSecret(null);
                                }}
                            />
                        </Elements>
                    </DialogContent>
                </Dialog>
            )}
        </main>
    )
}

export default CourseDetails;