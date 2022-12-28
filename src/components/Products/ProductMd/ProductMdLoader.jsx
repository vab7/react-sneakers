import React from "react";
import ContentLoader from "react-content-loader";
import s from "./ProductMd.module.scss";

export const ProductMdLoader = () => (
  <ContentLoader
    speed={2}
    height={270}
    className={`${s.product} border`}
    backgroundColor="#f5f5f5"
    foregroundColor="#ebebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="91" />
    <rect x="0" y="106" rx="0" ry="0" width="100%" height="15" />
    <rect x="0" y="136" rx="3" ry="3" width="60%" height="15" />
    <rect x="0" y="174" rx="5" ry="5" width="44" height="30" />
  </ContentLoader>
);
