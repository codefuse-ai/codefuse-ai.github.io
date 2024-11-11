import { useRouteMeta } from 'dumi';
import React, { type FC } from 'react';
import './index.less';

const Publication: FC = () => {
  const { frontmatter } = useRouteMeta();
  return (
    <div className="dumi-default-Contribution">
      <div className="banner">
        <div className='bannerContent'>
          <img src={frontmatter!.bannerTitle} alt="" />
        </div>
      </div>
      <div className='content'>
        <div className='contentTitle'>{frontmatter.contentTitle}</div>
        <ul className='contentText'>
          <div>
            <h2 >{frontmatter?.titleConDirectly}</h2>
            {
              frontmatter?.contentDirectly?.map((item: any) => {
                return <li>
                  <div className="titleCon">
                    {item?.titleCon.replace(/\\/g, "")}
                  </div>
                  <p className="descCon">{item?.desc}</p>
                </li>
              })
            }
          </div>
          <div>
            <h2 >{frontmatter?.titleConPreprint}</h2>
            {
              frontmatter?.contentPreprint?.map((item: any) => {
                return <li>
                  <div className="titleCon">
                    {item?.titleCon.replace(/\\/g, "")}
                  </div>
                  <p className="descCon">{item?.desc}</p>
                </li>
              })
            }
          </div>
          <div>
            <h2 >{frontmatter?.titleConRelated}</h2>
            {
              frontmatter?.contentRelated?.map((item: any) => {
                return <li>
                  <div className="titleCon">
                    {item?.titleCon.replace(/\\/g, "")}
                  </div>
                  <p className="descCon">{item?.desc}</p>
                </li>
              })
            }
          </div>
        </ul>
      </div>
    </div>
  );
};
export default Publication;
