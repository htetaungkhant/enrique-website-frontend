import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Banner from "@/components/HomePage/Banner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function Home() {
	return (
		<>
			<Banner />
			<div className="bg-gradient-to-b from-[#03020C] to-[#141A36]">
				<div className="lg:flex lg:flex-row flex flex-col items-center lg:space-x-8 justify-center py-8">
					<img
						src="/dalai-lama.png"
						className="h-[180px] lg:h-[250px] w-auto"
					/>
					<div className="text-white merriweather-semibold  text-lg lg:text-2xl tracking-wider flex flex-col lg:items-end  lg:border-l-4 lg:border-l-pink-800 lg:pl-6">
						<div className="lg:text-left text-center lg:px-0 px-6 mt-4 lg:mt-0">
							The purpose of our lives is to be happy
						</div>
						<div className="lg:text-left text-center text-sm mt-4">
							— Dalai Lama XIV
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
