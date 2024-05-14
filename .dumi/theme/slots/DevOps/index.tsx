import { Link, useLocale, useSiteData, useRouteMeta } from 'dumi';
import './index.less';
import React, { type FC } from 'react';

const DevOps: FC = () => {
  const { frontmatter } = useRouteMeta();
  if (!('DevOps' in frontmatter)) return null;
  return <div className="devOps">
    <div className="devOps-center">
      <div className="devOpsTitle">
        {frontmatter.DevOpsTitle.title}
        <div className="line" />
      </div>
      <div className="DevOpsContent">
        <ul className="DevOpsUl">
          {frontmatter.DevOps.map((item: any) => {
            return <li className='DevOpsLi'>
              <img src={item.image} alt="" />
              <div className='title'>{item.cardTitle}</div>
              <div className='desc'>{item.description}</div>
            </li>
          })
          }
        </ul>
      </div>
    </div>
  </div>
};

export default DevOps;
