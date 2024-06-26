import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const getLocalAccessToken = () => {
  try {
    const accessToken = Cookies.get("accessToken");
    return accessToken;
  } catch (error) {
    return null;
  }
};

const getUser = (accessToken) => {
  try {
    return jwtDecode(accessToken);
  } catch (error) {
    return null;
  }
};

const getLocalRefreshToken = () => {
  try {
    const refreshToken = Cookies.get("refreshToken");

    if (refreshToken) {
      return refreshToken;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateLocalAccessToken = (token) => {
  try {
    Cookies.set("accessToken", token.access_token);
    const decodedToken = jwtDecode(token.access_token);
    const expirationTimestamp = decodedToken.exp * 1000; 
    const expirationDate = new Date(expirationTimestamp);
    Cookies.set("expirationDate",expirationDate)

    if (token.refresh_token) {
      Cookies.set("refreshToken", token.refresh_token);
    } else {
      throw new Error("Refresh token is missing.");
    }
  } catch (error) {
    console.log("Error updating local access token:", error);
    return "error";
  }
};
const updateUser = (userId, role, name) => {
  try {
    Cookies.set("role", role, );
    Cookies.set("userId", userId);
    Cookies.set("count", 0);
    Cookies.set("name", name);
  } catch (error) {
    console.log("Error updating local access token:", error);
    return "error";
  }
};

const setBusinessId = (id, access) => {
  try {
    Cookies.set("businessId", id);
    Cookies.set("access", access);
  } catch (error) {
    console.log("Error");
  }
};
const getBusinessId = () => {
  try {
    const businessId = Cookies.get("businessId");
    return businessId;
  } catch (error) {
    console.log("Error");
  }
};
const getAccess = () => {
  try {
    const access = Cookies.get("access");
    return access;
  } catch (error) {
    console.log("Error");
  }
};
const getUserProfile = () => {
  let user = {
    userId: Cookies.get("userId"),
    role: Cookies.get("role"),
    name: Cookies.get("name"),
  };
  return user;
};

const removeUser = () => {
  try {
    const token = Cookies.get("accessToken");
    if (token) {
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });
      Cookies.remove("role", { path: "/" });
      Cookies.remove("userId", { path: "/" });
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getExpireDate = async (token) => {
  const decodedUser = jwtDecode(token?.refreshToken);
  return new Date(decodedUser.exp * 1000);
};
const isAccessExpired = async () => {
  try {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      return true; 
    }

    const decodedToken = jwtDecode(accessToken);
    const expirationTimestamp = decodedToken.exp * 1000; 
    const expirationDate = new Date(expirationTimestamp);
    const currentTime = new Date();
    return currentTime > expirationDate;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true; 
  }
};

const TokenService = {
  getLocalAccessToken,
  updateLocalAccessToken,
  removeUser,
  getExpireDate,
  isAccessExpired,
  getLocalRefreshToken,
  getUser,
  updateUser,
  getUserProfile,
  getBusinessId,
  setBusinessId,
  getAccess
};

export default TokenService;
