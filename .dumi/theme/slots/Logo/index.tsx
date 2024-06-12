import { Link, useLocale, useSiteData } from 'dumi';
import { type FC } from 'react';
import './index.less';
import React from 'react';

const Logo: FC = () => {
  const { themeConfig } = useSiteData();
  const locale = useLocale();
  return (
    <Link
      className="dumi-default-logo"
      to={'base' in locale ? locale.base : '/'}
    >
      {themeConfig.logo !== false && (
        <div className='logoImg' />
      )}
      {themeConfig.name}
    </Link>
  );
};

export default Logo;
