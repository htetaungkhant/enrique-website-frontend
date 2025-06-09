import { useState } from "react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { Pencil, Plus, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import { Input } from "@/components/ui/input";
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSurveys } from "@/lib/inhouseAPI/survey-route";

const formSchema = z.object({
    question: z.string().min(1, "Question is required"),
    questionType: z.enum(["single_choice", "text", "rating"]),
    options: z.array(z.string()).optional(),
});

export async function getServerSideProps(context) {
    try {
        const response = await getSurveys(context.req);
        // always sort by id
        response.sort((a, b) => a.id - b.id);

        return {
            props: {
                surveys: response ?? [],
            },
        };
    } catch (error) {
        console.error("Error fetching surveys:", error);
        return {
            props: {
                surveys: [],
            },
        };
    }
}

const Surveys = ({ surveys = [] }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [editingSurvey, setEditingSurvey] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: "",
            questionType: "single_choice",
            options: [""],
        },
    });

    const editForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: "",
            questionType: "single_choice",
            options: [""],
        },
    });

    const onCreateSubmit = async (data) => {
        const body = {
            ...data,
            type: data.questionType,
            options: data.questionType === "single_choice" ? data.options : undefined,
        }

        try {
            setIsSubmitting(true);
            const response = await fetch("/api/admin/survey", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to create survey");
            }

            router.replace(router.asPath);
            toast.success("Survey created successfully");
            setShowCreateDialog(false);
            createForm.reset();
        } catch (error) {
            toast.error(error.message || "Failed to create survey");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onEditSubmit = async (data) => {
        const body = {
            id: editingSurvey.id,
            ...data,
            type: data.questionType,
            options: data.questionType === "single_choice" ? data.options : undefined,
        }

        try {
            setIsSubmitting(true);
            const response = await fetch(`/api/admin/survey/${editingSurvey.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                router.replace(router.asPath);
                toast.success("Survey updated successfully");
                setEditingSurvey(null);
                editForm.reset();
            } else {
                toast.error("Failed to update survey");
            }
        } catch (error) {
            console.error("Error updating survey:", error);
            toast.error("Failed to update survey");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setIsSubmitting(true);
            const response = await fetch("/api/admin/survey", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                router.replace(router.asPath);
                toast.success("Survey deleted successfully");
            } else {
                toast.error("Failed to delete survey");
            }
        } catch (error) {
            console.error("Error deleting survey:", error);
            toast.error("Failed to delete survey");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredSurveys = surveys.filter(survey =>
        survey.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateDialogToggle = () => {
        createForm.reset();
        createForm.clearErrors();
        setShowCreateDialog(!showCreateDialog);
    }

    const handleAddOption = (formMethod, name) => {
        const currentOptions = formMethod.getValues(name) || [];
        formMethod.setValue(name, [...currentOptions, ""]);
    };

    const handleRemoveOption = (formMethod, name, index) => {
        const currentOptions = formMethod.getValues(name);
        const newOptions = currentOptions.filter((_, i) => i !== index);
        formMethod.setValue(name, newOptions);
    };

    return (
        <AdminPagesWrapper>
            <div className="p-6 flex flex-col gap-4">
                <h1 className="text-2xl text-white font-bold">Surveys Management</h1>
                <div className="flex max-lg:flex-col lg:justify-between lg:items-center gap-2">
                    <div className="max-lg:order-2 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        <Input
                            placeholder="Search surveys..."
                            className="pl-10 max-lg:w-full w-80 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => setShowCreateDialog(true)}
                        variant="outline"
                        className="max-lg:order-1 cursor-pointer flex items-center gap-2 bg-white hover:bg-gray-100"
                    >
                        <Plus size={20} />
                        Add New Survey
                    </Button>
                </div>

                <Dialog open={showCreateDialog} onOpenChange={handleCreateDialogToggle}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Survey</DialogTitle>
                        </DialogHeader>
                        <Form {...createForm}>
                            <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4">
                                <FormField
                                    control={createForm.control}
                                    name="question"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Question</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter question"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createForm.control}
                                    name="questionType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Question Type</FormLabel>
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    if (value === 'single_choice') {
                                                        createForm.setValue("options", [""]);
                                                    } else {
                                                        createForm.setValue("options", []);
                                                    }
                                                }}
                                                defaultValue={field.value}
                                                disabled={isSubmitting}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a question type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="single_choice">Single Choice</SelectItem>
                                                    <SelectItem value="text">Text</SelectItem>
                                                    <SelectItem value="rating">Rating</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {createForm.watch("questionType") === "single_choice" && (
                                    <div className="space-y-4">
                                        <FormLabel>Options</FormLabel>
                                        {createForm.watch("options")?.map((option, index) => (
                                            <div key={index} className="flex gap-2">
                                                <FormField
                                                    control={createForm.control}
                                                    name={`options.${index}`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input
                                                                    placeholder={`Option ${index + 1}`}
                                                                    {...field}
                                                                    disabled={isSubmitting}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                {createForm.watch("options").length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        className="text-red-500 cursor-pointer hover:text-red-600 hover:bg-transparent"
                                                        onClick={() => handleRemoveOption(createForm, "options", index)}
                                                        disabled={isSubmitting}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => handleAddOption(createForm, "options")}
                                            className="w-full cursor-pointer"
                                            disabled={isSubmitting}
                                        >
                                            Add Option
                                        </Button>
                                    </div>
                                )}

                                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                                    {isSubmitting ? "Creating..." : "Create Survey"}
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

                <Dialog open={!!editingSurvey} onOpenChange={() => setEditingSurvey(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Survey</DialogTitle>
                        </DialogHeader>
                        <Form {...editForm}>
                            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                                <FormField
                                    control={editForm.control}
                                    name="question"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Question</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter question"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={editForm.control}
                                    name="questionType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Question Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                disabled={isSubmitting}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a question type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="single_choice">Single Choice</SelectItem>
                                                    <SelectItem value="text">Text</SelectItem>
                                                    <SelectItem value="rating">Rating</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {editForm.watch("questionType") === "single_choice" && (
                                    <div className="space-y-4">
                                        <FormLabel>Options</FormLabel>
                                        {editForm.watch("options")?.map((option, index) => (
                                            <div key={index} className="flex gap-2">
                                                <FormField
                                                    control={editForm.control}
                                                    name={`options.${index}`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input
                                                                    placeholder={`Option ${index + 1}`}
                                                                    {...field}
                                                                    disabled={isSubmitting}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                {editForm.watch("options").length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        className="text-red-500 hover:text-red-600 hover:bg-transparent"
                                                        onClick={() => handleRemoveOption(editForm, "options", index)}
                                                        disabled={isSubmitting}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => handleAddOption(editForm, "options")}
                                            className="w-full"
                                            disabled={isSubmitting}
                                        >
                                            Add Option
                                        </Button>
                                    </div>
                                )}

                                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                                    {isSubmitting ? "Updating..." : "Update Survey"}
                                </Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

                <div className="bg-white rounded-md shadow">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-20">ID</TableHead>
                                <TableHead>Question</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSurveys.map((survey, index) => (
                                <TableRow key={survey.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="max-w-md">
                                        <div className="truncate" title={survey.question}>
                                            {survey.question}
                                        </div>
                                    </TableCell>
                                    <TableCell className="capitalize">{survey.questionType.replace('_', ' ')}</TableCell>
                                    <TableCell>
                                        {format(new Date(survey.createdAt), "MMMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setEditingSurvey(survey);
                                                editForm.reset({
                                                    question: survey.question,
                                                    questionType: survey.questionType,
                                                    options: survey.options || [],
                                                });
                                            }}
                                            className="cursor-pointer"
                                            disabled={isSubmitting}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 cursor-pointer"
                                                    disabled={isSubmitting}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        <strong className="text-red-600">This action cannot be undone.</strong> This will permanently delete the survey.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="cursor-pointer bg-red-500 hover:bg-red-600"
                                                        onClick={() => handleDelete(survey.id)}
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? "Deleting..." : "Delete"}
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AdminPagesWrapper>
    );
}

export default Surveys;