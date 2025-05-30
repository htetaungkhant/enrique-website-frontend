import { useState, useEffect } from "react";
import { BookOpen, Users, GraduationCap, LibraryBig, ListChecks, LogOut, ChevronDown, ChevronRight, StickyNote, SquarePlus, Newspaper } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAdminAuth } from "@/hooks/adminAuth";
import {
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroup,
    SidebarSeparator,
    SidebarFooter
} from "../ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible";

const menuItems = [
    {
        label: "User Management",
        icon: <Users className="w-4 h-4" />,
        subMenus: [
            {
                label: "Courses Purchased",
                icon: <BookOpen className="w-4 h-4" />,
                href: "/admin/courses-purchased",
            },
            {
                label: "Survey Answers",
                icon: <ListChecks className="w-4 h-4" />,
                href: "/admin/survey-answers",
            },
        ],
    },
    {
        label: "Facilitators",
        icon: <Users className="w-4 h-4" />,
        href: "/admin/facilitators",
    },
    {
        label: "Course Management",
        icon: <LibraryBig className="w-4 h-4" />,
        // href: "/admin/courses",
        subMenus: [
            {
                label: "Courses",
                icon: <BookOpen className="w-4 h-4" />,
                href: "/admin/courses",
            },
            {
                label: "Create New Course",
                icon: <SquarePlus className="w-4 h-4" />,
                href: "/admin/courses/create-new-course",
            },
        ],
    },
    {
        label: "Ceremony Management",
        icon: <GraduationCap className="w-4 h-4" />,
        href: "/admin/ceremonies",
    },
    {
        label: "Blogs",
        icon: <StickyNote className="w-4 h-4" />,
        href: "/admin/blogs",
    },
    {
        label: "Newsletter",
        icon: <Newspaper className="w-4 h-4" />,
        href: "/admin/newsletter",
    },
];

const STORAGE_KEY = "adminSidebarOpenMenus";

export default function AdminSidebar() {
    const router = useRouter();
    const { signOut } = useAdminAuth();

    // Track open state for each collapsible menu independently, persist across route changes
    // Use localStorage to persist open state
    const [openMenus, setOpenMenus] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = window.localStorage.getItem(STORAGE_KEY);
            if (stored) return JSON.parse(stored);
        }
        // Default: open the one with an active submenu if any
        const initial = {};
        menuItems.forEach(item => {
            if (item.subMenus) {
                initial[item.label] = item.subMenus.some(sub => typeof window !== "undefined" && window.location.pathname === sub.href);
            }
        });
        return initial;
    });

    // Save openMenus to localStorage on change
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(openMenus));
        }

        // remove the open state from localStorage when the component unmounts
        return () => {
            if (typeof window !== "undefined") {
                window.localStorage.removeItem(STORAGE_KEY);
            }
        };
    }, [openMenus]);

    // Only toggle the clicked menu, don't auto-close on route change
    const handleToggle = (label) => {
        setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <SidebarContent className="overflow-hidden pt-10 md:pt-0">
            {/* <SidebarHeader>
                <span className="h-5 md:h-0" />
            </SidebarHeader> */}
            <SidebarGroup>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        item.subMenus ? (
                            <Collapsible key={item.label} open={!!openMenus[item.label]} onOpenChange={() => handleToggle(item.label)}>
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="w-full flex items-center gap-2 text-white focus:!ring-0 hover:!bg-transparent hover:!text-white">
                                            {item.icon}
                                            <span>{item.label}</span>
                                            <span className="ml-auto">
                                                {openMenus[item.label] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                            </span>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                </SidebarMenuItem>
                                <CollapsibleContent>
                                    <ul className="ml-6 mt-1 flex flex-col gap-1">
                                        {item.subMenus.map((sub) => (
                                            <SidebarMenuItem key={sub.href}>
                                                <Link href={sub.href} className="block">
                                                    <SidebarMenuButton
                                                        isActive={router.pathname === sub.href}
                                                        className="cursor-pointer text-white focus:!ring-0 hover:bg-transparent hover:text-gray-300 active:bg-transparent active:text-white"
                                                    >
                                                        <div className="flex items-center gap-2 pl-2">
                                                            {sub.icon}
                                                            <span>{sub.label}</span>
                                                        </div>
                                                    </SidebarMenuButton>
                                                </Link>
                                            </SidebarMenuItem>
                                        ))}
                                    </ul>
                                </CollapsibleContent>
                            </Collapsible>
                        ) : (
                            <SidebarMenuItem key={item.label}>
                                <Link href={item.href} className="block">
                                    <SidebarMenuButton
                                        isActive={item.href?.toLowerCase()?.split("/")?.every((seg, i) => seg === router.pathname?.toLowerCase()?.split("/")[i])}
                                        className="cursor-pointer text-white hover:bg-transparent hover:text-gray-300 active:bg-transparent active:text-white"
                                    >
                                        <div className="flex items-center gap-2">
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </div>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        )
                    ))}
                </SidebarMenu>
            </SidebarGroup>
            <SidebarFooter>
                <SidebarSeparator />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="text-red-500 cursor-pointer hover:text-red-600 hover:bg-transparent active:bg-transparent active:text-red-500">
                            <button onClick={signOut}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Log out
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </SidebarContent>
    );
}
