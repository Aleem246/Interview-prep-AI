import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import DashBoard from './pages/Home/DashBoard';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';
import Navbar from './pages/Navbar/Navbar';
import { authActions } from './store/auth';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateToken = async()=>{
    const token = localStorage.getItem('token');
    if(!token){
      dispatch(authActions.logout());
            localStorage.clear();
            navigate('/');
    }
    try{
            // console.log(token);
            const decoded = jwtDecode(token);
            // console.log("Decoded JWT:", decoded);
            if(!decoded || !decoded.exp || decoded.exp < Date.now()/1000){
                localStorage.clear();
                dispatch(authActions.logout());
                navigate('/');
            }
      }catch(err){
            localStorage.clear();
            dispatch(authActions.logout());
            console.error("Token decode error:", err);
            navigate('/');
        }
  }

  useEffect(()=>{
    validateToken();

    if(localStorage.getItem('token') && localStorage.getItem('id')){
      dispatch(authActions.login());
    }
  },[])

  return (
    <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path="/dashboard" element={<DashBoard/>}></Route>
          <Route path="/interview-prep/:sessionId" element={<InterviewPrep/>}></Route>
        </Routes>
      
        
    </div>
  
  )
}

export default App