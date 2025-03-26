import "./App.scss";
import { Route, Routes } from "react-router";
import PrivateRoute from "./router/privateRoute";
import Home from "./pages/home/Home";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp";

function App() {
  return (
    <>
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
          <Route path="/notes" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
