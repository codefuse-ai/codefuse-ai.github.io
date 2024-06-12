import { useRouteMeta,useLocale } from 'dumi';
import './index.less';
import React, { type FC } from 'react';
import { SwapRightOutlined } from '@ant-design/icons';

const AutomatedTesting: FC = () => {
  const { frontmatter } = useRouteMeta();
  const locale = useLocale();
  
  if (!('AutomatedTesting' in frontmatter)) return null;
  return <div className="automatedTesting">
    <div className="automatedTesting-center">
      <img src={frontmatter.AutomatedTesting.image} alt="" />
      <div className="automatedTestingContent">
        <div className="generationTitle">
          {frontmatter.AutomatedTesting.title}
          <div className="line" />
        </div>
        <div className="desc">
          {frontmatter.AutomatedTesting.description}
        </div>
        <div className="buttom" onClick={() => { window.open(frontmatter.AutomatedTesting.link) }}>
          {locale.id==='zh-CN'?'了解更多':'Learn more'}
          <SwapRightOutlined />
        </div>
      </div>
    </div>
  </div>
};

export default AutomatedTesting;
