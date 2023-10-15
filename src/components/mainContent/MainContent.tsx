import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import ContentPage from "./contentPage/ContentPage";
import LoginPage from "./loginPage/LoginPage";
import ProfilePage from "./profilePage/ProfilePage";

export default function MainContent() {
  const user = useContext(UserContext);
  const [page, setPage] = useState<"login" | "content" | "profile">("login");

  return (
    <>
      <div>
        <h2>Status</h2>
        <dl>
          <dt>JWT payload</dt>
          <dd>
            {user === null ? (
              "no jwt token"
            ) : (
              <pre>{JSON.stringify(user, null, 4)}</pre>
            )}
          </dd>
        </dl>
      </div>
      <div>
        <h2>Pages</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "15px",
            flexDirection: "row",
          }}
        >
          <button onClick={() => setPage("login")}>Login</button>
          <button onClick={() => setPage("content")}>Content</button>
          <button onClick={() => setPage("profile")}>Profile</button>
        </div>
      </div>
      <div>
        <LoginPage show={page === "login"}></LoginPage>
        <ContentPage show={page === "content"}></ContentPage>
        <ProfilePage show={page === "profile"}></ProfilePage>
      </div>
    </>
  );
}
