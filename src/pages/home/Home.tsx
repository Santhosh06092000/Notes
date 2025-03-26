import { FunctionComponent, useMemo } from "react";
import { HomeProps } from "./IHome";
import { decode } from "../../utils/hashing";

const Home: FunctionComponent<HomeProps> = () => {
  const user = useMemo(() => decode(localStorage.getItem("user")), []);
  return <>Hello {user?.user_name} </>;
};

export default Home;
