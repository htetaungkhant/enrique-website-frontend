import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    Superscript as SuperscriptIcon,
    Subscript as SubscriptIcon,
    ImageIcon,
    IndentIcon,
    Outdent,
    Strikethrough,
    Palette,
    Upload,
    Pencil,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Extension } from '@tiptap/core';
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { FontFamily } from "@tiptap/extension-font-family";
import TextAlign from '@tiptap/extension-text-align';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import BulletList from '@tiptap/extension-bullet-list';
import Strike from '@tiptap/extension-strike';
import { TextStyle as BaseTextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { useAdminAuth } from "@/hooks/adminAuth";
import { cn } from "@/lib/utils";

const MAX_IMAGE_SIZE_MB = 6;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// Schema for the existing JSON object structure
const imageObjectSchema = z.object({
    id: z.string().uuid("Invalid image ID format"),
    image: z.string().url("Invalid image URL format"),
    thumbnail: z.string().url("Invalid thumbnail URL format"),
});

// Schema for File upload
const imageFileSchema = z.any()
    .refine((file) => file instanceof File, "Image is required")
    .refine(
        (file) => file instanceof File && file.size <= MAX_IMAGE_SIZE_BYTES,
        `Image size must not exceed ${MAX_IMAGE_SIZE_MB}MB`
    )
    .refine(
        (file) => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported"
    );

// Union schema that accepts either File or the JSON object
const imageSchema = z.union([
    imageFileSchema,
    imageObjectSchema,
]);

const formSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    content: z.string().trim().min(1, "Content is required"),
    image: imageSchema
});

const FontSizeTextStyle = BaseTextStyle.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            fontSize: {
                default: null,
                parseHTML: element => element.style.fontSize || null,
                renderHTML: attributes => {
                    if (!attributes.fontSize) return {};
                    return { style: `font-size: ${attributes.fontSize}` };
                },
            },
        };
    },
});

const MenuBar = ({ editor }) => {
    if (!editor) return null;

    const addImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (event) => {
            if (event.target.files?.length) {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (typeof e.target?.result === 'string') {
                        editor.chain().focus().setImage({ src: e.target.result }).run();
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    return (
        <div className="border-b border-input bg-muted p-1 flex flex-wrap gap-1">
            <div className="flex items-center gap-0.5 border-r border-input pr-2 mr-2">
                <select
                    className="h-8 w-32 rounded border border-input bg-muted px-2 text-sm hover:bg-accent focus:bg-accent transition-colors"
                    value={editor.getAttributes('textStyle').fontFamily}
                    onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                >
                    <option value="">Font</option>
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Helvetica">Helvetica</option>
                </select>

                <select
                    className="h-8 w-20 rounded border border-input bg-muted px-2 text-sm hover:bg-accent focus:bg-accent transition-colors"
                    value={editor.getAttributes('textStyle').fontSize || ''}
                    onChange={(e) => editor.chain().focus().setMark('textStyle', { fontSize: e.target.value }).run()}
                >
                    <option value="">Size</option>
                    {[8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72]
                        .map((size) => (
                            <option key={size} value={`${size}pt`}>{size}</option>
                        ))
                    }
                </select>
            </div>

            <div className="flex items-center gap-0.5 border-r border-input pr-2 mr-2">
                <Button
                    type="button"
                    variant={editor.isActive("bold") ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className="h-8 w-8 p-0"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive("italic") ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className="h-8 w-8 p-0"
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive("underline") ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className="h-8 w-8 p-0"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive("strike") ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className="h-8 w-8 p-0"
                >
                    <Strikethrough className="h-4 w-4" />
                </Button>
                <div className="relative">
                    <input
                        type="color"
                        className="w-0 h-0 opacity-0 absolute"
                        onChange={e => editor.chain().focus().setColor(e.target.value).run()}
                        id="textColor"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => document.getElementById('textColor').click()}
                    >
                        <Palette className="h-4 w-4" style={{ color: editor.getAttributes('textStyle').color || 'currentColor' }} />
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-0.5 border-r border-input pr-2 mr-2">
                <Button
                    type="button"
                    variant={editor.isActive("subscript") ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleSubscript().run()}
                    className="h-8 w-8 p-0"
                >
                    <SubscriptIcon className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive("superscript") ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().toggleSuperscript().run()}
                    className="h-8 w-8 p-0"
                >
                    <SuperscriptIcon className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex items-center gap-0.5 border-r border-input pr-2 mr-2">
                <Button
                    type="button"
                    variant={editor.isActive({ textAlign: "left" }) ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    className="h-8 w-8 p-0"
                >
                    <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive({ textAlign: "center" }) ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    className="h-8 w-8 p-0"
                >
                    <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive({ textAlign: "right" }) ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    className="h-8 w-8 p-0"
                >
                    <AlignRight className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive({ textAlign: "justify" }) ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                    className="h-8 w-8 p-0"
                >
                    <AlignJustify className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex items-center gap-0.5 border-r border-input pr-2 mr-2">
                <Button
                    type="button"
                    variant={editor.isActive('bulletList') ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => {
                        editor.chain().focus().toggleBulletList().run();
                    }}
                    className="h-8 w-8 p-0"
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant={editor.isActive('orderedList') ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => {
                        editor.chain().focus().toggleOrderedList().run();
                    }}
                    className="h-8 w-8 p-0"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
                            editor.commands.sinkListItem('listItem');
                        } else {
                            editor.commands.indent();
                        }
                    }}
                    className="h-8 w-8 p-0"
                    title="Increase indent"
                >
                    <IndentIcon className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
                            editor.commands.liftListItem('listItem');
                        } else {
                            editor.commands.outdent();
                        }
                    }}
                    className="h-8 w-8 p-0"
                    title="Decrease indent"
                >
                    <Outdent className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex items-center gap-0.5">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addImage}
                    className="h-8 w-8 p-0"
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export function EditBlogForm({ initialData }) {
    const { session } = useAdminAuth();
    const [imagePreview, setImagePreview] = useState(initialData?.image?.image || null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            content: initialData?.content || "",
            image: initialData?.image || undefined,
        },
    });

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                strike: false,
            }),
            BulletList,
            OrderedList,
            ListItem,
            Strike.configure({
                HTMLAttributes: {
                    class: 'line-through',
                },
            }),
            Color.configure({
                types: ['textStyle'],
            }),
            Extension.create({
                name: 'indent',
                addGlobalAttributes() {
                    return [
                        {
                            types: ['paragraph', 'listItem'],
                            attributes: {
                                indent: {
                                    default: 0,
                                    renderHTML: attributes => ({
                                        style: `padding-left: ${attributes.indent * 2}em`
                                    }),
                                    parseHTML: element => element.style.paddingLeft ?
                                        parseInt(element.style.paddingLeft) / 2 : 0
                                }
                            }
                        }
                    ]
                },
                addCommands() {
                    return {
                        indent: () => ({ tr, state, dispatch }) => {
                            const { selection } = state;
                            tr = tr.setSelection(selection);
                            state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
                                if (node.type.name === 'paragraph' || node.type.name === 'listItem') {
                                    const indent = (node.attrs.indent || 0) + 1;
                                    if (indent <= 4) {
                                        tr = tr.setNodeMarkup(pos, null, {
                                            ...node.attrs,
                                            indent
                                        });
                                    }
                                }
                            });
                            if (dispatch) dispatch(tr);
                            return true;
                        },
                        outdent: () => ({ tr, state, dispatch }) => {
                            const { selection } = state;
                            tr = tr.setSelection(selection);
                            state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
                                if (node.type.name === 'paragraph' || node.type.name === 'listItem') {
                                    const indent = Math.max((node.attrs.indent || 0) - 1, 0);
                                    tr = tr.setNodeMarkup(pos, null, {
                                        ...node.attrs,
                                        indent
                                    });
                                }
                            });
                            if (dispatch) dispatch(tr);
                            return true;
                        }
                    }
                }
            }),
            Underline,
            FontSizeTextStyle,
            FontFamily,
            TextAlign.configure({
                types: ['paragraph', 'bulletList', 'orderedList', 'listItem'],
            }),
            Subscript,
            Superscript,
            Highlight,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
        ],
        content: initialData?.content || "<p></p>",
        editorProps: {
            attributes: {
                class: 'prose prose-sm prose-invert max-w-none focus:outline-none min-h-[450px] px-4 py-2 [&_ul]:ml-6 [&_ol]:ml-6 [&_ul]:list-disc [&_ol]:list-decimal [&_li]:pl-0 [&_li]:my-1 text-white [&_p]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white [&_ul]:text-white [&_ol]:text-white',
            },
        },
        onUpdate: ({ editor }) => {
            const content = editor.getHTML();
            const emptyContents = ['', '<p></p>', '<p class=""></p>', '<p><br></p>'];

            if (emptyContents.includes(content.trim()) || !editor.getText().trim()) {
                form.setValue("content", "", { shouldValidate: true });
            } else {
                form.setValue("content", content);
            }
        },
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

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("createdBy", session.user?.name || `${session.user?.firstName} ${session.user?.lastName}`);
            formData.append("content", data.content);
            formData.append("image", data.image instanceof File ? data.image : JSON.stringify(data.image));

            const response = await fetch(`/api/admin/blog/${initialData.id}`, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to update blog");
            }

            toast.success("Blog updated successfully");
            router.replace(router.asPath);
            // router.push(`/admin/blog-management/blogs/${initialData.id}/preview`);
        } catch (error) {
            console.error("Error updating blog:", error);
            toast.error("Failed to update blog");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card className="p-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Title"
                                        {...field}
                                        className="text-lg border focus-visible:ring-0"
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { value, onChange, ...field } }) => (
                            <FormItem>
                                <FormLabel>Thumbnail</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-4 max-w-64">
                                        <div
                                            className={cn(
                                                "relative flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed",
                                                imagePreview ? "border-muted" : "border-primary"
                                            )}
                                            onClick={() => document.getElementById("image").click()}
                                        >
                                            {imagePreview ? (
                                                <>
                                                    <img
                                                        src={imagePreview}
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
                                                    <p className="text-sm font-medium">Upload image</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        Max size: {MAX_IMAGE_SIZE_MB}MB
                                                    </p>
                                                </div>
                                            )}
                                            <input
                                                id="image"
                                                type="file"
                                                accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                                className="hidden"
                                                onChange={(e) => handleImageChange(e, { onChange }, setImagePreview)}
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

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <div className="min-h-[500px] border rounded-md overflow-hidden">
                                        <MenuBar editor={editor} />
                                        <div className="bg-gray-800">
                                            <EditorContent
                                                editor={editor}
                                                className="prose prose-sm dark:prose-invert max-w-none min-h-[500px] p-4"
                                            />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-4 mt-6">
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
                            variant="outline"
                            className="cursor-pointer"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </Card>
            </form>
        </Form>
    );
}