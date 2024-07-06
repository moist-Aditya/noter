"use client"

import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import React, { ReactNode } from "react"

interface TransitionLinkProps extends LinkProps {
  children: ReactNode
  href: string
  className: string
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const TransitionLink = ({ children, href, ...props }: TransitionLinkProps) => {
  const router = useRouter()

  const handleClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault()
    const body = document.querySelector("body")

    body?.classList.add("page-transition")

    await sleep(350)

    body?.classList.remove("page-transition")

    router.push(href)
  }

  return (
    <Link onClick={handleClick} href={href} {...props}>
      {children}
    </Link>
  )
}

export default TransitionLink
