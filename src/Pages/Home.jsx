import React from "react";
import Navbar from "../components/Navbar";
import image from "../Images/image1.jpg";
import Slider from "../components/Topbar_components/Slider";

export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <img
          className="h-3/5 w-full object-cover"
          src={image}
          alt="random image"
        />
      </main>
      <footer>
        <Slider/>
      </footer>
    </div>
  );
}
