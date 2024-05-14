import { Link, useLocale, useSiteData, useRouteMeta } from 'dumi';
import './index.less';
import React, { type FC } from 'react';

const PerformanceEvaluation: FC = () => {
  const { frontmatter } = useRouteMeta();
  if (!('PerformanceEvaluation' in frontmatter)) return null;
  return <div className="Performance">
    <div className="Performance-center">
      <div className="PerformanceTitle">
        {frontmatter.PerformanceEvaluation.title}
        <div className="line" />
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
