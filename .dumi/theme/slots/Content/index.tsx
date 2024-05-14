import { useRouteMeta, useSidebarData, useSiteData } from 'dumi';
import React, { type FC, type ReactNode } from 'react';
import './heti.scss';
import './index.less';

const Content: FC<{ children: ReactNode }> = (props) => {
  console.log('children==',props.children);
  const sidebar = useSidebarData();
  const { themeConfig } = useSiteData();
  const { frontmatter } = useRouteMeta();
  return (
    <div className='dumi-default-article'>
      <div
        className="dumi-default-content"
        data-no-sidebar={!sidebar || frontmatter.sidebar === false || undefined}
        data-no-footer={themeConfig.footer === false || undefined}
      >
        {props.children}
      </div>
      {/* <div className='foot'>
        <div className='copyright'>
          Copyright © 支付宝（中国）网络技术有限公司 ｜
          备案号：沪ICP备15027489号
        </div>
      </div>
      <div className='foot-mobile'>
        <div className='copyright'>
          Copyright © 支付宝（中国）网络技术有限公司 ｜
          备案号：沪ICP备15027489号
        </div>
      </div> */}
    </div>
  );
};

export default Content;
