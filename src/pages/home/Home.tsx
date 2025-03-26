import "./Home.scss";
import { FunctionComponent, useMemo } from "react";
import { HomeProps } from "./IHome";
import { decode } from "../../utils/hashing";
import Typography from "../../components/Typography/Typography";
import { NavLink, Outlet } from "react-router";

const Home: FunctionComponent<HomeProps> = () => {
  const user = useMemo(() => decode(localStorage.getItem("user")), []);

  const getGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }, []);

  return (
    <div className="home">
      <header className="home-header">
        <Typography variant="h1" weight="medium">
          Keep Notes
        </Typography>
        <span className="menu-list">
          {menuList.map((menu) => {
            return (
              <NavLink
                to={menu.to}
                key={menu.to}
                style={{ textDecoration: "none" }}
                onClick={menu?.actions}
              >
                {({ isActive }) => (
                  <span
                    style={{
                      color: "rgb(30, 116, 137)",
                      fontSize: isActive ? "1.2rem" : "inherit",
                      fontWeight: isActive ? "1000" : "inherit",
                    }}
                  >
                    {menu.menu}
                  </span>
                )}
              </NavLink>
            );
          })}
        </span>
      </header>

      <section className="home-section">
        <h1 style={{ fontSize: "2rem" }}>
          {getGreeting} {user?.user_name} !
        </h1>
        <div className="main">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Home;

const menuList = [
  {
    menu: "About",
    to: "/about",
  },
  {
    menu: "Notes",
    to: "/notes",
  },
  {
    menu: "Account",
    to: "/account",
  },
  {
    menu: "Logout",
    to: "/sign-in",
    actions: () => {
      localStorage.clear();
    },
  },
];
