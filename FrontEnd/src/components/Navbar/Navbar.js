import { Link } from "react-router-dom";
import { useState } from "react";

import "../../sass/components/navbar.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const ShowMenu = (event) => {
    const el = document.getElementById("nav__list");
    if (open !== true) {
      el.style.display = "flex";
      setOpen(true);
    } else {
      el.style.display = "none";
      setOpen(false);
    }
  };

  return (
    <div className="nav">
      <Link to="/">
      <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          className="nav__logo"
          alt="logo"
        />
      </Link>
      <ion-icon
        name="menu-outline"
        class="mob-nav"
        onClick={ShowMenu}
      ></ion-icon>

      <ul className="nav__list" id="nav__list">
        <Link to="/about" className="nav__item">
          About Us
        </Link>
        <Link to="/faq" className="nav__item">
          FAQ
        </Link>
        <Link to="/contact" className="nav__item">
          Contacts
        </Link>
        <Link to="/business" className="nav__item">
          For Business
        </Link>
        <div className="nav__buttons">
          <Link to="login" className="nav__item nav__button-login">
            Log in
          </Link>
          <Link to="services" className="nav__item nav__button">
            Book
          </Link>
        </div>

        {/* сделать ограничение для роли */}
        <div className="nav__profile">
          <Link to="profile">
            <ion-icon class="nav__icon" name="person-circle-outline"></ion-icon>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
