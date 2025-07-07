import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
import Link from "next/link";

const BlogCard = ({ id, title, image, onEdit, onDelete }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const response = await fetch("/api/admin/blog", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                router.replace(router.asPath);
                onDelete && onDelete(id);
                toast.success("Blog deleted successfully");
            } else {
                console.error("Failed to delete blog");
                toast.error("Failed to delete blog. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            toast.error("Failed to delete blog. Please try again.");
        }
    };

    return (
        <Card className="bg-white py-3 hover:shadow-md transition-shadow">
            <CardContent className="p-3 flex flex-col gap-4">
                <Link href={`/admin/blog-management/blogs/${id}/preview`} className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                        src={image || "/dummy-data/4.jpg"}
                        alt={title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                </Link>
                <Link href={`/admin/blog-management/blogs/${id}/preview`} className="text-gray-900 text-lg font-semibold line-clamp-2 hover:underline">{title}</Link>
                <div className="flex gap-2 mt-auto">
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer flex-1 flex items-center justify-center gap-2 hover:bg-gray-100"
                        onClick={() => (onEdit && onEdit(id))}
                    >
                        <Pencil size={16} />
                        Modify
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="cursor-pointer flex-1 flex items-center justify-center gap-2"
                            >
                                <Trash2 size={16} />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <strong className="text-red-600">This action cannot be undone.</strong> This will permanently delete the blog and all associated data.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="cursor-pointer">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
}

export default BlogCard;