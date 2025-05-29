import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";


const MAX_IMAGE_SIZE_MB = 6;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

const facilitatorFormSchema = z.object({
    // image: z.any().refine((file) => file instanceof File, "Image is required"),
    image: z
        .any()
        .refine(file => file instanceof File, "Image is required")
        .refine(file => file instanceof File && file.size <= MAX_IMAGE_SIZE_BYTES, `Image size must not exceed ${MAX_IMAGE_SIZE_MB}MB`),
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

export function FacilitatorForm() {
    const router = useRouter();
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm({
        resolver: zodResolver(facilitatorFormSchema),
        defaultValues: {
            image: undefined,
            fullName: "",
            designation: "",
            about: "",
            areaOfExpertise: [{ title: "", description: "" }],
            workAndImpact: [{ title: "", description: "" }],
        },
    });

    const { fields: areaFields, append: appendArea, remove: removeArea } = useFieldArray({
        control: form.control,
        name: "areaOfExpertise",
    });

    const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({
        control: form.control,
        name: "workAndImpact",
    });

    const handleImageChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            field.onChange(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    async function onSubmit(data) {
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("image", data.image);
            formData.append("fullName", data.fullName);
            formData.append("designation", data.designation);
            formData.append("about", data.about);
            formData.append("areaOfExpertise", JSON.stringify(data.areaOfExpertise));
            formData.append("workAndImpact", JSON.stringify(data.workAndImpact));

            const response = await fetch("/api/admin/facilitator", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to create facilitator");
            }

            toast.success("Facilitator created successfully!");
            form.reset();
            setImagePreview(null);
        } catch (error) {
            console.error("Error creating facilitator:", error);
            toast.error("Failed to create facilitator. Please try again.");
        } finally {
            setIsSubmitting(false);

            // form.setError("root", { message: "Failed to create facilitator. Please try again." });
            // setImagePreview(null);
            // form.reset({
            //     image: undefined,
            //     fullName: "",
            //     designation: "",
            //     about: "",
            //     areaOfExpertise: [{ title: "", description: "" }],
            //     workAndImpact: [{ title: "", description: "" }],
            // });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card className="p-6">
                    <div className="space-y-6">
                        {/* Image Upload */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile Image</FormLabel>
                                    <FormControl>
                                        <div>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, field)}
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Basic Information */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter full name"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="designation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Designation</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter designation"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* About Section */}
                        <FormField
                            control={form.control}
                            name="about"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>About</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write about the facilitator..."
                                            className="min-h-[150px]"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Area of Expertise */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <FormLabel className="text-base">Area of Expertise</FormLabel>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => appendArea({ title: "", description: "" })}
                                    disabled={isSubmitting}
                                >
                                    Add Area
                                </Button>
                            </div>
                            {areaFields.map((field, index) => (
                                <Card key={field.id} className="p-4">
                                    <div className="grid gap-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium">Area #{index + 1}</h4>
                                            {index > 0 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeArea(index)}
                                                    disabled={isSubmitting}
                                                    className="hover:text-red-500"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name={`areaOfExpertise.${index}.title`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter title"
                                                            {...field}
                                                            disabled={isSubmitting}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`areaOfExpertise.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Enter description"
                                                            {...field}
                                                            disabled={isSubmitting}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Work and Impact */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <FormLabel className="text-base">Work and Impact</FormLabel>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => appendWork({ title: "", description: "" })}
                                    disabled={isSubmitting}
                                >
                                    Add Work
                                </Button>
                            </div>
                            {workFields.map((field, index) => (
                                <Card key={field.id} className="p-4">
                                    <div className="grid gap-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium">Work #{index + 1}</h4>
                                            {index > 0 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeWork(index)}
                                                    disabled={isSubmitting}
                                                    className="hover:text-red-500"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name={`workAndImpact.${index}.title`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Title (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter title"
                                                            {...field}
                                                            disabled={isSubmitting}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`workAndImpact.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Enter description"
                                                            {...field}
                                                            disabled={isSubmitting}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        className="bg-gray-900 text-gray-200 hover:bg-gray-900 hover:text-white cursor-pointer"
                        onClick={() => router.back()}
                        disabled={isSubmitting}
                    >
                        Go Back
                    </Button>
                    <Button
                        type="submit"
                        size="lg"
                        className="bg-white text-black hover:bg-gray-200 cursor-pointer"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="mr-2">Adding...</span>
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            </>
                        ) : (
                            "Add Facilitator"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
