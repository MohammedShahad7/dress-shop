import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultProducts from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const savedProducts =
      JSON.parse(localStorage.getItem("products")) || [];

    const allProducts = [
      ...defaultProducts,
      ...savedProducts,
    ];

    const foundProduct = allProducts.find(
      (item) => item.id === Number(id)
    );

    setProduct(foundProduct);

    if (
      foundProduct &&
      foundProduct.size &&
      foundProduct.size.length > 0
    ) {
      setSize(foundProduct.size[0]);
    }

    setSelectedImage(0);
  }, [id]);

  // -----------------------------
  // PRODUCT NOT FOUND
  // -----------------------------

  if (!product) {
    return (
      <div className="page product-not-found">

        <div className="not-found-icon">
          👗
        </div>

        <h2>Product not found</h2>

        <p>
          This product may have been removed.
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="back-shop-btn"
        >
          ← Back to Shop
        </button>

      </div>
    );
  }

  // -----------------------------
  // SUPPORT OLD + NEW PRODUCTS
  // -----------------------------

  const productImages =
    product.images &&
    product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  // -----------------------------
  // ADD TO CART
  // -----------------------------

  function addToCart() {
    if (!size) {
      alert("Please select a size.");
      return;
    }

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      (item) =>
        item.id === product.id &&
        item.size === size
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...product,

        // Keep images with cart product
        images: productImages,

        // Keep first image for compatibility
        image: productImages[0],

        size: size,

        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Added to cart!");

    navigate("/cart");
  }

  return (
    <div className="product-details">

      {/* =========================
          IMAGE SECTION
      ========================= */}

      <div className="details-image-section">

        {/* MAIN IMAGE */}

        <div className="details-image">

          {productImages.length > 0 ? (

            <img
              src={productImages[selectedImage]}
              alt={`${product.name} ${selectedImage + 1}`}
            />

          ) : (

            <div className="no-product-image">
              👗
              <span>No Image</span>
            </div>

          )}

        </div>

        {/* IMAGE THUMBNAILS */}

        {productImages.length > 1 && (

          <div className="product-thumbnails">

            {productImages.map(
              (image, index) => (

                <button
                  key={index}
                  type="button"
                  className={
                    selectedImage === index
                      ? "thumbnail active-thumbnail"
                      : "thumbnail"
                  }
                  onClick={() =>
                    setSelectedImage(index)
                  }
                >

                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${
                      index + 1
                    }`}
                  />

                </button>

              )
            )}

          </div>

        )}

        {/* IMAGE COUNT */}

        {productImages.length > 1 && (

          <p className="image-number">
            Image {selectedImage + 1} of{" "}
            {productImages.length}
          </p>

        )}

      </div>

      {/* =========================
          PRODUCT INFORMATION
      ========================= */}

      <div className="details-info">

        <p className="category">
          {product.category}
        </p>

        <h1>{product.name}</h1>

        <h2 className="details-price">
          ₹{product.price}
        </h2>

        {product.description && (

          <p className="description">
            {product.description}
          </p>

        )}

        {/* =========================
            SIZES
        ========================= */}

        <div className="size-box">

          <h3>Available Sizes</h3>

          <div className="product-sizes">

            {product.size &&
            product.size.length > 0 ? (

              product.size.map((item) => (

                <button
                  key={item}
                  type="button"
                  className={
                    size === item
                      ? "selected-size"
                      : "size-button"
                  }
                  onClick={() =>
                    setSize(item)
                  }
                >
                  {item}
                </button>

              ))

            ) : (

              <p className="no-size">
                Size not available
              </p>

            )}

          </div>

          {size && (
            <p className="selected-size-text">
              Selected size:{" "}
              <strong>{size}</strong>
            </p>
          )}

        </div>

        {/* =========================
            ADD TO CART
        ========================= */}

        <button
          onClick={addToCart}
          className="cart-btn"
        >
          🛒 Add to Cart
        </button>

        {/* =========================
            PRODUCT INFO
        ========================= */}

        <div className="product-extra-info">

          <div>
            <span>Category</span>
            <strong>{product.category}</strong>
          </div>

          <div>
            <span>Available Sizes</span>
            <strong>
              {product.size
                ? product.size.join(", ")
                : "N/A"}
            </strong>
          </div>

          {productImages.length > 1 && (
            <div>
              <span>Product Photos</span>
              <strong>
                {productImages.length} photos
              </strong>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;