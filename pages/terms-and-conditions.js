import Footer from "@/components/common/Footer";
import { PageHeaderWithBanner } from "@/components/common/PageHeader";
import UPSection from "@/components/common/UniformPaddingSection";

const data = {
    '1. Introduction': [
        {
            __html: 'Welcome to Arise Retreats. By accessing our website (<a href="https://arisebufo.com/" target="blank" style="text-decoration: underline">https://arisebufo.com</a>) and using our services, you agree to these Terms & Conditions ("T&C"). Please read them carefully before proceeding.',
        },
    ],
    '2. Eligibility': [
        [
            'You must be 18 years or older to register and participate in our programs.',
            'By using our services, you confirm that you are legally capable of entering into a binding agreement.',
        ]
    ],
    '3. Services & Course Enrollment': [
        [
            'Our website offers educational courses, retreat programs, and related services.',
            'Enrollment in courses requires full payment at the time of registration.',
            'We reserve the right to deny service to anyone at our discretion.',
        ]
    ],
    '4. Payment & Refund Policy': [
        [
            'All payments must be made through our secure payment gateway.',
            'Refunds are available under the following conditions:',
            [
                'Cancellations within 24 hours of purchase: Full refund.',
                'Cancellations after 24 hours but before access to materials: Partial refund (processing fees deducted).',
                'After course access is granted: No refunds.',
            ]
        ]
    ],
    '5. Medical Disclaimer': [
        [
            'Our services and courses are for educational purposes only and do not replace professional medical advice.',
            'Participation in plant medicine practices should be done under professional supervision.',
            'Arise Retreats is not responsible for any medical or psychological outcomes resulting from participation in our programs.',
        ]
    ],
    '6. Code of Conduct': [
        'By using our services, you agree to:',
        [
            'Respect our facilitators, staff, and fellow participants.',
            'Refrain from any abusive, discriminatory, or disruptive behavior.',
            'Comply with all applicable laws and ethical guidelines.',
        ],
        'Failure to adhere to these standards may result in immediate termination of access without a refund.',
    ],
    '7. Intellectual Property': [
        [
            'All content, course materials, and branding on our website are the property of Arise Retreats.',
            'Unauthorized reproduction, distribution, or resale of course materials is strictly prohibited.',
        ]
    ],
    '8. Limitation of Liability': [
        [
            'Arise Retreats is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our services.',
            'We do not guarantee specific outcomes from participating in courses or retreats.',
        ]
    ],
    '9. Changes to Terms': 'We reserve the right to update these Terms & Conditions at any time. Continued use of our services constitutes acceptance of the revised terms.',
    '10. Contact Information': 'For any questions regarding these Terms & Conditions, reach out to us at: info@arisebufo.com',
}

const TermsAndConditions = () => {
    return (
        <main>
            <PageHeaderWithBanner title="Terms & Conditions" />
            <div className="h-32 bg-gradient-to-b from-[#000000] to-[#00000000]" />
            <UPSection className="-mt-24 text-white text-sm md:text-base font-medium flex flex-col gap-3 lg:gap-6">
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

export default TermsAndConditions;