import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import globalUrls from "../Utility/Urls";

import "../../sass/components/footer.scss";

const Footer = () => {
  const [isSubmited, setIsSubmited] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const submitEmail = (data, event) => {
    event.preventDefault();

    let jsonData = JSON.stringify(data);
    fetchPost(data);
    showMessage();
    event.target.reset();
  };

  const fetchPost = async (data) => {
    const request = fetchPostRequest(data);

    const response = await fetch(
      globalUrls.BASE_URL + "/api/Contact/subscription",
      request
    );

    const dataValue = await response.text();
  };

  const fetchPostRequest = (data) => {
    return {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    };
  };

  const showMessage = () => {
    const el = document.getElementById("thanks_message");

    if (!isSubmited) {
      el.style.display = "block";
      setIsSubmited(true);
    } else {
      el.style.display = "none";
      setIsSubmited(false);
    }
  };

  return (
    <div className="footer">
      <div className="sitemap">
        <div className="sitemap__categories">
          <div className="sitemap__category">
            <h4 className="sitemap__title">About</h4>
            <ul className="sitemap__list">
              <li>
                <Link to="/about" className="sitemap__item">
                  Information
                </Link>
              </li>
              <li>
                <Link to="register" className="sitemap__item">
                  Join us
                </Link>
              </li>
              {/* <li>
                <Link className="sitemap__item">In the future...</Link>
              </li>  */}
            </ul>
          </div>
          <div className="sitemap__category">
            <h4 className="sitemap__title">For Business</h4>
            <ul className="sitemap__list">
              <li>
                <Link to="/business" className="sitemap__item">
                  Contact Form
                </Link>
              </li>
              <li>
                <Link to="register" className="sitemap__item">
                  Create owner account
                </Link>
              </li>
            </ul>
          </div>
          <div className="sitemap__category">
            <h4 className="sitemap__title">Contacts</h4>
            <ul className="sitemap__list">
              <li>
                <Link className="sitemap__item">
                  <ion-icon
                    name="logo-instagram"
                    class="sitemap__link-logo"
                  ></ion-icon>
                  <p>Instagram</p>
                </Link>
              </li>
              <li>
                <Link className="sitemap__item">
                  <ion-icon
                    name="logo-facebook"
                    class="sitemap__link-logo"
                  ></ion-icon>
                  <p>Facebook</p>
                </Link>
              </li>
              <li>
                <Link className="sitemap__item">
                  <ion-icon
                    name="logo-twitter"
                    class="sitemap__link-logo"
                  ></ion-icon>
                  <p>Twitter</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <form
            className="form-subscription"
            onSubmit={handleSubmit(submitEmail)}
          >
            <p className="form-subscription__title">
              Do you want to subscribe for news?
            </p>
            <div className="form-subscription__container">
              <input
                className="form-subscription__input"
                id="form-subscription__input"
                placeholder="Enter your email"
                type="text"
                name="emailAddress"
                {...register("emailAddress", {
                  required: "email is required",
                  maxLength: {
                    value: 100,
                    message: "Maximum allowed legth is 100",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
              <div>
                {errors?.name && <p>{errors?.emailAddress?.message}</p>}
              </div>
              <button type="submit" className="form-subscription__button">
                Subscribe
              </button>
            </div>
            <p id="thanks_message">Thank you for you subscription!</p>
          </form>
        </div>
      </div>
      <div className="copyright">
        <p>
          &copy; Copyright <b>BEBRA TEAM</b>
        </p>
      </div>
    </div>
  );
};

export default Footer;
