import React from "react";
import style from './Loading.module.css'

const Loading: React.FC = () => {
  return (
    <div className={style.loading}>
      <div className={style.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
