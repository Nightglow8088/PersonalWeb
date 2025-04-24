import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';

import "./ImageGallery.css";
import Header from '../homePage/headerPage/Header';

export default function ImageGallery() {
  const [images, setImages] = useState([]);
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
    <div className='gradient-custom-2'>
      <Header/>
      <MDBContainer className='mt-5 '>
        <MDBRow className=''>
          {images.map((image, index) => (
            <MDBCol lg={4} className="mb-4" key={image.id}>
              {/* md={6} sm={12} */}
              <div className="card">
                <img
                  src={image.url} 
                  alt={`Gallery photo ${image.name}`}
                  className="card-img-top"
                />
                <div className="card-body">
                  <p className="card-text">{image.review}</p>
                </div>
              </div>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
