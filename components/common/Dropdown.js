import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

/**
 * Dropdown component
 * @param {string} label - Optional label text displayed above the dropdown
 * @param {Array} options - Array of option objects: { label: string, value: any }
 * @param {any} value - Currently selected value
 * @param {Function} onChange - Callback when an option is selected
 * @param {string} placeholder - Placeholder text when no value is selected
 * @param {"start"|"center"|"end"} popoverContentAlign - Alignment of the popover content relative to the trigger (default: "center")
 * @param {string} className - Additional className for the dropdown container
 * @param {string} labelClassName - Additional className for the label element
 * @param {string} selectBoxClassName - Additional className for the dropdown trigger button
 * @param {string} placeholderClassName - Additional className for the placeholder text
 */
export default function Dropdown({
    label,
    options = [],
    value,
    onChange,
    placeholder = "Select...",
    popoverContentAlign = "center", // "start" | "center" | "end"
    className,
    labelClassName,
    selectBoxClassName,
    placeholderClassName,
}) {
    const triggerRef = useRef(null);
    const [triggerWidth, setTriggerWidth] = useState();
    const [open, setOpen] = useState(false);

    const selected = options.find((opt) => opt.value === value);

    const handleOnLiClick = (value) => {
        if (onChange) onChange(value);

        setOpen(false);
    }

    useLayoutEffect(() => {
        if (open && triggerRef.current) {
            setTriggerWidth(triggerRef.current.offsetWidth);
        }
    }, [open]);

    return (
        <div
            className={cn(
                "flex flex-col gap-1 p-[1px]",
                className,
            )}
        >
            {label && (
                <label className={cn("text-xs font-medium", labelClassName)}>{label}</label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        ref={triggerRef}
                        type="button"
                        className={cn(
                            "w-full p-2 border rounded-md bg-white text-left focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 transition",
                            selectBoxClassName,
                        )}
                    >
                        {selected ? selected.label : <span className={cn("text-muted-foreground text-sm", placeholderClassName)}>{placeholder}</span>}
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    disablePortal
                    className="p-0 w-full"
                    align={popoverContentAlign}
                    style={triggerWidth ? { width: triggerWidth } : undefined}
                >
                    <ul className="divide-y divide-gray-100">
                        {options.map((opt) => (
                            <li key={opt.value}>
                                <button
                                    type="button"
                                    className={cn(
                                        "w-full px-4 py-2 text-left hover:bg-gray-100 transition",
                                        value === opt.value && "bg-gray-100 font-semibold"
                                    )}
                                    onClick={() => handleOnLiClick(opt.value)}
                                >
                                    {opt.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </PopoverContent>
            </Popover>
        </div>
    );
}
