import React, { type FC } from 'react';
import './index.less';
const Banner: FC <{ bannerBg?: string; bannerTitle?: string; }> = (props) => {
  return (
    <div className="dumi-default-about">
      <div className="banner" style={{ backgroundImage: `url(${props.bannerBg})` }}>
        <div className='bannerContent'>
          <img
            src={props.bannerTitle}
            alt="" />
        </div>
      </div>
    </div>
  );
};
export default Banner;
