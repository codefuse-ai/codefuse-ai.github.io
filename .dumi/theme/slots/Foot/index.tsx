import { useRouteMeta, useSidebarData, useSiteData } from 'dumi';
import React, { type FC, type ReactNode } from 'react';
import { Row, Col, Collapse } from "antd";
import classNames from "classnames";
import './index.less';

const Foot: FC = () => {
  return (
    <div className='dumi-default-foot'>
      <div className='foot'>
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
      </div>
    </div>
  );
}
export default Foot;
