import { ClockCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Scrollspy as ScrollSpy } from '@makotot/ghostui/src/Scrollspy';
import {
  FormattedMessage,
  Link,
  history,
  useIntl,
  useLocation,
  useRouteMeta,
  useSiteData,
  useTabMeta,
} from 'dumi';
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FC,
  type RefObject,
} from 'react';
import './index.less';

const Toc: FC = () => {
  const { pathname, search, hash } = useLocation();
  const meta = useRouteMeta();
  const tabMeta = useTabMeta();
  const { loading } = useSiteData();

  const intl = useIntl();
  const prevIndexRef = useRef(0);
  const { frontmatter } = useRouteMeta();
  const [sectionRefs, setSectionRefs] = useState<RefObject<HTMLElement>[]>([]);
  const [isoLastUpdated, setIsoLastUpdated] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const { themeConfig } = useSiteData();
  const showEditLink = themeConfig.editLink && frontmatter.filename;
  const showLastUpdated = themeConfig.lastUpdated && frontmatter.lastUpdated;
  const memoToc = React.useMemo(() => {
    let toc = meta.toc;
    if (tabMeta) {
      toc = tabMeta.toc;
    }
    // only render h2 ~ h4
    return toc.filter(({ depth }) => depth > 1 && depth < 4);
  }, [meta, tabMeta]);

  useEffect(() => {
    // wait for page component ready (DOM ready)
    if (!loading) {
      // find all valid headings as ref elements
      const refs = memoToc.map(({ id }) => ({
        current: document.getElementById(id),
      }));

      setSectionRefs(refs as any);
    }
  }, [pathname, search, loading, memoToc]);

  // to avoid timestamp mismatched between server and client
  useLayoutEffect(() => {
    if (showLastUpdated) {
      setIsoLastUpdated(new Date(frontmatter.lastUpdated!).toISOString());
      setLastUpdated(
        new Intl.DateTimeFormat(undefined, {
          dateStyle: 'short',
          timeStyle: 'short',
        }).format(frontmatter.lastUpdated),
      );
    }
  }, [showLastUpdated]);

  return (
    <>
      <div className="dumi-default-content-tool">
        <dl>
          <dd>
            <ClockCircleOutlined />{' '}
            {/* <FormattedMessage id="content.footer.last.updated" /> */}
            <time dateTime={isoLastUpdated}>{lastUpdated}</time>
          </dd>
          <dd>
            <a
              target="_blank"
              href={`${intl.formatMessage(
                { id: '$internal.edit.link' },
                { filename: frontmatter.filename },
              )}`}
              rel="noreferrer"
            >
              <EditOutlined />{' '}
              <FormattedMessage id="content.footer.actions.edit" />
            </a>
          </dd>
        </dl>
      </div>
      {sectionRefs.length ? (
        <>
          <ScrollSpy sectionRefs={sectionRefs}>
            {({ currentElementIndexInViewport }) => {
              // for keep prev item active when no item in viewport
              if (currentElementIndexInViewport > -1)
                prevIndexRef.current = currentElementIndexInViewport;

              return (
                <ul className="dumi-default-toc">
                  {memoToc
                    .filter(({ depth }) => depth > 1 && depth < 4)
                    .map((item, i) => {
                      const link = `${search}#${encodeURIComponent(item.id)}`;
                      const activeIndex =
                        currentElementIndexInViewport > -1
                          ? currentElementIndexInViewport
                          : prevIndexRef.current;

                      return (
                        <li key={item.id} data-depth={item.depth}>
                          <Link
                            to={link}
                            onClickCapture={() => {
                              if (
                                decodeURIComponent(hash).slice(1) === item.id
                              ) {
                                history.replace(`${pathname}${search}`);
                              }
                            }}
                            title={item.title}
                            {...(activeIndex === i
                              ? { className: 'active' }
                              : {})}
                          >
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              );
            }}
          </ScrollSpy>
        </>
      ) : null}
    </>
  );
};

export default Toc;
