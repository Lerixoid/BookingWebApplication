import React, { useState } from "react";
import "../sass/components/faq.scss";
import {
  MDBCollapse,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBTypography,
} from "mdb-react-ui-kit";

const Faq = () => {
  const [collapse1, setCollapse1] = useState(false);
  const [collapse2, setCollapse2] = useState(false);
  const [collapse3, setCollapse3] = useState(false);
  const [collapse4, setCollapse4] = useState(false);
  const [collapse5, setCollapse5] = useState(false);
  const [collapse6, setCollapse6] = useState(false);
  const [collapse7, setCollapse7] = useState(false);
  const [collapse8, setCollapse8] = useState(false);
  const [collapse9, setCollapse9] = useState(false);
  const [collapse10, setCollapse10] = useState(false);

  const toggleCollapse1 = () => setCollapse1(!collapse1);
  const toggleCollapse2 = () => setCollapse2(!collapse2);
  const toggleCollapse3 = () => setCollapse3(!collapse3);
  const toggleCollapse4 = () => setCollapse4(!collapse4);
  const toggleCollapse5 = () => setCollapse5(!collapse5);
  const toggleCollapse6 = () => setCollapse6(!collapse6);
  const toggleCollapse7 = () => setCollapse7(!collapse7);
  const toggleCollapse8 = () => setCollapse8(!collapse8);
  const toggleCollapse9 = () => setCollapse9(!collapse9);
  const toggleCollapse10 = () => setCollapse10(!collapse10);

  return (
    <div className="faq_container">
      <h1 className="faq_title">FAQ</h1>
      <MDBContainer className="mt-5" style={{ maxWidth: "1000px" }}>
        <MDBListGroup>
          <MDBListGroupItem tag="a" href="#" onClick={toggleCollapse1} action>
            <MDBTypography tag="h5" className="mdb_title">
              Question 1
            </MDBTypography>
            <p className="mb-1">How do I book an appointment through Booksy?</p>
            <small>
              <hr></hr>
            </small>
            <MDBCollapse show={collapse1}>
              To book an appointment through Bebra Booking website, simply
              create an account and search for service providers in your area.
              You can view their availability and book an appointment that works
              for you.
            </MDBCollapse>
          </MDBListGroupItem>
          <MDBListGroupItem tag="a" href="#" onClick={toggleCollapse2} action>
            <MDBTypography tag="h5" className="mdb_title">
              Question 2
            </MDBTypography>
            <p className="mb-1">
              Can I pay for my appointment through Bebra Booking website?
            </p>
            <small>
              <hr></hr>
            </small>
            <MDBCollapse show={collapse2}>
              Yes, Bebra Booking allows you to pay for your appointment in
              advance through the platform. This eliminates the need to worry
              about payment on the day of the service.
            </MDBCollapse>
          </MDBListGroupItem>

          <MDBListGroupItem tag="a" href="#" onClick={toggleCollapse3} action>
            <MDBTypography tag="h5" className="mdb_title">
              Question 3
            </MDBTypography>
            <p className="mb-1">Where Bebra Booking is available?</p>
            <small>
              <hr></hr>
            </small>
            <MDBCollapse show={collapse3}>
              We are providing our services in the top biggest cities in Poland:
              Warszawa, Kraków, Łódż, Wrocław,Poznań,Gdańsk, Szczecin,
              Lublin,Katowice,Gdynia
            </MDBCollapse>
          </MDBListGroupItem>

          <MDBListGroupItem tag="a" href="#" onClick={toggleCollapse4} action>
            <MDBTypography tag="h5" className="mdb_title">
              Question 4
            </MDBTypography>
            <p className="mb-1">
              What types of services can I book through Bebra Booking?
            </p>
            <small>
              <hr></hr>
            </small>
            <MDBCollapse show={collapse4}>
              Bebra Booking offers a wide range of services, including hair
              styling, nails, massages, and more. You can browse through the
              available services to find one that meets your needs.
            </MDBCollapse>
          </MDBListGroupItem>

          <MDBListGroupItem tag="a" href="#" onClick={toggleCollapse5} action>
            <MDBTypography tag="h5" className="mdb_title">
              Question 5
            </MDBTypography>
            <p className="mb-1">
              Are there any discounts or promotions available on Bebra Booking
            </p>
            <small>
              <hr></hr>
            </small>
            <MDBCollapse show={collapse5}>
              Some service providers may offer discounts or promotions on Bebra
              Booking. You can view any available promotions by searching for
              service providers and see change of price near the services.
            </MDBCollapse>
          </MDBListGroupItem>

          <MDBListGroupItem tag="a" href="#" onClick={toggleCollapse6} action>
            <MDBTypography tag="h5" className="mdb_title">
              Question 6
            </MDBTypography>
            <p className="mb-1">
              Is customer support available if I have questions or need
              assistance?
            </p>
            <small>
              <hr></hr>
            </small>
            <MDBCollapse show={collapse6}>
              Yes, Bebra Booking has a customer support team available to assist
              you with any questions or issues you may have. You can contact
              them through contact form on Support page.
            </MDBCollapse>
          </MDBListGroupItem>

          <MDBListGroupItem tag="a" href="#" onClick={toggleCollapse7} action>
            <MDBTypography tag="h5" className="mdb_title">
              Question 7
            </MDBTypography>
            <p className="mb-1">
              Can I use Bebra Booking website on my mobile device?
            </p>
            <small>
              <hr></hr>
            </small>
            <MDBCollapse show={collapse7}>
              Yes of course, we have mobile and tablet versions of site in you
              browser.
            </MDBCollapse>
          </MDBListGroupItem>

          <MDBListGroupItem tag="a" href="#" onClick={toggleCollapse8} action>
            <MDBTypography tag="h5" className="mdb_title">
              Question 8
            </MDBTypography>
            <p className="mb-1">
              How can I use Bebra Booking for my bussiness ?
            </p>
            <small>
              <hr></hr>
            </small>
            <MDBCollapse show={collapse8}>
              Businesses can use Booksy to manage their schedules and take
              appointments from clients. Contact customer support for or visit
              our page "For Business" more information on setting up a business
              account.
            </MDBCollapse>
          </MDBListGroupItem>

          <MDBListGroupItem tag="a" href="#" onClick={toggleCollapse9} action>
            <MDBTypography tag="h5" className="mdb_title">
              Question 9
            </MDBTypography>
            <p className="mb-1">Can I view my appointment history on Booksy?</p>
            <small>
              <hr></hr>
            </small>
            <MDBCollapse show={collapse9}>
              You can view your appointment history on Booksy by logging in to
              your account and going to the "Appointments" tab. Here, you can
              see a list of all of the appointments you have booked through the
              platform.
            </MDBCollapse>
          </MDBListGroupItem>

          <MDBListGroupItem tag="a" href="#" onClick={toggleCollapse10} action>
            <MDBTypography tag="h5" className="mdb_title">
              Question 10
            </MDBTypography>
            <p className="mb-1">
              How far in advance can I book an appointment through Booksy?
            </p>
            <small>
              <hr></hr>
            </small>
            <MDBCollapse show={collapse10}>
              This will depend on the availability of the service provider you
              are booking with. Some providers may have appointments available
              for booking several weeks or even months in advance, while others
              may have more limited availability.
            </MDBCollapse>
          </MDBListGroupItem>
        </MDBListGroup>
      </MDBContainer>
    </div>
  );
};
export default Faq;
