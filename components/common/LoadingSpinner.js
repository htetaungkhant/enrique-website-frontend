import { cn } from "@/lib/utils";

export default function LoadingSpinner({ className }) {
    return (
        <div className={cn(
            "fixed top-0 left-0 right-0 z-1050",
            className
        )}>
            <div className="w-full h-1.5 bg-gray-200/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-progressBar" />
            </div>
        </div>
    );
}