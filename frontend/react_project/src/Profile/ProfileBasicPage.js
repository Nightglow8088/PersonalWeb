import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import "./ProfileBasicPage.css"
import avatar from '../img/profilePage/Avatar.jpg';
import PointDume from '../img/profilePage/PointDume.jpg';
import GoldenBridge from '../img/profilePage/GoldenBridge.jpg';
import Dal from '../img/profilePage/Oakland_Road_Park.jpg';
import PDFIcon from '../img/icon/PDFIcon.svg';
import CertificateIcon from '../img/icon/certificate-solid.svg';
import ResumePDF from '../docs/Resume2024Fall.pdf';
import CertificatePDF from '../docs/certificate.jpg';
import Gitee from '../img/icon/gitee-svgrepo-com.svg';
import Header from '../homePage/headerPage/Header';


export default function BasicPage() {
  return (
    <div>
    <Header />
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
                  <h5>Mingxuan Bo/Kevin</h5>
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
                  <div className="p-4 bg-body-tertiary d-grid gap-3">

                    {/* 简历card */}
                    <div className="card">
                      <h5 className="card-header">Resume</h5>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <a href='https://drive.google.com/file/d/1ADihMfSk2vKUEqfjp0lo6BqE6ffbJd7Z/view?usp=sharing' target="_blank" rel="noopener noreferrer" className="me-3">
                              <img src={PDFIcon} alt="PDF Icon" width="50" height="50" style={{ color: '#E02F2F', cursor: 'pointer' }} />
                            </a>
                          </div>
                          <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <p className="card-text ">
                              Mingxuan Bo
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 学历card */}
                    <div className="card">
                      <h5 className="card-header">Education</h5>
                      <div className="card-body ">

                        {/* usc经历 */}
                        <div className="card mb-3" >
                          <div className="card-body">
                            <h5 className="card-title">University of Southern California</h5>
                            <h6 className="card-subtitle mb-2 text-muted">M.S. Computer Science </h6>
                            <div className="card-text">
                              <div className="d-flex flex-column">
                              <div className="row">
                                  <div className="col-md-3">Directions:</div>
                                  <div className="col-md-9">Full-stack development, Game development, AI</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* dal经历 */}
                        <div className="card" >
                          <div className="card-body">
                            <h5 className="card-title">Dalhousie University</h5>
                            <h6 className="card-subtitle mb-2 text-muted">B.S. Computer Science </h6>
                            <div className="card-text">
                              <div className="d-flex flex-column">
                                <div className="row">
                                  <div className="col-md-3">Certificate:</div>
                                  <div className="col-md-9">Certificate in Communication Technologies and Cyber Security</div>
                                </div>
                                <div className="row">
                                  <div className="col-md-3">Scholarship:</div>
                                  <div className="col-md-9">Awarded sexton scholar twice, in 2021 and 2022.</div>
                                </div>

                              <div className="row">
                                <div className="col-md-3">Achievements:</div>
                                <div className="col-md-9">Graduated with Sexton Distinction for academic excellence, ranking in the top 5% of the class by GPA.</div>
                              </div>

                              </div>                            
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>


                      {/* 实习card */}
                    <div className="card  ">
                      <h5 className="card-header">Internship</h5>
                      <div className="card-body">


                        {/* Myreaa兼职 */}
                        <div className="card mb-3" >
                          <div className="card-body">
                            <h5 className="card-title"> Software Engineer</h5>
                            <h6 className="card-subtitle mb-1 " style={{ color: '#000000', fontSize: '0.875rem' }} >Myreaa</h6>
                            <h6 className="card-subtitle mb-1 text-muted" style={{ fontSize: '0.875rem' }}>Feb 2025 - Present</h6>
                            <h6 className="card-subtitle mb-1 text-muted" style={{ fontSize: '0.875rem' }}>Los Angeles, US · Remote</h6>

                            <p className="card-text" style={{ lineHeight: '1.2' }}>
                              Developed backend microservices for data ingestion, cleaning, and standardization, integrating machine learning models into an automated report-generation API.                            </p>

                            <p className="card-text" style={{ lineHeight: '1.2' , fontWeight: 'bold' }}>
                              Next.js, TypeScript, Supabase 
                            </p>
                          </div>
                        </div>

                        {/* 通用实习 */}
                        <div className="card mb-3" >
                          <div className="card-body">
                            <h5 className="card-title">Ros2 Software Engineer</h5>
                            <h6 className="card-subtitle mb-1 " style={{ color: '#000000', fontSize: '0.875rem' }} >General Motors</h6>
                            <h6 className="card-subtitle mb-1 text-muted" style={{ fontSize: '0.875rem' }}>Jun 2024 - Aug 2024 · 3 mos</h6>
                            <h6 className="card-subtitle mb-1 text-muted" style={{ fontSize: '0.875rem' }}>Shanghai, China · On-site</h6>

                            <p className="card-text" style={{ lineHeight: '1.2' }}>
                              Developed a client-server application that integrates ROS 2 services with a Qt graphical user interface for monitoring and visualizing the number of active clients and retrieving priority data from a remote server.
                            </p>

                            <p className="card-text" style={{ lineHeight: '1.2' , fontWeight: 'bold' }}>
                              ROS2, C++, CI/CD
                            </p>
                          </div>
                        </div>

                      {/* 创基实习 */}
                        <div className="card mb-3" >
                          <div className="card-body">
                            <h5 className="card-title">Backend Developer</h5>
                            <h6 className="card-subtitle mb-1 " style={{ color: '#000000', fontSize: '0.875rem' }} >Trial Holdings Inc</h6>
                            <h6 className="card-subtitle mb-1 text-muted" style={{ fontSize: '0.875rem' }}>Jul 2023 - Dec 2023 · 6 mos</h6>
                            <h6 className="card-subtitle mb-1 text-muted" style={{ fontSize: '0.875rem' }}>Shandong, China · On-site</h6>

                            <p className="card-text" style={{ lineHeight: '1.2' }}>
                              Designed and implemented a project framework to ensure efficient database connections and system performance, developed secure APIs, and collaborated effectively with the team to meet client requirements and resolve technical challenges.
                            </p>

                            <p className="card-text" style={{ lineHeight: '1.2' , fontWeight: 'bold' }}>
                              SpringBoot, Multithreading, Security
                            </p>
                          </div>
                        </div>

                          {/* 网易实习 */}
                        <div className="card mb-3" >
                          <div className="card-body">
                            <h5 className="card-title">Game Development Engineer</h5>
                            <h6 className="card-subtitle mb-1 " style={{ color: '#000000', fontSize: '0.875rem' }} >NetEase</h6>
                            <h6 className="card-subtitle mb-1 text-muted" style={{ fontSize: '0.875rem' }}>Jul 2021 - Aug 2021 · 2 mos</h6>
                            <h6 className="card-subtitle mb-1 text-muted" style={{ fontSize: '0.875rem' }}>Guangdong, China · Remote</h6>

                            <p className="card-text" style={{ lineHeight: '1.2' }}>
                              Developed and debugged game character systems in Unity, contributing 500 lines of code, while optimizing gameplay mechanics through collaboration with planning and UX teams.                       
                            </p>

                            <p className="card-text" style={{ lineHeight: '1.2' , fontWeight: 'bold' }}>
                              Unity, C#, Game Development
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* 学校项目card */}
                    <div className="card">
                      <h5 className="card-header">Academic Experience</h5>
                      <div className="card-body ">

                        {/* 现在弄得个人网站 */}
                        <div className="card mb-3" >
                          <div className="card-body">
                            <h5 className="card-title">Personal Web Project</h5>
                            <h6 className="card-subtitle mb-2 text-muted">June 2024 - Now</h6>
                            <div className="card-text">

                              <div className="d-flex flex-column ">
                                <div className="mb-2">
                                  1. Personal website based on React, SpringBoot(deployed on digited ocean) and Postgres(deployed on aws).
                                </div>
                                <div className="mb-2">
                                  2. In future plans, I aim to add photo display and blog features, including user login and commenting capabilities. Keep pushing forward!
                                </div>

                              </div>

                            </div>
                            <a href="https://github.com/Nightglow8088/PersonalWeb" target="_blank" rel="noopener noreferrer">
                              <p className="card-text">GitHub Link.</p>
                            </a>


                          </div>
                          
                        </div>

                        {/* dal全栈 */}
                        <div className="card mb-3" >
                          <div className="card-body">
                            <h5 className="card-title">Full Stack Website Building Project</h5>
                            <h6 className="card-subtitle mb-2 text-muted">May 2022 - July 2022 </h6>
                            <div className="card-text">
                              <div className="d-flex flex-column ">
                                <div className="mb-2">
                                  1. Developed a Trello-like website for task management, learning Spring Java and React to create a responsive and userfriendly interface</div>
                                <div className="mb-2">
                                  2. Utilized Agile development methodologies to adapt to changing project requirements and deliver iterative prototypes for user feedback.
                                </div>
                              </div>

                            </div>
                            <a href="https://github.com/Nightglow8088/TrelloLikeProject" target="_blank" rel="noopener noreferrer">
                              <p className="card-text">GitHub Link.</p>
                            </a>
                          </div>
                        </div>


                        {/* usc全栈 */}
                        <div className="card mb-3" >
                          <div className="card-body">
                            <h5 className="card-title">Stock Watch and Trading Program</h5>
                            <h6 className="card-subtitle mb-2 text-muted">August 2024 - December 2024 </h6>
                            <div className="card-text">
                              <div className="d-flex flex-column ">
                                <div className="mb-2">
                                  1. Developed a stock trading and monitoring website with Node.js, MongoDB, and React, deployed on Google Cloud.
                                </div>
                                <div className="mb-2">
                                  2. Enabled users to search and favorite stocks, view current and historical prices, and calculate potential profits or losses from their holdings.
                                </div>
                                <div className="mb-2">
                                  3. Provided users with access to the latest company news and the ability to share it on Twitter and Facebook.
                                </div>
                                <div className="mb-2">
                                  4. Implemented stock buying and selling on the website, with immediate database updates and real-time tracking of users' capital balances and stock positions.
                                </div>
                              </div>

                              <a href="https://github.com/Nightglow8088/usc571Stock" target="_blank" rel="noopener noreferrer">
                                <p className="card-text">GitHub Link.</p>
                              </a>

                            </div>
                          </div>
                        </div>

                        {/* dal的4168游戏开发 */}
                        <div className="card" >
                          <div className="card-body">
                            <h5 className="card-title">Unity Game Development Project</h5>
                            <h6 className="card-subtitle mb-2 text-muted">September 2022 - December 2022</h6>
                            <div className="card-text">

                              <div className="d-flex flex-column ">
                                <div className="mb-2">
                                  1. Led a team of 4 to develop an RPG adventure game.
                                </div>
                                <div className="mb-2">
                                  2. Designing the game treatment document, deciding on the game's backstory, core mechanics, and gameplay highlights.
                                </div>
                                <div className="mb-2">
                                  3. Implemented the required functionality with Unity and Blender, developed the backpack system, dialog system, a large and complex terrain, character movement scripts and animations and totally coded 600 lines.
                                </div>
                              </div>
                              <a href="https://github.com/Nightglow8088/4168Project" target="_blank" rel="noopener noreferrer">
                                <p className="card-text">GitHub Link.</p>
                              </a>
                            
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* 证书card */}
                    <div className="card  ">
                      <h5 className="card-header">Certificate</h5>
                      <div className="card-body" style={{paddingTop:"0"}}>

                        <ul className="list-group list-group-light list-group-small">
                          {/* <li class="list-group-item px-3"></li> */}
                          <li className="list-group-item px-3">
                            <div className="row ">
                                <div className="col-md-6 d-flex align-items-center justify-content-center">
                                  <a href={CertificatePDF} target="_blank" rel="noopener noreferrer" className="me-3">
                                    <img src={CertificateIcon} alt="PDF Icon" width="40" height="40" style={{ color: '#E02F2F', cursor: 'pointer' }} />
                                  </a>
                                </div>
                                <div className="col-md-6 d-flex align-items-center justify-content-center">
                                  <p className="card-text text-center">
                                    Certificate in Communication Technologies and Cyber Security
                                  </p>
                                </div>
                              </div>
                          </li>

                          <li className="list-group-item px-3">
                            <div className="row">
                              <div className="col-md-6 d-flex align-items-center justify-content-center">
                                <a href='https://www.hackerrank.com/certificates/02ca5d59db9d' target="_blank" rel="noopener noreferrer" className="me-3">
                                  <img src={CertificateIcon} alt="PDF Icon" width="40" height="40" style={{ color: '#E02F2F', cursor: 'pointer' }} />
                                </a>
                              </div>
                              <div className="col-md-6 d-flex align-items-center justify-content-center">
                                <p className="card-text text-center">
                                  Java 
                                </p>
                              </div>
                            </div>
                          </li>

                          
                          <li className="list-group-item px-3">
                            <div className="row">
                              <div className="col-md-6 d-flex align-items-center justify-content-center">
                                <a href='https://www.coursera.org/professional-certificates/meta-back-end-developer' target="_blank" rel="noopener noreferrer" className="me-3">
                                  <img src={CertificateIcon} alt="PDF Icon" width="40" height="40" style={{ color: '#E02F2F', cursor: 'pointer' }} />
                                </a>
                              </div>
                              <div className="col-md-6 d-flex align-items-center justify-content-center">
                                <p className="card-text text-center">
                                  Meta Backend (On Going)
                                </p>
                              </div>
                            </div>
                          </li>

                          <li className="list-group-item px-3"></li>

                        </ul>
                      </div>
                    </div>


                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4 text-body">
                  <p className="lead fw-normal mb-0">Recent photos</p>
                  {/* <p className="mb-0">
                    <a href="#!" className="text-muted">
                      Show all
                    </a>
                  </p> */}
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
                      <p>Located at Malibu California, landscapes formed because of physical faults in the territory </p>
                    </MDBCarouselCaption>
                  </MDBCarouselItem>

                  <MDBCarouselItem itemId={3}>
                    <img src={Dal} className='d-block w-100' alt='...' style={{ maxHeight: '400px', objectFit: 'cover' }} />
                    <MDBCarouselCaption>
                      <h5>Oakland Road Park</h5>
                      <p>Located near Dalhousie University, this secluded park borders the Atlantic Ocean, offering unique and captivating views.</p>
                    </MDBCarouselCaption>
                  </MDBCarouselItem>
                </MDBCarousel> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>

  );
}