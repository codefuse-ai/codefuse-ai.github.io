import './index.less';
import React, { type FC } from 'react';
const HomeTitle: FC<{ title: string, textAlign?: string, line?: string }> = (props) => {
  return <div className="homeTitle" style={{ textAlign: props?.textAlign }}>
    {props.title}
    <div className="line" style={{ margin: props?.line }} />
  </div>
};

export default HomeTitle;
