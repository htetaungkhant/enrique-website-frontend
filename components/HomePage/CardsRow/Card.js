const Card = ({ badgeText, children, className }) => {
    return (
        <div className={`relative bg-gradient-to-b from-[#D7F2D5] to-[#5C8959] flex flex-col items-start gap-5 rounded-3xl px-4 py-6 lg:px-6 lg:py-8 ${className}`}>
            {badgeText && <span className="block border-[#022645] border-[1px] rounded-4xl px-4 py-1 inter-font font-medium text-[#022645] text-xs md:text-base">{badgeText}</span>}
            {children}
        </div>
    );
}

export default Card;