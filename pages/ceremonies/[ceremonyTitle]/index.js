import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoCalendarClear } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { format } from "date-fns";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Footer from "@/components/common/Footer";
import UPSection from "@/components/common/UniformPaddingSection";
import PageHeader from "@/components/common/PageHeader";
import ceremonyRoute from "@/lib/inhouseAPI/ceremony-route";
import { useUserAuth } from "@/hooks/userAuth";
import CheckoutForm from "@/components/CeremoniesPage/CheckoutForm";
import Discount from "@/components/common/Discount";
import GuestCheckoutForm from "@/components/common/GuestCheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export async function getServerSideProps(context) {
  try {
    const { ceremonyTitle } = context.params;
    const ceremony = await ceremonyRoute.getCeremonyDetailsByTitle({
      ...context.req,
      body: { title: ceremonyTitle },
    });
    if (!ceremony) {
      return {
        notFound: true,
      };
    }

    if (ceremony.location) {
      try {
        const location = JSON.parse(ceremony.location);
        ceremony.locationCountry = location.country || "";
        ceremony.locationAddress = location.address || "";
      } catch (error) {
        ceremony.locationCountry = ceremony.location || "";
      }
    } else {
      ceremony.locationCountry = "";
      ceremony.locationAddress = "";
    }

    // if (ceremony.startDate && ceremony.endDate) {
    //     try {
    //         ceremony.fromDate = format(new Date(ceremony.startDate), "dd MMM yyyy");
    //         ceremony.fromTime = format(new Date(ceremony.startDate), "hh:mm a");
    //         ceremony.toDate = format(new Date(ceremony.endDate), "dd MMM yyyy");
    //         ceremony.toTime = format(new Date(ceremony.endDate), "hh:mm a");
    //     } catch (error) {
    //         console.error("Error formatting time:", error);
    //         ceremony.fromDate = "";
    //         ceremony.fromTime = "";
    //         ceremony.toDate = "";
    //         ceremony.toTime = "";
    //     }
    // }
    // else {
    //     ceremony.fromDate = "";
    //     ceremony.fromTime = "";
    //     ceremony.toDate = "";
    //     ceremony.toTime = "";
    // }

    try {
      const ceremoniesResponse =
        await ceremonyRoute.getRegisteredCeremoniesByUser(context.req);
      const isAlreadyEnrolled = ceremoniesResponse?.ceremonies?.some(
        (ceremony) => ceremony.id === ceremonyId
      );
      return {
        props: {
          ceremony,
          isAlreadyEnrolled: isAlreadyEnrolled ? true : false,
        },
      };
    } catch (error) {
      console.error("Error fetching registered ceremonies:", error);
      return {
        props: {
          ceremony,
          isAlreadyEnrolled: false,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching ceremony details:", error);
    return {
      notFound: true,
    };
  }
}

const CeremonyDetails = ({ ceremony, isAlreadyEnrolled }) => {
  if (!ceremony) {
    return null;
  }

  const router = useRouter();
  const { session } = useUserAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [stripeMetaFromAPI, setStripeMetaFromAPI] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [getDiscount, setGetDiscount] = useState(false);
  const [displayGuestModal, setDisplayGuestModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleRegisterNow = async () => {
    setIsLoading(true);
    try {
      const body = { ceremonyId: ceremony.id };
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
      setStripeMetaFromAPI(data?.sessionId);
      setGuestId(data?.guestId || null);
      setShowCheckoutModal(true);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      toast.error(
        error.message || "Failed to proceed to checkout. Please try again."
      );
    } finally {
      setIsLoading(false);
      sessionStorage.removeItem("restartCourseCheckout");
    }
  };

  const handleAfterGuestSubmission = (data) => {
    setStripeMetaFromAPI(data?.sessionId);
    setGuestId(data?.guestId || null);

    const query = { ...router.query };
    delete query.checkout;
    router.replace({
      pathname: router.pathname,
      query: query,
    });

    setShowCheckoutModal(true);
  };

  const onClickRegister = async () => {
    if (!session || session.validationFailed) {
      sessionStorage.setItem("restartCourseCheckout", "true");
      router.push({
        pathname: router.pathname,
        query: { ...router.query, auth: "login", checkout: "guest" },
      });
      return;
    } else if (isAlreadyEnrolled) {
      alert("You are already enrolled in this ceremony.");
      return;
    }

    await handleRegisterNow();
  };

  const onSuccessfulCheckout = async (paymentIntent) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/register-ceremony", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guestId,
          id: ceremony.id,
          orderId: paymentIntent.id,
          stripeMetadata: paymentIntent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register for the ceremony");
      }

      const data = await response.json();
      toast.success(data.message || "Ceremony registered successfully!");
      setShowCheckoutModal(false);
      setStripeMetaFromAPI(null);
      setGuestId(null);
      router.replace(router.asPath);
    } catch (error) {
      console.error("Error registering for ceremony:", error);
      toast.error("Failed to register for the ceremony. Please try again.");
    } finally {
      setIsLoading(false);
      setStripeMetaFromAPI(null);
      setGuestId(null);
    }
  };

  useEffect(() => {
    const handleStripeCallback = async () => {
      if (!stripePromise || !router.isReady) {
        return;
      }

      const clientSecretFromURL = new URLSearchParams(
        window.location.search
      ).get("payment_intent_client_secret");

      if (!clientSecretFromURL) {
        return;
      }

      const stripe = await stripePromise;
      const { paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecretFromURL
      );

      router.replace(`/ceremonies/${router.query.ceremonyId}`, undefined, {
        shallow: true,
      });

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

  useEffect(() => {
    const restartCourseCheckout = sessionStorage.getItem(
      "restartCourseCheckout"
    );

    if (router.query.checkout === "guest-ceremony" && !session) {
      sessionStorage.removeItem("restartCourseCheckout");

      setDisplayGuestModal(true);
    }

    if (
      session &&
      !session.validationFailed &&
      restartCourseCheckout === "true"
    ) {
      sessionStorage.removeItem("restartCourseCheckout");
      sessionStorage.removeItem("justLoggedIn");
      handleRegisterNow();
    }
  }, [router.query]);

  return (
    <>
      <Discount
        discountUsers={ceremony.discountUsers}
        onSubmissionSuccess={() => setGetDiscount(true)}
      />

      <GuestCheckoutForm
        ceremony={ceremony}
        onSubmissionSuccess={handleAfterGuestSubmission}
        open={displayGuestModal}
        onOpenChange={setDisplayGuestModal}
      />

      <main className="relative min-h-screen flex flex-col justify-between">
        <PageHeader />
        <UPSection className="inter-font text-white pt-24 lg:pt-36">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[65%_30%] justify-between">
            <div className="flex flex-col gap-10">
              <h2 className="font-black text-5xl">{ceremony.title}</h2>
              {Array.isArray(ceremony.hosts) && ceremony.hosts?.length > 0 && (
                <div>
                  <p className="font-semibold">Hosts:</p>
                  <div className="pt-3 flex flex-wrap gap-6 lg:gap-10">
                    {ceremony.hosts?.map((host, index) => (
                      <div
                        key={`${host.title}-${index}`}
                        className="flex items-center gap-3 font-medium"
                      >
                        {host.image?.image && (
                          <Image
                            src={host.image?.image}
                            width={100}
                            height={100}
                            alt="avator"
                            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full"
                          />
                        )}
                        {host.title && (
                          <span className="text-lg">{host.title}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-lg">
                {ceremony.locationAddress && (
                  <div className="flex gap-3 items-center">
                    <FaLocationDot className="text-[#5AED4A] bg-[#5AED4A59] p-1 rounded-full w-5 h-5" />
                    <p>{ceremony.locationAddress}</p>
                  </div>
                )}
                {ceremony.locationCountry && (
                  <div className="flex gap-3 items-center">
                    <FaLocationDot className="text-[#5AED4A] bg-[#5AED4A59] p-1 rounded-full w-5 h-5" />
                    <p>{ceremony.locationCountry}</p>
                  </div>
                )}
                {ceremony.startDate && ceremony.endDate && (
                  <>
                    <div className="flex gap-3 items-center">
                      <IoCalendarClear className="text-[#5AED4A] bg-[#5AED4A59] p-1 rounded-full w-5 h-5" />
                      <p>
                        From{" "}
                        {format(new Date(ceremony.startDate), "dd MMM yyyy")} to{" "}
                        {format(new Date(ceremony.endDate), "dd MMM yyyy")}
                      </p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <MdOutlineAccessTimeFilled className="text-[#5AED4A] bg-[#5AED4A59] p-1 rounded-full w-5 h-5" />
                      <p>
                        {format(new Date(ceremony.startDate), "hh:mm a")} -{" "}
                        {format(new Date(ceremony.endDate), "hh:mm a")}
                      </p>
                    </div>
                  </>
                )}
              </div>
              {ceremony.sessionOverview && (
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-lg">Session Overview</h3>
                  <p>{ceremony.sessionOverview}</p>
                </div>
              )}
              {Array.isArray(ceremony.extraDetails) &&
                ceremony.extraDetails?.length > 0 &&
                ceremony.extraDetails?.map((extra, index) => (
                  <div
                    key={`${extra.title}-${index}`}
                    className="flex flex-col gap-2"
                  >
                    <h3 className="font-bold text-lg">{extra.title}</h3>
                    {Array.isArray(extra.points) &&
                      extra.points?.length > 0 && (
                        <ul className="list-disc pl-3">
                          {extra.points?.map((point, index) => (
                            <li key={`${point}-${index}`}>{point}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                ))}
            </div>
            <div className="max-lg:w-[calc(100%-120px)] fixed max-lg:left-5 max-lg:bottom-6 lg:top-36 lg:right-20 lg:min-w-68 lg:max-xl:max-w-72 z-10">
              {!isAlreadyEnrolled ? (
                <div className="p-3 sm:p-4 rounded-xl bg-white text-[#032F1F] flex flex-col gap-3">
                  <div className="font-bold flex justify-between gap-2 text-[10px] min-[375px]:text-xs md:text-sm lg:text-base">
                    <span>Ceremony Deposit Fee</span>
                    <span className="whitespace-nowrap">
                      €{" "}
                      {(stripeMetaFromAPI?.amount &&
                        (stripeMetaFromAPI?.amount / 100).toFixed(2)) ||
                        (getDiscount
                          ? parseFloat(
                              ceremony.price -
                                ceremony.price *
                                  (ceremony.discountPercent / 100)
                            )?.toFixed(2)
                          : parseFloat(ceremony.price)?.toFixed(2))}
                    </span>
                  </div>
                  <button
                    disabled={isLoading}
                    onClick={onClickRegister}
                    className="p-3 inter-font font-bold text-xs sm:text-sm text-white rounded-lg sm:rounded-4xl bg-[#212A63] cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {isLoading
                      ? "Processing..."
                      : getDiscount
                      ? "Pay Now"
                      : !session || session.validationFailed
                      ? "Register Now"
                      : "Start Registration"}
                  </button>
                </div>
              ) : (
                <div className="p-3 sm:p-4 rounded-xl bg-white text-[#032F1F] flex flex-col gap-3">
                  <div className="font-bold text-[10px] min-[375px]:text-xs md:text-sm lg:text-base">
                    You are already enrolled in this ceremony.
                  </div>
                  <button
                    onClick={() => router.push("/ceremonies")}
                    className="p-3 inter-font font-bold text-xs sm:text-sm text-white rounded-lg sm:rounded-4xl bg-[#212A63] cursor-pointer"
                  >
                    View All Ceremonies
                  </button>
                </div>
              )}
            </div>
            {/* <div className="max-lg:hidden max-lg:w-full max-lg:max-w-9/10 max-lg:translate-x-[-50%] max-lg:left-1/2 max-lg:top-24 max-xl:max-w-72 fixed top-36 lg:right-20">
                        {
                            !isAlreadyEnrolled ? (
                                <div className="p-4 rounded-xl bg-white text-[#032F1F] flex flex-col gap-3">
                                    <div className="font-bold flex justify-between gap-2">
                                        <span>Ceremony Deposit Fee</span>
                                        <span className="whitespace-nowrap">€ {parseFloat(ceremony.price)?.toFixed(2)}</span>
                                    </div>
                                    <button disabled={isLoading} onClick={handleRegisterNow} className="p-3 inter-font font-bold text-sm text-white rounded-4xl bg-[#212A63] cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400">
                                        {isLoading ? 'Processing...' : (!session || session.validationFailed) ? 'Register Now' : "Start Registration"}
                                    </button>
                                </div>
                            )
                                : (
                                    <div className="p-4 rounded-xl bg-white text-[#032F1F] flex flex-col gap-3">
                                        <div className="font-bold">You are already enrolled in this ceremony.</div>
                                        <button onClick={() => router.push('/ceremonies')} className="p-3 inter-font font-bold text-sm text-white rounded-4xl bg-[#212A63] cursor-pointer">
                                            View All Ceremonies
                                        </button>
                                    </div>
                                )
                        }
                    </div> */}
            {/* <div className="lg:hidden max-lg:w-[calc(100%-120px)] fixed max-lg:left-5 max-lg:bottom-6 lg:top-36 lg:right-20 lg:min-w-68 lg:max-xl:max-w-72 z-10">
                        {
                            !isAlreadyEnrolled ? (
                                <button disabled={isLoading} onClick={handleRegisterNow} className="uppercase w-full text-black bg-gray-100 hover:bg-[#212A63] hover:text-white p-3 inter-font font-bold text-sm rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 transition-all duration-300 ease-in-out">
                                    {isLoading ? 'Processing...' : (!session || session.validationFailed) ? 'Register Now' : "Start Registration"}
                                </button>
                            )
                                : (
                                    <button onClick={() => router.push('/ceremonies')} className="uppercase w-full text-black bg-gray-100 hover:bg-[#212A63] hover:text-white p-3 inter-font font-bold text-sm rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400 transition-all duration-300 ease-in-out">
                                        View All Ceremonies
                                    </button>
                                )
                        }
                    </div> */}
          </div>
          {Array.isArray(ceremony.gallery) && ceremony.gallery?.length > 0 && (
            <div className="max-w-400 mx-auto mt-5 md:mt-10 flex flex-col items-center gap-4 md:gap-8">
              <h3 className="font-bold text-xl md:text-2xl xl:text-4xl">
                Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 xl:gap-8">
                {ceremony.gallery
                  .slice(0, viewAll ? ceremony.gallery.length : 6)
                  .map((image, index) => (
                    <Image
                      key={`${image.id}-${index}`}
                      src={image.image}
                      width={300}
                      height={200}
                      alt={`Gallery Image ${index + 1}`}
                      className="w-full h-80 md:h-90 lg:h-100 xl:h-120 rounded-lg object-cover"
                    />
                  ))}
              </div>
              {ceremony.gallery.length > 6 && (
                <button
                  onClick={() => setViewAll(!viewAll)}
                  className="mt-2 md:mt-4 px-6 py-2 border border-white text-white font-medium rounded-xl cursor-pointer hover:bg-white hover:text-[#032F1F] transition-colors duration-300"
                >
                  {viewAll ? "View Less" : "View All"}
                </button>
              )}
            </div>
          )}
        </UPSection>
        <Footer className="mt-10" />
        {stripeMetaFromAPI && showCheckoutModal && (
          <Dialog
            open={showCheckoutModal}
            onOpenChange={(open) => {
              if (!open) {
                setShowCheckoutModal(false);
                setStripeMetaFromAPI(null);
                setGuestId(null);
              }
            }}
          >
            <DialogContent
              onPointerDownOutside={(e) => e.preventDefault()}
              className="bg-transparent border-none p-0 w-full max-w-lg z-110"
            >
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: stripeMetaFromAPI?.amount,
                  currency: stripeMetaFromAPI?.currency,
                }}
              >
                <CheckoutForm
                  ceremony={ceremony}
                  getDiscount={getDiscount}
                  stripeMetaFromAPI={stripeMetaFromAPI}
                  onCancel={() => {
                    setShowCheckoutModal(false);
                    setStripeMetaFromAPI(null);
                    setGuestId(null);
                  }}
                />
              </Elements>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </>
  );
};

CeremonyDetails.isCeremonyRoute = true;

export default CeremonyDetails;
