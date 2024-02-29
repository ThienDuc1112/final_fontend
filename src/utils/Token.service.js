import Cookies from "js-cookie";
import jwtDecode from 'jwt-decode';

const getLocalAccessToken = () => {
    try {
        const accessToken = Cookies.get("accessToken");
        //console.log(jwtDecode(accessToken));
        return accessToken;
    } catch (error) {
        return null;
    }
};


const getUser = () => {
    try {
        const user = Cookies.get("accessToken")
        return jwtDecode(user)
    } catch (error) {
        return null;
    }
};


const getLocalRefreshToken = () => {
    try {
        const refreshToken = Cookies.get("refreshToken");

        if(refreshToken){
             return refreshToken;
        }
        
        return null;

    } catch (error) {
        console.log(error)
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
  const getUserProfile = () => {
      let user = {
        userId: Cookies.get("userId"),
        role: Cookies.get("role")
      }
      return user;
  }

const removeUser = () => {
    try {
        const token = Cookies.get("accessToken")
        if(token) {
            Cookies.remove('accessToken', { path: '/' })
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

const getExpiryDate = async (token) => {
    const decodedUser = jwtDecode(token?.refreshToken)
    return new Date(decodedUser.exp * 1000)
}

const isAccessExpired = () => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        const decodedUser = jwtDecode(accessToken);
        const expirationTimestamp = decodedUser.exp;
        const expirationDate = new Date(expirationTimestamp * 1000);
        
        // Convert the expiration date to the Vietnamese time zone
        const options = { timeZone: "Asia/Ho_Chi_Minh" };
        const expirationDateVN = expirationDate.toLocaleString("en-US", options);
        
        const currentTime = new Date();
        const isExpired = currentTime > expirationDate;
        
        console.log("Expiration date (VN):", expirationDateVN);
        console.log("Is expired:", isExpired);
        
        return isExpired;
      }
      
      return true;
    } catch (error) {
      return true;
    }
  };

const TokenService = {
    getLocalAccessToken,
    updateLocalAccessToken,
    removeUser,
    getExpiryDate,
    isAccessExpired,
    getLocalRefreshToken,
    getUser,
    updateUser,
    getUserProfile
  };

export default TokenService;