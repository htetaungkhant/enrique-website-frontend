import { cn } from "@/lib/utils";

const Rating = ({
    dataArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    startLabel = "Completely Disconnected",
    endLabel = "Fully Connected",
    value,
    onChange,
    className,
}) => {
    if (!Array.isArray(dataArray)) return;

    const handleOnClick = (e, data) => {
        e.preventDefault();
        // const data = e.target.value;

        if (onChange) onChange(data);
    }

    return (
        <div className={cn("flex flex-col gap-5", className)}>
            <div className="flex flex-wrap gap-5">
                <div className="flex gap-5 flex-1">
                    {
                        dataArray.slice(0, dataArray.length / 2).map((data, idx) => (
                            <div key={`${data}-${idx}`} className="flex-1 flex justify-center items-center">
                                <button
                                    // value={data}
                                    onClick={(e) => handleOnClick(e, data)}
                                    className={cn(
                                        "flex justify-center items-center max-md:w-8 max-md:h-8 w-10 h-10 rounded-full border-1 border-[#212A63] max-md:text-sm text-black font-bold cursor-pointer duration-150 hover:scale-110",
                                        dataArray.every(n => typeof n === 'number') && data > (Math.max(...dataArray) / 2) ? "bg-white" : "bg-[#CAD1F9]",
                                        data === value && "bg-green-500 text-white border-white",
                                    )}
                                >
                                    {data}
                                </button>
                            </div>
                        ))
                    }
                </div>
                <div className="flex gap-5 flex-1">
                    {
                        dataArray.slice(dataArray.length / 2).map((data, idx) => (
                            <div key={`${data}-${idx}`} className="flex-1 flex justify-center items-center">
                                <button
                                    // value={data}
                                    onClick={(e) => handleOnClick(e, data)}
                                    className={cn(
                                        "flex justify-center items-center max-md:w-8 max-md:h-8 w-10 h-10 rounded-full border-1 border-[#212A63] max-md:text-sm text-black font-bold cursor-pointer duration-150 hover:scale-110",
                                        dataArray.every(n => typeof n === 'number') && data > (Math.max(...dataArray) / 2) ? "bg-white" : "bg-[#CAD1F9]",
                                        data === value && "bg-green-500 text-white border-white",
                                    )}
                                >
                                    {data}
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="flex gap-5 justify-between">
                {startLabel && <span className="max-sm:text-xs">{startLabel}</span>}
                {endLabel && <span className="max-sm:text-xs">{endLabel}</span>}
            </div>
        </div>
    )
}

export default Rating;