import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Topbar_components/Slider";
import Card from "../components/Card";

export default function Home() {
  const [array, setarray] = useState([]);
  let url = "https://dummyjson.com/products";

  async function get_data(params) {
    let d_data = await fetch(url);
    let data = await d_data.json();

    function handledata() {
      setarray(data.products);
    }

    handledata();
  }

  useEffect(() => {
    get_data();
  }, []);

  return (
    <div className="bg-gray-300">
      <header>
        <Navbar />
      </header>
      <main>
        <div>
          <Slider />
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 m-5">
              {array.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
