"use client";

import dynamic from "next/dynamic";

const PageLoader = dynamic(() => import("./PageLoader").then(mod => mod.PageLoader), { ssr: false });
const ScrollProgress = dynamic(() => import("./ScrollProgress").then(mod => mod.ScrollProgress), { ssr: false });
const CustomCursor = dynamic(() => import("./CustomCursor").then(mod => mod.CustomCursor), { ssr: false });
const ThreeBackground = dynamic(() => import("./ThreeBackground").then(mod => mod.ThreeBackground), { ssr: false });

export function ClientAnimations() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <CustomCursor />
      <ThreeBackground />
    </>
  );
}
