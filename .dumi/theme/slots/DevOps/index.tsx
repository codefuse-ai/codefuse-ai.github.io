import { useLocale, useRouteMeta, usePrefersColor } from 'dumi';
import './index.less';
import React, { type FC } from 'react';
import { SwapRightOutlined } from '@ant-design/icons';

const DevOps: FC = () => {
  const { frontmatter } = useRouteMeta();
  const [color] = usePrefersColor();
  const locale = useLocale();
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
            return <li className='DevOpsLi' onClick={() => window.open(item.link)}>
              <img src={color === 'dark' ? item.imageColor : item.image} alt="" />
              <div className='title'>{item.cardTitle}</div>
              <div className='desc'>{item.description}</div>
              <div className='more'>
                {locale.id === 'zh-CN' ? '了解更多' : 'Learn more'}
                <SwapRightOutlined />
              </div>
            </li>
          })
          }
        </ul>
      </div>
    </div>
  </div>
};

export default DevOps;
