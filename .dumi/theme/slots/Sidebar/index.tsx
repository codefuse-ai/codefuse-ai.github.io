import { GithubOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Select, SelectProps, theme } from 'antd';
import {
  useLocale,
  useLocation,
  useNavigate,
  usePrefersColor,
  useRouteMeta,
  useSidebarData,
} from 'dumi';
import React, { useEffect, useRef, useState, type FC } from 'react';
import { ISidebarGroup } from '../../../hooks/types';
import { NavbarEnums, NavbarEnumsEn } from '../../constants';
import SidebarMenu from './SidebarMenu';
import './index.less';

/** lodash pickBy， 注：dumi源文件无法解析lodash，且无法解析utils文件夹 */
function pickBy<T>(
  object: T,
  predicate: (value: any, key: keyof T) => boolean,
): Partial<T> {
  const result: Partial<T> = {};
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      predicate(object[key], key)
    ) {
      result[key] = object[key];
    }
  }
  return result;
}
/** 数组转换为 Options */
function toOptions<T>(arr: T[]) {
  return arr.map((o) => ({
    value: o,
    label: o,
  }));
}

const Sidebar: FC = () => {
  const { pathname } = useLocation();
  const meta = useRouteMeta();
  const navigate = useNavigate();
  const sidebar = useSidebarData();
  const [color] = usePrefersColor();
  const locale = useLocale();
  const isEn = locale.id === 'en-US';
  /** 侧边栏数组，方便做筛选 */
  const [cloneSidebar, setCloneSidebar] = useState<ISidebarGroup[]>();
  /** 仓库名 */
  const [storeValue, setStoreValue] = useState<string>();
  /** 版本号 */
  const [versionValue, setVersionValue] = useState<string>();
  /** 版本号 Options */
  const [versionOptions, setVersionOptions] = useState<SelectProps['options']>(
    [],
  );
  const Enums: any = isEn ? NavbarEnumsEn : NavbarEnums;
  /** 开发者文档，选项数组 */
  const devDocsObj: Record<string, string> = pickBy(Enums, (value) =>
    value.includes('developer-docs'),
  );
  /** 仓库枚举 */
  const StoreOptions = toOptions(Object.keys(devDocsObj));
  /** 上一次保存的版本号 */
  const versionPrevious = useRef<string>();
  /** 仓库：[版本号] 映射关系 */
  const versionMap =
    useRef<Record<string, { value: string; label: string }[]>>();

  /** 判断是否是开发者文档 */
  const isDevDocs = pathname.includes('developer-docs');

  /** 根据路由获取仓库名和版本号 */
  function getStoreAndVersion() {
    /** 根据 url 获取当前仓库 */
    const storeMatch = pathname.match(/\/developer-docs\/(.*?)\//)![1];
    /** 根据 url 和 仓库 获取当前版本号 */
    const regex = new RegExp(`/${storeMatch}/([^/]+)`, 'i');
    const versionMatch = pathname.match(regex)?.[1];

    return {
      storeMatch,
      versionMatch,
    };
  }
  /** 获取版本号选项 */
  function getVersionOptions() {
    const selectObject = sidebar.reduce((accumulator, module) => {
      module.children.forEach((child) => {
        if (child.frontmatter?.store) {
          const title = (
            child.frontmatter?.store as { title: string; version: string }
          )?.title;
          const version: string = (
            child.frontmatter?.store as { title: string; version: string }
          )?.version;
          if (!accumulator[title]) {
            accumulator[title] = [];
          }
          const versionExists = accumulator[title].some(
            (item) => item.label === version,
          );
          if (!versionExists) {
            accumulator[title].push({
              value: version.replace(/\./g, '-'),
              label: version,
            });
          }
        }
      });
      return accumulator;
    }, {} as Record<string, { value: string; label: string }[]>);
    return selectObject;
  }

  useEffect(() => {
    if (!isDevDocs) {
      setCloneSidebar(sidebar);
    } else {
      const { storeMatch, versionMatch } = getStoreAndVersion();
      // 仓库：[版本号] 映射关系
      versionMap.current = getVersionOptions();
      setStoreValue(storeMatch);
      // 根据仓库名称获取版本号Options
      setVersionOptions(versionMap.current[storeMatch]);
      // 保存默认版本号
      setVersionValue(versionMatch);
    }
    return () => {
      setStoreValue('');
      setVersionValue('');
    };
  }, [sidebar, pathname]);

  useEffect(() => {
    if (storeValue && versionValue) {
      const { storeMatch, versionMatch } = getStoreAndVersion();
      setCloneSidebar(
        sidebar
          .filter((o) => o.title?.includes(storeMatch))
          .map((o) => ({
            ...o,
            children: o.children.filter(
              (child) =>
                child.frontmatter?.store?.version ===
                versionMatch?.replace(/\-/g, '.'),
            ),
          }))
          .filter((o) => o.children.length > 0),
      );
    }
  }, [storeValue, versionValue]);

  if (!sidebar) return null;

  return (
    <div className="dumi-default-sidebar">
      {isDevDocs && (
        <ConfigProvider
          theme={{
            algorithm:
              color === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: {
              colorPrimary: '#5c6cf7',
            },
            components: {
              Select: {
                optionSelectedColor: '#5c6cf7',
              },
            },
          }}
        >
          <Select
            value={storeValue}
            style={{ width: '100%' }}
            options={StoreOptions}
            onChange={(e) => {
              navigate(devDocsObj[e]);
            }}
          />
          <div className="dumi-default-sidebar-version">
            <Select
              value={versionValue}
              style={{ width: '82%' }}
              options={versionOptions}
              onDropdownVisibleChange={() =>
                (versionPrevious.current = versionValue)
              }
              onChange={(e) => {
                navigate(pathname.replace(versionPrevious.current!, e));
              }}
            />
            <Button style={{ marginLeft: '5px' }} icon={<GithubOutlined />} />
          </div>
        </ConfigProvider>
      )}
      <SidebarMenu menuData={cloneSidebar!} />
    </div>
  );
};

export default Sidebar;
