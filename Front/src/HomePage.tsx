import { Footer, Header, Menu } from "@components/common";

import { useAppSelector } from "@hooks/app";
import { Outlet } from "react-router-dom";



const HomePage = () => {
  const { accessToken } = useAppSelector(state => state.auth);

  return (
    <>
      <Header />
      {/* <div> */}
      <Outlet />
      {/* </div> */}
      {accessToken ? <Menu /> : ''}

      <Footer />

    </>
  )
}

export default HomePage;
