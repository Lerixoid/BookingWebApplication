import { useState, useEffect } from "react";
import useAuth from "../components/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import globalUrls from "../components/Utility/Urls";
import Tab from "../components/PageProfile/Tab";
import AppointmentList from "../components/PageProfile/AppointmentList";
import History from "../components/PageProfile/History";
import Wishlist from "../components/PageProfile/Wishlist";
import Image from "../components/Utility/Image";
import Support from "../components/PageProfile/Support";
import Settings from "../components/PageProfile/Settings";

import "../sass/components/profile.scss";

const TABS_DUMMY = [
  {
    id: 0,
    iconName: "person-outline",
    title: "Profile",
  },
  {
    id: 1,
    iconName: "time-outline",
    title: "Appointments",
  },

  {
    id: 2,
    iconName: "heart-outline",
    title: "Wishlist",
  },

  {
    id: 3,
    iconName: "help-circle-outline",
    title: "Support",
  },

  {
    id: 4,
    iconName: "settings-outline",
    title: "Settings",
  },
];

let AppointmentsActual = [];
let AppointmentsOld = [];

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  let userId = auth?.user;
  const [userData, setUserData] = useState({});
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function getUser(userId) {
      const userGetRequest = {
        method: "GET",
        headers: { "Content-type": "application/json" },
      };

      const response = await fetch(
        globalUrls.BASE_URL + "/api/Accounts/" + userId,
        userGetRequest
      );

      const data = await response.json();

      if (response.status === 200) {
        setUserData(data);
      }
    }
    getUser(userId);
  }, []);

  useEffect(() => {
    setAppointments(userData.appointments);
  }, [userData]);

  const logOut = async () => {
    setAuth({});
    localStorage.clear();
    navigate("/");
  };

  const [tabID, setTabID] = useState(0);

  const onClickHandle = (id) => {
    setTabID(id);
  };

  const filterPreviousAppointment = (o) => {
    const dateNow = new Date();

    const dateWithTimeSplit = o.dateFrom.split("T");
    const dateSplit = dateWithTimeSplit[0];
    const timeSplit = dateWithTimeSplit[1];

    let month = +dateSplit.split("-")[1];

    const dateToAppointment = new Date(
      dateSplit.split("-")[0],
      month,
      dateSplit.split("-")[2],
      timeSplit.split(":")[0],
      timeSplit.split(":")[1]
    );

    if (dateNow.getTime() > dateToAppointment.getTime()) {
      return true;
    }
    return false;
  };

  const filterFutureAppointment = (o) => {
    const dateNow = new Date();

    const dateWithTimeSplit = o.dateFrom.split("T");
    const dateSplit = dateWithTimeSplit[0];
    const timeSplit = dateWithTimeSplit[1];

    let month = +dateSplit.split("-")[1];

    const dateToAppointment = new Date(
      dateSplit.split("-")[0],
      month,
      dateSplit.split("-")[2],
      timeSplit.split(":")[0],
      timeSplit.split(":")[1]
    );

    if (dateNow.getTime() < dateToAppointment.getTime()) {
      return true;
    }
    return false;
  };

  let profileComponent;
  if (tabID === 0) {
    profileComponent = (
      <div className="profile__info">
        {userData.profilePicture !== undefined &&
        userData.profilePicture.bytes !== null ? (
          <>
            <Image
              data={userData.profilePicture.bytes}
              className="profile__img"
            />
          </>
        ) : (
          <p> Loading</p>
        )}

        <p className="profile__name">
          {userData.name} {userData.surname}
        </p>
        <p className="profile__phone">{userData.phoneNumber}</p>
        <button onClick={logOut} className="profile__button">
          Log out
        </button>
      </div>
    );
  } else if (tabID === 1) {
    if (appointments != null) {
      AppointmentsActual = appointments.filter(filterFutureAppointment);
      AppointmentsOld = appointments.filter(filterPreviousAppointment);
    }

    let appointmentsActualComponent = <></>;
    if (AppointmentsActual.length === 0) {
      appointmentsActualComponent = (
        <div>
          <h2 className="profile__title">
            You don't have future appointments!
          </h2>
        </div>
      );
    } else {
      appointmentsActualComponent = (
        <div>
          <h2 className="profile__title">Your appointments</h2>
          <AppointmentList
            appointments={AppointmentsActual}
            isHistory={false}
            userId={userId}
          />
        </div>
      );
    }

    let appointmentsOldComponent = <></>;
    if (AppointmentsOld.length === 0) {
      appointmentsOldComponent = (
        <div>
          <h2 className="profile__title">
            You don't have any old appointments!
          </h2>
        </div>
      );
    } else {
      appointmentsOldComponent = (
        <div>
          <h2 className="profile__title">Your previous appointments</h2>
          <AppointmentList
            appointments={AppointmentsOld}
            isHistory={true}
            userId={userId}
          />
        </div>
      );
    }

    profileComponent = (
      <div>
        {appointmentsActualComponent}
        {appointmentsOldComponent}
      </div>
    );
  } else if (tabID === 2) {
    profileComponent = <Wishlist />;
  } else if (tabID === 3) {
    profileComponent = <Support />;
  } else if (tabID === 4) {
    profileComponent = <Settings user={userData} />;
  }

  return (
    <div className="container margin-bottom-big">
      <div className="profile">
        <ul className="container__tabs">
          {TABS_DUMMY.map((tab) => (
            <li key={tab.id} onClick={() => onClickHandle(tab.id)}>
              <Tab tab={tab} />
            </li>
          ))}
        </ul>
        {profileComponent}
      </div>
    </div>
  );
};

export default Profile;
