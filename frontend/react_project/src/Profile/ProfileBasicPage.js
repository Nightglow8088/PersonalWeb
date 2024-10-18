import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import "./ProfileBasicPage.css"
import avatar from '../img/profilePage/Avatar.jpg';
import PointDume from '../img/profilePage/PointDume.jpg';
import GoldenBridge from '../img/profilePage/GoldenBridge.jpg';


import Gitee from '../img/profilePage/gitee-svgrepo-com.svg';


export default function BasicPage() {
  return (
    <section className="h-100 gradient-custom-2">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center">
          <div className="col col-lg-9 col-xl-8">
            <div className="card">
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: '#000', height: '200px' }}
              >
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <img
                    src={avatar}
                    alt="Profile avatar"
                    className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: '150px', zIndex: 1 }}
                  />
                  <div style={{ zIndex: 1 ,marginLeft: '15px', color: '#4F4F4F'}} className=" bg-body-tertiary" >
                    <p className="font-italic mb-1">Web Developer</p>
                    <p className="font-italic mb-1">Photographer</p>
                  </div>

                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <h5>Mingxuan Bo/伯明轩</h5>
                  <p>Los Angeles</p>
                </div>
              </div>
              <div className="p-4 text-black bg-body-tertiary">
                <div className="d-flex justify-content-end text-center py-1 text-body">
                  <div className="px-3">
                    <a href="https://github.com/Nightglow8088" target="_blank" rel="noopener noreferrer">
                      <p className="mb-1" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
                      </p>
                      <p className="small text-muted mb-0">Github</p>
                    </a>
                  </div>
                  <div className="px-3">
                    <a href="https://www.linkedin.com/in/mingxuan-bo-464135230" target="_blank" rel="noopener noreferrer">
                      <p className="mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
                      </p>
                    </a>
                    <p className="small text-muted mb-0">LinkedIn</p>
                  </div>
                  <div className="px-3">
                    <a href='https://gitee.com/MoonHalo8088' target="_blank" rel="noopener noreferrer">
                      <p className="mb-1">
                        <img src={Gitee} alt="Local Icon" width="32" height="32" style={{ cursor: 'pointer' }} />
                      </p>
                      <p className="small text-muted mb-0">Gitee</p>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="mb-5 text-body">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4 bg-body-tertiary">
                    {/* <p className="font-italic mb-1">Web Developer</p>
                    <p className="font-italic mb-1">Lives in New York</p>*/}
                    <p className="font-italic mb-0">Photographer</p> 

                    <div class="card">
                      <h5 class="card-header">Featured</h5>
                      <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary" data-mdb-ripple-init>Go somewhere</a>
                      </div>
                    </div>

                    <div class="card">
                      <h5 class="card-header">Featured</h5>
                      <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary" data-mdb-ripple-init>Go somewhere</a>
                      </div>
                    </div>


                    <div class="card">
                      <h5 class="card-header">Featured</h5>
                      <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary" data-mdb-ripple-init>Go somewhere</a>
                      </div>
                    </div>



                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4 text-body">
                  <p className="lead fw-normal mb-0">Recent photos</p>
                  <p className="mb-0">
                    <a href="#!" className="text-muted">
                      Show all
                    </a>
                  </p>
                </div>

                <MDBCarousel showIndicators showControls fade>

                  <MDBCarouselItem itemId={1}>
                    <img src={GoldenBridge} className='d-block w-100' alt='...' style={{ maxHeight: '400px', objectFit: 'cover' }} />
                    <MDBCarouselCaption>
                      <h5>Golden Gate Bridge</h5>
                      <p>There was a Blue angels air show in San Francisco that day, but unfortunately it ended when we arrived at the Golden Gate Bridge.</p>
                    </MDBCarouselCaption>
                  </MDBCarouselItem>

                  <MDBCarouselItem itemId={2}>
                    <img src={PointDume} className='d-block w-100' alt='...' style={{ maxHeight: '400px', objectFit: 'cover' }} />
                    <MDBCarouselCaption>
                      <h5>Point Dume</h5>
                      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </MDBCarouselCaption>
                  </MDBCarouselItem>

                  <MDBCarouselItem itemId={3}>
                    <img src={GoldenBridge} className='d-block w-100' alt='...' style={{ maxHeight: '400px', objectFit: 'cover' }} />
                    <MDBCarouselCaption>
                      <h5>Third slide label</h5>
                      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </MDBCarouselCaption>
                  </MDBCarouselItem>
                </MDBCarousel> 

                



                {/* <div className="row g-2">
                  <div className="col mb-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </div>
                  <div className="col mb-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </div>
                </div>
                <div className="row g-2">
                  <div className="col">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </div>
                  <div className="col">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                      alt="image 1"
                      className="w-100 rounded-3"
                    />
                  </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}