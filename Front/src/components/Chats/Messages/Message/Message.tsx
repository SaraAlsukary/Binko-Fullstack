import { useEffect, useRef } from "react";
import style from './Message.module.css';
const { messages, messageInfo, messageContent } = style;
const Message = ({ message }: {
  message: {
    img: string,
    text: string
  }
}) => {

  const ref: any = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`${messages}`}

    >
      <div className={messageInfo}>
        <img
          src={message?.img}
          alt=""
        />
      </div>
      <div className={messageContent}>
        {message.img && <img src={message.img} alt="" />}
        <p>{message.text}</p>
        <span>just now</span>
      </div>
    </div>
  );
};

export default Message;
