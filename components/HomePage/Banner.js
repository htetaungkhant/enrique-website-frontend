import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { LinkButton } from "../common/Button";
import Image from "next/image";

const slides = [
	{
		bgImage: "/image/banner.png",
		text: "Safe and Comfortable",
		description:
			"Let us help you transform your space into a haven of safety and comfort.",
		button: "Learn More",
		logo: "/image/banner-logo.png",
		link: "/",
	},
	{
		bgImage: "/image/banner.png",
		text: "Expert Guidance and Healers",
		description: "Discover our transformative healing therapies and expert guidance from seasoned practitioners.",
		button: "Learn More",
		logo: "/image/banner-logo.png",
		link: "/",
	},
	{
		bgImage: "/image/banner.png",
		text: "Small Groups, Big Transformation",
		description: "Unlock a transformative journey through the power of intimate, supportive small groups.",
		button: "Learn More",
		logo: "/image/banner-logo.png",
		link: "/",
	},
	{
		bgImage: "/image/banner.png",
		text: "VIP Destination Flight Services",
		description: "Experience a private, luxury healing retreat tailored to your unique spiritual journey.",
		button: "Learn More",
		logo: "/image/banner-logo.png",
		link: "/",
	},
];

const Banner = () => {

	return (
		<section className="banner">
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={0}
				slidesPerView={1}
				loop={true}
				speed={1000}
				autoplay={{ delay: 5000 }}
				// pagination={{ clickable: true }}
				className="w-full h-[100vh]"
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index}>
						<div
							className={`relative w-full h-full flex flex-col items-center justify-center text-white p-10 bg-center bg-cover bg-no-repeat`}
							style={{
								backgroundImage: `url(${slide.bgImage})`,
							}}
						>
							{/* Overlay */}
							{/* <div className="absolute inset-0 bg-black opacity-55"></div> */}

							{/* Content Container */}
							<div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-12 gap-8 w-full">
								<div className="order-2 lg:order-1 relative text-center flex flex-col lg:items-start items-center justify-center lg:pl-12">
									<h2 className="text-2xl font-bold mb-4 poppins-bold text-left lg:text-4xl lg:max-w-lg">
										{slide.text}
									</h2>
									<p className="text-md mb-6 poppins-regular text-left lg:text-lg lg:max-w-xl">
										{slide.description}
									</p>
									<div className="w-full flex mt-3 justify-start md:mt-0 md:justify-center lg:justify-start">
										{slide.button && (
											<LinkButton name={slide.button} href={slide.link} />
										)}
									</div>
								</div>

								{/* Logo */}
								<div className="order-1 lg:order-2 relative flex items-center justify-center">
									<Image
										src={slide.logo}
										width={367}
										height={384}
										alt="logo"
										className="h-96 w-auto object-contain"
									/>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Banner;
