import { useRouteMeta, useOutlet } from 'dumi';
import React, { type FC } from 'react';
import Content from 'dumi/theme/slots/Content';
import './index.less';
import Toc from 'dumi/theme/slots/Toc';

const BlogDetails: FC = () => {
  const outlet = useOutlet();
  const { frontmatter: fm } = useRouteMeta();
  const { frontmatter } = useRouteMeta();
  return (
    <div className="dumi-default-blogDetail">
      <div className="dumi-default-blogDetail-banner">
        <div className='bannerCon'>
          <div className='time'>{frontmatter.time}</div>
          <div className='title'>{frontmatter.title}</div>
        </div>
      </div>
      <div className='dumi-default-blogDetail-content'>
          {fm.toc === 'content' && (
            <main>
              <div className="dumi-default-doc-layout-toc-wrapper">
                <Toc />
              </div>
            </main>
          )}
          <Content>
            {<article>{outlet}</article>}
          </Content>
      </div>
    </div>
  );
};
export default BlogDetails;
