import React, { type FC, type string } from 'react';
import './index.less';

const HeroTitle: FC<{ children: string }> = (props) => (
  <div className="dumi-default-hero-title">
    <img src={props.children} alt="" />
  </div>
);

export default HeroTitle;
