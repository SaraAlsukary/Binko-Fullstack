import Sidebar from '@components/Chats/SideBar/Sidebar';
import style from './Chats.module.css'
import Input from "@components/Chats/Input/Input";
import { Outlet } from "react-router-dom";

import Cam from "src/img/cam.png";
import Add from "src/img/add.png";
import More from "src/img/more.png";
import { useAppSelector } from "@hooks/app";
import { useState } from 'react';
const { container, home, chat, chatInfo, chatIcons } = style;

const Chats = () => {
  const { user } = useAppSelector(state => state.auth);
  const [show, setShow] = useState(false);
  return (
    <div className={`${home} ${container}`}>
      <Sidebar show={show} />
      <div className={chat}>
        <div className={chatInfo}>
          <span>{user?.name}</span>
          <div className={chatIcons}>
            <img src={Cam} alt="" />
            <img src={Add} alt="" />
            <img src={More} alt="" onClick={() => setShow(!show)} />
          </div>
        </div>
        <Outlet />

        <Input />
      </div>
    </div>
  )
}

export default Chats