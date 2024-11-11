import { useLocale, useRouteMeta, usePrefersColor } from 'dumi';
import './index.less';
import React, { type FC } from 'react';
import { SwapRightOutlined } from '@ant-design/icons';
import HomeTitle from '../HomeTitle';

const IntelligentInference: FC = () => {
  const { frontmatter } = useRouteMeta();
  const locale = useLocale();
  const [color] = usePrefersColor();
  if (!('IntelligentInference' in frontmatter)) return null;
  return <div className="codeAnalysis">
    <div className="IntelligentInference-center">
      <div className="generationContent">
        <HomeTitle title={frontmatter.IntelligentInference.title} textAlign={'left'} />
        <div className="desc">
          {frontmatter.IntelligentInference.description}
        </div>
        <div className="buttom" onClick={() => { window.open(frontmatter.IntelligentInference.link) }}>
          {locale.id === 'zh-CN' ? '了解更多' : 'Learn more'}
          <SwapRightOutlined />
        </div>
      </div>
      <img
        src={
          color === 'dark' ?
            frontmatter.IntelligentInference.imageColor : frontmatter.IntelligentInference.image
        }
        alt="" />
    </div>
  </div>
};

export default IntelligentInference;
