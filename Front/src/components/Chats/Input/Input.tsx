import { useState } from "react";
import Img from "src/img/img.png";
import Attach from "src/img/attach.png";
import { useAppSelector } from "@hooks/app";

import style from './Input.module.css';
const { send, input } = style
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { user } = useAppSelector(state => state.auth);

  return (
    <div className={input}>
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className={send}>
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button
        >Send</button>
      </div>
    </div>
  );
};

export default Input;
