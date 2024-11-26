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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/list' element={<ChatList/>}></Route>
            <Route path='/chat/:name' element={<Chat/>}></Route>
          </Route>
          <Route index element={<IntroPage/>} />
          <Route path='/login' element={<LoginPage/>}></Route> 
          <Route path='/signUp' element={<SignUpPage/>}></Route> 
          <Route path='/confirm' element={<ConfirmPage/>}></Route> 

          {/* <Route path='/' element={<IntroPage/>}></Route> */}
        {/* <Route path='/cards' element={<Main/>}></Route>} 
        <Route path='/profile' element={<Profile/>}></Route> 
        <Route path='/chats' element={<Chats/>}></Route> 
        <Route path='/userChat' element={<UsersChat/>}></Route> 
        <Route path='/' element={<Page/>}></Route> */}
          <Route path="*" element={<NotFounded />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
