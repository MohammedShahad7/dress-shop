import { useState } from "react";

import ProductCard from "../components/ProductCard";

import defaultProducts from "../data/products";

function Shop() {

  const savedProducts =
    JSON.parse(
      localStorage.getItem("products")
    ) || [];

  const allProducts = [
    ...defaultProducts,
    ...savedProducts,
  ];

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const categories = [
    "All",
    ...new Set(
      allProducts.map(
        (product) => product.category
      )
    ),
  ];

  const filteredProducts =
    allProducts.filter((product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <div className="page">

      <div className="shop-heading">

        <div>
          <p className="section-label">
            OUR COLLECTION
          </p>

          <h1>
            Shop Dresses
          </h1>
        </div>

      </div>

      <div className="shop-controls">

        <input
          type="text"
          placeholder="Search dresses..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="search"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="category-filter"
        >

          {categories.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}

        </select>

      </div>

      {filteredProducts.length === 0 ? (

        <div className="empty-products">
          <h2>
            No dresses found
          </h2>

          <p>
            Try another search.
          </p>
        </div>

      ) : (

        <div className="products">

          {filteredProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}

        </div>

      )}

    </div>
  );
}

export default Shop;