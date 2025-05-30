import { useState } from "react";
import { useForm, useFieldArray, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as React from "react";
import { Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const MAX_IMAGE_SIZE_MB = 6;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const courseFormSchema = z.object({
    courseImage: z
        .any()
        .refine((file) => file instanceof File, "Course image is required")
        .refine(
            (file) => file instanceof File && file.size <= MAX_IMAGE_SIZE_BYTES,
            `Image size must not exceed ${MAX_IMAGE_SIZE_MB}MB`
        )
        .refine(
            (file) => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported"
        ),
    createdByImage: z
        .any()
        .refine((file) => file instanceof File, "Creator's image is required")
        .refine(
            (file) => file instanceof File && file.size <= MAX_IMAGE_SIZE_BYTES,
            `Image size must not exceed ${MAX_IMAGE_SIZE_MB}MB`
        )
        .refine(
            (file) => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported"
        ),
    title: z.string().min(1, "Title is required"),
    price: z.string().min(1, "Price is required"),
    createdBy: z.string().min(1, "Creator name is required"),
    sessionOverview: z.string().min(1, "Session overview is required"),
    extraDetails: z.array(
        z.object({
            title: z.string().min(1, "Section title is required"),
            points: z.array(z.string().min(1, "Note shouldn't empty")).min(1, "At least one note is required"),
        })
    ).min(1, "At least one extra detail section is required"),
    courseVideos: z.array(
        z.object({
            video: z.string().min(1, "Video URL is required"),
            title: z.string().min(1, "Video title is required"),
            points: z.array(z.string().min(1, "Note shouldn't empty")).optional(), // Points are optional for course videos
        })
    ).min(1, "At least one course video is required"),
});

const PointsArray = ({ name, index, isExtraDetails, isSubmitting }) => {
    const { watch, setValue, control } = useFormContext();
    const pointsPath = `${name}.${index}.points`;
    const points = watch(pointsPath) || [];

    const handleAdd = () => {
        setValue(pointsPath, [...points, ""]);
    };

    const handleRemove = (pointIndex) => {
        const newPoints = [...points];
        newPoints.splice(pointIndex, 1);
        setValue(pointsPath, newPoints);
    };

    return (
        <div className="space-y-2">
            {points.map((point, pointIndex) => (
                <div key={pointIndex} className="flex gap-2">
                    <FormField
                        control={control}
                        name={`${name}.${index}.points.${pointIndex}`}
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        placeholder="Add a note" // {`${isExtraDetails ? "Add a note (required)" : "Add a note (optional)"}`}
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        isExtraDetails ? (
                            points.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemove(pointIndex)}
                                    className="h-10 w-10 cursor-pointer"
                                    disabled={isSubmitting}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )
                        )
                            : (
                                points.length > 0 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemove(pointIndex)}
                                        className="h-10 w-10 cursor-pointer"
                                        disabled={isSubmitting}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )
                            )
                    }
                </div>
            ))}
            <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 cursor-pointer"
                onClick={handleAdd}
                disabled={isSubmitting}
            >
                Add Note
            </Button>
        </div>
    );
};

export function CourseForm() {
    const [courseImagePreview, setCourseImagePreview] = useState(null);
    const [creatorImagePreview, setCreatorImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(courseFormSchema),
        defaultValues: {
            courseImage: undefined,
            createdByImage: undefined,
            title: "",
            price: "",
            createdBy: "",
            sessionOverview: "",
            extraDetails: [{ title: "", points: [""] }],
            courseVideos: [{ video: "", title: "", points: [] }],
        },
    });

    // Extra Details Field Array
    const {
        fields: extraDetailsFields,
        append: appendExtraDetail,
        remove: removeExtraDetail,
    } = useFieldArray({
        control: form.control,
        name: "extraDetails",
    });

    // Course Videos Field Array
    const {
        fields: courseVideosFields,
        append: appendCourseVideo,
        remove: removeCourseVideo,
    } = useFieldArray({
        control: form.control,
        name: "courseVideos",
    });

    const handleImageChange = (e, field, setPreview) => {
        if (e.target.files?.[0]) {
            field.onChange(e.target.files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    async function onSubmit(data) {
        try {
            setIsSubmitting(true);

            const formData = new FormData();
            formData.append("courseImage", data.courseImage);
            formData.append("createdByImage", data.createdByImage);
            formData.append("title", data.title);
            formData.append("price", data.price);
            formData.append("createdBy", data.createdBy);
            formData.append("sessionOverview", data.sessionOverview);
            formData.append("extraDetails", JSON.stringify(data.extraDetails));
            formData.append("courseVideos", JSON.stringify(data.courseVideos));

            const response = await fetch("/api/admin/course", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to create course");
            }

            toast.success("Course created successfully!");
            form.reset();
            setCourseImagePreview(null);
            setCreatorImagePreview(null);
        } catch (error) {
            console.error("Error creating course:", error);
            toast.error("Failed to create course. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card className="p-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Course Information */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">Course Information</h2>

                            {/* Course Image Upload */}
                            <FormField
                                control={form.control}
                                name="courseImage"
                                render={({ field: { value, onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>Course Image</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={cn(
                                                        "relative flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed",
                                                        courseImagePreview ? "border-muted" : "border-primary"
                                                    )}
                                                    onClick={() => document.getElementById("courseImage").click()}
                                                >
                                                    {courseImagePreview ? (
                                                        <>
                                                            <img
                                                                src={courseImagePreview}
                                                                alt="Preview"
                                                                className="h-full w-full rounded-lg object-cover"
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                                                                <Pencil className="h-6 w-6 text-white" />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex flex-col items-center gap-2 p-4 text-center">
                                                            <Upload className="h-8 w-8 text-primary" />
                                                            <p className="text-sm font-medium">Upload course image</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Max size: {MAX_IMAGE_SIZE_MB}MB
                                                            </p>
                                                        </div>
                                                    )}
                                                    <input
                                                        id="courseImage"
                                                        type="file"
                                                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                                        className="hidden"
                                                        onChange={(e) => handleImageChange(e, { onChange }, setCourseImagePreview)}
                                                        {...field}
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Course Title and Price */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Course Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter course title"
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
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price (€)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter price"
                                                    min="0"
                                                    step="0.01"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Session Overview */}
                            <FormField
                                control={form.control}
                                name="sessionOverview"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Session Overview</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter session overview"
                                                className="min-h-[120px]"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Creator Information */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">Creator Information</h2>

                            {/* Creator Image Upload */}
                            <FormField
                                control={form.control}
                                name="createdByImage"
                                render={({ field: { value, onChange, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>Creator Image</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={cn(
                                                        "relative flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed",
                                                        creatorImagePreview ? "border-muted" : "border-primary"
                                                    )}
                                                    onClick={() => document.getElementById("creatorImage").click()}
                                                >
                                                    {creatorImagePreview ? (
                                                        <>
                                                            <img
                                                                src={creatorImagePreview}
                                                                alt="Preview"
                                                                className="h-full w-full rounded-lg object-cover"
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                                                                <Pencil className="h-6 w-6 text-white" />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex flex-col items-center gap-2 p-4 text-center">
                                                            <Upload className="h-8 w-8 text-primary" />
                                                            <p className="text-sm font-medium">Upload creator image</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Max size: {MAX_IMAGE_SIZE_MB}MB
                                                            </p>
                                                        </div>
                                                    )}
                                                    <input
                                                        id="creatorImage"
                                                        type="file"
                                                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                                        className="hidden"
                                                        onChange={(e) => handleImageChange(e, { onChange }, setCreatorImagePreview)}
                                                        {...field}
                                                        disabled={isSubmitting}
                                                    />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Creator Name */}
                            <FormField
                                control={form.control}
                                name="createdBy"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Creator Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter creator's name"
                                                {...field}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Extra Details Sections */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <FormLabel>Extra Details</FormLabel>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="cursor-pointer"
                                onClick={() => appendExtraDetail({ title: "", points: [""] })}
                                disabled={isSubmitting}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Section
                            </Button>
                        </div>
                        {extraDetailsFields.map((field, index) => (
                            <div key={field.id} className="rounded-lg border p-4">
                                {index > 0 && (
                                    <div className="mb-4 flex justify-end">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeExtraDetail(index)}
                                            className="h-10 w-10 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                                            disabled={isSubmitting}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                                <div className="mb-4">
                                    <FormField
                                        control={form.control}
                                        name={`extraDetails.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Section title"
                                                        {...field}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <PointsArray
                                    name="extraDetails"
                                    index={index}
                                    isExtraDetails={true}
                                    isSubmitting={isSubmitting}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Course Videos */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <FormLabel>Course Videos</FormLabel>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="cursor-pointer"
                                onClick={() => appendCourseVideo({ video: "", title: "", points: [] })}
                                disabled={isSubmitting}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Video
                            </Button>
                        </div>
                        {courseVideosFields.map((field, index) => (
                            <div key={field.id} className="rounded-lg border p-4">
                                {index > 0 && (
                                    <div className="mb-4 flex justify-end">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeCourseVideo(index)}
                                            className="h-10 w-10 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                                            disabled={isSubmitting}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                                <div className="mb-4">
                                    <FormField
                                        control={form.control}
                                        name={`courseVideos.${index}.video`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Video URL"
                                                        {...field}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="mb-4">
                                    <FormField
                                        control={form.control}
                                        name={`courseVideos.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Video title"
                                                        {...field}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <PointsArray
                                    name="courseVideos"
                                    index={index}
                                    isExtraDetails={false}
                                    isSubmitting={isSubmitting}
                                />
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button type="submit" variant="outline" className="cursor-pointer" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <span className="mr-2">Creating...</span>
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
                            "Create Course"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
