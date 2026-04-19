import { css, cx } from "@/styled-system/css";
import { getThemeColors } from "@/lib/theme";

interface SectionContainerProps {
  backgroundColor?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function SectionContainer({
  backgroundColor = "surface",
  children,
  className,
  contentClassName
}: SectionContainerProps) {
  const theme = getThemeColors(backgroundColor);

  return (
    <section 
      className={cx(
        css({
          paddingY: { base: "6rem", md: "8rem" },
          paddingX: { base: "2rem", md: "6rem" },
          backgroundColor: theme.bg as any,
          color: theme.text as any,
          width: "100%",
        }),
        className
      )}
    >
      <div className={cx(
        css({
          maxWidth: "7xl",
          marginX: "auto",
        }),
        contentClassName
      )}>
        {children}
      </div>
    </section>
  );
}
