"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconSquareRoundedPlus
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UserChat } from '@/lib/db/schema';
import { MessageCircleDashed } from "lucide-react";

type Props = {
  chats: UserChat[],
  chatId: number
};

export function ChatSideBar({ chats, chatId }: Props) {

  const [open, setOpen] = useState(false);
  return (

    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 ">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {

            !open ? <IconSquareRoundedPlus className="w-5 items-center" /> : <Link href="/" className="border-dotted border-indigo-600 rounded-md border-2 py-2 text-center text-sm flex gap-1 justify-center items-center" >Create a new chat <IconSquareRoundedPlus className="w-5 items-center" /></Link>
          }

          <div className="mt-8 flex flex-col gap-2">
            {chats.map((chat, idx) => {
              return (
                <SidebarLink chatId={chatId} key={idx} link={chat} className={cn(` ${open && `px-2`} rounded-md`, {
                  "bg-indigo-600 dark:text-white": chat.id === chatId && open,
                  "dark:text-neutral-800 ": chat.id !== chatId,
                })} />
              )
            })}
          </div>
        </div>
        <div>
          {/* <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            /> */}
        </div>
      </SidebarBody>
    </Sidebar>

  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content