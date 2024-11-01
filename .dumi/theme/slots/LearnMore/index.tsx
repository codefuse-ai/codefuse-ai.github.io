import { useLocale, history } from 'dumi';
import './index.less';
import React, { type FC } from 'react';
import { SwapRightOutlined } from '@ant-design/icons';
const LearnMore: FC<{ children: string, link: string }> = (props) => {
  const locale = useLocale();
  const handleClick = (link: string) => {
    if (link.indexOf('http') === -1) {
      history.push(link);
      window.scrollTo({ top: 0 });
    } else {
      window.open(link, '_blank')
    }
  };
  return (
    <div className="buttom" onClick={() => handleClick(props.link)}>
      {locale.id === 'zh-CN' ? props.children : 'Learn more'}
      <SwapRightOutlined />
    </div>
  );
};
export default LearnMore;

