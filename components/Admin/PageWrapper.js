import Image from "next/image";
import { Menu, LogOut, User } from "lucide-react";

import { useAdminAuth } from "@/hooks/adminAuth";
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from "../ui/popover";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { SidebarProvider } from "../ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import { ScrollArea } from "../ui/scroll-area";


const AdminPagesWrapper = ({
    children
}) => {
    const { session, signOut } = useAdminAuth();

    const handleSignOut = (e) => {
        e.preventDefault();
        signOut();
    }

    return (
        <SidebarProvider>
            <main className="w-screen h-screen bg-gray-900 overflow-hidden">
                <section className="h-full mx-auto max-w-330 lg:border-x border-gray-800">
                    {/* Header Bar */}
                    <header className="fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-center z-50">
                        <div className="w-full max-w-330 flex justify-between">
                            <div className="flex items-center gap-3">
                                {/* Sidebar trigger for mobile */}
                                <div className="md:hidden">
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Menu size={28} className="text-white" />
                                        </SheetTrigger>
                                        <SheetContent side="left" className="p-0 w-64 bg-gray-900 border-r border-gray-800 text-white">
                                            <AdminSidebar />
                                        </SheetContent>
                                    </Sheet>
                                </div>

                                {/* Logo */}
                                <Image
                                    src="/logo/logo-white.png"
                                    width={200}
                                    height={100}
                                    alt="logo"
                                    className="w-30 h-8 xl:w-40 xl:h-10 object-contain"
                                    priority
                                />
                            </div>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <User className="p-2 h-9 w-9 bg-white rounded-full cursor-pointer" />
                                </PopoverTrigger>
                                <PopoverContent align="end" className="mt-2 mr-2 w-56 p-0 overflow-hidden">
                                    <div className="flex flex-col p-2">
                                        <span className="inter-font font-medium">{session?.user?.name || `${session?.user?.firstName} ${session?.user?.lastName}`}</span>
                                        <span className="inter-font font-medium text-gray-400 text-[10px]">{session?.user?.email}</span>
                                    </div>
                                    <Separator />
                                    <Button
                                        variant="ghost"
                                        className="w-full focus:!ring-0 text-red-500 hover:text-red-600 flex items-center justify-start gap-2 rounded-none px-4 py-2 cursor-pointer"
                                        onClick={handleSignOut}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </Button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </header>

                    {/* Sidebar for desktop */}
                    <div className="flex pt-20">
                        <aside className="hidden md:block w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
                            <AdminSidebar />
                        </aside>
                        <section className="flex-1">
                            <ScrollArea className="h-[calc(100vh-80px)]">
                                {children}
                            </ScrollArea>
                        </section>
                    </div>
                </section>
            </main>
        </SidebarProvider>
    )
}

export default AdminPagesWrapper;