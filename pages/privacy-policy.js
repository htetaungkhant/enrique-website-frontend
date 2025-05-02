import Footer from "@/components/common/Footer";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";

const effectiveDate = {
    'Effective Date': 'June 16, 2024'
}

const data = {
    'Introduction': [
        'At Arise Retreats, we are committed to protecting your personal data and privacy. This policy outlines how we collect, use, and safeguard your information when you visit our website, register for an account, or engage with our services. We prioritize transparency and security to ensure your data is handled in compliance with applicable laws and regulations.',
        'Information We Collect',
        'We collect the following types of information:',
        [
            'Account Information – When you register, place an order, or participate in a survey, we collect details such as your name, email address, postal address, and phone number.',
            'Medical History & Relevant Data – To provide personalized recommendations and ensure safe experiences, we may request confidential health-related information as part of the onboarding process.',
        ]
    ],
    'How We Use Your Information': [
        'We use your data for the following purposes:',
        [
            'Personalization – To tailor our services and recommendations to your needs.',
            'Service Improvement – To enhance our offerings based on user feedback.',
            'Secure Access – To authenticate and facilitate safe login.',
            'Communication – To send updates, service-related information, and support messages.',
        ],
        'Legal Basis for Data Processing',
        'We process your data based on:',
        [
            'Your explicit consent',
            'The necessity to perform a contract you are a party to',
            'Compliance with legal obligations',
        ],
        'Data Protection Measures',
        'To ensure the safety of your personal data, we implement:',
        [
            'Encryption – Secure data transmission using industry-standard encryption.',
            'Confidentiality – All personnel and third-party providers are bound by confidentiality agreements.',
            'Access Control – Restricted access to authorized personnel only.',
            'Security Monitoring – Continuous surveillance to detect and prevent security threats.'
        ]
    ],
    'Personal Data Breach Notification': [
        'In the event of a data breach, we will notify affected users and relevant authorities within 72 hours, providing details of the incident and remedial measures.',
        'Disclosure of Information',
        'We do not sell or share your personal information except:',
        [
            'With licensed healthcare professionals involved in your services.',
            'When required by law or to protect our rights, property, or safety.'
        ]
    ],
    'Your Rights': [
        'You have the right to:',
        [
            'Access & Rectification – Request corrections to inaccurate data.',
            'Restrict Processing – Limit the use of your data under specific circumstances.',
            'Erasure (Right to Be Forgotten) – Request deletion of your data if no longer necessary for the original purpose.'
        ]
    ],
    'Data Retention': 'We retain your data for up to five years following the completion of services unless required for legal compliance.',
    'Changes to This Policy': 'We may update this policy from time to time. Any changes will be reflected on this page, and continued use of our website constitutes acceptance of these updates.',
    'Contact Us': 'For privacy-related inquiries, contact us at: info@arisebufo.com'
}

const PrivacyPolicy = () => {
    return (
        <main>
            <PageHeaderWithBanner title="Privacy Policy" />
            <div className="h-32 bg-gradient-to-b from-[#000000] to-[#00000000]" />
            <UPSection className="-mt-24 text-white text-sm md:text-base font-medium flex flex-col gap-3 lg:gap-6">
                {
                    Object.entries(effectiveDate).map(([key, value]) => (
                        <div key={key}>
                            <span>{key}: </span>
                            <span>{value}</span>
                        </div>
                    ))
                }
                {
                    Object.entries(data).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                            <h2 className="text-base md:text-lg lg:text-xl font-bold">{key}</h2>
                            {
                                typeof value === 'string' ?
                                    <p>{value}</p>
                                    :
                                    Array.isArray(value) ?
                                        value.map((description, index) => (
                                            typeof description === 'string' ?
                                                <p key={index}>{description}</p>
                                                :
                                                Array.isArray(description) ?
                                                    <ul key={index} className="list-disc pl-3">
                                                        {
                                                            description.map((listItem, innerIndex) => (
                                                                typeof listItem === 'string' ?
                                                                    <li key={innerIndex}>{listItem}</li>
                                                                    :
                                                                    Array.isArray(listItem) ?
                                                                        <ul key={innerIndex} className="list-disc pl-6">
                                                                            {
                                                                                listItem.map((innerListItem, innerListIndex) => (
                                                                                    <li key={innerListIndex}>{innerListItem}</li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                        :
                                                                        typeof listItem === 'object' ?
                                                                            <p key={innerIndex} dangerouslySetInnerHTML={listItem} />
                                                                            :
                                                                            listItem
                                                            ))
                                                        }
                                                    </ul>
                                                    :
                                                    typeof description === 'object' && Object.keys(description).length === 1 && Object.keys(description).includes('__html') ?
                                                        <p key={index} dangerouslySetInnerHTML={description} />
                                                        :
                                                        description
                                        ))
                                        :
                                        value
                            }
                        </div>
                    ))
                }
            </UPSection>
            <Footer className="mt-10" />
        </main>
    )
}

export default PrivacyPolicy;