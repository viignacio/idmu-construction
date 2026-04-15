import { css } from "../../../styled-system/css";

interface StatItem {
  value: string;
  label: string;
}

interface StatsGridProps {
  stats?: StatItem[];
}

export default function StatsGrid({ stats = [] }: StatsGridProps) {
  return (
    <section className={css({
      backgroundColor: "surface", // bg-primary-container
      paddingY: { base: "6rem", md: "8rem" },
      paddingX: { base: "2rem", md: "6rem" },
    })}>
      <div className={css({
        display: "grid",
        gridTemplateColumns: { base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        gap: { base: "3rem", md: "4rem" },
        textAlign: "center"
      })}>
        {stats.map((stat, index) => (
          <div key={index}>
            <div className={css({
              fontFamily: "headline",
              fontWeight: "900", // font-extrabold
              fontSize: { base: "4xl", md: "7xl" },
              color: "white",
              lineHeight: "tight",
            })}>
              {stat.value}
            </div>
            <div className={css({
              color: "tertiary", // text-tertiary-fixed-dim
              fontFamily: "body",
              fontWeight: "900", // font-bold
              fontSize: "xs",
              textTransform: "uppercase",
              letterSpacing: "widest",
              opacity: 0.9
            })}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
