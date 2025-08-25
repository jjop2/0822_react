import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './Header';
import Login from './Login';
import Signup from './Signup';
import { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';
import WriteBoard from './WriteBoard';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import UpdateBoard from './updateBoard';
import { LoginMsg } from './LoginMsg';

function App() {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);
  
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
    setLoading(false);
  }, [auth])

  if(loading)
    return <div>로딩중...</div>

  
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
        <Route path='/' element={<BoardList />} />
        <Route path='/login' element={<Login setAuth={setAuth} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/write' element={auth ? <WriteBoard userInfo={userInfo} /> : <LoginMsg />} />
        <Route path='/board/:id' element={auth ? <BoardDetail userInfo={userInfo} /> : <LoginMsg />} />
        <Route path='/board/:id/update' element={auth ? <UpdateBoard userInfo={userInfo} /> : <LoginMsg />} />
      </Routes>

    </>
  )
}

export default App
