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

function App() {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [boardData, setBoardData] = useState();
  const [boards, setBoards] = useState([]);
  const [rerender, setRerender] = useState(false);
  
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

  useEffect(() => {
    axiosInstance.get('/')
      .then(response => {
        setBoards(response.data);
      }).catch(error => {
        console.error(error);
      })
  }, [rerender])

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
        <Route path='/' element={<BoardList boards={boards} />} />
        <Route path='/login' element={<Login setAuth={setAuth} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/write' element={<WriteBoard
          userInfo={userInfo}
          rerender={rerender}
          setRerender={setRerender}
        />} />
        <Route path='/board/:id' element={<BoardDetail
          boardData={boardData}
          setBoardData={setBoardData}
          rerender={rerender}
          setRerender={setRerender}
        />} />
        <Route path='/board/:id/update' element={<UpdateBoard
          boardData={boardData}
          setBoardData={setBoardData}
          rerender={rerender}
          setRerender={setRerender}
        />} />
      </Routes>

    </>
  )
}

export default App
