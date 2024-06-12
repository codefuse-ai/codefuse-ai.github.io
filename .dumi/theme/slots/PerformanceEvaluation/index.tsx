import { Link, useLocale, useSiteData, useRouteMeta } from 'dumi';
import './index.less';
import React, { type FC } from 'react';
import { SwapRightOutlined } from '@ant-design/icons';

const PerformanceEvaluation: FC = () => {
  const { frontmatter } = useRouteMeta();
  const locale = useLocale();
  if (!('PerformanceEvaluation' in frontmatter)) return null;
  return <div className="Performance">
    <div className="Performance-center">
      <div className="PerformanceTitle">
        {frontmatter.PerformanceEvaluation.title}
        <div className="line" />
        <div className='more' onClick={() => window.open(frontmatter.PerformanceEvaluation.link)}>
        {locale.id==='zh-CN'?'了解更多':'Learn more'}
          <SwapRightOutlined />
        </div>
      </div>
      <div className="PerformanceContent">
        <div className="desc">
          {frontmatter.PerformanceEvaluation.description}
        </div>
        <img
          src={frontmatter.PerformanceEvaluation.image}
        />
      </div>
    </div>
  </div>
};

export default PerformanceEvaluation;
