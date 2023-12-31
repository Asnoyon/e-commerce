import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onSearch, cartItemCount }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = () => {
    if (searchQuery.trim().length) {
      onSearch(searchQuery.trim());
    }
    setSearchQuery("");
  };

  return (
    <>
      <div className="wrapper">
        <header className="container py-2">
          <div className="grid">
            <Link to="/" className="link">
              <h1 className="brand">SilkStreet</h1>
            </Link>
            <div className="formContainer">
              <form className="search">
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Search Products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="search-btn"
                  onClick={handleSubmit}
                >
                  Search
                </button>
              </form>
            </div>
            <Link to="/cart" className="link headerCart">
              <img className="cartImg" src="./cart3.png" alt="cart" />
              {cartItemCount > 0 && (
                <div className="cartCounter">
                  {cartItemCount <= 9 ? cartItemCount : "9+"}
                </div>
              )}
            </Link>
          </div>
        </header>
      </div>
    </>
  );
};
export { Navbar };
