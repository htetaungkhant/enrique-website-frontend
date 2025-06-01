import { useState } from "react";
import Image from "next/image";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Pencil, XCircle, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { DateTimePicker } from "@/components/common/DateTimePicker";
import { PointsArray } from "./PointsArray";

const MAX_IMAGE_SIZE_MB = 6;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    hosts: z.array(z.any()).min(1, "Please add at least one host"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    locationCountry: z.string().min(1, "Location country is required"),
    locationAddress: z.string().min(1, "Location address is required"),
    description: z.string().min(1, "Description is required"),
    price: z.string().min(1, "Price is required"),
    mainImage: imageSchema,
    extraDetails: z.array(
        z.object({
            title: z.string().min(1, "Section title is required"),
            points: z.array(z.string().min(1, "Note shouldn't be empty")).min(1, "At least one note is required"),
        })
    ).min(1, "At least one extra detail section is required"),
});

export function CreateCeremonyForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mainImage, setMainImage] = useState(null);
    const [hosts, setHosts] = useState([]);
    const [editingHost, setEditingHost] = useState(null);
    const [hostDialogOpen, setHostDialogOpen] = useState(false);
    const [newHostName, setNewHostName] = useState("");
    const [newHostImage, setNewHostImage] = useState(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            startDate: "",
            endDate: "",
            price: "",
            locationCountry: "",
            locationAddress: "",
            description: "",
            mainImage: null,
            hosts: [],
            extraDetails: [{ title: "", points: [""] }],
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

    const handleHostImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewHostImage(file);
        }
    };

    const handleAddHost = () => {
        if (newHostName && newHostImage) {
            if (editingHost !== null) {
                const updatedHosts = hosts.map((host, i) =>
                    i === editingHost ? { name: newHostName, image: newHostImage } : host
                );
                setHosts(updatedHosts);
                form.setValue('hosts', updatedHosts);
            } else {
                const updatedHosts = [...hosts, { name: newHostName, image: newHostImage }];
                setHosts(updatedHosts);
                form.setValue('hosts', updatedHosts);
            }
            setNewHostName("");
            setNewHostImage(null);
            setHostDialogOpen(false);
            setEditingHost(null);
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

            // Append main image
            formData.append("image", data.mainImage);

            // Append host images
            hosts.forEach(host => {
                formData.append("images", host.image);
            });

            const response = await fetch("/api/admin/ceremony", {
                method: "POST",
                body: formData,
            });
            const responseJson = await response.json();
            if (response.ok) {
                toast.success("Ceremony created successfully");
                form.reset();
                setMainImage(null);
                setHosts([]);
                setEditingHost(null);
                setHostDialogOpen(false);
                setNewHostName("");
                setNewHostImage(null);

                // router.push("/admin/ceremony-management/ceremonies");
            }
            else if (response.status === 400 && responseJson?.errors) {
                console.error("Failed to create ceremony:", responseJson.errors);
                toast.error(
                    <div className="flex flex-col gap-[2px]">
                        {
                            responseJson.errors?.map((message, index) => (
                                <span key={`${message}-${index}`}>{message}.</span>
                            ))
                        }
                    </div>
                )
            }
            else {
                console.error("Failed to create ceremony");
                toast.error("Failed to create ceremony. Please try again.");
            }
        } catch (error) {
            console.error("Error creating ceremony:", error);
            toast.error("Failed to create ceremony. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-8 bg-white p-6 rounded-lg">
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
                                            src={mainImage}
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
                                            {/* <p className="pl-1">or drag and drop</p> */}
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, WEBP up to {MAX_IMAGE_SIZE_MB}MB</p>
                                    </div>
                                )}
                                <Input
                                    id="mainImageInput"
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setMainImage(URL.createObjectURL(file));
                                            onChange(file);
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
                                            src={URL.createObjectURL(host.image)}
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

                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Submit"}
                </Button>
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
                                onChange={(e) => setNewHostName(e.target.value)}
                                placeholder="Enter host name"
                            />
                        </FormItem>
                        <FormItem>
                            <FormLabel>Profile Image</FormLabel>
                            <div
                                onClick={() => document.getElementById('hostImageInput').click()}
                                className="mt-2 cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors"
                            >
                                {newHostImage ? (
                                    <div className="relative w-32 h-32">
                                        <Image
                                            src={URL.createObjectURL(newHostImage)}
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
                                            {/* <p className="pl-1">or drag and drop</p> */}
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
                        disabled={!newHostName || !newHostImage}
                    >
                        {editingHost !== null ? "Update" : "Add"}
                    </Button>
                </DialogContent>
            </Dialog>
        </Form>
    );
}
