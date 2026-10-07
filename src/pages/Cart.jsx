import { useState } from "react";

function Cart() {

  const [cart, setCart] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "cart"
        )
      ) || []
    );

  function updateCart(newCart) {

    setCart(newCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(newCart)
    );
  }

  function increase(index) {

    const newCart = [
      ...cart,
    ];

    newCart[index].quantity += 1;

    updateCart(newCart);
  }

  function decrease(index) {

    const newCart = [
      ...cart,
    ];

    if (
      newCart[index].quantity > 1
    ) {

      newCart[index].quantity -= 1;

    } else {

      newCart.splice(
        index,
        1
      );

    }

    updateCart(newCart);
  }

  function remove(index) {

    const newCart = [
      ...cart,
    ];

    newCart.splice(
      index,
      1
    );

    updateCart(newCart);
  }

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  function orderWhatsApp() {

    if (cart.length === 0) {

      alert(
        "Your cart is empty."
      );

      return;
    }

    let message =
      "Hello! I want to place an order:%0A%0A";

    cart.forEach(
      (item) => {

        message +=
          `👗 ${item.name}%0A` +
          `Size: ${item.size}%0A` +
          `Quantity: ${item.quantity}%0A` +
          `Price: ₹${item.price}%0A%0A`;

      }
    );

    message +=
      `💰 Total: ₹${total}%0A%0A`;

    message +=
      "Please confirm my order.";

    /*
      CHANGE THIS NUMBER
      Example:
      919876543210
    */

    const phoneNumber =
      import.meta.env.VITE_STORE_WHATSAPP;

    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank"
    );
  }

  return (
    <div className="page">

      <div className="cart-heading">

        <p className="section-label">
          YOUR SHOPPING BAG
        </p>

        <h1>
          Shopping Cart
        </h1>

      </div>

      {cart.length === 0 ? (

        <div className="empty-cart">

          <div className="empty-icon">
            🛒
          </div>

          <h2>
            Your cart is empty
          </h2>

          <p>
            Add some beautiful
            dresses to your cart.
          </p>

        </div>

      ) : (

        <>

          <div className="cart-list">

            {cart.map(
              (item, index) => (

                <div
                  className="cart-item"
                  key={`${item.id}-${item.size}`}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      Size:{" "}
                      <strong>
                        {item.size}
                      </strong>
                    </p>

                    <p className="cart-price">
                      ₹{item.price}
                    </p>

                    <div className="quantity">

                      <button
                        onClick={() =>
                          decrease(
                            index
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increase(
                            index
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        remove(index)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

          <div className="cart-summary">

            <h2>
              Order Summary
            </h2>

            <div className="total-row">

              <span>
                Total
              </span>

              <strong>
                ₹{total}
              </strong>

            </div>

            <button
              onClick={
                orderWhatsApp
              }
              className="whatsapp-btn"
            >
              📱 Order on WhatsApp
            </button>

          </div>

        </>

      )}

    </div>
  );
}

export default Cart;