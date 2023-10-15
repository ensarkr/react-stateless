import { userT } from "../context/UserContext";
import { getCookie } from "./cookies";
import { decodeJWTPayload } from "./jwt";

const updateUser = (
  setUser: React.Dispatch<React.SetStateAction<userT | null>> | null
) => {
  const jwt_token = getCookie("jwt_token");

  if (setUser !== null) {
    if (jwt_token !== undefined) {
      setUser(decodeJWTPayload(jwt_token));
    } else {
      setUser(null);
    }
  }
};

export { updateUser };
