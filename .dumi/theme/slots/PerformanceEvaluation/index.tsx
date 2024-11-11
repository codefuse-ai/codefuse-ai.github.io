import { Link, useLocale, usePrefersColor, useRouteMeta } from 'dumi';
import './index.less';
import React, { type FC } from 'react';
import { SwapRightOutlined } from '@ant-design/icons';
import HomeTitle from '../HomeTitle';

const PerformanceEvaluation: FC = () => {
  const { frontmatter } = useRouteMeta();
  const locale = useLocale();
  const [color] = usePrefersColor();
  if (!('PerformanceEvaluation' in frontmatter)) return null;
  return <div className="Performance">
    <div className="Performance-center">
      <div className="PerformanceTitle">
        <HomeTitle title={frontmatter.PerformanceEvaluation.title} line={'19px auto 0'} />
        <div className='more' onClick={() => window.open(frontmatter.PerformanceEvaluation.link)}>
          {locale.id === 'zh-CN' ? '了解更多' : 'Learn more'}
          <SwapRightOutlined />
        </div>
      </div>
      <div className="PerformanceContent">
        <div className="desc">
          {frontmatter.PerformanceEvaluation.description}
        </div>
        <img
          src={
            color === 'dark' ?
              frontmatter.PerformanceEvaluation.imageColor : frontmatter.PerformanceEvaluation.image
          }
        />
      </div>
    </div>
  </div>
};

export default PerformanceEvaluation;
