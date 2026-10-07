import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small">
            NEW COLLECTION
          </p>

          <h1>
            Discover Your Style
          </h1>

          <p>
            Beautiful dresses for
            every occasion.
          </p>

          <Link
            to="/shop"
            className="shop-btn"
          >
            Shop Now
          </Link>

        </div>

      </section>

      <section className="home-section">

        <h2>
          Why Choose Us?
        </h2>

        <div className="features">

          <div className="feature">
            <div className="feature-icon">
              ✨
            </div>

            <h3>
              Premium Quality
            </h3>

            <p>
              High-quality fashion
              at affordable prices.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              📱
            </div>

            <h3>
              Easy Ordering
            </h3>

            <p>
              Order directly
              through WhatsApp.
            </p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              💬
            </div>

            <h3>
              Personal Service
            </h3>

            <p>
              Contact us directly
              for your requirements.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;