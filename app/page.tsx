import Cards from "./components/Cards";
import Footer from "./components/Footer";
import ScrollImage from "./components/Scroll-ai";
import React from "react";

export default async function Home() {
  return (
    <main>
      <ScrollImage />
      <Cards />
      <Footer />
    </main>
  );
}
