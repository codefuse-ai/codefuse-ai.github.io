import { useLocale, useRouteMeta } from 'dumi';
import './index.less';
import React, { type FC } from 'react';

const IntelligentInference: FC = () => {
  const { frontmatter } = useRouteMeta();
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
      </div>
      <img src={frontmatter.IntelligentInference.image} alt="" />
    </div>
  </div>
};

export default IntelligentInference;
