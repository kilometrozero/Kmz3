import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Shop from "@/components/Shop";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Navbar onDashboard={() => router.push("/admin")} />
      <Hero />
      <Shop />
      <About />
      <Contact />
      <footer>
        © 2025 KMZ — Todos los derechos reservados. | Diseñado con 🔥 por KilometroZero
      </footer>
    </>
  );
}
