import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import About from "../components/PageService/About";
import Facilities from "../components/PageService/Facilities";
import Information from "../components/PageService/Information";
import Reviews from "../components/PageService/Reviews";
import useAuth from "../components/hooks/useAuth";
import { MDBSpinner } from "mdb-react-ui-kit";
import globalUrls from "../components/Utility/Urls";

const Service = () => {
  const serviceData = useLocation();
  const { auth } = useAuth();
  const { id } = useParams();

  const [service, setService] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    

    async function getSalon(id) {
      const userGetRequest = {
        method: "GET",
        headers: { "Content-type": "application/json" },
      };

      const response = await fetch(
        globalUrls.BASE_URL + "/api/Salons/" + id,
        userGetRequest
      );

      const data = await response.json();

      if (response.status === 200) {
        setService(data);
      }
    }
    getSalon(id);
  }, []);

  return (
    <div className="container_container margin-top-big">
      {service.length != 0 ? (
        <>
          <Information item={service} />
          <About item={service} />
          <Facilities item={service} />
          <Reviews item={service} />
        </>
      ) : (
        <div className="text-center">
          <MDBSpinner
            role="status"
            size="l"
            style={{ width: "7rem", height: "7rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </MDBSpinner>
        </div>
      )}
    </div>
  );
};

export default Service;
