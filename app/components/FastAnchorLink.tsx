"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { fastNavigateToHash } from "../data/navigation";

type FastAnchorLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export default function FastAnchorLink({
  href,
  children,
  onClick,
  ...props
}: FastAnchorLinkProps) {
  if (!href.startsWith("#")) {
    return (
      <a href={href} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        fastNavigateToHash(href);
        window.history.pushState(null, "", href);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}