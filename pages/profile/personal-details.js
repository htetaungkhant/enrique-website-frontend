import { useState } from "react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import ProfilePagesWrapper from "@/components/common/auth/ProfilePagesWrapper";
import { useUserAuth } from "@/hooks/userAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authOptions } from "../api/auth/[...nextauth]";

const personalInfoSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
});

const contactInfoSchema = z.object({
    phone: z.string().min(1, "Phone number is required"),
});

export async function getServerSideProps(context) {
    const { req, res } = context;

    const session = await getServerSession(req, res, authOptions);

    return {
        props: {
            user: session?.user || null,
            backendData: session?.user?.backendData || null,
        },
    };

    // const { req, res, query } = context;
    // const url = req.url;
    // const session = await getServerSession(req, res, authOptions);

    // const { comeFrom, ...restQuery } = query;

    // if (session.validationFailed) {
    //     // return {
    //     //     redirect: {
    //     //         destination: `/api/auth/signout?callbackUrl=${encodeURIComponent(comeFrom || "/")}`,
    //     //         permanent: false,
    //     //     },
    //     // };

    //     // return {
    //     //     redirect: {
    //     //         destination: comeFrom || "/",
    //     //         permanent: false,
    //     //     },
    //     // };

    //     return {
    //         redirect: {
    //             destination: `/user-auth-pages/access-denied-auto-logout?callbackUrl=${encodeURIComponent(comeFrom || "/")}`,
    //             permanent: false,
    //         },
    //     };
    // }
    // else if (comeFrom) {
    //     // option 1
    //     // const baseUrl = req.headers.origin || `http://${req.headers.host}`;
    //     // const urlObj = new URL(url, baseUrl);
    //     // urlObj.searchParams.delete("comeFrom");
    //     // const newUrl = urlObj.pathname + urlObj.search;

    //     // option 2
    //     // const protocol = req.headers["x-forwarded-proto"] || "http";
    //     // const host = req.headers.host;
    //     // const baseUrl = `${protocol}://${host}`;
    //     // const urlObj = new URL(url, baseUrl);
    //     // urlObj.searchParams.delete("comeFrom");
    //     // const newUrl = urlObj.pathname + urlObj.search;

    //     // option 3
    //     const params = new URLSearchParams(restQuery).toString();
    //     const newUrl = `/profile/personal-details${params ? `?${params}` : ""}`;

    //     return {
    //         redirect: {
    //             destination: newUrl,
    //             permanent: false,
    //         },
    //     };
    // }

    // return {
    //     props: {},
    // };
}

const PersonalDetailsPage = ({ user: initialUser, backendData: initialBackendData }) => {
    const { session, updateUserSession } = useUserAuth();
    const currentUser = session?.user || initialUser;
    const currentBackendData = session?.user?.backendData || initialBackendData;

    const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
    const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const personalInfoForm = useForm({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            firstName: currentBackendData?.firstName || "",
            lastName: currentBackendData?.lastName || "",
        },
    });

    const contactInfoForm = useForm({
        resolver: zodResolver(contactInfoSchema),
        defaultValues: {
            phone: currentBackendData?.phone || "",
        },
    });

    const onPersonalInfoSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/auth/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to update personal info");
            }

            const updatedUser = await response.json();

            // Update the session
            await updateUserSession({
                user: {
                    ...currentUser,
                    backendData: updatedUser
                }
            });

            setIsPersonalInfoOpen(false);
            toast.success("Personal info updated successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onContactInfoSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/auth/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to update contact info");
            }

            const updatedUser = await response.json();

            // Update the session
            await updateUserSession({
                user: {
                    ...currentUser,
                    backendData: updatedUser
                }
            });

            setIsContactInfoOpen(false);
            toast.success("Contact info updated successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProfilePagesWrapper>
            <div className="lg:ml-[8%] py-10 md:px-5 xl:max-w-250 flex flex-col gap-12 items-center">
                <div className="w-full flex gap-2 xl:gap-3 items-center">
                    <div className="border-2 p-1.5 rounded-full">
                        {currentUser?.image ? (
                            <Image
                                src={currentUser.image}
                                alt="Profile"
                                width={12}
                                height={12}
                                className="w-10 h-10 xl:w-12 xl:h-12 rounded-full"
                            />
                        ) : (
                            <FaRegUserCircle className="w-10 h-10 xl:w-12 xl:h-12" />
                        )}
                    </div>
                    <div className="flex flex-col gap-1 min-w-48 sm:min-w-56">
                        <span className="font-bold text-xl xl:text-2xl">{currentBackendData?.firstName} {currentBackendData?.lastName}</span>
                        <div className="flex items-center justify-between">
                            <span className="flex-1">{currentBackendData?.isEmailVerified ? 'Verified' : 'Unverified'}</span>
                            <TbEdit
                                className="w-5 h-5 xl:w-7 xl:h-7 text-[#96CD78] cursor-pointer"
                                onClick={() => setIsPersonalInfoOpen(true)}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-12 max-lg:flex-col xl:gap-16">
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex justify-between">
                            <h2 className="text-lg xl:text-xl font-bold text-[#8A8A8A]">Contact Details</h2>
                            <TbEdit
                                className="w-5 h-5 xl:w-7 xl:h-7 text-[#96CD78] cursor-pointer"
                                onClick={() => setIsContactInfoOpen(true)}
                            />
                        </div>
                        <div className="bg-white rounded-2xl text-[#494A4A]">
                            <div className="p-4 flex justify-between">
                                <span>Phone Number</span>
                                <span className="font-semibold">{currentBackendData?.phone || 'Not provided'}</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span>Email</span>
                                <span className="font-semibold">{currentBackendData?.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex justify-between">
                            <h2 className="text-lg xl:text-xl font-bold text-[#8A8A8A]">Participant Details</h2>
                            {/* <TbEdit className="w-5 h-5 xl:w-7 xl:h-7 text-[#96CD78] cursor-pointer" /> */}
                        </div>
                        <div className="bg-white rounded-2xl text-[#494A4A]">
                            <div className="p-4 flex justify-between">
                                <span>Gender</span>
                                <span className="font-semibold">{currentBackendData?.gender || 'Not provided'}</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span>Blood Group</span>
                                <span className="font-semibold">{currentBackendData?.bloodGroup || 'Not provided'}</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span>D.O.B</span>
                                <span className="font-semibold">{currentBackendData?.dateOfBirth ? new Date(currentBackendData.dateOfBirth).toLocaleDateString() : 'Not provided'}</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span>Status</span>
                                <span className="font-semibold">{currentBackendData?.isEmailVerified ? 'Verified' : 'Unverified'}</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span>Member Since</span>
                                <span className="font-semibold">{new Date(currentBackendData?.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="p-4 flex justify-between">
                                <span>Last Updated</span>
                                <span className="font-semibold">{new Date(currentBackendData?.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={isPersonalInfoOpen} onOpenChange={setIsPersonalInfoOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Personal Information</DialogTitle>
                    </DialogHeader>
                    <Form {...personalInfoForm}>
                        <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-4">
                            <FormField
                                control={personalInfoForm.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={personalInfoForm.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading} className="w-full cursor-pointer">
                                {isLoading ? "Updating..." : "Update"}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            <Dialog open={isContactInfoOpen} onOpenChange={setIsContactInfoOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Contact Information</DialogTitle>
                    </DialogHeader>
                    <Form {...contactInfoForm}>
                        <form onSubmit={contactInfoForm.handleSubmit(onContactInfoSubmit)} className="space-y-4">
                            <FormField
                                control={contactInfoForm.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="tel" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isLoading} className="w-full cursor-pointer">
                                {isLoading ? "Updating..." : "Update"}
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </ProfilePagesWrapper>
    )
}

export default PersonalDetailsPage;