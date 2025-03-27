import "./App.scss";
import { Route, Routes } from "react-router";
import PrivateRoute from "./router/privateRoute";
import Home from "./pages/home/Home";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";
import Notes from "./pages/notes/Notes";
import { createContext, useMemo } from "react";
import { ISignUp } from "./pages/signUp/ISignUp";
import { decode } from "./utils/hashing";

export const UserContext = createContext<ISignUp | null>(null);

function App() {
  const user = useMemo(() => {
    return decode(localStorage.getItem("user"));
  }, []);
  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" />
          <Route path="/account" />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
