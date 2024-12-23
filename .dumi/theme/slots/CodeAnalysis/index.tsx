import { useLocale, usePrefersColor, useRouteMeta } from 'dumi';
import './index.less';
import React, { type FC } from 'react';
import { SwapRightOutlined } from '@ant-design/icons';
import HomeTitle from '../HomeTitle';

const CodeAnalysis: FC = () => {
  const { frontmatter } = useRouteMeta();
  const [color] = usePrefersColor();
  const locale = useLocale();
  if (!('CodeAnalysis' in frontmatter)) return null;
  return <div className="codeAnalysis">
    <div className="codeAnalysis-center">
      <img
        src={color === 'dark' ? frontmatter.CodeAnalysis.imageColor : frontmatter.CodeAnalysis.image}
        alt=""
      />
      <div className="codeAnalysisContent">
        <HomeTitle title={frontmatter.CodeAnalysis.title} textAlign={'left'} />
        <div className="desc">
          {frontmatter.CodeAnalysis.description}
        </div>
        <div className="buttom" onClick={() => { window.open(frontmatter.CodeAnalysis.link) }}>
          {locale.id === 'zh-CN' ? '了解更多' : 'Learn more'}
          <SwapRightOutlined />
        </div>
      </div>
    </div>
  </div>
};

export default CodeAnalysis;
