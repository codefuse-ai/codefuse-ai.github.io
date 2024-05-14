import type { GetProp, MenuProps } from 'antd';
import { ConfigProvider, Menu, theme } from 'antd';
import { NavLink, useLocation, usePrefersColor } from 'dumi';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { ISidebarGroup } from '/.dumi/hooks/types';

type MenuItem = GetProp<MenuProps, 'items'>[number];
type GroupItem = {
  title: string;
  link?: string;
  children?: GroupItem[];
};

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const SideMenu = styled(Menu)`
  border-inline-end: none !important;

  .ant-menu-title-content {
    flex: 0.85 !important;
  }

  .ant-menu-submenu-title {
    padding-inline-end: 0 !important;
  }

  .ant-menu-sub,
  .ant-menu-light {
    background-color: transparent !important;
  }
`;

const SidebarMenu = ({ menuData }: { menuData: ISidebarGroup[] }) => {
  const { pathname } = useLocation();
  const [color] = usePrefersColor();
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);

  const menuItems = useRef<GroupItem[]>([]);
  const items: MenuItem[] = useMemo(
    () => constructNewStructure(menuData),
    [menuData],
  );

  function buildMenuItems(data: GroupItem[]): MenuItem[] {
    return data.map((item) => {
      const titleElement = item.link ? (
        <NavLink
          to={item.link}
          title={item.title}
          end
          style={({ isActive }) => (isActive ? { color: '#5c6cf7' } : {})}
        >
          {item.title}
        </NavLink>
      ) : (
        <span>{item.title}</span>
      );
      const children =
        item.children && item.children.length > 0
          ? buildMenuItems(item.children)
          : undefined;
      return getItem(titleElement, item.link ?? item.title, null, children);
    });
  }
  function constructNewStructure(rawData: ISidebarGroup[]) {
    if (!rawData) return [];
    const result: GroupItem[] = rawData
      .map((category) => {
        const indexGroup = category.children.find(
          (child) => (child.frontmatter?.group as { index: boolean })?.index,
        );
        const newItem: GroupItem = {
          title: category.title!,
          link: indexGroup?.link,
          children: [],
        };

        const subGroupsMap: Record<string, GroupItem> = {};
        category.children.forEach((g) => {
          if (
            !g.frontmatter?.subGroup?.title &&
            !(g.frontmatter?.group as { index: boolean })?.index &&
            !g.frontmatter?.resource
          ) {
            const child: GroupItem = {
              title: g.title,
              link: g.link,
              children: [],
            };
            newItem.children?.push(child);
            subGroupsMap[g.title] = child;
          }
        });
        category.children.forEach((subGroup) => {
          const subTitle = subGroup.frontmatter?.subGroup?.title;
          if (subTitle) {
            subGroupsMap[subTitle]?.children?.push({
              title: subGroup.title,
              link: subGroup.link,
            });
          }
        });
        return newItem;
      })
      .filter((item): item is GroupItem => item !== null);
    menuItems.current = result;
    return buildMenuItems(result);
  }

  function getOpenKeys(
    data: GroupItem[],
    pathname: string,
    parentLinks: string[] = [],
  ) {
    for (const item of data) {
      if (item.link === pathname) {
        // 找到匹配项，返回累积的父链接数组
        return parentLinks;
      }
      // 如果当前节点有子节点，递归搜索子节点
      if (item.children && item.children.length) {
        const result: string[] = getOpenKeys(
          item.children,
          pathname,
          parentLinks.concat(item.link ?? item.title),
        );
        // 如果在子节点中找到匹配项，返回结果
        if (result.length) return result;
      }
    }
    // 如果没有找到匹配项，返回空数组
    return [];
  }

  useEffect(() => {
    setStateOpenKeys(getOpenKeys(menuItems.current, pathname));
  }, [pathname, menuItems.current]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          color === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#5c6cf7',
        },
        components: {
          Menu: {
            padding: 0,
            itemPaddingInline: 0,
            itemMarginInline: 0,
            itemBg: 'rgba(0, 0, 0 ,0)',
            subMenuItemBg: 'rgba(0, 0, 0 ,0)',
          },
        },
      }}
    >
      <SideMenu
        mode="inline"
        inlineIndent={12}
        openKeys={stateOpenKeys}
        onOpenChange={(openKeys) => setStateOpenKeys(openKeys)}
        selectedKeys={[pathname]}
        style={{ height: '100%' }}
        items={items}
      />
    </ConfigProvider>
  );
};

export default SidebarMenu;
