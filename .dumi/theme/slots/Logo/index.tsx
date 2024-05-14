import { Link, useLocale, useSiteData } from 'dumi';
import { type FC } from 'react';
import './index.less';

const Logo: FC = () => {
  const { themeConfig } = useSiteData();
  const locale = useLocale();

  return (
    <Link
      className="dumi-default-logo"
      to={'base' in locale ? locale.base : '/'}
    >
      {themeConfig.logo !== false && (
        <img
          src={
            themeConfig.logo ||
            'https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*_pzERpyma84AAAAAAAAAAAAADlHYAQ/original'
          }
          alt={themeConfig.name}
        />
      )}
      {themeConfig.name}
    </Link>
  );
};

export default Logo;
