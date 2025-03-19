import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "../common/Button";
import { useRouter } from "next/router";

const slides = [
	{
		bgImage: "/banner.png",
		text: "Safe and Comfortable",
		description:
			"Let us help you transform your space into a haven of safety and comfort.",
		button: "Learn More",
        logo: "/banner-logo.png",
        link: "/",
	},
	{
		bgImage: "/banner.png",
		text: "Expert Guidance and Healers",
		description: "Discover our transformative healing therapies and expert guidance from seasoned practitioners.",
		button: "Learn More",
        logo: "/banner-logo.png",
        link: "/",
	},
	{
		bgImage: "/banner.png",
		text: "Small Groups, Big Transformation",
		description: "Unlock a transformative journey through the power of intimate, supportive small groups.",
		button: "Learn More",
        logo: "/banner-logo.png",
        link: "/",
    },
    {
		bgImage: "/banner.png",
		text: "VIP Destination Flight Services",
		description: "Experience a private, luxury healing retreat tailored to your unique spiritual journey.",
		button: "Learn More",
        logo: "/banner-logo.png",
        link: "/",
	},
];

const Banner = () => {
	const router = useRouter();
	return (
		<Swiper
			modules={[Navigation, Pagination, Autoplay]}
			spaceBetween={0}
			slidesPerView={1}
			pagination={{ clickable: true }}
			autoplay={{ delay: 5000 }}
			className="w-full h-[100vh] "
		>
			{slides.map((slide, index) => (
				<SwiperSlide key={index} className="">
					<div
						className="relative w-full h-full flex flex-col items-center justify-center text-white p-10"
						style={{
							backgroundImage: `url(${slide.bgImage})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						{/* Overlay */}
						<div className="absolute inset-0 bg-black opacity-55"></div>

						{/* Content Container */}
						<div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-12 gap-8 justify-between ">
							<div className="relative text-center flex flex-col lg:items-start  items-center justify-center lg:pl-12">
								<h2 className="lg:text-4xl text-2xl font-bold mb-4 poppins-bold lg:text-left lg:max-w-lg">
									{slide.text}
								</h2>
								<p className="text-md lg:text-lg mb-6 merriweather-semibold lg:text-left lg:max-w-xl">
									{slide.description}
								</p>
								{slide.button && (
									<Button
										name={slide.button}
										onClick={() => router.push(slide.link)}
									/>
								)}
							</div>

							{/* Logo */}
							<div className="relative flex items-center justify-center -mt-8">
								<img
									src={slide.logo}
									alt="logo"
									className="h-[350px] w-auto object-contain"
								/>
							</div>
						</div>
					</div>
				</SwiperSlide>
            )) }
            
		</Swiper>
	);
};

export default Banner;
