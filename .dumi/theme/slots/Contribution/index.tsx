import { useRouteMeta, useOutlet, } from 'dumi';
import React, { type FC } from 'react';
import './index.less';
import ContentText from '../ContentText';

const Contribution: FC = () => {
  const { frontmatter } = useRouteMeta();
  console.log('frontmatter,,,', frontmatter);

  return (
    <div className="dumi-default-Contribution">
      <div className="banner">
        <div className='bannerContent'>
          <img src={frontmatter!.bannerTitle} alt="" />
        </div>
      </div>
      <div className='content'>
        <div className='contentTitle'>{frontmatter.contentTitle}</div>
        <ul className='contentText'>
          {
            frontmatter.list.map((item: string) => {
              return<li> {item} </li>
            })
          }
        </ul>
      </div>
    </div>
  );
};
export default Contribution;
