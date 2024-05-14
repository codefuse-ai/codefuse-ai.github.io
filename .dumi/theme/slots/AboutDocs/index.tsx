import { useRouteMeta } from 'dumi';
import React, { type FC } from 'react';
import './index.less';
import ContentText from '../ContentText';

const AboutDocs: FC = () => {
  const { frontmatter } = useRouteMeta();
  return (
    <div className="dumi-default-about">
      <div className="banner">
        <div className='bannerContent'>
          <img
            src={frontmatter!.bannerTitle}
            alt="" />
        </div>
      </div>
      <ContentText title={frontmatter!.contentTitle} desc={frontmatter!.description} />
    </div>
  );
};
export default AboutDocs;
