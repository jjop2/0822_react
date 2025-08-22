import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import WriteBoard from './WriteBoard';

function App() {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState();
  
  useEffect(() => {
    if(sessionStorage.getItem('jwt'))
      setAuth(true)
  }, [])

  useEffect(() => {
    if(auth) {
      axiosInstance.get('/userinfo')
        .then(response => {
          setUserInfo(response.data)
        }).catch(error => {
          console.error(error);
        })
    }
  }, [auth])

  return (
    <>
      <Header auth={auth} setAuth={setAuth} userInfo={userInfo} setUserInfo={setUserInfo} />

      <button onClick={() => {
        axiosInstance.get('/test')
          .then(response => {
            console.log(response.data)
          }).catch(error => {
            console.log(error)
          })
      }}>테스트</button>

      <Routes>
        <Route path='/' element={<h1>인덱스 페이지</h1>} />
        <Route path='/login' element={<Login setAuth={setAuth} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/write' element={<WriteBoard userInfo={userInfo} />} />
      </Routes>

    </>
  )
}

export default App
