import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes, Link ,Navigate} from 'react-router-dom';
import SignIn from './login/SignIn';
import SignUp from './register/SignUp';
import AssembledHomePage from './homePage/AssembledHomePage.js';
import BasicPage from './Profile/ProfileBasicPage.js';
import ImageGallery from './ImageGallery/ImageGallery.js';
import BlogEditor from './blog/codeTemp/BlogEditor.js';
// import Demo2 from './blog/codeTemp/demo2.js';
import BlogPostForm from './blog/post/PostSubmit.js';
import PostShow from './blog/post/PostShow.js';
import PostDetail from './blog/post/PostDetail.js';
import BlogPostForm2 from './blog/post/PostSubmitV2.js';


function App() {
  return (
    <Router>
      <div>

        <Routes>
          {/* <Route path="/" element={<Navigate to="/Home" replace />} />  */}
          <Route path="/" element={<AssembledHomePage />} /> 
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Home" element={<AssembledHomePage />} />
          <Route path="/Profile" element={<BasicPage />} />
          <Route path="/Gallery" element={<ImageGallery />} />
          <Route path="/test" element={<BlogEditor />} />
          {/* <Route path="/test2" element={<Demo2 />} /> */}
          <Route path="/BlogPost" element={<BlogPostForm />} />
          <Route path="/blogShow" element={<PostShow />} />
          <Route path="/blogPostDetail/:id" element={<PostDetail />} />

          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
