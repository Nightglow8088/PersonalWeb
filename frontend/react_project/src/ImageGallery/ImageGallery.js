import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import Masonry from 'react-masonry-css';
import "./ImageGallery.css";

import React, { useState, useEffect } from 'react';

import "./ImageGallery.css";
import Header from '../homePage/headerPage/Header';

export default function ImageGallery() {
  const [images, setImages] = useState([]);

  // 定义各断点下列数
  const breakpointColumnsObj = {
    default: 3,
    992: 2,
    576: 1
  };


  // api修改
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/api/ImagesController/showAll`)
      .then(response => response.json())
      .then(data => {
        console.log('API Data:', data); // 打印从API获取的数据
        const loadedImages = data.data.map(img => ({
          ...img,
          url: `/GalleryImage/${img.name}` // 确保包括文件扩展名
        }));
        console.log('Processed Images:', loadedImages); // 打印处理后的图片信息
        setImages(loadedImages);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        console.log('Fetch Error:', error); // 更详细的错误信息
      });
  }, []);


  return (
    <div className="gallery-page">
      <Header />
      <div className="gallery-container">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-column"
        >
          {images.map(image => (
            <div className="image-card" key={image.id}>
              <img src={image.url} alt={image.name} className="image" />
              {image.review && (
                <div className="caption">{image.review}</div>
              )}
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}
