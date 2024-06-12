import { useLocale, useRouteMeta } from 'dumi';
import './index.less';
import React, { type FC } from 'react';
import { SwapRightOutlined } from '@ant-design/icons';

const IntelligentInference: FC = () => {
  const { frontmatter } = useRouteMeta();
  const locale = useLocale();
  if (!('IntelligentInference' in frontmatter)) return null;
  return <div className="codeAnalysis">
    <div className="IntelligentInference-center">
      <div className="generationContent">
        <div className="generationTitle">
          {frontmatter.IntelligentInference.title}
          <div className="line" />
        </div>
        <div className="desc">
          {frontmatter.IntelligentInference.description}
        </div>
        <div className="buttom" onClick={() => { window.open(frontmatter.IntelligentInference.link) }}>
          {locale.id === 'zh-CN' ? '了解更多' : 'Learn more'}
          <SwapRightOutlined />
        </div>
      </div>
      <img src={frontmatter.IntelligentInference.image} alt="" />
    </div>
  </div>
};

export default IntelligentInference;
