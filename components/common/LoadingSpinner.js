import { cn } from "@/lib/utils";

export default function LoadingSpinner({ className }) {
    return (
        <div className={cn(
            "fixed inset-0 bg-black/50 backdrop-blur-sm z-1050 flex items-center justify-center",
            className
        )}>
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        </div>
    );
}