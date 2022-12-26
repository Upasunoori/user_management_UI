import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


import LoginPage from './components/login_page/login';
import ForgotPasswordPage from './components/Forgot_password_page/Forgot_password';
import Password_reset from './components/Reset_password/reset_password';
import DummyPage from './components/DummyPage/DummyPage';
import UserList from './components/userListPage/userList';
import UpdateUser from './components/updateUserPage/updateUser';

function App() {
  return (
    <div className="App">
      <header align="center">
        <Router>
          {/* <LoginPage /> */}
          {/* <Link to='/login'>Login</Link> */}
          <Routes>
            <Route exact path='/login' element={<LoginPage/>}></Route>
            <Route exact path='/forgot' element={<ForgotPasswordPage/>}></Route>
            <Route exact path='/reset' element={<Password_reset />}></Route>
            <Route exact path='/search' element={<UserList />}></Route>
            <Route exact path='/edit/:id' element={<UpdateUser />}></Route>
          </Routes>
        </Router>
        {/* <ForgotPasswordPage /> */}
        {/* <Password_reset /> */}
      </header>
    </div>
  );
}

export default App;
