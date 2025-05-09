import { useRef, useState } from "react";
import PhoneInput from 'react-phone-input-2';

import { cn } from "@/lib/utils";

export const PhoneNumberInput = ({ label, customPlaceholder, value, onChange, className, ...props }) => {
    const inputRef = useRef(null);
    const [phone, setPhone] = useState(null);

    const onPlaceholderClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const onPhoneNumberChange = (value, data, event, formattedValue) => {
        setPhone(value.replace(data.dialCode, ""));
        if (onChange) onChange(value)
    }

    return (
        <div className={cn('flex flex-col gap-1 relative', className)}>
            {label && <span className='text-xs max-md:hidden'>{label}</span>}
            {!phone && customPlaceholder && <span className='absolute bottom-[0.55rem] left-[5.5rem] text-gray-400 text-sm z-10' onClick={onPlaceholderClick}>{customPlaceholder}</span>}
            <PhoneInput
                countryCodeEditable={false}
                country={'cz'}
                value={value}
                onChange={onPhoneNumberChange}
                containerClass='text-black'
                inputClass='focus:ring focus:ring-blue-500 focus:border-blue-500'
                inputStyle={{
                    width: '100%',
                    height: 'unset',
                    paddingTop: '0.345rem',
                    paddingBottom: '0.345rem',
                }}
                inputProps={{
                    name: 'phone',
                    required: true,
                    ref: inputRef
                }}
                {...props}
            />
        </div>
    )
}

const Input = ({ label, className, labelClassName, inputClassName, ...props }) => {
    return (
        <div className={cn("min-w-16 flex flex-col gap-1", className)}>
            {label && <span className={cn("text-xs", labelClassName)}>{label}</span>}
            <input className={cn("bg-white text-black text-sm p-2 rounded-md border border-gray-300 outline-none focus:ring focus:ring-blue-500 focus:border-blue-500", inputClassName)} {...props} />
        </div>
    )
}

export default Input;