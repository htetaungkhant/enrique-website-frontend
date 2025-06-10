import React, { useRef, useState } from "react";
import PhoneInput from 'react-phone-input-2';
import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";

import { cn } from "@/lib/utils";

export const PhoneNumberInput = React.forwardRef(({
    name,
    label,
    customPlaceholder,
    customPlaceholderClassName,
    value,
    onChange,
    country,
    className,
    labelClassName,
    error,
    ...props
}, ref) => {
    const inputRef = useRef(ref);
    const [phone, setPhone] = useState(null);

    const onPlaceholderClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const onPhoneNumberChange = (value, data, event, formattedValue) => {
        // value
        // 4201

        // data
        // {
        //     countryCode: "cz",
        //     dialCode: "420",
        //     format: "+... ... ... ...",
        //     name: "Czech Republic",
        // }

        // formattedValue
        // +420 1

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
                    country={country || 'cz'}
                    value={value}
                    onChange={onPhoneNumberChange}
                    containerClass='text-black'
                    inputProps={{
                        name,
                        required: true,
                        ref: inputRef
                    }}
                    {...props}
                    inputClass={cn(
                        'focus:ring focus:ring-blue-500 focus:border-blue-500',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
                        props?.inputClass
                    )}
                    inputStyle={{
                        width: '100%',
                        height: 'unset',
                        paddingTop: '0.345rem',
                        paddingBottom: '0.345rem',
                        ...props?.inputStyle
                    }}
                />
            </div>
            {error && (
                <span className="mt-1 text-xs text-red-500">{error}</span>
            )}
        </div>
    )
});

export const PasswordInput = React.forwardRef(({
    label,
    className,
    labelClassName,
    inputClassName,
    error,
    ...props
}, ref) => {
    const [isPassword, setIsPassword] = useState(true);

    return (
        <div className={cn("min-w-16 flex flex-col gap-1 p-[1px]", className)}>
            {label && <span className={cn("text-xs", labelClassName)}>{label}</span>}
            <div className="flex flex-col">
                <div className="flex items-center relative">
                    <input
                        ref={ref}
                        type={isPassword ? "password" : "text"}
                        className={cn(
                            "w-full p-2 !pr-10 bg-white text-black text-sm rounded-md border border-gray-300 outline-none focus:ring focus:ring-blue-500 focus:border-blue-500",
                            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
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
                {error && (
                    <span className="mt-1 text-xs text-red-500">{error}</span>
                )}
            </div>
        </div>
    );
});
PasswordInput.displayName = "PasswordInput";

export const Textarea = ({
    label,
    className,
    labelClassName,
    textareaClassName,
    error,
    ...props
}) => {
    return (
        <div className={cn("min-w-16 flex flex-col gap-1 p-[1px]", className)}>
            {label && <span className={cn("text-xs", labelClassName)}>{label}</span>}
            <div className="flex flex-col">
                <textarea
                    className={cn(
                        "h-20 p-2 bg-white text-black text-sm rounded-md border border-gray-300 outline-none focus:ring focus:ring-blue-500 focus:border-blue-500",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        textareaClassName
                    )}
                    {...props}
                />
                {error && (
                    <span className="mt-1 text-xs text-red-500">{error}</span>
                )}
            </div>
        </div>
    )
}

const Input = React.forwardRef(({
    label,
    className,
    labelClassName,
    inputClassName,
    error,
    ...props
}, ref) => {
    return (
        <div className={cn("min-w-16 flex flex-col gap-1 p-[1px]", className)}>
            {label && <span className={cn("text-xs", labelClassName)}>{label}</span>}
            <div className="flex flex-col">
                <input
                    ref={ref}
                    className={cn(
                        "p-2 bg-white text-black text-sm rounded-md border border-gray-300 outline-none focus:ring focus:ring-blue-500 focus:border-blue-500",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        inputClassName
                    )}
                    {...props}
                />
                {error && (
                    <span className="mt-1 text-xs text-red-500">{error}</span>
                )}
            </div>
        </div>
    );
});
Input.displayName = "Input";

export default Input;