import { Link, useLocale, useSiteData, useRouteMeta } from 'dumi';
import './index.less';
import React, { type FC } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const CodeGeneration: FC = () => {
  const locale = useLocale();
  const { frontmatter } = useRouteMeta();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <img style={{ width: '58px', height: '58px' }} src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*NPVCQ4gXms4AAAAAAAAAAAAADlHYAQ/original" alt="" />,
    prevArrow: <img style={{ width: '58px', height: '58px' }} src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*jjxJRZsDm6YAAAAAAAAAAAAADlHYAQ/original" alt="" />,
    appendDots: dots => (
      <div
        className='buttomDots'
        style={{
          display: "flex",
          justifyContent: 'space-between',
          width: '576px',
          textAlign: 'center',
          position: 'absolute',
          top: '75px',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}> {dots} </div>

    ),
    customPaging: i => (
      <div className={`${'generationButtom'}${locale.id}`}>
       
        {frontmatter?.CodeGenerationTitle.buttomText}{i + 1}
      </div >
    )
  };
  return <div className="code-Generation">
    <div className="code-Generation-center">
      <div className="generationTitle">
        {frontmatter?.CodeGenerationTitle.title}
        <div className="line" />
      </div>
      <div className="generationContent">
        <Slider {...settings}>
          {
            frontmatter?.CodeGeneration.map(item => {
              return  <div className="generationContentItem">
              <img src={item.image} alt="" />
              <div className="generationText">
                <div className="generationTextTitle">
                  {item.title}
                </div>
                <div className="desc">
                  {item.description}
                </div>
              </div>
            </div>
            })
          }
        </Slider>
      </div>
    </div>
  </div>
};
export default CodeGeneration;
