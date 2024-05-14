import type { MenuProps } from 'antd';
import { ConfigProvider, Menu, theme } from 'antd';
import { useLocale, useNavigate, usePrefersColor } from 'dumi';
import React from 'react';
import { NavbarEnums, NavbarEnumsEn } from '../../constants';

type MenuItem = Required<MenuProps>['items'][number];

const linkUrl = (title: string, link: string) => {
  const navigate = useNavigate();
  return (
    <a onClick={() => navigate(link)} title={title}>
      {title}
    </a>
  );
};

export function getItem(
  label: keyof typeof NavbarEnums | keyof typeof NavbarEnumsEn,
  key?: any,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  const locale = useLocale();
  const isEn = locale.id === 'en-US';
  const Enums: any = isEn ? NavbarEnumsEn : NavbarEnums;
  const uniqueKey: keyof typeof NavbarEnums = key ?? label;
  return {
    key: key ?? label,
    icon,
    children,
    label: linkUrl(label, Enums[uniqueKey]),
    type,
  } as MenuItem;
}

export const NavbarMenus = (items: MenuProps['items']) => {
  const [color] = usePrefersColor();
  return (
    <ConfigProvider
      theme={{
        algorithm:
          color === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        components: {
          Menu: {
            algorithm: true,
            itemMarginBlock: '4px',
            itemMarginInline: 0,
            itemHeight: 32,
            padding: 12,
            itemActiveBg: color === 'dark' ? '#5c6cf7' : 'rgb(238, 242, 254)',
            itemHoverBg: color === 'dark' ? '#5c6cf7' : 'rgb(238, 242, 254)',
          },
        },
      }}
    >
      <Menu
        mode="vertical"
        items={items}
        style={{
          textAlign: 'left',
          borderInlineEnd: 'transparent',
          fontWeight: 400,
          margin: '0 2px 0 2px',
        }}
        selectable={false}
      />
    </ConfigProvider>
  );
};
