import { Footer, Header, Menu } from "@components/common";
import Checkpoint from "@components/common/Checkpoint/Checkpoint";

import { useAppSelector } from "@hooks/app";
import { Outlet, useLocation } from "react-router-dom";



const HomePage = () => {
  const { userData } = useAppSelector(state => state.auth);
  const location = useLocation()
  return (
    <>
      <Header />
      <Outlet />
      {userData ? <Menu /> : ''}
      {userData &&
        (location.pathname === '/Binko/home'
          || location.pathname === '/Binko/books'
          || location.pathname === '/Binko/') ? <Checkpoint /> : ""}
      <Footer />

    </>
  )
}

export default HomePage;
