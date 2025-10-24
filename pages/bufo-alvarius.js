import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";

import { UniformInfoSection } from "@/components/common/InfoSection";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import {
  SwiperCardsRowSection,
  SwiperWrapper,
} from "@/components/common/CardsRowSection";
import Footer from "@/components/common/Footer";
import Explanation from "@/components/common/Explanation";
import UPSection from "@/components/common/UniformPaddingSection";
import Card from "@/components/common/Card";

const cardsRowSectionData1 = {
  title: "Exploring the Therapeutic Potential of 5 MeO",
  cardList: [
    {
      badgeText: "Potetials",
      title: "Advancements in Depression Treatment",
      description: (
        <p>
          A{" "}
          <span className="text-red-500">
            recent study conducted by the Beckley
          </span>{" "}
          research team examined a newly developed synthetic form of 5 MeO
          designed for nasal use. The study focused on individuals with severe
          depression who had not responded to traditional treatments.
          Remarkably, over half of the participants experienced noticeable
          improvement as early as the day after treatment, with benefits lasting
          for nearly three months. These findings suggest that 5 MeO and similar
          psychedelics may provide rapid and effective relief, significantly
          outperforming conventional antidepressants in terms of response time.
        </p>
      ),
    },
    {
      badgeText: "Potetials",
      title: "Potential for Neurological Restoration",
      description:
        "Emerging research suggests that 5 MeO possesses neuro-regenerative properties, offering potential treatments for various neurological conditions. It may promote neuroplasticity, encouraging brain cell growth and repair. Preliminary findings indicate that it could help individuals with stroke recovery, traumatic brain injuries, or neurodegenerative diseases like Alzheimer’s. By stimulating serotonin receptors, 5 MeO may enhance brain function, mood stability, and emotional resilience, making it a promising candidate for future neurological therapies and cognitive enhancement strategies.",
    },
    {
      badgeText: "Potetials",
      title: "Promising Outcomes for Complex PTSD",
      description:
        "A study on inhaled vaporized 5 MeO from the Bufo toad examined its effects on severe PTSD. The participant experienced significant symptom reduction, including decreased anxiety and depression, with sustained improvements lasting over a year. This suggests long-term therapeutic potential for trauma-related disorders. The study emphasizes the importance of further research to explore how 5 MeO could revolutionize PTSD treatment, providing an alternative to conventional therapies with limited effectiveness.",
    },
    {
      badgeText: "Potetials",
      title: "Brain Function and Cognitive Well-Being",
      description:
        "5 MeO’s interaction with serotonin receptors suggests it may enhance cognitive function and neural performance. Research indicates it could reduce inflammation in neural pathways, benefiting mood stability, emotional regulation, and neuroprotection. These effects may extend to neurodegenerative diseases, chronic pain, and cognitive decline. By fostering brain health and resilience, 5 MeO could play a crucial role in developing innovative treatments, bridging the gap between mental health and neurological care.",
    },
  ],
};

const cardsRowSectionData2 = {
  title: "Potential Risks of 5 MeO",
  cardList: [
    {
      badgeText: "Risks",
      title: "Unpredictable Nature of the Experience",
      description:
        "The effects of 5 MeO can vary greatly from person to person, depending on factors such as mental state, environment, and individual psychology. This unpredictability can lead to vastly different experiences.",
    },
    {
      badgeText: "Risks",
      title: "Potential Physical and Emotional Challenges",
      description:
        "While not typically harmful to the body, the intensity of the experience can cause temporary anxiety, confusion, or emotional overwhelm, which may require time and support to fully process afterward.",
    },
    {
      badgeText: "Risks",
      title: "Health Concerns",
      description:
        "Those with heart conditions or on medications may face serious health risks. It is essential never to take Bufo alone and always have a knowledgeable, experienced practitioner present for safety.",
    },
    {
      badgeText: "Risks",
      title: "Possible Sleep Disturbances",
      description:
        "Some users have trouble sleeping after 5 MeO or Bufo sessions. Natural aids like 5-HTP, magnesium, melatonin, ashwagandha, and CBD can help; tailored prescription by doctor that we will be advise.",
    },
  ],
};

const cardsRowSectionData3 = {
  title: "Natural vs. Synthetic 5 MeO",
  cardList: [
    {
      title: "Arguments for Synthetic 5 MeO",
      description: (
        <p>
          Chemist and researcher Hamilton Morris asserts that every compound
          found in toad venom can be fully replicated synthetically. This
          viewpoint supports the transition to synthetic 5 MeO for both ethical
          and practical reasons. <br />
          Synthetic production ensures precise dosing, reliable potency, and
          consistent purity, making it particularly valuable in scientific
          research and therapeutic applications. Additionally, it eliminates the
          need for harvesting toads, reducing ecological harm and helping
          preserve Sonoran Desert Toad populations. <br />
          By choosing synthetic alternatives, users and researchers can ensure
          sustainability while maintaining the same psychoactive effects as
          natural sources.
        </p>
      ),
    },
    {
      title: "Arguments for Natural Toad Venom",
      description: [
        <p>
          <strong>Authenticity of Experience</strong> – Supporters believe that
          natural toad venom provides a richer, more holistic experience. They
          argue that compounds beyond 5 MeO may contribute to a deeper and more
          immersive journey.
        </p>,
        <p>
          <strong>Cultural and Traditional Importance</strong> – The use of
          toad-derived 5 MeO has historical significance in indigenous and
          shamanic practices. Some believe preserving these traditions is
          essential to honoring their cultural roots.
        </p>,
        <p>
          <strong>The Entourage Effect</strong> – Some suggest that the various
          compounds in toad venom interact synergistically, enhancing the
          overall experience and potentially leading to deeper therapeutic
          benefits.
        </p>,
      ],
    },
  ],
};

const cardsRowSectionData4 = {
  title: "Cognitive and Physical Effects of 5 MeO",
  cardList: [
    {
      title: "Cognitive Effects",
      description: [
        <p>
          <strong>Profound Spiritual Awareness</strong> – Many individuals
          report deep, transformative realizations, often describing a
          heightened sense of connection with the universe or moments of pure
          consciousness. These experiences can lead to long-lasting shifts in
          perception and personal growth.
        </p>,
        <p>
          <strong>Intense Euphoria and Emotional Uplift</strong> – Users
          frequently experience overwhelming joy, inner peace, and a heightened
          sense of well-being, often leaving them with a renewed perspective on
          life.
        </p>,
        <p>
          <strong>Altered Reality Perception</strong> – The experience often
          involves a dissolution of time, space, and self-identity, with many
          struggling to put the intensity of the journey into words.
        </p>,
      ],
    },
    {
      title: "Physical Effects:",
      description: [
        <p>
          <strong>Brief but Powerful Duration</strong> –While the impact of 5
          MeO is profound, its physiological effects typically last between 30
          and 90 minutes. This makes it one of the most intense yet short-lived
          psychedelics, allowing users to undergo deep transformative
          experiences within a brief timeframe.
        </p>,
        <p>
          <strong>Heightened Sensory Awareness</strong> – Activation of
          serotonin receptors leads to enhanced perception, affecting visual,
          auditory, and tactile senses, often creating a deeply immersive
          experience.
        </p>,
        <p>
          <strong>Varied Bodily Sensations</strong>– S Individuals may feel
          physical effects such as an increased heart rate, sensations of
          floating or heaviness, and other unique bodily experiences.
        </p>,
      ],
    },
  ],
};

const cardsRowSectionData5 = {
  title: "Cognitive and Physical Effects of 5 MeO",
  cardList: [
    {
      image: "/image/11.png",
      title: "N,N-Dimethyltryptamine",
      description: [
        <p>
          DMT and 5 MeO are both naturally occurring psychedelic compounds found
          in various plants and animals. However, they differ significantly in
          their chemical structure, effects, and therapeutic potential.
        </p>,
        <p>
          <strong>Chemical Structure</strong> – DMT (N,N-Dimethyltryptamine) and
          5 MeO (5-Methoxy-N,N-Dimethyltryptamine) share a similar molecular
          framework, but the presence of a methoxy (-OCH₃) group in 5 MeO alters
          its effects on the brain and body.
        </p>,
        <p>
          <strong>Psychedelic Effects</strong> – DMT is best known for its
          vivid, immersive visual hallucinations, often described as
          transporting users to alternate dimensions or otherworldly realms
        </p>,
      ],
    },
    {
      image: "/image/10.png",
      title: "5-Methoxy-N,N-Dimethyltryptamine",
      description: [
        <p>
          <strong>Unique Psychoactive Experience</strong> – Unlike DMT, 5 MeO
          induces a state of ego dissolution and a deep sense of unity with
          existence, rather than producing intense visual effects. Many describe
          it as a powerful experience of interconnectedness and
          self-transcendence.
        </p>,
        <p>
          <strong>Potential Therapeutic Uses</strong> – Both compounds are being
          investigated for their possible benefits in addressing mental health
          conditions such as depression, PTSD, and anxiety. Some researchers
          believe that 5 MeO’s capacity to dissolve the ego and enhance feelings
          of oneness could make it particularly valuable in therapeutic
          applications.
        </p>,
      ],
    },
  ],
  footer: {
    title: "Other Key Differences",
    description: [
      <p className="text-xs md:text-sm font-medium">
        <strong>Presence in the Human Body</strong> – DMT has been detected in
        the human pineal gland, suggesting a potential endogenous role, while 5
        MeO has yet to be identified within the body through scientific studies
        or conclusive research on its natural presence and function.
      </p>,
      <p className="text-xs md:text-sm font-medium">
        <strong>Legal and Safety Considerations</strong> – While both substances
        vary in potency, effects, and potential risks, their legal status
        differs across regions. Anyone considering their use should thoroughly
        research their properties and approach them with mindfulness and caution
      </p>,
    ],
  },
};

const BufoAlvariusPage = () => {
  return (
    <main>
      <PageHeaderWithBanner title="Toad Medicine" />
      <div className="h-32 bg-gradient-to-b from-[#000000] to-[#00000000]" />
      <UniformInfoSection
        image="/image/1.png"
        imageAspectRatio="portrait"
        reverse={true}
        className="-mt-24"
      >
        <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">
          The Divine Molecule
        </h2>
        <div className="text-white inter-font flex flex-col gap-6">
          <p>
            5 MeO is a powerful psychedelic known for its profound impact on
            human consciousness.
          </p>
          <p>
            Naturally occurring in the Sonoran Desert Toad, certain plants, and
            synthetic forms, this compound induces intense{" "}
            <Link href="#" target="_blank" className="text-[#fef15c]">
              mystical experiences
            </Link>{" "}
            and has shown therapeutic potential. Unlike other psychedelics, its
            effects are fast-acting and short-lived, making it a more accessible
            option for many seeking transformative experiences.
          </p>
          <p>
            It is often associated with ego dissolution, deep introspection, and
            spiritual awakening, offering users a profound sense of unity and
            interconnectedness.
          </p>
        </div>
      </UniformInfoSection>
      <UniformInfoSection image="/image/2.png">
        <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">
          Unveiling the Sacred Molecule
        </h2>
        <div className="text-white inter-font flex flex-col gap-6">
          <p>
            5 MeO, often called "The Divine Molecule," belongs to the tryptamine
            class of psychedelics, alongside DMT and LSD. Unlike DMT, which is
            known for its intense visual hallucinations, 5 MeO is celebrated for
            inducing profound, often indescribable, spiritual experiences. When
            derived from the Toad Medicine toad, it is commonly referred to as
            Bufo, whereas its synthetic form is sometimes called Jaguar.
          </p>
          <p>
            This compound is significantly more potent than DMT, estimated to be
            four to six times stronger. A recent study{" "}
            <Link
              href="https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2018.02459/full"
              target="_blank"
              className="text-[#fef15c]"
            >
              published in Frontiers in Psychology
            </Link>{" "}
            found that a small dose of Bufo produced mystical effects comparable
            to a high dose of psilocybin.
          </p>
          <p>
            Beyond its potency, what sets 5 MeO apart is the rapid onset and
            short duration of its effects. The experience begins almost
            instantly after inhalation, reaches its peak within minutes, and
            fades within roughly 30 minutes. Despite its brevity, this intense
            journey often leaves individuals with lasting insights and an
            enhanced sense of well-being.
          </p>
        </div>
      </UniformInfoSection>
      <UniformInfoSection image="/image/3.png" reverse={true}>
        <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">
          Why Is 5 MeO Referred to as "The God Molecule"?
        </h2>
        <div className="text-white inter-font flex flex-col gap-6">
          <p>
            The term "The God Molecule" associated with 5 MeO is not just a
            catchy phrase; it stems from the profound and transformative effects
            reported by individuals who have used this psychoactive substance.
            Many users describe experiences that feel beyond ordinary
            perception, often involving a deep sense of unity with the universe.
            These encounters are frequently characterized by overwhelming
            emotions of interconnectedness, love, and an expanded awareness of
            existence and one's role within it. Due to these deeply spiritual
            and life-altering experiences, this potent compound has earned its
            divine moniker, as users often feel they are engaging with a higher
            consciousness or tapping into a universal energy beyond everyday
            reality.
          </p>
          <p>
            It’s worth noting that "The God Molecule" is sometimes confused with
            "The God Particle," a phrase used in physics to describe the Higgs
            boson—an essential particle that helps explain how other particles
            obtain mass. While both names suggest fundamental importance, they
            belong to completely different domains: one rooted in personal and
            spiritual insight, the other in scientific research. This contrast
            underscores the diverse ways humans attempt to comprehend existence,
            whether through mystical experiences or empirical study.
          </p>
        </div>
      </UniformInfoSection>
      <UniformInfoSection image="/image/4.png">
        <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">
          The Therapeutic Promise of 5 MeO
        </h2>
        <div className="text-white inter-font flex flex-col gap-6">
          <p>
            Beyond its reputation for inducing profound spiritual experiences, 5
            MeO is gaining attention for its potential as a groundbreaking tool
            in mental health treatment. Researchers and therapists are exploring
            its ability to provide rapid and substantial relief for individuals
            struggling with persistent psychological disorders. This potent
            psychedelic is showing particular promise in addressing conditions
            such as treatment-resistant depression and complex post-traumatic
            stress disorder (CPTSD).
          </p>
          <p>
            Studies suggest that even brief, guided sessions with 5 MeO can lead
            to significant improvements in mood and emotional well-being,
            distinguishing it from conventional therapeutic methods. Its unique
            impact on consciousness and perception enables individuals to
            process deep-seated trauma, emotional distress, and existential
            concerns—factors often at the root of mental health struggles that
            have proven difficult to treat through standard approaches. As
            scientific exploration progresses, the potential of 5 MeO to open
            new pathways for mental health treatment is becoming increasingly
            evident, signaling a transformative shift in the field of
            psychological healing.
          </p>
        </div>
      </UniformInfoSection>
      <SwiperCardsRowSection
        cardAnimate
        title={cardsRowSectionData1.title}
        cardList={cardsRowSectionData1.cardList}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        twBadgeBorderColor="border-[#212A63]"
        twBadgeTextColor="text-[#212A63]"
        cardClassName="text-[#212A63] h-[25rem] md:h-[30rem] lg:h-[36rem] overflow-x-hidden"
      />
      <SwiperCardsRowSection
        cardAnimate
        title={cardsRowSectionData2.title}
        cardList={cardsRowSectionData2.cardList}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        cardClassName="bg-gradient-to-b from-[#7B0808] to-[#360303] h-60 md:h-72 lg:h-[22rem] overflow-x-hidden"
      />
      <SwiperCardsRowSection
        title={cardsRowSectionData3.title}
        description={cardsRowSectionData3.description}
        cardList={cardsRowSectionData3.cardList}
        cardClassName="text-[#212A63] h-[25rem] md:h-[30rem] xl:h-80 overflow-x-hidden"
      />
      <UniformInfoSection image="/image/5.png" reverse={true}>
        <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">
          The History and Modern Revival of 5 MeO
        </h2>
        <div className="text-white inter-font flex flex-col gap-6">
          <p>
            The use of 5 MeO dates back to the shamanic traditions of indigenous
            South American cultures, where it was commonly consumed through
            Yopo, a plant-based snuff containing the compound. Shamans utilized
            this substance to enter altered states of consciousness, aiding in
            spiritual practices and healing rituals. These ancient traditions
            emphasize the profound role 5 MeO has played in facilitating
            transformative experiences.
          </p>
          <p>
            The compound was first identified and synthesized in the mid-20th
            century, yet significant scientific exploration into its properties
            remained limited for decades. It wasn’t until 2016 that in-depth
            chemical research on 5 MeO saw renewed interest, revealing the vast
            potential for further study and application. <br />
            As investigations continue, the global legal landscape surrounding 5
            MeO remains uncertain, with ongoing debates about its safety,
            therapeutic value, and ethical considerations shaping its future.
          </p>
        </div>
      </UniformInfoSection>
      <UniformInfoSection image="/image/6.png">
        <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">
          Natural Sources and Laboratory Synthesis of 5 MeO
        </h2>
        <div className="text-white inter-font flex flex-col gap-6">
          <p>
            While the Sonoran Desert Toad is the most well-known source of 5
            MeO, the compound is also present in certain plant species that have
            been historically used in South America. Its presence in various
            organisms suggests a possible ecological and evolutionary role, an
            area that continues to be explored by researchers
          </p>
          <p>
            For scientific and medical purposes, laboratory synthesis of 5 MeO
            is crucial, providing a stable and controlled supply of the
            substance. Techniques such as the Speeter-Anthony synthesis and
            modified Eschweiler-Clarke reaction allow for the production of
            high-purity 5 MeO efficiently. This ensures consistency in research
            while also reducing the strain on natural sources.
          </p>
          <p>
            By studying both its natural origins and synthetic production,
            scientists can further unlock the potential of 5 MeO, balancing its
            spiritual significance with responsible therapeutic applications
          </p>
        </div>
      </UniformInfoSection>
      <SwiperCardsRowSection
        title={cardsRowSectionData4.title}
        description={cardsRowSectionData4.description}
        cardList={cardsRowSectionData4.cardList}
        cardClassName="text-[#212A63] h-[25rem] md:h-[30rem] xl:h-80 overflow-x-hidden"
      />
      <UPSection className="text-white inter-font flex flex-col gap-6">
        {cardsRowSectionData5.title && (
          <h2 className="text-2xl font-medium lg:text-4xl">
            {cardsRowSectionData5.title}
          </h2>
        )}
        {cardsRowSectionData5.cardList && (
          <SwiperWrapper
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
            }}
          >
            {cardsRowSectionData5.cardList.map((item, index) => (
              <SwiperSlide key={index}>
                <Card className="text-[#212A63] h-[35rem] md:h-[40rem]">
                  <div className="flex flex-col items-center gap-4">
                    {item.image && (
                      <Image
                        src={item.image}
                        width={611}
                        height={324}
                        className="w-full md:w-4/5 h-auto 2xl:max-w-[33rem]"
                        alt="formula"
                      />
                    )}
                    {item.title && (
                      <h2 className="text-black text-center font-semibold text-xl lg:text-2xl">
                        {item.title}
                      </h2>
                    )}
                    {item.description &&
                      (Array.isArray(item.description) ? (
                        <div className="text-xs md:text-sm font-medium flex flex-col gap-3">
                          {item.description.map((innerItem, innerIndex) =>
                            typeof innerItem === "string" ? (
                              <p key={innerIndex}>{innerItem}</p>
                            ) : (
                              <div key={innerIndex}>{innerItem}</div>
                            )
                          )}
                        </div>
                      ) : typeof item.description === "string" ? (
                        <p className="text-xs md:text-sm font-medium">
                          {item.description}
                        </p>
                      ) : (
                        <div className="text-xs md:text-sm font-medium">
                          {item.description}
                        </div>
                      ))}
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </SwiperWrapper>
        )}
        {cardsRowSectionData5.footer && (
          <div>
            {cardsRowSectionData5.footer.title && (
              <h4 className="font-semibold">
                {cardsRowSectionData5.footer.title}
              </h4>
            )}
            {cardsRowSectionData5.footer.description &&
              (Array.isArray(cardsRowSectionData5.footer.description) ? (
                <div className="flex flex-col gap-2">
                  {cardsRowSectionData5.footer.description.map(
                    (item, index) => (
                      <div key={index}>{item}</div>
                    )
                  )}
                </div>
              ) : (
                <p>{cardsRowSectionData5.footer.description}</p>
              ))}
          </div>
        )}
      </UPSection>
      <UniformInfoSection image="/image/7.png" reverse={true}>
        <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">
          Navigating the Legal Status of 5 MeO
        </h2>
        <div className="text-white inter-font flex flex-col gap-6">
          <p>
            <Link
              href="https://recovered.org/hallucinogens/dmt/dmt-controlled-substance"
              target="_blank"
              className="text-[#fef15c]"
            >
              The legality of 5 MeO varies widely
            </Link>{" "}
            across different regions, with some countries enforcing strict
            regulations while others explore decriminalization. This disparity
            highlights the evolving global stance on psychedelic substances.{" "}
            <br />
            In several nations, 5 MeO is categorized alongside other powerful
            psychedelics, leading to stringent restrictions:
          </p>
          <ul className="pl-3 list-disc">
            <li>
              <strong>Canada:</strong> While personal possession and use are not
              prohibited, the sale and distribution of 5 MeO remain illegal
              under federal law.
            </li>
            <li>
              <strong>United States:</strong> Recognized as a Schedule I
              substance under the Controlled Substances Act, it is unlawful to
              produce, purchase, possess, or distribute 5 MeO without special
              authorization from the DEA for research purposes.
            </li>
            <li>
              <strong>United Kingdom:</strong> Classified as a Class A drug,
              making its possession, distribution, or sale illegal.
            </li>
            <li>
              <strong>Australia:</strong> Listed under Schedule 9 as a
              prohibited substance, meaning it cannot be legally possessed or
              sold.
            </li>
          </ul>
          <p>
            As discussions on psychedelic-assisted therapy and mental health
            benefits continue, the legal landscape surrounding 5 MeO may shift,
            influencing future policies and access.
          </p>
        </div>
      </UniformInfoSection>
      <Explanation title="Where 5 MeO Is Permitted">
        <div className="flex flex-col gap-4 text-sm font-medium">
          <p>
            Some regions have adopted a more lenient stance on 5 MeO, either by
            allowing its use under specific conditions or decriminalizing
            personal possession:
          </p>
          <ul className="pl-3 list-disc">
            <li>
              <strong>Mexico:</strong> While not explicitly illegal, 5 MeO can
              be used for spiritual and ceremonial practices, protected under
              cultural heritage laws.
            </li>
            <li>
              <strong>Portugal & Spain:</strong> Both nations have
              decriminalized the personal use and possession of all drugs,
              including 5 MeO, though its sale and distribution remain
              regulated.
            </li>
            <li>
              <strong>Netherlands:</strong> With its progressive drug policies,
              the Netherlands permits the use of 5 MeO in certain settings,
              though strict regulations still apply.
            </li>
          </ul>
          <p>
            These legal distinctions reflect an evolving global conversation on
            the role of psychedelics in therapy, spirituality, and personal
            exploration.
          </p>
        </div>
      </Explanation>
      <UniformInfoSection image="/image/8.png">
        <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">
          The Legal Uncertainty Surrounding 5 MeO
        </h2>
        <div className="text-white inter-font flex flex-col gap-6">
          <p>
            In certain countries, the legal standing of 5 MeO remains unclear,
            often influenced by the context of its use or ongoing legislative
            discussions:
          </p>
          <ul className="pl-3 list-disc">
            <li>
              <strong>Canada:</strong> While personal possession is permitted,
              commercial activities involving 5 MeO remain illegal, creating a
              legal gray area where use is allowed but distribution is
              restricted.
            </li>
            <li>
              <strong>Brazil:</strong> The religious and spiritual use of Aya
              Master Plant, which may contain 5 MeO, is legally recognized. This
              precedent suggests that similar protections could potentially
              extend to 5 MeO in ceremonial settings.
            </li>
            <li>
              <strong>United States:</strong> Several cities, including Santa
              Cruz (California), Denver (Colorado), Cambridge and Somerville
              (Massachusetts), Ann Arbor (Michigan), Seattle (Washington), and
              Washington, D.C., have decriminalized all entheogenic plants,
              including those with 5 MeO. However, the substance remains
              prohibited under federal law and in most states.
            </li>
          </ul>
          <p>
            The legal classification of 5 MeO highlights the varied approaches
            to psychedelic regulation worldwide. While some nations enforce
            strict prohibitions, others acknowledge its role in religious,
            spiritual, or therapeutic practices, leading to more flexible
            policies. As scientific research advances and societal attitudes
            shift, the legal framework surrounding 5 MeO will likely continue to
            evolve.
          </p>
        </div>
      </UniformInfoSection>
      <UniformInfoSection image="/image/9.png" reverse={true}>
        <h2 className="text-white text-2xl inter-font font-medium lg:text-3xl xl:text-4xl">
          Final Reflections on the "God Molecule"
        </h2>
        <div className="text-white inter-font flex flex-col gap-6">
          <p>
            5 MeO provides a profound window into the potential of psychedelics
            to influence both consciousness and personal transformation. As
            scientific exploration advances, it is crucial to approach this
            powerful substance with ethical responsibility and awareness. Not
            everyone may be prepared for such a deeply transformative
            experience.
          </p>
          <p>
            Encouraging continued research and open discussions on the potential
            benefits and risks of 5 MeO is essential. For those interested in
            exploring its effects, seeking guidance from experienced
            professionals is highly recommended.
          </p>
          <p>
            Curious about the life-changing potential of this compound?
            Wondering if you're prepared for a transformative journey with Arise
            Ceremonies? Take our insightful quiz to determine whether a Bufo
            retreat aligns with your path. Embrace the opportunity to deepen
            your spiritual journey and unlock new dimensions of self-discovery.
          </p>
        </div>
      </UniformInfoSection>
      <Footer className="mt-10" />
    </main>
  );
};

export default BufoAlvariusPage;
