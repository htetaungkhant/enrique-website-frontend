import { useRouter } from "next/router";
import Image from "next/image";
import { format } from "date-fns";
import { MapPin, Calendar, Clock, Edit, Trash2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CeremonyCard = ({
    id,
    image,
    title,
    locationCountry,
    locationAddress,
    startDate,
    endDate,
    startTime,
    endTime,
    onEdit,
    onDelete,
}) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const response = await fetch("/api/admin/ceremony", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                router.replace(router.asPath);
                onDelete && onDelete(id);
            } else {
                console.error("Failed to delete ceremony");
                toast.error("Failed to delete ceremony. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting ceremony:", error);
            toast.error("Failed to delete ceremony. Please try again.");
        }
    };

    return (
        <TooltipProvider>
            <Card className="group p-0 gap-3 h-full overflow-hidden shadow-sm transition-all flex flex-col bg-white">
                <div className="relative h-44">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="px-4 pb-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>

                    <div className="flex flex-col gap-2 mt-3">
                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                            <div>
                                <p className="font-medium">{locationCountry}</p>
                                <p className="text-xs">{locationAddress}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 shrink-0" />
                            <div>
                                <time>
                                    {format(new Date(startDate), "dd MMM yyyy")} - {format(new Date(endDate), "dd MMM yyyy")}
                                </time>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 shrink-0" />
                            <div>
                                {startTime} - {endTime}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => onEdit(id)}
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8 hover:bg-primary/10 hover:text-primary cursor-pointer"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit ceremony</p>
                            </TooltipContent>
                        </Tooltip>

                        <AlertDialog>
                            <Tooltip>
                                <AlertDialogTrigger asChild>
                                    <TooltipTrigger asChild>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8 hover:bg-red-100 hover:text-red-600 hover:border-red-600 cursor-pointer"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                </AlertDialogTrigger>
                                <TooltipContent>
                                    <p>Delete ceremony</p>
                                </TooltipContent>
                            </Tooltip>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <strong className="text-red-600">This action cannot be undone.</strong> This will permanently delete the ceremony and all associated data.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete} className="cursor-pointer">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </Card>
        </TooltipProvider>
    );
};

export default CeremonyCard;
