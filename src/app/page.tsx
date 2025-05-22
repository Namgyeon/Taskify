import Feature from "@/components/landing/Feature";
import Hero from "../components/landing/Hero";
import Setting from "@/components/landing/Setting";
import Footer from "@/components/landing/layout/footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-22 py-5 md:px-10 lg:px-40 bg-black">
      <Hero />
      <Feature />
      <Setting />
      <Footer />
    </div>
  );
}
