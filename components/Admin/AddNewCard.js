import Link from "next/link";
import { Plus } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const AddNewCard = ({
    href,
    onClick,
    label,
    className,
}) => {
    const content = (
        <Card
            onClick={onClick}
            className={cn(
                "p-2 h-full overflow-hidden cursor-pointer hover:bg-accent/50 transition-colors",
                className
            )}
        >
            <div className="flex flex-col items-center justify-center h-full aspect-[4/5] border-2 border-dashed rounded-2xl">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-center">{label}</h3>
            </div>
        </Card>
    )

    if (!href) return content;

    return (
        <Link href={href} className="">
            {content}
        </Link>
    )
}

export default AddNewCard;