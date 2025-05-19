import * as React from "react";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";

import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "../ui/popover";

/**
 * CustomDatepicker component using Shadcn Popover and Calendar
 * @param {Object} props
 * @param {string} [props.label] - Optional label text displayed above the datepicker
 * @param {Date|null} props.value - The selected date
 * @param {(date: Date|null) => void} props.onChange - Callback when date changes
 * @param {string} [props.placeholder] - Placeholder text when no date is selected
 * @param {"start"|"center"|"end"} [props.popoverContentAlign] - Alignment of the popover content
 * @param {string} [props.className] - Additional className for the wrapper
 * @param {string} [props.labelClassName] - Additional className for the label
 * @param {string} [props.inputBoxClassName] - Additional className for the input box/button
 * @param {string} [props.placeholderClassName] - Additional className for the placeholder text
 */
export default function Datepicker({
    label,
    value,
    onChange,
    placeholder = "Pick a date",
    popoverContentAlign = "start", // "start" | "center" | "end"
    className,
    labelClassName,
    inputBoxClassName,
    placeholderClassName,
}) {
    const [open, setOpen] = React.useState(false);

    return (
        <div
            className={cn(
                "flex flex-col gap-1 p-[1px] relative",
                className,
            )}
        >
            {label && (
                <label className={cn("text-xs font-medium", labelClassName)}>{label}</label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        className={cn(
                            "w-full p-2 pr-10 flex items-center border rounded-md bg-white text-left focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 transition relative",
                            inputBoxClassName,
                        )}
                    >
                        {value ? format(value, "PPP") : <span className={cn("text-muted-foreground text-sm", placeholderClassName)}>{placeholder}</span>}
                        <FiCalendar className="absolute right-3 text-lg text-muted-foreground" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full" align={popoverContentAlign} disablePortal>
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={(date) => {
                            onChange?.(date);
                            setOpen(false);
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
