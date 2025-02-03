"use client";
import Hero from "./components/hero";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <Header />

      {/* Hero */}
      <Hero />

      {/* Footer */}
      <Footer />
    </div>
  );
}
