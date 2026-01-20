"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function NavBar({ user }) {


    return (
        <nav className="p-4 bg-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-transparent">
            <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
                <Link href={"/"} className="flex items-center gap-2">
                    <Image
                        src={"/logo.svg"}
                        alt="Vibe"
                        width={32}
                        height={32}
                        className="shrink-0 invert dark:invert-0"
                    />
                </Link>


                {
                    user ? (
                        <DropdownMenu className={""}>
                            <DropdownMenuTrigger>
                                <Avatar className={'rounded-lg cursor-pointer'}>
                                    <AvatarImage src={user?.avatar_url} alt={user?.name} />
                                    <AvatarFallback>IG</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={"mr-2"}>
                                {/* User info */}
                                <div className="flex items-center gap-3 px-3 py-2">
                                    <Image
                                        src={user?.avatar_url}
                                        alt={user?.name}
                                        width={36}
                                        height={36}
                                        className="rounded-full"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium truncate">{user?.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className={"cursor-pointer"}><Link href={"/profile"}>Profile</Link></DropdownMenuItem>
                                <DropdownMenuItem className={"cursor-pointer"}><Link href={"/profile"}>Profile</Link></DropdownMenuItem>
                                <DropdownMenuItem className={"cursor-pointer"}><Link href={"/profile"}>Profile</Link></DropdownMenuItem>
                                <DropdownMenuItem className={"cursor-pointer"}><Link href={"/profile"}>Profile</Link></DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    // onClick={handleSignOut}
                                    className={"cursor-pointer"}>
                                    Log out
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <div className=" flex gap-2">
                                <Button variant={"outline"} size={"sm"}>
                                    <Link href={"/sign-in"}>Sign in</Link>
                                </Button>

                                <Button size={"sm"}>
                                    <Link href={"#"}> Sign Up</Link>
                                </Button>
                            </div>
                        </>
                    )
                }
            </div>
        </nav>
    )
}