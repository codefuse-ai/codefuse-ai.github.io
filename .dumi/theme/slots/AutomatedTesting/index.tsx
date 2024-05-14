import { useRouteMeta } from 'dumi';
import './index.less';
import React, { type FC } from 'react';

const AutomatedTesting: FC = () => {
  const { frontmatter } = useRouteMeta();
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
      </div>
    </div>
  </div>
};

export default AutomatedTesting;
