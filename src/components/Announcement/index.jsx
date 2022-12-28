import React from "react";
import s from "./Announcement.module.scss";

export const Announcement = ({ color = "", width = "", ...props }) => {
  return (
    <div className={`${s.shop_empty__container} content-c`}>
      <div className={`${s.shop_empty} column items-c`}>
        <img
          className={s.shop_empty__img}
          src={`/img/${props.img}`}
          width={width}
          alt={props.img}
        />
        <span className={`${s.shop_empty__title} ${color} semi-bold`}>
          {props.name}
        </span>
        <span className={`${s.shop_empty__text}`}>{props.body}</span>
      </div>
    </div>
  );
};
