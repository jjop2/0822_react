import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useEffect, useState } from "react";

const BoardDetail = ( {userInfo} ) => {
  const { id } = useParams();
  const [board, setBoard] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!sessionStorage.getItem('jwt'))
      return;

    axiosInstance.get(`/board/${id}`)
      .then(response => {
        setBoard(response.data)
      }).catch(error => {
        console.error(error)
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  if(loading || !userInfo)
    return <div>게시글 불러오는 중...</div>

  if(!board)
    return <h1>존재하지 않는 게시물입니다.</h1>

  return (
    <div>
      <h2>{board.title}</h2>
      <h4>{board.writer}</h4>
      <p>{board.content}</p>
      <button onClick={() => history.back()}>목록</button>
      {
        userInfo.username == board.writer && (
          <button onClick={() => {
            navigate(`/board/${id}/update`)
          }}>수정</button>
      )}
      {
        userInfo.username == board.writer && (
        <button onClick={() => {
          if(!confirm('정말로 삭제하시겠습니까?'))
            return;

          axiosInstance.delete(`/board/${id}`)
            .then(response => {
              alert(response.data);
              navigate('/');
            })
            .catch(error => console.error(error))
        }}>삭제</button>
      )}
      
    </div>
  )
}

export default BoardDetail;