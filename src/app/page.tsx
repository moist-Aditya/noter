"use client"

import { auth } from "@/auth"
import { SignOut } from "@/components/SignOut"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { motion } from "framer-motion"
import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  // return (
  //   <main className="flex flex-col gap-2 min-h-screen justify-center items-center">
  //     <h1 className="text-3xl font-bold">Welcome to Noter!</h1>

  //     <div className="flex justify-center gap-14 items-center mt-7">
  //       <Link
  //         href={"/sign-in"}
  //         className="bg-slate-200 text-black p-4 rounded-xl"
  //       >
  //         Login
  //       </Link>

  //       <SignOut />
  //     </div>
  //   </main>
  // )

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Capture your thoughts, effortlessly.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Welcome to Noter.
        </div>
        <Link
          href={"/sign-in"}
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
        >
          Join now
        </Link>
      </motion.div>
    </AuroraBackground>
  )
}
