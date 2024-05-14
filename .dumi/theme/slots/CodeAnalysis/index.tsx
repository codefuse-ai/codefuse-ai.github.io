import { Link, useLocale, useSiteData, useRouteMeta} from 'dumi';
import './index.less';
import React, { type FC } from 'react';

const CodeAnalysis: FC = () => {
  const { frontmatter } = useRouteMeta();
  if (!('CodeAnalysis' in frontmatter)) return null;
  return <div className="codeAnalysis">
    <div className="codeAnalysis-center">
      <img src={frontmatter.CodeAnalysis.image} alt="" />
      <div className="codeAnalysisContent">
        <div className="codeAnalysisTitle">
          {frontmatter.CodeAnalysis.title}
          <div className="line" />
        </div>
        <div className="desc">
          {frontmatter.CodeAnalysis.description}
        </div>
      </div>
    </div>
  </div>
};

export default CodeAnalysis;
