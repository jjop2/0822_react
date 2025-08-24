import { useNavigate, useParams } from "react-router-dom";
import useRequireLogin from "./useRequireLogin";
import axiosInstance from "./axiosInstance";
import { useEffect } from "react";

const BoardDetail = ( {boardData, setBoardData, rerender, setRerender} ) => {
  useRequireLogin();
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!sessionStorage.getItem('jwt'))
      return;

    axiosInstance.get(`/board/${id}`, id)
      .then(response => {
        setBoardData(response.data)
      }).catch(error => console.error(error))
  }, [])

  if(boardData == null)
    return <div>게시글 불러오는 중...</div>

  return (
    <div>
      <h2>{boardData.title}</h2>
      <h4>{boardData.writer}</h4>
      <p>{boardData.content}</p>
      <button onClick={() => history.back()}>목록</button>
      <button onClick={() => {
        navigate(`/board/${id}/update`)
      }}>수정</button>
      <button onClick={() => {
        if(!confirm('정말로 삭제하시겠습니까?'))
          return;

        axiosInstance.delete(`/board/${id}`)
          .then(response => {
            alert(response.data);
            setRerender(!rerender);
            navigate('/');
          })
          .catch(error => console.error(error))
      }}>삭제</button>
    </div>
  )
}

export default BoardDetail;