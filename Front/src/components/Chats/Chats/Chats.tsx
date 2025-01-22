// import { doc, onSnapshot } from "firebase/firestore";
import { useAppSelector } from "@hooks/app";
import img from '@assets/imgs/books/Les misrables.jpg'
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";
import './Chats.css';
import './activeChat.css'
import { NavLink } from "react-router-dom";
const Chats = () => {
  // const [chat, setChats] = useState([]);

  // const { currentUser } = useContext(AuthContext);
  // const { dispatch } = useContext(ChatContext);
  const { user } = useAppSelector(state => state.auth);

  // useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
  //       setChats(doc.data());
  //     });

  //     return () => {
  //       unsub();
  //     };
  //   };

  //   currentUser.uid && getChats();
  // }, [currentUser.uid]);

  // const handleSelect = (u) => {
  //   dispatch({ type: "CHANGE_USER", payload: u });
  // };

  return (
    <div className={'chats'}>
      {/* {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => ( */}
      <NavLink to='/Binko/chats/1'>
        <div
          className={'userChat'}
        // key={chat[0]}
        // onClick={() => handleSelect(chat[1].userInfo)}
        >
          {/* <img src={user?.image} alt="" />
        <div className={userChatInfo}>
          <span>{user?.name}</span>
          <p>{user?.name}</p>
        </div> */}
          <div className={'pic'}>
            <img src={img} alt="" />
          </div>
          <div className={'userChatInfo'}>
            <span>sara alsukary</span>
            <p>how are you?</p>
          </div>

        </div>
      </NavLink>
      <NavLink to='/Binko/chats/2'>
        <div
          className={'userChat'}
        // key={chat[0]}
        // onClick={() => handleSelect(chat[1].userInfo)}
        >
          {/* <img src={user?.image} alt="" />
        <div className={userChatInfo}>
          <span>{user?.name}</span>
          <p>{user?.name}</p>
        </div> */}
          <div className={'pic'}>
            <img src={img} alt="" />
          </div>
          <div className={'userChatInfo'}>
            <span>sara alsukary</span>
            <p>how are you?</p>
          </div>

        </div>
      </NavLink>
      <NavLink to='/Binko/chats/3'>
        <div
          className={'userChat'}
        // key={chat[0]}
        // onClick={() => handleSelect(chat[1].userInfo)}
        >
          {/* <img src={user?.image} alt="" />
        <div className={userChatInfo}>
          <span>{user?.name}</span>
          <p>{user?.name}</p>
        </div> */}
          <div className={'pic'}>
            <img src={img} alt="" />
          </div>
          <div className={'userChatInfo'}>
            <span>sara alsukary</span>
            <p>how are you?</p>
          </div>

        </div>
      </NavLink>
      <NavLink to='/Binko/chats/4'>
        <div
          className={'userChat'}
        // key={chat[0]}
        // onClick={() => handleSelect(chat[1].userInfo)}
        >
          {/* <img src={user?.image} alt="" />
        <div className={userChatInfo}>
          <span>{user?.name}</span>
          <p>{user?.name}</p>
        </div> */}
          <div className={'pic'}>
            <img src={img} alt="" />
          </div>
          <div className={'userChatInfo'}>
            <span>sara alsukary</span>
            <p>how are you?</p>
          </div>

        </div>
      </NavLink>
      <NavLink to='/Binko/chats/5'>
        <div
          className={'userChat'}
        // key={chat[0]}
        // onClick={() => handleSelect(chat[1].userInfo)}
        >
          {/* <img src={user?.image} alt="" />
        <div className={userChatInfo}>
          <span>{user?.name}</span>
          <p>{user?.name}</p>
        </div> */}
          <div className={'pic'}>
            <img src={img} alt="" />
          </div>
          <div className={'userChatInfo'}>
            <span>sara alsukary</span>
            <p>how are you?</p>
          </div>

        </div>
      </NavLink>

    </div>
  );
};

export default Chats;
