import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Pencil, Trash2, Plus, Minus, Upload } from "lucide-react";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const MAX_IMAGE_SIZE_MB = 6;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

const facilitatorFormSchema = z.object({
    image: z
        .any()
        .optional()
        .refine(
            file => !file || (file instanceof File && file.size <= MAX_IMAGE_SIZE_BYTES),
            `Image size must not exceed ${MAX_IMAGE_SIZE_MB}MB`
        ),
    fullName: z.string().min(1, "Full name is required"),
    designation: z.string().min(1, "Designation is required"),
    about: z.string().min(1, "About section is required"),
    areaOfExpertise: z.array(
        z.object({
            title: z.string().min(1, "Title is required"),
            description: z.string().min(1, "Description is required"),
        })
    ).min(1, "At least one area of expertise is required"),
    workAndImpact: z.array(
        z.object({
            title: z.string(),
            description: z.string().min(1, "Description is required"),
        })
    ).min(1, "At least one work and impact item is required"),
});

const FacilitatorCard = ({
    id,
    fullName,
    image,
    designation,
    about,
    areaOfExpertise,
    workAndImpact,
    className,
    onDelete,
}) => {
    if (!fullName || !image) return null;

    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(image);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(facilitatorFormSchema),
        defaultValues: {
            fullName,
            designation,
            about,
            areaOfExpertise,
            workAndImpact,
        },
    });

    // Reset form with updated values when dialog opens
    useEffect(() => {
        if (isDialogOpen) {
            form.reset({
                fullName,
                designation,
                about,
                areaOfExpertise,
                workAndImpact,
            });
            setImagePreview(image);
        }
    }, [isDialogOpen, form, fullName, designation, about, areaOfExpertise, workAndImpact, image]);

    const { fields: areaFields, append: appendArea, remove: removeArea } = useFieldArray({
        control: form.control,
        name: "areaOfExpertise",
    });

    const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({
        control: form.control,
        name: "workAndImpact",
    });

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > MAX_IMAGE_SIZE_BYTES) {
                toast.error(`Image size must not exceed ${MAX_IMAGE_SIZE_MB}MB`);
                return;
            }
            form.setValue("image", file, { shouldValidate: true });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch("/api/admin/facilitator", {
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
                console.error("Failed to delete facilitator");
                toast.error("Failed to delete facilitator. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting facilitator:", error);
            toast.error("Failed to delete facilitator. Please try again.");
        }
    };

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            const formData = new FormData();
            formData.append("id", id);
            formData.append("fullName", data.fullName);
            if (data.image) {
                formData.append("image", data.image);
            }
            formData.append("designation", data.designation);
            formData.append("about", data.about);
            formData.append("areaOfExpertise", JSON.stringify(data.areaOfExpertise));
            formData.append("workAndImpact", JSON.stringify(data.workAndImpact));

            const response = await fetch(
                `/api/admin/facilitator/${id}`,
                {
                    method: "PUT",
                    body: formData,
                }
            );

            const result = await response.json();

            if (response.ok) {
                setIsDialogOpen(false);
                router.replace(router.asPath);
                toast.success("Facilitator updated successfully!");
            } else {
                console.error("Server error:", result);
                toast.error(result.error || "Failed to update facilitator. Please try again.");
            }
        } catch (error) {
            console.error("Error updating facilitator:", error);
            toast.error("Failed to update facilitator. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card
            className={cn(
                "p-2 flex flex-col",
                className,
            )}
        >
            <div className="relative aspect-[4/5]">
                <Image
                    src={image}
                    alt={fullName}
                    fill
                    className="object-cover rounded-2xl"
                />
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <h3 className="font-semibold text-lg">
                    {fullName}
                </h3>
                <div className="mt-2 flex flex-col gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="secondary" className="w-full justify-between cursor-pointer">
                                MODIFY PROFILE
                                <Pencil className="h-4 w-4 ml-2" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="md:max-w-2xl lg:max-w-3xl xl:max-w-5xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Edit Facilitator Profile</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                                <div className="space-y-7">
                                    <div>
                                        <Label htmlFor="image">Profile Image</Label>
                                        <div className="mt-2">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                id="image-upload"
                                                disabled={isSubmitting}
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                className="relative aspect-square h-40 block overflow-hidden rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
                                            >
                                                {imagePreview ? (
                                                    <>
                                                        <Image
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                            <Upload className="h-10 w-10 text-white" />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex h-full items-center justify-center bg-muted hover:bg-muted/80 transition-colors">
                                                        <Upload className="h-10 w-10 text-muted-foreground" />
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            {...form.register("fullName")}
                                        />
                                        {form.formState.errors.fullName && (
                                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.fullName.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="designation">Designation</Label>
                                        <Input
                                            id="designation"
                                            {...form.register("designation")}
                                        />
                                        {form.formState.errors.designation && (
                                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.designation.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="about">About</Label>
                                        <Textarea
                                            id="about"
                                            {...form.register("about")}
                                        />
                                        {form.formState.errors.about && (
                                            <p className="text-sm text-red-500 mt-1">{form.formState.errors.about.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Areas of Expertise</Label>
                                        {areaFields.map((field, index) => (
                                            <div key={field.id} className="mt-4 relative p-3 border rounded-lg">
                                                {index > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeArea(index)}
                                                        className="absolute -right-3 -top-3 h-6 w-6 border rounded-full bg-white text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label>Title</Label>
                                                        <Input
                                                            {...form.register(`areaOfExpertise.${index}.title`)}
                                                        />
                                                        {form.formState.errors.areaOfExpertise?.[index]?.title && (
                                                            <p className="text-sm text-red-500 mt-1">
                                                                {form.formState.errors.areaOfExpertise[index].title.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <Label>Description</Label>
                                                        <Textarea
                                                            {...form.register(`areaOfExpertise.${index}.description`)}
                                                        />
                                                        {form.formState.errors.areaOfExpertise?.[index]?.description && (
                                                            <p className="text-sm text-red-500 mt-1">
                                                                {form.formState.errors.areaOfExpertise[index].description.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-3 cursor-pointer"
                                            onClick={() => appendArea({ title: "", description: "" })}
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add More
                                        </Button>
                                    </div>

                                    <div>
                                        <Label>Work and Impact</Label>
                                        {workFields.map((field, index) => (
                                            <div key={field.id} className="mt-4 relative p-3 border rounded-lg">
                                                {index > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeWork(index)}
                                                        className="absolute -right-3 -top-3 h-6 w-6 border rounded-full bg-white text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label>Title (Optional)</Label>
                                                        <Input
                                                            {...form.register(`workAndImpact.${index}.title`)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Description</Label>
                                                        <Textarea
                                                            {...form.register(`workAndImpact.${index}.description`)}
                                                        />
                                                        {form.formState.errors.workAndImpact?.[index]?.description && (
                                                            <p className="text-sm text-red-500 mt-1">
                                                                {form.formState.errors.workAndImpact[index].description.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-3 cursor-pointer"
                                            onClick={() => appendWork({ title: "", description: "" })}
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add More
                                        </Button>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                                    {isSubmitting ? "Saving..." : "Save Changes"}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full justify-between cursor-pointer">
                                DELETE PROFILE
                                <Trash2 className="h-4 w-4 ml-2" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete {fullName}'s profile.
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
    )
}

export default FacilitatorCard;