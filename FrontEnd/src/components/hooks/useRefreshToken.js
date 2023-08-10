import useAuth from "./useAuth";

import Urls from "../Utility/Urls";

const useRefreshToken = () => {
  const { auth, setAuth, local } = useAuth();
  let temp;
  let tempAuth;
  let requestOptions;

  const setAuthentification = () => {
    tempAuth = JSON.parse(localStorage.getItem("auth"));
    if (tempAuth !== null && tempAuth.length !== 0) {
      return tempAuth;
    }
  };

  if (auth !== null && auth.length !== 0) {
    temp = setAuthentification();
    requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        login: temp.login,
        refreshToken: temp.refreshToken,
      },
      body: "",
    };
  } else {
    requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        login: auth?.login,
        refreshToken: auth?.refreshToken,
      },
      body: "",
    };
  }

  const refresh = async () => {
    const response = await fetch(
      Urls.BASE_URL + "/api/Accounts/refresh",
      requestOptions
    );
    if (response.status === 200) {
      const data = await response.text();
      setAuth((prev) => {
        if (JSON.stringify(prev) === "{}") {
          return { ...temp, accessToken: data };
        }
        return { ...prev, accessToken: data };
      });
      localStorage.setItem("acessToken", data);
      return data;
    }
  };
  return refresh;
};

export default useRefreshToken;
