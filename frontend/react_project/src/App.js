import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes, Link ,Navigate} from 'react-router-dom';
import SignIn from './login/SignIn';
import SignUp from './register/SignUp';
import AssembledHomePage from './homePage/AssembledHomePage.js';
import BasicPage from './Profile/ProfileBasicPage.js';
import ImageGallery from './ImageGallery/ImageGallery.js';
import BlogEditor from './blog/codeTemp/BlogEditor.js';


function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/SignIn">About</Link>
            </li>
            <li>
              <Link to="/SignUp">Contact</Link>
            </li>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<Navigate to="/Profile" replace />} /> 
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Home" element={<AssembledHomePage />} />
          <Route path="/Profile" element={<BasicPage />} />
          <Route path="/Gallery" element={<ImageGallery />} />
          <Route path="/test" element={<BlogEditor />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
