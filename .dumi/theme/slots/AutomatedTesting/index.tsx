import { useRouteMeta, useLocale, usePrefersColor } from 'dumi';
import './index.less';
import React, { type FC } from 'react';
import { SwapRightOutlined } from '@ant-design/icons';
import HomeTitle from '../HomeTitle';

const AutomatedTesting: FC = () => {
  const { frontmatter } = useRouteMeta();
  const locale = useLocale();
  const [color] = usePrefersColor();

  if (!('AutomatedTesting' in frontmatter)) return null;
  return <div className="automatedTesting">
    <div className="automatedTesting-center">
      <img src={color === 'dark' ? frontmatter.AutomatedTesting.imageColor : frontmatter.AutomatedTesting.image} alt="" />
      <div className="automatedTestingContent">
        < HomeTitle title={frontmatter.AutomatedTesting.title} />
        <div className="desc">
          {frontmatter.AutomatedTesting.description}
        </div>
        <div className="buttom" onClick={() => { window.open(frontmatter.AutomatedTesting.link) }}>
          {locale.id === 'zh-CN' ? '了解更多' : 'Learn more'}
          <SwapRightOutlined />
        </div>
      </div>
    </div>
  </div>
};

export default AutomatedTesting;
