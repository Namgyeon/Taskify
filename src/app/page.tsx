import Feature from "@/components/landing/Feature";
import Hero from "../components/landing/Hero";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-22 md:px-10 lg:px-40 bg-black">
      <Hero />
      <Feature />
    </div>
  );
}
