import { useState, useCallback, useContext } from "react";
import useGetCSRF from "../../../hooks/useGetCSRF";
import { SetUserContext, UserContext } from "../../../context/UserContext";
import { updateUser } from "../../../functions/user";

export default function ProfilePage({ show }: { show: boolean }) {
  const setUser = useContext(SetUserContext);
  const user = useContext(UserContext);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { hashedCookie, csrfErrorMessage } = useGetCSRF(show, "user");

  const logoutRequest = useCallback((hashedCookie: string) => {
    fetch("http://localhost:3000/api/logout", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token-hashed-user": hashedCookie,
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          updateUser(setUser);
          setFetchError(null);
        } else {
          res.json().then((data) => {
            setFetchError(data.msg);
          });
        }
      })
      .catch((e) => setFetchError(e));
  }, []);

  if (!show) return <></>;

  return (
    <>
      <h3>Profile</h3>
      {fetchError || csrfErrorMessage ? (
        <div>
          <p>{fetchError || csrfErrorMessage}</p>
        </div>
      ) : (
        <></>
      )}
      <div>
        {user === null ? (
          "User is not logged in."
        ) : (
          <>
            <p>name:{user.name}</p>
            <p>email:{user.email}</p>
            <p>role:{user.role}</p>
          </>
        )}
      </div>

      <div>
        <button
          disabled={user === null}
          onClick={() => {
            logoutRequest(hashedCookie);
          }}
        >
          logout
        </button>
      </div>
    </>
  );
}
