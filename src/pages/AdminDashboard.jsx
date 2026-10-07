import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    images: [],
    sizes: [],
  });

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("adminLoggedIn");

    if (loggedIn !== "true") {
      navigate("/admin");
      return;
    }

    const saved =
      JSON.parse(localStorage.getItem("products")) || [];

    setProducts(saved);
  }, [navigate]);

  // -----------------------------
  // INPUT CHANGE
  // -----------------------------

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // -----------------------------
  // IMAGE UPLOAD
  // -----------------------------

  function handleImageChange(e) {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      return;
    }

    const invalidFile = files.find(
      (file) => !file.type.startsWith("image/")
    );

    if (invalidFile) {
      alert("Please select only image files.");
      return;
    }

    const tooLarge = files.find(
      (file) => file.size > 2 * 1024 * 1024
    );

    if (tooLarge) {
      alert(
        "Each image must be smaller than 2 MB."
      );
      return;
    }

    // Maximum 6 images
    if (files.length > 6) {
      alert("You can upload a maximum of 6 images.");
      return;
    }

    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          resolve(reader.result);
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((images) => {
      setForm((previous) => ({
        ...previous,
        images: images,
      }));
    });

    // Allows selecting the same file again
    e.target.value = "";
  }

  // -----------------------------
  // SIZE SELECTION
  // -----------------------------

  function handleSizeChange(e) {
    const selectedSize = e.target.value;

    setForm((previous) => ({
      ...previous,

      sizes: e.target.checked
        ? [...previous.sizes, selectedSize]
        : previous.sizes.filter(
            (size) => size !== selectedSize
          ),
    }));
  }

  // -----------------------------
  // ADD PRODUCT
  // -----------------------------

  function addProduct(e) {
    e.preventDefault();

    if (form.sizes.length === 0) {
      alert(
        "Please select at least one available size."
      );
      return;
    }

    if (form.images.length === 0) {
      alert(
        "Please select at least one product image."
      );
      return;
    }

    const newProduct = {
      id: Date.now(),

      name: form.name,

      price: Number(form.price),

      category: form.category,

      description: form.description,

      images: form.images,

      size: form.sizes,
    };

    const updatedProducts = [
      ...products,
      newProduct,
    ];

    setProducts(updatedProducts);

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    resetForm();

    alert("Dress added successfully!");
  }

  // -----------------------------
  // EDIT PRODUCT
  // -----------------------------

  function editProduct(product) {
    setEditingId(product.id);

    // Support old products that used "image"
    const productImages =
      product.images && product.images.length > 0
        ? product.images
        : product.image
        ? [product.image]
        : [];

    setForm({
      name: product.name || "",

      price: product.price || "",

      category: product.category || "",

      description: product.description || "",

      images: productImages,

      sizes: product.size || [],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // -----------------------------
  // UPDATE PRODUCT
  // -----------------------------

  function updateProduct(e) {
    e.preventDefault();

    if (form.sizes.length === 0) {
      alert(
        "Please select at least one available size."
      );
      return;
    }

    if (form.images.length === 0) {
      alert(
        "Please select at least one product image."
      );
      return;
    }

    const updatedProducts = products.map(
      (product) => {
        if (product.id === editingId) {
          return {
            ...product,

            name: form.name,

            price: Number(form.price),

            category: form.category,

            description: form.description,

            images: form.images,

            size: form.sizes,

            // Remove old single image format
            image: undefined,
          };
        }

        return product;
      }
    );

    // Remove undefined "image" property
    const cleanedProducts =
      updatedProducts.map((product) => {
        const cleaned = {
          ...product,
        };

        delete cleaned.image;

        return cleaned;
      });

    setProducts(cleanedProducts);

    localStorage.setItem(
      "products",
      JSON.stringify(cleanedProducts)
    );

    resetForm();

    alert("Product updated successfully!");
  }

  // -----------------------------
  // RESET FORM
  // -----------------------------

  function resetForm() {
    setEditingId(null);

    setForm({
      name: "",
      price: "",
      category: "",
      description: "",
      images: [],
      sizes: [],
    });

    // Reset file input
    const fileInput =
      document.getElementById("product-images");

    if (fileInput) {
      fileInput.value = "";
    }
  }

  // -----------------------------
  // REMOVE PRODUCT
  // -----------------------------

  function deleteProduct(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedProducts =
      products.filter(
        (product) => product.id !== id
      );

    setProducts(updatedProducts);

    localStorage.setItem(
      "products",
      JSON.stringify(updatedProducts)
    );

    if (editingId === id) {
      resetForm();
    }

    alert("Product removed successfully!");
  }

  // -----------------------------
  // LOGOUT
  // -----------------------------

  function logout() {
    localStorage.removeItem(
      "adminLoggedIn"
    );

    navigate("/admin");
  }

  return (
    <div className="admin-page">

      {/* =========================
          ADMIN HEADER
      ========================= */}

      <div className="admin-header">

        <div>
          <p className="section-label">
            STORE MANAGEMENT
          </p>

          <h1>Admin Dashboard</h1>

          <p>
            Add and manage your dresses
          </p>
        </div>

        <button
          onClick={logout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>

      {/* =========================
          ADD / EDIT FORM
      ========================= */}

      <form
        onSubmit={
          editingId !== null
            ? updateProduct
            : addProduct
        }
        className="product-form"
      >

        <div className="form-title">

          <div>
            <p className="section-label">
              {editingId !== null
                ? "PRODUCT EDITOR"
                : "NEW PRODUCT"}
            </p>

            <h2>
              {editingId !== null
                ? "Edit Dress"
                : "Add New Dress"}
            </h2>
          </div>

          {editingId !== null && (
            <span className="editing-badge">
              Editing
            </span>
          )}

        </div>

        {/* PRODUCT NAME */}

        <div className="form-group">

          <label htmlFor="name">
            Dress Name
          </label>

          <input
            id="name"
            name="name"
            placeholder="Example: Elegant Black Dress"
            value={form.name}
            onChange={handleChange}
            required
          />

        </div>

        {/* PRICE */}

        <div className="form-group">

          <label htmlFor="price">
            Price
          </label>

          <input
            id="price"
            name="price"
            type="number"
            placeholder="Example: 1499"
            value={form.price}
            onChange={handleChange}
            min="1"
            required
          />

        </div>

        {/* CATEGORY */}

        <div className="form-group">

          <label htmlFor="category">
            Category
          </label>

          <input
            id="category"
            name="category"
            placeholder="Example: Women"
            value={form.category}
            onChange={handleChange}
            required
          />

        </div>

        {/* =========================
            SIZES
        ========================= */}

        <div className="size-selection">

          <label>
            Available Sizes
          </label>

          <p className="field-help">
            Select the sizes available for this dress.
          </p>

          <div className="size-options">

            {[
              "XS",
              "S",
              "M",
              "L",
              "XL",
              "XXL",
            ].map((size) => (

              <label
                key={size}
                className="size-option"
              >

                <input
                  type="checkbox"
                  value={size}
                  checked={form.sizes.includes(size)}
                  onChange={handleSizeChange}
                />

                <span>{size}</span>

              </label>

            ))}

          </div>

        </div>

        {/* =========================
            MULTIPLE IMAGE UPLOAD
        ========================= */}

        <div className="image-upload">

          <label htmlFor="product-images">
            Product Images
          </label>

          <p className="field-help">
            Select multiple photos of the same dress.
          </p>

          <input
            id="product-images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />

          <p className="image-help">
            Maximum 6 images. Each image must be
            smaller than 2 MB.
          </p>

          {/* IMAGE PREVIEW */}

          {form.images.length > 0 && (

            <div className="upload-preview">

              {form.images.map(
                (image, index) => (

                  <div
                    className="preview-item"
                    key={index}
                  >

                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                    />

                    <span>
                      {index === 0
                        ? "Main"
                        : `Image ${index + 1}`}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

          {form.images.length > 0 && (
            <p className="selected-image-count">
              {form.images.length} image
              {form.images.length > 1
                ? "s"
                : ""} selected
            </p>
          )}

        </div>

        {/* =========================
            DESCRIPTION
        ========================= */}

        <div className="form-group">

          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            placeholder="Describe the dress..."
            value={form.description}
            onChange={handleChange}
            rows="5"
          />

        </div>

        {/* =========================
            FORM BUTTONS
        ========================= */}

        {editingId !== null ? (

          <div className="edit-buttons">

            <button
              type="submit"
              className="add-product-btn"
            >
              💾 Update Product
            </button>

            <button
              type="button"
              className="cancel-edit-btn"
              onClick={resetForm}
            >
              ✖ Cancel Edit
            </button>

          </div>

        ) : (

          <button
            type="submit"
            className="add-product-btn"
          >
            ➕ Add Dress
          </button>

        )}

      </form>

      {/* =========================
          PRODUCT LIST
      ========================= */}

      <div className="admin-product-heading">

        <div>
          <p className="section-label">
            INVENTORY
          </p>

          <h2>Your Products</h2>
        </div>

        <span>
          {products.length} product
          {products.length !== 1
            ? "s"
            : ""}
        </span>

      </div>

      {products.length === 0 ? (

        <div className="no-products">

          <div className="no-products-icon">
            👗
          </div>

          <h3>No products yet</h3>

          <p>
            Add your first dress using the form above.
          </p>

        </div>

      ) : (

        <div className="admin-products">

          {products.map((product) => {

            const productImages =
              product.images &&
              product.images.length > 0
                ? product.images
                : product.image
                ? [product.image]
                : [];

            return (

              <div
                className="admin-product"
                key={product.id}
              >

                {/* PRODUCT IMAGE */}

                <div className="admin-product-image">

                  <img
                    src={productImages[0]}
                    alt={product.name}
                  />

                  {productImages.length > 1 && (
                    <span className="image-count">
                      📷 {productImages.length}
                    </span>
                  )}

                </div>

                {/* PRODUCT INFO */}

                <div className="admin-product-info">

                  <p className="admin-category">
                    {product.category}
                  </p>

                  <h3>{product.name}</h3>

                  <p className="admin-price">
                    ₹{product.price}
                  </p>

                  <p className="admin-sizes">
                    <strong>Sizes:</strong>{" "}
                    {product.size &&
                    product.size.length > 0
                      ? product.size.join(", ")
                      : "Not specified"}
                  </p>

                  <div className="admin-actions">

                    <button
                      onClick={() =>
                        editProduct(product)
                      }
                      className="edit-btn"
                    >
                      ✏️ Edit Product
                    </button>

                    <button
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                      className="delete-btn"
                    >
                      🗑️ Remove Product
                    </button>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
}

export default AdminDashboard;