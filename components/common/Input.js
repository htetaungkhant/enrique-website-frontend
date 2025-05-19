import { useRef, useState } from "react";
import PhoneInput from 'react-phone-input-2';
import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";

import { cn } from "@/lib/utils";

export const PhoneNumberInput = ({
    name,
    label,
    customPlaceholder,
    customPlaceholderClassName,
    value,
    onChange,
    className,
    labelClassName,
    ...props
}) => {
    const inputRef = useRef(null);
    const [phone, setPhone] = useState(null);

    const onPlaceholderClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const onPhoneNumberChange = (value, data, event, formattedValue) => {
        setPhone(value.replace(data.dialCode, ""));
        if (onChange) onChange(value, data, event, formattedValue);
    }

    return (
        <div className={cn('flex flex-col gap-1', className)}>
            {label && <span className={cn('text-xs', labelClassName)}>{label}</span>}
            <div className="relative flex items-center">
                {!phone && customPlaceholder && <span className={cn('absolute left-[5.5rem] text-gray-400 text-xs md:text-sm z-10', customPlaceholderClassName)} onClick={onPlaceholderClick}>{customPlaceholder}</span>}
                <PhoneInput
                    countryCodeEditable={false}
                    country={'cz'}
                    value={value}
                    onChange={onPhoneNumberChange}
                    containerClass='text-black'
                    inputProps={{
                        name,
                        required: true,
                        ref: inputRef
                    }}
                    {...props}
                    inputClass={cn('focus:ring focus:ring-blue-500 focus:border-blue-500', props?.inputClass)}
                    inputStyle={{
                        width: '100%',
                        height: 'unset',
                        paddingTop: '0.345rem',
                        paddingBottom: '0.345rem',
                        ...props?.inputStyle
                    }}
                />
            </div>
        </div>
    )
}

export const PasswordInput = ({ label, className, labelClassName, inputClassName, ...props }) => {
    const [isPassword, setIsPassword] = useState(true);

    return (
        <div className={cn("min-w-16 flex flex-col gap-1 p-[1px]", className)}>
            {label && <span className={cn("text-xs", labelClassName)}>{label}</span>}
            <div className="flex items-center relative">
                <input
                    type={isPassword ? "password" : "text"}
                    className={cn(
                        "w-full p-2 !pr-10 bg-white text-black text-sm rounded-md border border-gray-300 outline-none focus:ring focus:ring-blue-500 focus:border-blue-500",
                        inputClassName,
                    )}
                    {...props}
                />
                {
                    isPassword ?
                        <HiMiniEyeSlash className="text-lg absolute right-3 rotate-x-180 cursor-pointer text-[#848484] hover:text-gray-600" onClick={() => setIsPassword(!isPassword)} />
                        :
                        <HiMiniEye className="text-lg absolute right-3 rotate-x-180 cursor-pointer text-[#848484] hover:text-gray-600" onClick={() => setIsPassword(!isPassword)} />
                }
            </div>
        </div>
    )
}

export const Textarea = ({ label, className, labelClassName, textareaClassName, ...props }) => {
    return (
        <div className={cn("min-w-16 flex flex-col gap-1 p-[1px]", className)}>
            {label && <span className={cn("text-xs", labelClassName)}>{label}</span>}
            <textarea
                className={cn(
                    "h-20 p-2 bg-white text-black text-sm rounded-md border border-gray-300 outline-none focus:ring focus:ring-blue-500 focus:border-blue-500",
                    textareaClassName
                )}
                {...props}
            />
        </div>
    )
}

const Input = ({ label, className, labelClassName, inputClassName, ...props }) => {
    return (
        <div className={cn("min-w-16 flex flex-col gap-1 p-[1px]", className)}>
            {label && <span className={cn("text-xs", labelClassName)}>{label}</span>}
            <input className={cn("p-2 bg-white text-black text-sm rounded-md border border-gray-300 outline-none focus:ring focus:ring-blue-500 focus:border-blue-500", inputClassName)} {...props} />
        </div>
    )
}

export default Input;