import type { SocialTypes } from '@/client/theme-api/types';
import { ReactComponent as IconClose } from '@ant-design/icons-svg/inline-svg/outlined/close.svg';
import { ReactComponent as IconMenu } from '@ant-design/icons-svg/inline-svg/outlined/menu.svg';
import { useRouteMeta, useSiteData, useLocation } from 'dumi';
import ColorSwitch from '../ColorSwitch';
import HeaderExtra from 'dumi/theme/slots/HeaderExtra';
import LangSwitch from 'dumi/theme/slots/LangSwitch';
import Logo from 'dumi/theme/slots/Logo';
import Navbar from 'dumi/theme/slots/Navbar';
import RtlSwitch from 'dumi/theme/slots/RtlSwitch';
import SearchBar from 'dumi/theme/slots/SearchBar';
import SocialIcon from 'dumi/theme/slots/SocialIcon';
import React, { useMemo, useState, type FC } from 'react';
import './index.less';
const Header: FC = () => {
  const { frontmatter } = useRouteMeta();
  const [showMenu, setShowMenu] = useState(false);
  const { themeConfig } = useSiteData();
  const { hash, pathname } = useLocation();
  const blogDet = pathname.includes("/blogDetails");
  const socialIcons = useMemo(
    () =>
      themeConfig.socialLinks
        ? Object.keys(themeConfig.socialLinks)
          .slice(0, 5)
          .map((key) => ({
            icon: key as SocialTypes,
            link: themeConfig.socialLinks[key as SocialTypes],
          }))
        : [],
    [themeConfig.socialLinks],
  );
  return (
    <div
      className="dumi-default-header"
      data-static={Boolean(frontmatter.hero) || undefined}
      data-mobile-active={showMenu || undefined}
      onClick={() => setShowMenu(false)}
    >
      <div className="dumi-default-header-content">
        <section className="dumi-default-header-left">
          <Logo />
          {/* 文档信息下拉弹框 */}
          <Navbar />
        </section>

        <section className="dumi-default-header-right">
          {/* 导航➕国际化 */}
          <div className="dumi-default-header-right-aside">
            {
              !blogDet && <><LangSwitch />
                <div className='headerLineleft' /></>
            }

            <RtlSwitch />
            {/* 亮度显示 */}
            {
              themeConfig.prefersColor.switch && <ColorSwitch />
            }
            <div className='headerLine' />
            {socialIcons.map((item) => (
              <SocialIcon icon={item.icon} link={item.link} key={item.link} />
            ))}
            <div className='hugging' onClick={() => { window.open('https://huggingface.co/codefuse-ai') }}>

            </div>
            <div className='moda' onClick={() => { window.open('https://modelscope.cn/organization/codefuse-ai') }}>
            </div>
            <HeaderExtra />
            <div className='headerLineleft' />
            <SearchBar />
          </div>
        </section>
        {/* 移动端导航栏 */}
        <button
          type="button"
          className="dumi-default-header-menu-btn"
          onClick={(ev) => {
            ev.stopPropagation();
            setShowMenu((v) => !v);
          }}
        >
          {showMenu ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </div>
  );
};

export default Header;
