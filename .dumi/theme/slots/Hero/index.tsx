import { Link, useRouteMeta } from 'dumi';
import HeroTitle from 'dumi/theme/slots/HeroTitle';
import CodeGeneration from '../CodeGeneration';
import React, { type FC } from 'react';
import './index.less';
import DevOps from '../DevOps';
import CodeAnalysis from '../CodeAnalysis';
import IntelligentInference from '../IntelligentInference';
import AutomatedTesting from '../AutomatedTesting';
import PerformanceEvaluation from '../PerformanceEvaluation';

const Hero: FC = () => {
  const { frontmatter } = useRouteMeta();
  if (!('hero' in frontmatter)) return null;
  return (
    <div className="dumi-default-hero">
      <div className="banner">
        {frontmatter.hero!.title && (
          <HeroTitle>{frontmatter.hero!.title}</HeroTitle>
        )}
        {frontmatter.hero!.description && (
          <p
            className="bannerDesc"
            dangerouslySetInnerHTML={{ __html: frontmatter.hero!.description }}
          />
        )}
      </div>
      <CodeGeneration/>
      <DevOps/>
      <CodeAnalysis/>
      <IntelligentInference/>
      <AutomatedTesting/>
      <PerformanceEvaluation/>
    </div>
  );
};
export default Hero;
