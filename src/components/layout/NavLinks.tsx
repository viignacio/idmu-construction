"use client";

import { usePathname } from "next/navigation";
import { css } from "../../../styled-system/css";

interface NavLink {
  text: string;
  url: string;
}

export default function NavLinks({ links }: { links?: NavLink[] }) {
  const pathname = usePathname();

  if (!links) return null;

  return (
    <div className={css({
      display: { base: 'none', md: 'flex' },
      gap: '2rem',
      alignItems: 'center'
    })}>
      {links.map((link) => {
        const isActive = pathname === link.url;
        return (
          <a
            key={link.url}
            href={link.url}
            className={css({
              fontFamily: 'headline', // Switching to Space Grotesk
              textDecoration: 'none',
              fontWeight: isActive ? '800' : '700',
              color: isActive ? 'text.main' : 'text.muted',
              borderBottom: isActive ? '2px solid {colors.tertiary}' : 'none',
              paddingBottom: isActive ? '0.25rem' : '0',
              transition: 'all 300ms',
              _hover: { color: 'tertiary' }
            })}
          >
            {link.text}
          </a>
        );
      })}
    </div>
  );
}
