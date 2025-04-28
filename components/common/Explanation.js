import UPSection from "./UniformPaddingSection"

const Explanation = ({ title, children }) => {
    return (
        <UPSection className="min-h-52 flex flex-col lg:flex-row">
            {title && (
                <div className="lg:min-w-60 lg:max-w-60 pt-1 pb-2 lg:pb-1 lg:pr-8 flex items-center text-white inter-font font-medium text-2xl">
                    <span>{title}</span>
                </div>
            )}
            {children && (
                <div className="pt-2 pb-1 lg:pt-1 lg:pl-8 border-t-[1px] lg:border-t-0 lg:border-l-[1px] border-[#F96CFC] flex items-center text-white inter-font">
                    <span>{children}</span>
                </div>
            )}
        </UPSection>
    )
}

export default Explanation;