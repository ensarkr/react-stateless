import { useEffect, useState } from "react";

export default function useGetCSRF(toggle: boolean, level: "guest" | "user") {
  const [hashedCookie, setHashedCookie] = useState("");
  const [csrfErrorMessage, setCsrfErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toggle === true) {
      // * toggle is show for components
      fetch("http://localhost:3000/api/getCSRF", {
        method: "POST", // * POST method because its safer then GET
        mode: "cors", // * cors because we are sending request to cross-origin request
        headers: {
          "Content-Type": "application/json",
          "x-csrf-origin": level, // * set for choosing level of csrf tokens, ones secret key is user-specific other one is same for all users
        },
        credentials: "include", // * because we want send our cookies with the request
        body: "{}",
      })
        .then((res) => {
          res.json().then((data) => {
            if (res.status === 200) {
              setCsrfErrorMessage(null);
              setHashedCookie(
                data[
                  "hashedCSRFToken" +
                    level[0].toUpperCase() +
                    level.slice(1, level.length)
                ]
              );
            } else {
              setCsrfErrorMessage(data.msg);
            }
          });
        })
        .catch((e) => {
          setCsrfErrorMessage(e.message);
        });
    }
  }, [toggle]);

  return {
    hashedCookie,
    setHashedCookie,
    csrfErrorMessage,
  };
}
