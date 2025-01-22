import Navbar from "@components/Chats/Navbar/Navbar"
import Search from "@components/Chats/Search/Search"
import Chats from "@components/Chats/Chats/Chats"
import style from './SideBar.module.css';
const { sidebar, showSide } = style;
const Sidebar = ({ show }: { show: boolean }) => {
  return (
    <div className={show ? `${sidebar} ${showSide}` : `${sidebar}`
    }>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
