import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./Hero"));
const TextWithGrid = dynamic(() => import("./TextWithGrid"));

const components: { [key: string]: any } = {
  hero: Hero,
  textWithGrid: TextWithGrid,
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
