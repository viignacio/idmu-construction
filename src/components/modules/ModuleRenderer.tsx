import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./Hero"));
const TextWithGrid = dynamic(() => import("./TextWithGrid"));
const StatsGrid = dynamic(() => import("./StatsGrid"));
const ProjectShowcase = dynamic(() => import("./ProjectShowcase"));
const NewsShowcase = dynamic(() => import("./NewsShowcase"));
const CtaBlock = dynamic(() => import("./CtaBlock"));
const ProjectGrid = dynamic(() => import("./ProjectGrid"));
const PersonnelGrid = dynamic(() => import("./PersonnelGrid"));
const SplitTextContent = dynamic(() => import("./SplitTextContent"));
const HighlightsGrid = dynamic(() => import("./HighlightsGrid"));

const components: Record<string, any> = {
  hero: Hero,
  textWithGrid: TextWithGrid,
  statsGrid: StatsGrid,
  projectShowcase: ProjectShowcase,
  newsShowcase: NewsShowcase,
  ctaBlock: CtaBlock,
  projectGrid: ProjectGrid,
  personnelGrid: PersonnelGrid,
  splitTextContent: SplitTextContent,
  highlightsGrid: HighlightsGrid,
};



interface ModuleRendererProps {
  modules?: any[];
}

export default function ModuleRenderer({ modules }: ModuleRendererProps) {
  if (!modules || !Array.isArray(modules)) return null;

  return (
    <>
      {modules.map((module, index) => {
        const Component = components[module._type];
        if (!Component) {
          console.warn(`No component found for module type: ${module._type}`);
          return null;
        }
        return <Component key={module._key || index} {...module} />;
      })}
    </>
  );
}
