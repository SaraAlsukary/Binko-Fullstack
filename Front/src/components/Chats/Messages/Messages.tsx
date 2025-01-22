import im from '@assets/imgs/books/_The Mountain Is You.jfif'
import React, { useContext, useEffect, useState } from "react";
import Message from "./Message/Message";
import style from './Messages.module.css'
import { useParams } from 'react-router-dom';
const { messages } = style;
const Messages = () => {
  const { id }: any = useParams()
  const [messagess, setMessages] = useState([{
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 2
  }, {
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 3
  }
    , {
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 4
  }, {
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 5
  },
  {
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 6
  },
  {
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 7
  },
  {
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 5
  },
  {
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 5
  },
  {
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 5
  },
  ]);
  const [messagess2, setMessages2] = useState([{
    content: {
      text: 'Hello there how are you?',
      // img: im
    },
    id: 2
  }, {
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 3
  }
    , {
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 4
  }, {
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 5
  },
  {
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 6
  },
  {
    content: {
      text: 'Hello there how are you?',
      img: im
    },
    id: 7
  },
  {
    content: {
      text: 'Hello there how are yous?',
      img: im
    },
    id: 5
  },
  {
    content: {
      text: 'Hello there how are yous?',
      img: im
    },
    id: 5
  },
  {
    content: {
      text: 'Hello there how are yous?',
      img: im
    },
    id: 5
  },
  ]);
  const [chats, setChats] = useState([{
    idChat: 2,
    chatContent: messagess,

  }, {
    idChat: 3,
    chatContent: messagess2
  }]);
  const result = chats.find(chat => chat.idChat == id);
  return (
    <div className={messages}>
      {result?.chatContent?.map((m: any) => (
        <Message message={m.content} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
