import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import LoginPage from "./pages/loginPage/LoginPage"
import SignUpPage from "./pages/signUpPage/SignUp"
import ConfirmPage from './pages/confirmPage/ConfirmPage';
import IntroPage from './pages/introPage/IntroPage';
import NotFounded from './pages/not_founded/NotFounded';
import ChatList from './pages/chats_page/ChatList';
import Layout from './pages/layout/Layout';
import Chat from './pages/chat/Chat';
import ResetPassword from './pages/resetPassword/ResetPassword';
import {useCookies} from 'react-cookie'

function App() {
  const [cookies, setCookie] = useCookies(['accessToken'])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {cookies['accessToken'] && <Route path='/list' element={<ChatList/>}></Route>}
            {cookies['accessToken'] && <Route path='/chat/:name' element={<Chat/>}></Route>}
          </Route>
          {!cookies['accessToken'] && <Route index element={<IntroPage/>}/>} 
          {!cookies['accessToken'] && <Route path='/login' element={<LoginPage/>}></Route> }
          {!cookies['accessToken'] && <Route path='/reset' element={<ResetPassword/>}></Route>}
          {!cookies['accessToken'] && <Route path='/signUp' element={<SignUpPage/>}></Route> }
          {!cookies['accessToken'] && <Route path='/confirm' element={<ConfirmPage/>}></Route> }
          <Route path="*" element={<NotFounded />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
