import { useEffect, useState } from "react";
import { UserContext, SetUserContext, userT } from "./context/UserContext";
import MainContent from "./components/mainContent/MainContent";
import { updateUser } from "./functions/user";

function App() {
  const [user, setUser] = useState<userT | null>(null);

  useEffect(() => {
    updateUser(setUser);
  }, []);

  return (
    <>
      <SetUserContext.Provider value={setUser}>
        <UserContext.Provider value={user}>
          <MainContent></MainContent>
        </UserContext.Provider>
      </SetUserContext.Provider>
    </>
  );
}

export default App;
