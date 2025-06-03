import { useRouter } from "next/router";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar, Edit, Trash2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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

const CourseCard = ({
    id,
    image,
    title,
    sessionOverview,
    createdBy,
    createdAt,
    price,
    onDelete,
    onEdit,
}) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const response = await fetch("/api/admin/course", {
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
                console.error("Failed to delete course");
                toast.error("Failed to delete course. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error("Failed to delete course. Please try again.");
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

                <div className="px-3 pb-3 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-3">
                        {sessionOverview}
                    </p>

                    <div className="flex flex-col gap-3 pt-3 border-t mt-auto">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                                <AvatarImage src={createdBy.image} alt={createdBy.name} />
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate text-primary/80">
                                    {createdBy.name}
                                </p>
                                <div className="flex items-center gap-1.5 text-muted-foreground/80">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <time className="text-[11px]">
                                        {format(new Date(createdAt), "dd MMM yyyy")}
                                    </time>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t">
                            <div className="px-3 py-1 bg-primary/10 rounded-md">
                                <p className="font-semibold text-primary">€{price}</p>
                            </div>

                            <div className="flex gap-2">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            onClick={() => (onEdit && onEdit(id))}
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary cursor-pointer"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Edit course</p>
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
                                            <p>Delete course</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                <strong className="text-red-600">This action cannot be undone.</strong> This will permanently delete the course and all associated data.
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
                    </div>
                </div>
            </Card>
        </TooltipProvider>
    );
};

export default CourseCard;
