import React, { type FC, type string } from 'react';
import './index.less';

const ContentText: FC<{ title: string , desc:any }> = (props) => (
  <div className="dumi-content-text">
    <div className='title'>{props.title}</div>
    <div className='desc'>{props.desc}</div>
  </div>
);

export default ContentText;
