import { cn } from "@/lib/utils";

const Checkbox = ({
    label,
    checked,
    onChange,
    className,
}) => {
    return (
        <label
            className={cn(
                "flex items-center gap-2 cursor-pointer select-none",
                className,
            )}
        >
            <span className="relative inline-block w-5 h-5">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="peer appearance-none w-5 h-5 border border-[#212A63] rounded-xs bg-white transition-colors"
                />
                <span className="absolute left-0 top-0 w-5 h-5 flex items-center justify-center"> {/* pointer-events-none */}
                    {checked && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.5 8.5L7 11L11.5 6.5" stroke="#212A63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </span>
            </span>
            {label && (
                typeof label === 'string' ?
                    <span>{label}</span>
                    :
                    label
            )}
        </label>
    );
};

export default Checkbox;
