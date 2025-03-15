import { Footer, Header, Menu } from "@components/common";

import { useAppSelector } from "@hooks/app";
import { Outlet } from "react-router-dom";



const HomePage = () => {
  const { userData } = useAppSelector(state => state.auth);

  return (
    <>
      <Header />
      {/* <div> */}
      <Outlet />
      {/* </div> */}
      {userData ? <Menu /> : ''}

      <Footer />

    </>
  )
}

export default HomePage;
