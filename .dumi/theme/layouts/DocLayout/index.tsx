import { ReactComponent as IconSidebar } from '@ant-design/icons-svg/inline-svg/outlined/align-left.svg';
import animateScrollTo from 'animated-scroll-to';
import {
  Helmet,
  useIntl,
  useLocation,
  useOutlet,
  useRouteMeta,
  useSidebarData,
  useSiteData,
} from 'dumi';
import Content from 'dumi/theme/slots/Content';
import ContentFooter from 'dumi/theme/slots/ContentFooter';
import Features from 'dumi/theme/slots/Features';
import Footer from 'dumi/theme/slots/Footer';
import Header from 'dumi/theme/slots/Header';
import Hero from 'dumi/theme/slots/Hero';
import Sidebar from 'dumi/theme/slots/Sidebar';
import Toc from 'dumi/theme/slots/Toc';
import React, { useEffect, useState, type FC } from 'react';
import './index.less';
import AboutDocs from 'dumi/theme/slots/AboutDocs';
import Foot from 'dumi/theme/slots/Foot';
import Publication from 'dumi/theme/slots/Publication';

const DocLayout: FC = () => {
  const intl = useIntl();
  const outlet = useOutlet();
  const sidebar = useSidebarData();
  const { hash, pathname } = useLocation();
  const { loading, hostname } = useSiteData();
  const [activateSidebar, updateActivateSidebar] = useState(false);
  const { frontmatter: fm } = useRouteMeta();
  const about = pathname.split("/").pop();
  const doc = pathname.includes("/docs");
  const showSidebar = fm.sidebar !== false && sidebar?.length > 0;
  const publication = pathname.split("/").pop();
  const com = pathname.includes("/contribution");

  // handle hash change or visit page hash after async chunk loaded
  useEffect(() => {
    const id = hash.replace('#', '');
    if (id) {
      setTimeout(() => {
        const elm = document.getElementById(decodeURIComponent(id));
        if (elm) {
          // animated-scroll-to instead of native scroll
          animateScrollTo(elm.offsetTop - 80, {
            maxDuration: 300,
          });
        }
      }, 1);
    }
  }, [loading, hash]);

  return (
    <div
      className="dumi-default-doc-layout"
      data-mobile-sidebar-active={activateSidebar || undefined}
      onClick={() => updateActivateSidebar(false)}
    >
      <Helmet>
        <html lang={intl.locale.replace(/-.+$/, '')} />
        {fm.title && <title>{fm.title}</title>}
        {fm.title && <meta property="og:title" content={fm.title} />}
        {fm.description && <meta name="description" content={fm.description} />}
        {fm.description && (
          <meta property="og:description" content={fm.description} />
        )}
        {fm.keywords && (
          <meta name="keywords" content={fm.keywords.join(',')} />
        )}
        {fm.keywords &&
          fm.keywords.map((keyword) => (
            <meta key={keyword} property="article:tag" content={keyword}></meta>
          ))}
        {hostname && <link rel="canonical" href={hostname + pathname} />}
      </Helmet>
      <Header />
      <Hero />
      {
        about === 'aboutdocs' && <AboutDocs />
      }
      {
        publication === 'publication' && <Publication />
      }
      {
        com ? <main>
          {/* 文档页两侧展示 */}
          {showSidebar && <Sidebar />}
          <Content>
            {<article>{outlet}</article>}
            {<ContentFooter />}
            {<Footer />}
          </Content>
          {fm.toc === 'content' && (
            <div className="dumi-default-doc-layout-toc-wrapper">
              {/* <h4>大纲</h4> */}
              <Toc />
            </div>
          )}
        </main> :
          doc && <main>
            {/* 文档页两侧展示 */}
            {showSidebar && <Sidebar />}
            <Content>
              {
                <article>{outlet}</article>
              }
              {
                <ContentFooter />
              }
              {
                <Footer />
              }
            </Content>
            {fm.toc === 'content' && (
              <div className="dumi-default-doc-layout-toc-wrapper">
                {/* <h4>大纲</h4> */}
                <Toc />
              </div>
            )}
          </main>
      }
      <Foot />
    </div>
  );
};

export default DocLayout;
