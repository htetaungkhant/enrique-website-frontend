import Link from "next/link";

import Banner from "@/components/HomePage/Banner";
import PageHeader from "@/components/common/PageHeader";
import InfoSection from "@/components/common/InfoSection";
import QuoteSection from "@/components/HomePage/QuoteSection";
import { IconButton } from "@/components/common/Button";
import FirstCRSection from "@/components/HomePage/CardsRow/FirstCRSection";
import SecondCRSection from "@/components/HomePage/CardsRow/SecondCRSection";
import CardsRowSection from "@/components/common/CardsRowSection";
import Footer from "@/components/common/Footer";
import CardGridSection from "@/components/common/AnimatedCardsGridSection";
import GallerySection from "@/components/HomePage/Gallery/GallerySection";

const thirdCRSectionData = {
	title: '<span class="font-300">The Importance of </span><strong class="font-600">Integration</strong>',
	description: 'Integrating a Bufo ceremony is key to lasting growth and well-being. Practice mindfulness, self-reflection, and grounding techniques. Apply insights through daily intention and conscious living.',
	cardList: [
		{
			badgeText: "Integration",
			title: 'Grounding <br /><span class="font-400">Practices</span>',
			description: "Engage in physical activity, meditation, or breathwork to reconnect with your body and process emotions.",
		},
		{
			badgeText: "Integration",
			title: 'Time for <br /><span class="font-400">Reflection</span>',
			description: "Allow space for rest and introspection, giving the experience time to settle naturally.",
		},
		{
			badgeText: "Integration",
			title: 'Creative <br /><span class="font-400">Expression</span>',
			description: "Explore journaling, art therapy, or nonverbal expression to extract deeper meaning from your journey.",
		},
		{
			badgeText: "Integration",
			title: 'Daily <br /><span class="font-400">Self-Care</span>',
			description: "Maintain a personal practice that nurtures your connection to the insights gained during the ceremony.",
		},
		{
			badgeText: "Integration",
			title: 'Community <br /><span class="font-400">& Support</span>',
			description: "Join integration circles or seek professional guidance to share experiences and receive support in a safe and understanding environment.",
		}
	]
}

const cardGridSection = {
	title: {
		__html: 'Key Elements of a <strong style="font-weight: 600;">Bufo Ceremony</strong>'
	},
	data: [
		{
			firstRow: {
				title: "Preparation",
				description: "Participants undergo physical, mental, and emotional preparation through fasting, meditation, or cleansing rituals. This enhances receptivity, ensuring a transformative experience with greater clarity, focus, and readiness for the journey",
			},
			secondRow: {
				title: "Breathwork",
				description: "Deep, rhythmic breathing enhances awareness, allowing participants to surrender to the experience. Conscious breath control regulates emotions, deepens psychedelic effects, and promotes relaxation, clarity, and connection to inner wisdom.",
			},
		},
		{
			firstRow: {
				title: "Setting",
				description: "A quiet, peaceful space—such as nature or a sacred room—sets the tone. A calming atmosphere fosters introspection, relaxation, and a safe environment for deep spiritual and emotional exploration.",
			},
			secondRow: {
				title: "Dosage",
				description: "Administered in precise amounts, the venom is inhaled through smoking or vaporization. Controlled dosing ensures a safe, effective experience, balancing intensity while allowing participants to navigate insights with clarity.",
			},
		},
		{
			firstRow: {
				title: "Guidance",
				description: "A trained facilitator ensures safety, offers support, and navigates challenges during the ceremony. Their experience helps participants stay grounded, process emotions, and maximize the potential benefits of the journey.",
			},
			secondRow: {
				title: "Integration",
				description: "After the ceremony, reflection and self-exploration help internalize insights. Practices like journaling, meditation, or counseling assist in applying newfound wisdom to daily life for long-term growth.",
			},
		}
	]
}

export default function HomePage() {
	return (
		<main>
			<PageHeader />
			<Banner />
			<QuoteSection
				normal={false}
				image="/image/dalai-lama.png"
				description="The purpose of our lives is to be happy"
				author="— Dalai Lama XIV"
			/>
			<InfoSection image="/image/SacredGuidance.png" reverse={true}>
				<h2 className="text-white text-2xl inter-font font-light lg:text-4xl">Transform Your Journey with <strong className="font-semibold">Sacred Guidance</strong></h2>
				<p className="text-white inter-font">Discover the profound wisdom and preparation steps for your sacred medicine journey with the <Link href="" target="_blank" className="text-[#fef15c]">Sacred Ceremonial Guide</Link>. This comprehensive guide provides essential insights on emotional, mental, physical, and spiritual preparation, integration practices, and the healing power of 5-MeO-DMT. Whether you are new to the experience or looking to deepen your understanding, this guide will help you navigate the path with clarity and intention.</p>
				<IconButton title="Download Now" className="w-fit" href="/pdf/Sacred_Ceremonial_Guide.pdf" download="Sacred Ceremonial Guide.pdf" />
			</InfoSection>
			<QuoteSection
				descriptionTextClass="text-base"
				description="What would you give to know, absolutely know beyond any doubt, that everything really is all right, that there is no reason to fear. That there is no need to feel despair or loss or uncertainty. That all the pain and hurt and evil we have seen truly is only an illusion, and that the most beautiful things we have experienced are only a glimpse, a small taste, of what is truly real, and truly ours. This is what I see, and what I know…"
				author="— David Carse, PERFECT BRILLIANT STILLNESS"
			/>
			<FirstCRSection />
			<InfoSection image="/image/BufosPotential.png">
				<h2 className="text-white text-2xl inter-font font-light lg:text-4xl">Scientific Validation of <strong className="font-semibold">Bufo’s Potential</strong></h2>
				<p className="text-white inter-font">Research into 5-MeO-DMT, one of 21 alkaloids found in Bufo Alvarius venom, has gained remarkable traction. Leading institutions such as Johns Hopkins and the University of London are spearheading studies on its effects. Johns Hopkins has even published <Link href="" target="_blank" className="text-[#fef15c]">ground-breaking</Link> research highlighting its potential in <Link href="https://hub.jhu.edu/magazine/2019/summer/toad-venom-therapy/" target="_blank" className="text-[#fef15c]">addressing depression and anxiety</Link>.</p>
				<p className="text-white inter-font">These studies seek to uncover the impact of 5-MeO-DMT on mental health, consciousness, and neurological function, reinforcing its therapeutic value. At the same time, mainstream media has amplified interest, with coverage from outlets like Forbes Magazine and Hamilton’s Pharmacopeia, reflecting a growing cultural acceptance of this powerful compound.</p>
			</InfoSection>
			<SecondCRSection />
			<InfoSection image="/image/Media.png" smallImage={true} reverse={true}>
				<h2 className="text-white text-2xl inter-font font-light lg:text-4xl">Bufo Medicine in the <strong className="font-semibold">Media</strong></h2>
				<p className="text-white inter-font">High-profile figures like Mike Tyson and the late Steve Jobs have shared <Link href="https://www.youtube.com/watch?v=DwUTzxnfzoc" target="_blank" className="text-[#fef15c]">transformative experiences</Link> with Bufo, fueling growing curiosity about 5-MeO-DMT. Their testimonies highlight its profound effects and reflect a broader cultural shift toward exploring altered states of consciousness for healing and personal growth.</p>
				<p className="text-white inter-font">The list of celebrities endorsing Bufo continues to expand, with names like Miley Cyrus and Mike Tyson bringing further attention to this powerful medicine.</p>
			</InfoSection>
			<InfoSection image="/image/BufoCeremony.png" smallImage={true}>
				<h2 className="text-white text-2xl inter-font font-light lg:text-4xl">Understanding the <strong className="font-semibold">Bufo Ceremony</strong></h2>
				<p className="text-white inter-font">A Bufo Alvarius ceremony, often called a toad ceremony, involves the use of venom from the Sonoran Desert Toad (Bufo Alvarius), which contains 5-MeO-DMT. The ceremony follows a structured process to enhance the experience while ensuring safety and support.</p>
				<p className="text-white inter-font">Known as El Sapo in Spanish, Bufo secretes a milky white substance rich in <Link href="https://www.forbes.com/sites/davidcarpenter/2020/02/02/5-meo-dmt-the-20-minute-psychoactive-toad-experience-thats-transforming-lives/" target="_blank" className="text-[#fef15c]">5-MeO-DMT</Link>. Its effects are fast-acting, and unlike many other powerful psychedelics, it typically does not cause nausea or vomiting. To support ecological conservation, our ceremonies also offer a synthetic 5-MeO-DMT alternative, reducing the impact on the Sonoran Desert Toad and its habitat.</p>
			</InfoSection>
			<InfoSection image="/image/SmokingBufo.png" smallImage={true} reverse={true}>
				<h2 className="text-white text-2xl inter-font font-light lg:text-4xl">The Process of <strong className="font-semibold">Smoking Bufo</strong></h2>
				<p className="text-white inter-font">The venom of the Bufo Alvarius toad is carefully extracted through a process known as “milking,” then dried for use. When smoked through a pipe, the heat neutralizes toxic components, allowing the user to inhale only the active 5-MeO-DMT vapor.</p>
				<p className="text-white inter-font">This method induces a short yet intensely powerful psychedelic experience, often described as more profound than traditional DMT. To ensure safety and maximize the benefits, it is essential to have an experienced guide and follow well-established safety protocols.</p>
			</InfoSection>
			<CardGridSection
				title={cardGridSection.title}
				data={cardGridSection.data}
				cardClassName="sm:h-70 md:h-[26rem] lg:h-[24rem] xl:h-84"
			/>
			<GallerySection />
			<InfoSection image="/image/Bufo.png" reverse={true}>
				<h2 className="text-white text-2xl inter-font font-light lg:text-4xl">Spiritual Awakening Through <strong className="font-semibold">Bufo</strong></h2>
				<p className="text-white inter-font">Many individuals describe their Bufo ceremony as a deeply spiritual experience, often marked by a profound sense of unity with the universe—transcending conventional perceptions of time and space.</p>
				<p className="text-white inter-font">
					<span className="font-bold">Encounters Beyond the Self –</span> Some report sensing ancestral presences or navigating vivid, indescribable realms of consciousness. The depth and nature of these encounters vary greatly; while some recall intricate visionary experiences, others emerge with little to no memory of their journey.
				</p>
				<p className="text-white inter-font">
					<span className="font-bold">Dissolution of the Ego–</span> <Link href="https://www.forbes.com/sites/davidcarpenter/2020/02/02/5-meo-dmt-the-20-minute-psychoactive-toad-experience-thats-transforming-lives/" target="_blank" className="text-[#fef15c]">The effects of 5-MeO-DMT</Link> facilitate the breakdown of personal boundaries, allowing for deep introspection and transformation.
				</p>
				<p className="text-white inter-font">
					<span className="font-bold">A Deeply Personal Experience –</span> Each journey is unique, reflecting the inner world of the participant. Many describe it as a life-changing moment of emotional, psychological, and spiritual evolution.
				</p>
			</InfoSection>
			<CardsRowSection title={thirdCRSectionData.title} description={thirdCRSectionData.description} cardList={thirdCRSectionData.cardList} />
			<Footer className="mt-10" />
		</main>
	);
}
