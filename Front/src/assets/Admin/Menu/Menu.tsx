import { Link } from "react-router-dom";
import style from "./Menu.module.css";
const { menus, items, listItems, listItemTitle } = style;
import { menu } from "src/data/data";


const Menu = () => {
    return (
        <div className={menus}>
            {menu.map((item: any) => (
                <div className={items} key={item.id}>
                    <span className="title">{item.title}</span>
                    {item.listItems.map((listItem: any) => (
                        <Link to={listItem.url} className={listItems} key={listItem.id}>
                            <img src={listItem.icon} alt="" />
                            <span className={listItemTitle}>{listItem.title}</span>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Menu;
