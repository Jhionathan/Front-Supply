'use client'
import Orb from "@/components/Orb";

export default function Home() {
  return (
    <div className="fixed inset-0 bg-black">

      <div className="absolute inset-0 z-0">
        <Orb
          hoverIntensity={1}
          rotateOnHover={true}
          hue={360}
          forceHoverState={false}
        />
      </div>
      

      <div className="relative z-10 p-8">
        <h1 className="text-white text-4xl">Aqui porra</h1>

      </div>
    </div>
  );
}