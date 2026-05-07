import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Mission from "./components/Mission";
import Events from "./components/Events";
import Calendar from "./components/Calendar";
import WeSTEM from "./components/WeSTEM";
import Join from "./components/Join";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Mission/>
      <About/>
      <Events/>
      <Calendar/>
      <WeSTEM/>
      <Join/>
    </div>
  );
}
