import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const getLocalAccessToken = () => {
  try {
    const accessToken = Cookies.get("accessToken");
    //console.log(jwtDecode(accessToken));
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
const updateUser = (userId, role) => {
  try {
    Cookies.set("role", role);
    Cookies.set("userId", userId);
  } catch (error) {
    console.log("Error updating local access token:", error);
    return "error";
  }
};

const setBusinessId = (id) => {
  try {
    Cookies.set("businessId", id);
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
const getUserProfile = () => {
  let user = {
    userId: Cookies.get("userId"),
    role: Cookies.get("role"),
  };
  return user;
};

const removeUser = () => {
  try {
    const token = Cookies.get("accessToken");
    if (token) {
      Cookies.remove("accessToken", { path: "/" });
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
      return true; // No access token means "expired"
    }

    const decodedToken = jwtDecode(accessToken);
    const expirationTimestamp = decodedToken.exp * 1000; // Convert to milliseconds
    const expirationDate = new Date(expirationTimestamp);
    const currentTime = new Date();

    console.log("Expiration date (local):", expirationDate.toLocaleString());
    console.log("Is expired:", currentTime > expirationDate);

    return currentTime > expirationDate;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true; // Assume expired on error
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
  setBusinessId
};

export default TokenService;
