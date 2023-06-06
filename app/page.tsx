import { Cards } from "./components/Cards";
import { NavigationMenuDemo } from "./components/Categories";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Scroll from "./components/Scroll";
import ScrollImage from "./components/Scroll-ai";

export default function Home() {
  return (
    <main>
      <Header />
      <NavigationMenuDemo />
      <ScrollImage/>
      <Cards />
      <Footer />
    </main>
  );
}
