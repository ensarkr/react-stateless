import { useContext, useEffect, useState } from "react";
import useGetCSRF from "../../../hooks/useGetCSRF";
import { UserContext } from "../../../context/UserContext";

export default function ContentPage({ show }: { show: boolean }) {
  const user = useContext(UserContext);
  const [userContent, setUserContent] = useState("");
  const [adminContent, setAdminContent] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { hashedCookie, csrfErrorMessage } = useGetCSRF(show, "user");

  useEffect(() => {
    if (user === null || show === false) return;

    fetch("http://localhost:3000/api/getContent", {
      method: "GET",
      mode: "cors",
      headers: {
        "x-csrf-token-hashed-user": hashedCookie,
      },
      credentials: "include",
    })
      .then((res) =>
        res.json().then((data) => {
          if (res.status === 200) {
            if (data.userContent) setUserContent(data.userContent);
            if (data.adminContent) setAdminContent(data.adminContent);
            setFetchError(null);
          } else {
            setFetchError(data.msg);
          }
        })
      )
      .catch((e) => setFetchError(e.message));

    // * fetch when hashedCookie changes, which means user opened this component and getCSRF fetch successfully worked
  }, [hashedCookie]);

  if (!show) return <></>;

  return (
    <>
      <h3>Content</h3>
      {fetchError || csrfErrorMessage ? (
        <div>
          <p>{fetchError || csrfErrorMessage}</p>
        </div>
      ) : (
        <></>
      )}
      <div>
        <h4>User Content</h4>
        <p>
          {user && (user.role === "user" || user.role === "admin")
            ? fetchError || csrfErrorMessage || userContent
            : "You are not allowed to see this."}
        </p>
      </div>
      <div>
        <h4>Admin Content</h4>
        <p>
          {user && user.role === "admin"
            ? fetchError || csrfErrorMessage || adminContent
            : "You are not allowed to see this."}
        </p>
      </div>
    </>
  );
}
