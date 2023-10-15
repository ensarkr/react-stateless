import { useState, useCallback, useContext } from "react";
import useGetCSRF from "../../../hooks/useGetCSRF";
import { SetUserContext } from "../../../context/UserContext";
import { updateUser } from "../../../functions/user";

export default function LoginPage({ show }: { show: boolean }) {
  const setUser = useContext(SetUserContext);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { hashedCookie, csrfErrorMessage } = useGetCSRF(show, "guest");

  const loginRequest = useCallback(
    (type: "admin" | "user", hashedCookie: string) => {
      fetch("http://localhost:3000/api/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token-hashed-guest": hashedCookie,
        },
        credentials: "include",
        body: JSON.stringify({ userId: type === "admin" ? 1 : 0 }), // * there are 2 users in backend
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
        .catch((e) => setFetchError(e.message));
    },
    []
  );

  if (!show) return <></>;

  return (
    <>
      <h3>Login</h3>
      {fetchError || csrfErrorMessage ? (
        <div>
          <p>{fetchError || csrfErrorMessage}</p>
        </div>
      ) : (
        <></>
      )}
      <div>
        <button
          onClick={() => {
            loginRequest("user", hashedCookie);
          }}
        >
          login as user
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            loginRequest("admin", hashedCookie);
          }}
        >
          login as admin
        </button>
      </div>
    </>
  );
}
