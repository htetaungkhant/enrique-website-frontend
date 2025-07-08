import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pencil, Plus, Trash2, XCircle } from "lucide-react";
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/common/DateTimePicker";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { PointsArray } from "./PointsArray";

const MAX_IMAGE_SIZE_MB = 6;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const urlToFile = async (url, filename) => {
    try {
        const proxyUrl = `/api/proxy/image?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Failed to fetch image');
        const blob = await response.blob();
        const type = blob.type || 'image/jpeg';
        return new File([blob], filename, { type });
    } catch (error) {
        console.error('Error converting URL to File:', error);
        toast({
            title: "Error",
            description: "Failed to load image. Please try again or upload a new image.",
            variant: "destructive",
        });
        return null;
    }
};

async function convertHeicToJpeg(file) {
    if (file && file.type === "image/heic") {
        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await fetch('/api/convert-heic', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to convert HEIC image');
            }
            const blob = await response.blob();
            return new File([blob], file.name.replace(/\.heic$/i, ".jpg"), { type: "image/jpeg" });
        } catch (err) {
            toast.error("Failed to convert HEIC image. Please try another image.");
            return null;
        }
    }
    return file;
}

const imageSchema = z.any()
    .refine((file) => file instanceof File, "Image is required")
    .refine(
        (file) => file instanceof File && file.size <= MAX_IMAGE_SIZE_BYTES,
        `Image size must not exceed ${MAX_IMAGE_SIZE_MB}MB`
    )
    .refine(
        (file) => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported"
    );

const editCeremonySchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    hosts: z.array(z.object({
        name: z.string().trim().min(1, "Host name is required"),
        image: z.any(),
    })).min(1, "Please add at least one host"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    locationCountry: z.string().trim().min(1, "Location country is required"),
    locationAddress: z.string().trim().min(1, "Location address is required"),
    description: z.string().trim().min(1, "Description is required"),
    price: z.string()
        .trim()
        .min(1, "Price is required")
        .refine(
            (value) => !isNaN(value) && parseFloat(value) > 0,
            "Price must be a positive number greater than zero"
        ),
    mainImage: imageSchema,
    gallery: z.array(z.any())
        .refine(
            (files) => files.every(file =>
                (file instanceof File && file.size <= MAX_IMAGE_SIZE_BYTES) || typeof file === 'string'
            ),
            `Image size must not exceed ${MAX_IMAGE_SIZE_MB}MB`
        )
        .refine(
            (files) => files.every(file =>
                (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)) || typeof file === 'string'
            ),
            "Only .jpg, .jpeg, .png and .webp formats are supported"
        ).optional(),
    extraDetails: z.array(
        z.object({
            title: z.string().trim().min(1, "Section title is required"),
            points: z.array(z.string().trim().min(1, "Note shouldn't be empty")).min(1, "At least one note is required"),
        })
    ).min(1, "At least one extra detail section is required"),
});

export function EditCeremonyForm({ initialData }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isConvertingImages, setIsConvertingImages] = useState(true);
    const [mainImage, setMainImage] = useState(initialData?.image?.image || null);
    const [gallery, setGallery] = useState(initialData?.gallery?.map(img => ({ id: img.id, image: img.image })) || []);
    const [deletedGalleryImages, setDeletedGalleryImages] = useState([]);
    const [hosts, setHosts] = useState(
        initialData?.hosts?.map(host => ({
            name: host.title,
            image: host.image.image,
        })) || []
    );
    const [editingHost, setEditingHost] = useState(null);
    const [hostDialogOpen, setHostDialogOpen] = useState(false);
    const [newHostName, setNewHostName] = useState("");
    const [newHostImage, setNewHostImage] = useState(null);
    const [hostNameError, setHostNameError] = useState("");
    const router = useRouter();

    const location = initialData?.location ? JSON.parse(initialData.location) : { country: "", address: "" };

    const form = useForm({
        resolver: zodResolver(editCeremonySchema),
        defaultValues: {
            title: initialData?.title || "",
            startDate: initialData?.startDate || "",
            endDate: initialData?.endDate || "",
            price: initialData?.price?.toString() || "",
            locationCountry: location.country || "",
            locationAddress: location.address || "",
            description: initialData?.sessionOverview || "",
            mainImage: undefined,
            hosts: initialData?.hosts?.map(host => ({
                name: host.title,
                image: host.image.image,
            })) || [],
            extraDetails: initialData?.extraDetails || [{ title: "", points: [""] }],
        },
    });

    const {
        fields: extraDetailsFields,
        append: appendExtraDetail,
        remove: removeExtraDetail,
    } = useFieldArray({
        control: form.control,
        name: "extraDetails",
    });

    useEffect(() => {
        const convertImages = async () => {
            setIsConvertingImages(true);
            // Handle main image
            if (initialData?.image?.image) {
                const imageFile = await urlToFile(
                    initialData.image.image,
                    `ceremony-image-${initialData.id}.${initialData.image.image.split('.').pop()}`
                );
                if (imageFile) {
                    form.setValue('mainImage', imageFile);
                    setMainImage(imageFile);
                }
            }

            // Handle host images
            if (initialData?.hosts?.length > 0) {
                const hostPromises = initialData.hosts.map(async (host, index) => {
                    if (host.image?.image) {
                        const imageFile = await urlToFile(
                            host.image.image,
                            `host-image-${index}-${initialData.id}.${host.image.image.split('.').pop()}`
                        );
                        return {
                            name: host.title,
                            image: imageFile || host.image.image
                        };
                    }
                    return {
                        name: host.title,
                        image: null
                    };
                });

                const updatedHosts = await Promise.all(hostPromises);
                setHosts(updatedHosts);
                form.setValue('hosts', updatedHosts);
            }

            // Handle gallery images
            setDeletedGalleryImages([]);
            if (initialData?.gallery?.length > 0) {
                const galleryPromises = initialData.gallery.map(async (img, index) => {
                    if (img.image) {
                        const imageFile = await urlToFile(
                            img.image,
                            `gallery-image-${index}-${initialData.id}.${img.image.split('.').pop()}`
                        );
                        return {
                            id: img.id,
                            image: imageFile || img.image
                        };
                    }
                    return null;
                });

                const updatedGallery = (await Promise.all(galleryPromises)).filter(Boolean);
                setGallery(updatedGallery);
                // Don't set form value for existing gallery images
                form.setValue('gallery', []);
            }

            setIsConvertingImages(false);
        };

        if (initialData) {
            convertImages().finally(() => {
                setIsConvertingImages(false);
            });
        } else {
            setIsConvertingImages(false);
        }
    }, [initialData, form]);

    const handleGalleryImageChange = async (e) => {
        let files = Array.from(e.target.files);
        try {
            setIsConvertingImages(true);
            files = await Promise.all(files.map(convertHeicToJpeg));
        } catch (error) {
            toast.error("Failed to convert HEIC image. Please try another image.");
            return;
        } finally {
            setIsConvertingImages(false);
        }

        const validFiles = files.filter(file => {
            const isValidSize = file.size <= MAX_IMAGE_SIZE_BYTES;
            const isValidType = ACCEPTED_IMAGE_TYPES.includes(file.type);
            return isValidSize && isValidType;
        });

        if (validFiles.length !== files.length) {
            toast.error(`Some images were skipped. Images must be under ${MAX_IMAGE_SIZE_MB}MB and in jpg, jpeg, png, or webp format.`);
        }

        // Update gallery state for UI preview
        const updatedGallery = [
            ...gallery,
            ...validFiles.map(file => ({ id: null, image: file }))
        ];
        setGallery(updatedGallery);

        // Update form state with only new files
        const currentFormGallery = form.getValues('gallery') || [];
        form.setValue('gallery', [...currentFormGallery, ...validFiles]);
    };

    const removeGalleryImage = (index) => {
        const removedImage = gallery[index];
        if (removedImage?.id) {
            setDeletedGalleryImages(prev => [...prev, removedImage.id]);
        } else {
            // If it's a new image, remove it from the form's gallery state
            const currentFormGallery = form.getValues('gallery') || [];
            const updatedFormGallery = currentFormGallery.filter(file =>
                file !== removedImage.image
            );
            form.setValue('gallery', updatedFormGallery);
        }

        // Update UI state
        const updatedGallery = gallery.filter((_, i) => i !== index);
        setGallery(updatedGallery);
    };

    const handleHostImageChange = async (e) => {
        let file = e.target.files[0];
        if (file) {
            try {
                setIsConvertingImages(true);
                file = await convertHeicToJpeg(file);
            } catch (error) {
                toast.error("Failed to convert HEIC image. Please try another image.");
                return;
            } finally {
                setIsConvertingImages(false);
            }
            setNewHostImage(file);
        }
    };

    const handleAddHost = () => {
        const trimmedName = newHostName.trim();
        if (!trimmedName) {
            setHostNameError("Host name cannot be empty or just spaces");
            return;
        }
        if (newHostImage) {
            // Validate host image
            const validationResult = imageSchema.safeParse(newHostImage);
            if (!validationResult.success) {
                toast.error(validationResult.error.errors[0].message);
                return;
            }

            if (editingHost !== null) {
                const updatedHosts = hosts.map((host, i) =>
                    i === editingHost ? { name: trimmedName, image: newHostImage } : host
                );
                setHosts(updatedHosts);
                form.setValue('hosts', updatedHosts);
            } else {
                const updatedHosts = [...hosts, { name: trimmedName, image: newHostImage }];
                setHosts(updatedHosts);
                form.setValue('hosts', updatedHosts);
            }
            setNewHostName("");
            setNewHostImage(null);
            setHostDialogOpen(false);
            setEditingHost(null);
            setHostNameError("");
            form.clearErrors('hosts');
        }
    };

    const handleRemoveHost = (index) => {
        const updatedHosts = hosts.filter((_, i) => i !== index);
        setHosts(updatedHosts);
        form.setValue('hosts', updatedHosts);
        if (updatedHosts.length === 0) {
            form.setError('hosts', { type: 'custom', message: 'Please add at least one host' });
        }
    };

    const handleEditHost = (index) => {
        const host = hosts[index];
        setNewHostName(host.name);
        setNewHostImage(host.image);
        setEditingHost(index);
        setHostDialogOpen(true);
    };

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            if (!mainImage) {
                toast.error("Please upload a main image");
                return;
            }

            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("hostNames", JSON.stringify(hosts.map(h => h.name)));
            formData.append("location", JSON.stringify({
                country: data.locationCountry,
                address: data.locationAddress
            }));
            formData.append("startDate", data.startDate);
            formData.append("endDate", data.endDate);
            formData.append("sessionOverview", data.description);
            formData.append("price", data.price);
            formData.append("extraDetails", JSON.stringify(data.extraDetails));

            if (data.mainImage instanceof File) {
                formData.append("image", data.mainImage);
            } else if (mainImage && typeof mainImage === 'string') {
                formData.append("existingImage", JSON.stringify({ image: mainImage }));
            }

            const hostImagesArray = hosts
                .filter(host => host.image instanceof File)
                .map(host => host.image);
            hostImagesArray.forEach(image => {
                formData.append("images", image);
            });

            const existingHostImages = hosts
                .filter(host => !(host.image instanceof File))
                .map(host => ({ image: host.image }));
            if (existingHostImages.length > 0) {
                formData.append("existingImages", JSON.stringify(existingHostImages));
            }

            // Re-order deletedGalleryImages according to initialData order
            if (deletedGalleryImages.length > 0 && Array.isArray(initialData?.gallery) && initialData.gallery?.length > 0) {
                const orderedDeletedImages = initialData.gallery
                    ?.filter(img => deletedGalleryImages.includes(img.id))
                    ?.map(img => img.id)?.reverse() || [];

                // Handle gallery images
                const existingGalleryImages = gallery.filter(g => typeof g.image === 'string');
                const newGalleryImages = form.getValues('gallery') || [];

                if (existingGalleryImages.length > 0) {
                    formData.append("existingGallery", JSON.stringify(
                        existingGalleryImages.map(g => ({ id: g.id, image: g.image }))
                    ));
                }

                if (newGalleryImages.length > 0) {
                    newGalleryImages.forEach(file => {
                        formData.append("gallery", file);
                    });
                }

                // Add ordered deleted gallery images
                formData.append("deletedGalleryImages", JSON.stringify(orderedDeletedImages));
            } else {
                // Handle gallery images when there are no deleted images
                const existingGalleryImages = gallery.filter(g => typeof g.image === 'string');
                const newGalleryImages = form.getValues('gallery') || [];

                if (existingGalleryImages.length > 0) {
                    formData.append("existingGallery", JSON.stringify(
                        existingGalleryImages.map(g => ({ id: g.id, image: g.image }))
                    ));
                }

                if (newGalleryImages.length > 0) {
                    newGalleryImages.forEach(file => {
                        formData.append("gallery", file);
                    });
                }

                // if (deletedGalleryImages.length > 0) {
                //     formData.append("deletedGalleryImages", JSON.stringify(deletedGalleryImages));
                // }
            }

            const response = await fetch(`/api/admin/ceremony/${initialData.id}`, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to update ceremony");
            }

            toast.success("Ceremony updated successfully!");

            router.replace(router.asPath);
        } catch (error) {
            toast.error("Failed to update ceremony. Please try again.");
            const responseJson = await error.response?.json();
            if (responseJson?.errors) {
                toast.error(
                    <div className="flex flex-col gap-[2px]">
                        {responseJson.errors?.map((message, index) => (
                            <span key={`${message}-${index}`}>{message}.</span>
                        ))}
                    </div>
                );
            } else if (responseJson?.error) {
                toast.error(responseJson.error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isConvertingImages) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-white rounded-lg">
                <LoadingSpinner />
                <p className="text-gray-600">Loading data, please wait...</p>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-8">
                <Card className="p-6 space-y-8 bg-white rounded-lg">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name of Ceremony *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter ceremony name"
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
                        name="mainImage"
                        render={({ field: { onChange, value, ...field } }) => (
                            <FormItem>
                                <FormLabel>Image *</FormLabel>
                                <div
                                    onClick={() => document.getElementById('mainImageInput').click()}
                                    className="mt-2 cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors"
                                >
                                    {mainImage ? (
                                        <div className="relative w-full h-48">
                                            <Image
                                                src={typeof mainImage === 'string' ? mainImage : URL.createObjectURL(mainImage)}
                                                alt="Main image preview"
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setMainImage(null);
                                                    onChange(null);
                                                }}
                                                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 cursor-pointer"
                                                disabled={isSubmitting}
                                            >
                                                <XCircle className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <div className="mt-2 flex justify-center text-sm text-gray-600">
                                                <span className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80">
                                                    Upload a file
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, WEBP up to {MAX_IMAGE_SIZE_MB}MB</p>
                                        </div>
                                    )}
                                    <Input
                                        id="mainImageInput"
                                        type="file"
                                        onChange={async (e) => {
                                            let file = e.target.files?.[0];
                                            if (file) {
                                                file = await convertHeicToJpeg(file);
                                                if (file) {
                                                    setMainImage(file);
                                                    onChange(file);
                                                }
                                            }
                                        }}
                                        accept="image/*"
                                        className="hidden"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-4">
                        <FormLabel>Host *</FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {hosts.map((host, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={host.image instanceof File ? URL.createObjectURL(host.image) : host.image}
                                                alt={host.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                {host.name}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            type="button"
                                            onClick={() => handleEditHost(index)}
                                            className="p-1.5 bg-primary/10 hover:bg-primary/20 rounded text-primary transition-colors cursor-pointer"
                                            disabled={isSubmitting}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveHost(index)}
                                            className="p-1.5 bg-destructive/10 hover:bg-destructive/20 rounded text-destructive transition-colors cursor-pointer"
                                            disabled={isSubmitting}
                                        >
                                            <XCircle className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    setHostDialogOpen(true);
                                    setEditingHost(null);
                                    setNewHostName("");
                                    setNewHostImage(null);
                                }}
                                disabled={isSubmitting}
                                className="group relative bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors min-h-[116px] flex flex-col items-center justify-center text-gray-500 hover:text-gray-600 cursor-pointer"
                            >
                                <Plus className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Add Host</span>
                            </button>
                        </div>
                        {form.formState.errors.hosts && (
                            <p className="text-sm font-medium text-destructive">
                                Please add at least one host
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date And Time Of Ceremony *</FormLabel>
                                    <FormControl>
                                        <DateTimePicker
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select start date and time"
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date And Time Of Ceremony *</FormLabel>
                                    <FormControl>
                                        <DateTimePicker
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select end date and time"
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fee Amount of Ceremony *</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="€ 1000"
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
                        name="locationCountry"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location Of Ceremony *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter location country"
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
                        name="locationAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location Address *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter location address"
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
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description *</FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={6}
                                        placeholder="Enter description"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <FormLabel>Extra Details *</FormLabel>
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
                                {extraDetailsFields.length > 1 && (
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

                    <FormField
                        control={form.control}
                        name="gallery"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gallery Images</FormLabel>
                                <div
                                    onClick={() => document.getElementById('galleryImageInput').click()}
                                    className="mt-2 cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors"
                                >
                                    <div className="text-center">
                                        <div className="mt-2 flex justify-center text-sm text-gray-600">
                                            <span className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80">
                                                Upload gallery images
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, WEBP up to {MAX_IMAGE_SIZE_MB}MB</p>
                                    </div>
                                    <Input
                                        id="galleryImageInput"
                                        type="file"
                                        onChange={handleGalleryImageChange}
                                        accept="image/*"
                                        className="hidden"
                                        multiple
                                        disabled={isSubmitting}
                                    />
                                </div>
                                {gallery.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                        {gallery.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <div className="relative w-full h-48">
                                                    <Image
                                                        src={typeof image.image === 'string' ? image.image : URL.createObjectURL(image.image)}
                                                        alt={`Gallery image ${index + 1}`}
                                                        fill
                                                        className="object-cover rounded-lg"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeGalleryImage(index);
                                                    }}
                                                    className="absolute top-2 right-2 p-1.5 bg-destructive/10 hover:bg-destructive/20 rounded text-destructive transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                                                    disabled={isSubmitting}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    <Button type="submit" variant="outline" className="cursor-pointer" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update"}
                    </Button>
                </div>
            </form>

            <Dialog open={hostDialogOpen} onOpenChange={setHostDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingHost !== null ? "Edit Host" : "Add New Host"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <Input
                                value={newHostName}
                                onChange={(e) => {
                                    setNewHostName(e.target.value);
                                    setHostNameError("");
                                }}
                                placeholder="Enter host name"
                            />
                        </FormItem>
                        {hostNameError && (
                            <p className="text-sm text-destructive mt-1">{hostNameError}</p>
                        )}
                        <FormItem>
                            <FormLabel>Profile Image</FormLabel>
                            <div
                                onClick={() => document.getElementById('hostImageInput').click()}
                                className="mt-2 cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors"
                            >
                                {newHostImage ? (
                                    <div className="relative w-32 h-32">
                                        <Image
                                            src={newHostImage instanceof File ? URL.createObjectURL(newHostImage) : newHostImage}
                                            alt="Host preview"
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="mt-2 flex justify-center text-sm text-gray-600">
                                            <span className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80">
                                                Upload a file
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, WEBP up to {MAX_IMAGE_SIZE_MB}MB</p>
                                    </div>
                                )}
                                <Input
                                    id="hostImageInput"
                                    type="file"
                                    onChange={handleHostImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        </FormItem>
                    </div>
                    <Button
                        onClick={handleAddHost}
                        className="cursor-pointer"
                        disabled={!newHostName.trim() || !newHostImage}
                    >
                        {editingHost !== null ? "Update" : "Add"}
                    </Button>
                </DialogContent>
            </Dialog>
        </Form>
    );
}
