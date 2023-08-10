import React from "react";
import "../sass/components/about.scss";
import { useLocation, useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const toRegisterPage = (user) => {
    navigate("/register");
  };
  const toContactPage = (user) => {
    navigate("/contact");
  };
  return (
    <div className="about_container">
      <div className="main_information">
        <div className="image">
          <img src={`${process.env.PUBLIC_URL}/about.png`} />
        </div>

        <div className="description">
          <p className="description__maintitle"> BEBRA BOOKING</p>
          <p className="description__paragraf">
            Welcome to Bebra Booking, a comprehensive booking service website
            that allows you to easily reserve and purchase appointments for a
            variety of services and activities. In addition to offering
            appointments to health centers, different assistance services , and
            book healing procedures Bebra Booking also allows you to book visits
            to salons and other beauty services. Whether you're in need of a
            haircut, manicure, or facial, you can find a salon near you and
            schedule an appointment with just a few clicks. Booking with Bebra
            Booking is quick and easy, thanks to our user-friendly interface and
            secure payment options. And if you have any questions or need
            assistance, our customer support team is available 24/7 to help you
            out. So why wait? Start booking your next outing or service today
            with Bebra Booking!
          </p>

          <div className="contact__button__container">
            <button className="join_button" onClick={toRegisterPage}>
              Join Us
            </button>
            <div className="contact__button">
              <p className="contact__button__title">Have any question?</p>
              <button
                className="contact__button__button"
                onClick={toContactPage}
              >
                Contact Us
              </button>
            </div>
          </div>
          <hr class="description__line"></hr>
        </div>
      </div>
      <div className="about">
        <div class="about__information">
          <h1 class="information__maintitle">About us</h1>
          <p className="information__paragraf">
            Bebra Booking is an online booking service that allows users to
            schedule appointments for a variety of services, including hair
            styling, nails, massages, and more. The platform is designed to make
            it easy for both service providers and customers to connect and
            schedule appointments, saving time and hassle.
          </p>

          <p className="information__paragraf">
            One of the key benefits of Bebra Booking is its user-friendly
            interface. Customers can easily search for service providers in
            their area, view their availability, and book appointments online.
            This eliminates the need to call around and try to find an opening
            that works for you, saving you time and effort. Service providers,
            on the other hand, can use Bebra Booking to manage their schedules,
            set their availability, and take appointments online, all from a
            single platform. Bebra Booking also offers a range of features to
            make the booking process even easier. Customers can use the platform
            to pay for their appointments in advance, eliminating the need to
            worry about payment on the day of the service. They can also view
            customer reviews and ratings to help them choose the best service
            provider for their needs. And if they need to reschedule or cancel
            an appointment, they can do so easily through the platform.
          </p>

          <p className="information__paragraf">
            In addition to its convenience, Bebra Booking is also a secure
            platform. All payments are processed through secure channels, and
            customer information is kept confidential. This gives customers
            peace of mind when booking appointments and sharing their personal
            information.Overall, Bebra Booking is a valuable resource for anyone
            in need of beauty, wellness, or personal care services. It makes it
            easy to find and book appointments with the best service providers
            in your area, and its range of features makes the process quick and
            hassle-free. So if you're in need of a haircut, massage, or any
            other service, give Bebra Booking a try and see how it can make your
            life easier.
          </p>
        </div>
        <div className="about__image">
          <img
            src={`${process.env.PUBLIC_URL}/about_information.jpg`}
            className="about__image__img"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
