import Hero from "@/components/Hero";
import Features from "@/components/Features";
import React from "react";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#CFFFE2] to-white">
      <Hero />
      <Features />
    </div>
  );
}
