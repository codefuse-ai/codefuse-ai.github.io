import { useRouteMeta, usePrefersColor, useLocale } from 'dumi';
import React, { type FC, useMemo, useState } from 'react';
import './index.less';
import { Tabs, Button, List, Pagination } from 'antd';
import type { TabsProps } from 'antd';
import LearnMore from '../LearnMore';

type MyTabName = {
  [key: string]: any;
};
const SortList = (list: any, seq: string) => {
  if (list?.length > 0) {
    return seq === 'correct' ? list?.sort((a: any, b: any) => new Date(b?.time).getTime() - new Date(a?.time)?.getTime()) : list?.sort((a: any, b: any) => new Date(b?.time).getTime() - new Date(a?.time)?.getTime());
  } else {
    return '';
  }
}
const Blogs: FC = () => {
  const [color] = usePrefersColor();
  const locale = useLocale();
  const { frontmatter } = useRouteMeta();
  const [isCorrectClicked, setIsCorrectClicked] = useState<string>('');
  const [isinvertedClicked, setIsinvertedClicked] = useState<string>('');
  const [publish, setPublish] = useState(SortList(frontmatter?.publish, 'correct'));//发布
  const [develop, setDevelop] = useState(SortList(frontmatter?.develop, 'correct'));//开发
  const [products, setProducts] = useState(SortList(frontmatter?.products, 'correct'));//产品
  const [use, setUse] = useState(SortList(frontmatter?.use, 'correct'));//使用
  const [eventConsultation, setEventConsultation] = useState(SortList(frontmatter?.EventConsultation, 'correct'));//使用
  const [all, setAll] = useState(SortList(publish?.concat(develop, products, use), 'correct'));//全部
  const [tabKey, setTabKey] = useState('all');
  const tabName: MyTabName = {
    publish: setPublish,
    develop: setDevelop,
    products: setProducts,
    use: setUse,
    eventConsultation: setEventConsultation
  };
  const onChange = (key: string) => {
    setTabKey(key);
  };
  // 正序
  const correctClick = () => {
    setIsCorrectClicked(color === 'dark' ? '#5c6cf7' : '#a8abff')
    setIsinvertedClicked(color === 'dark' ? '#8a909a' : '#bfbfbf');
    if (tabKey === 'all') {
      const correctAll = all?.sort((a: any, b: any) => new Date(b?.time)?.getTime() - new Date(a?.time)?.getTime());
      setAll(correctAll);
    } else {
      const correct = frontmatter[tabKey].sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime());
      if (tabName[tabKey]) {
        tabName[tabKey](correct);
      }
    }
  };
  // 倒序
  const invertedClick = () => {
    setIsinvertedClicked(color === 'dark' ? '#5c6cf7' : '#a8abff');
    setIsCorrectClicked(color === 'dark' ? '#8a909a' : '#bfbfbf');
    if (tabKey === 'all') {
      const correctAll = all.sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime());
      setAll(correctAll);
    } else {
      const correct = frontmatter[tabKey].sort((a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime());
      if (tabName[tabKey]) {
        tabName[tabKey](correct);
      }
    }
  };
  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: locale.id === 'zh-CN' ? '全部' : 'All',
      children: (<List
        className='list'
        itemLayout="horizontal"
        dataSource={all}
        renderItem={(item: any, index) => (
          <List.Item className='item' key={index}>
            <div className='listTime'>{item.time}</div>
            <div className='listTitle'>{item.title}</div>
            <div className='listDesc'>{item.desc}</div>
            <LearnMore children='阅读更多' link={item.link} />
          </List.Item>
        )}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
          align: 'center'
        }}
      />)
    },
    {
      key: 'publish',
      label: locale.id === 'zh-CN' ? '发布' : 'Publish',
      children: (<List
        className='list'
        itemLayout="horizontal"
        dataSource={publish}
        renderItem={(item: any, index) => (
          <List.Item className='item' key={index}>
            <div className='listTime'>{item.time}</div>
            <div className='listTitle'>{item.title}</div>
            <div className='listDesc'>{item.desc}</div>
            <LearnMore children='阅读更多' link={item.link} />
          </List.Item>
        )}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
          align: 'center'
        }}
      />)
    },
    {
      key: 'develop',
      label: locale.id === 'zh-CN' ? '技术' : 'Develop',
      children: (<List
        className='list'
        itemLayout="horizontal"
        dataSource={develop}
        renderItem={(item: any, index) => (
          <List.Item className='item' key={index}>
            <div className='listTime'>{item.time}</div>
            <div className='listTitle'>{item.title}</div>
            <div className='listDesc'>{item.desc}</div>
            <LearnMore children='阅读更多' link={item.link} />
          </List.Item>
        )}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
          align: 'center'
        }}
      />)
    },
    {
      key: 'products',
      label: locale.id === 'zh-CN' ? '产品' : 'Products',
      children: (<List
        className='list'
        itemLayout="horizontal"
        dataSource={products}
        renderItem={(item: any, index) => (
          <List.Item className='item' key={index}>
            <div className='listTime'>{item.time}</div>
            <div className='listTitle'>{item.title}</div>
            <div className='listDesc'>{item.desc}</div>
            <LearnMore children='阅读更多' link={item.link} />
          </List.Item>
        )}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
          align: 'center'
        }}
      />)
    },
    {
      key: 'use',
      label: locale.id === 'zh-CN' ? '使用' : 'Use',
      children: (<List
        className='list'
        itemLayout="horizontal"
        dataSource={use}
        renderItem={(item: any, index) => (
          <List.Item className='item' key={index}>
            <div className='listTime'>{item.time}</div>
            <div className='listTitle'>{item.title}</div>
            <div className='listDesc'>{item.desc}</div>
            <LearnMore children='阅读更多' link={item.link} />
          </List.Item>
        )}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
          align: 'center'
        }}
      />)
    },
    {
      key: 'Event Consultation',
      label: locale.id === 'zh-CN' ? '活动资讯' : 'Event Consultation',
      children: (<List
        className='list'
        itemLayout="horizontal"
        dataSource={eventConsultation}
        renderItem={(item: any, index) => (
          <List.Item className='item' key={index}>
            <div className='listTime'>{item.time}</div>
            <div className='listTitle'>{item.title}</div>
            <div className='listDesc'>{item.desc}</div>
            <LearnMore children='阅读更多' link={item.link} />
          </List.Item>
        )}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
          align: 'center'
        }}
      />)
    },
  ];
  const slot = (
    <div className='slot'>
      <Button
        className='correct'
        type="link"
        style={{ color: isCorrectClicked }}
        onClick={correctClick || ''}>
        正序
      </Button>
      <Button
        className='inverted'
        type="link"
        style={{ color: isinvertedClicked }}
        onClick={invertedClick || ''}
      >
        倒序
      </Button>
    </div>
  )

  return (
    <div className="dumi-default-blogs">
      <div className="banner">
        <div className='bannerContent'>
          <img
            src={frontmatter!.bannerTitle}
            alt="" />
        </div>
      </div>
      <div className='content'>
        <Tabs defaultActiveKey="all" items={items} onChange={onChange} tabBarExtraContent={slot} />
      </div>
    </div>
  );
};
export default Blogs;
