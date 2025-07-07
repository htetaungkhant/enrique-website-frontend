import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

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
import { useAdminAuth } from "@/hooks/adminAuth";


const schema = z.object({
    email: z.string({ required_error: "Email is required" })
        .nonempty({ message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" })
        .nonempty({ message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" }),
});

const LoginForm = () => {
    const router = useRouter();
    const { session, status, signIn } = useAdminAuth();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const result = await signIn({
                provider: "credentials",
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                console.error(result.error);
                toast.error("Invalid email or password");
                setLoading(false);
            } else if (result?.ok) {
                router.replace("/admin/users");
            }
        } catch (error) {
            console.error("An unexpected error occurred", error);
            toast.error("An unexpected error occurred");
            setLoading(false);
        }
    };


    // if (status === "loading") {
    //     return null;
    // }
    // if (typeof window !== "undefined" && status === "authenticated" && session) {
    //     if (window.history.length > 2) {
    //         router.back();
    //     } else {
    //         router.replace("/admin/users");
    //     }
    //     return null;
    // }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-5">
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    id="email"
                                    autoComplete="username"
                                    placeholder="admin@email.com"
                                    {...field}
                                    className={form.formState.errors.email ? "border-red-500 focus:border-red-500" : ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    placeholder="Your password"
                                    {...field}
                                    className={form.formState.errors.password ? "border-red-500 focus:border-red-500" : ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full mt-4 cursor-pointer"
                    disabled={form.formState.isSubmitting || loading}
                >
                    {form.formState.isSubmitting || loading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm;