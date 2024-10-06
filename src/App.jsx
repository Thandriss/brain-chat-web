import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import LoginPage from "./pages/loginPage/LoginPage"

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}></Route> 
        {/* <Route path='/cards' element={<Main/>}></Route>} 
        <Route path='/profile' element={<Profile/>}></Route> 
        <Route path='/chats' element={<Chats/>}></Route> 
        <Route path='/userChat' element={<UsersChat/>}></Route> 
        <Route path='/' element={<Page/>}></Route> */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
