import { PortableText, PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import { css } from "@/styled-system/css";

const components: PortableTextComponents = {
  marks: {
    internalLink: ({ children, value }) => {
      const { slug, type } = value;
      const href = type === "project" ? `/projects/${slug}` : type === "news" ? `/news/${slug}` : `/${slug === "/" ? "" : slug}`;
      return (
        <Link 
            href={href} 
            className={css({ 
                color: "tertiary", 
                textDecoration: "underline", 
                textDecorationColor: "rgba(255,183,3,0.3)",
                textUnderlineOffset: "4px",
                fontWeight: "bold",
                transition: "all 0.3s",
                _hover: { 
                    textDecorationColor: "tertiary",
                    backgroundColor: "rgba(255,183,3,0.1)"
                } 
            })}
        >
          {children}
        </Link>
      );
    },
    link: ({ children, value }) => {
      return (
        <a 
          href={value.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className={css({ 
            color: "primary", 
            textDecoration: "underline", 
            textUnderlineOffset: "4px",
            _hover: { opacity: 0.8 } 
          })}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className={css({ 
        fontFamily: "headline", 
        fontSize: "3xl", 
        fontWeight: "bold", 
        textTransform: "uppercase", 
        marginTop: "4rem", 
        marginBottom: "2rem",
        letterSpacing: "tight",
        color: "primary"
      })}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className={css({ 
        fontFamily: "headline", 
        fontSize: "2xl", 
        fontWeight: "bold", 
        textTransform: "uppercase", 
        marginTop: "3rem", 
        marginBottom: "1.5rem",
        color: "primary"
      })}>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className={css({ 
        borderLeft: "4px solid", 
        borderColor: "tertiary", 
        paddingLeft: "2rem", 
        marginY: "3rem",
        fontStyle: "italic",
        fontSize: "xl",
        color: "secondary"
      })}>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className={css({ 
        listStyleType: "square", 
        paddingLeft: "2rem", 
        marginBottom: "2rem",
        "& li": { marginBottom: "0.5rem" } 
      })}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className={css({ 
        listStyleType: "decimal", 
        paddingLeft: "2rem", 
        marginBottom: "2rem",
        "& li": { marginBottom: "0.5rem" } 
      })}>
        {children}
      </ol>
    ),
  },
};

export default function PortableTextContent({ value }: { value: any }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
