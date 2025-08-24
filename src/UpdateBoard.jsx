import { useState } from "react";
import useRequireLogin from "./useRequireLogin";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const UpdateBoard = ( {boardData, setBoardData, rerender, setRerender} ) => {
  useRequireLogin();

  const { id } = useParams();
  const navigate = useNavigate();

  const [update, setUpdate] = useState({
    "id" : id,
    "title" : '',
    "content" : ''
  });

  // 이 이상 늘어나면 컴포넌트로 빼자..
  if(boardData == null)
    return <div>페이지 불러오는 중...</div>


  const onChangeHandler = (e) => {
    setUpdate({
      ...update,
      [e.target.name]: e.target.value
    })
  }


  return (
    <div>
      제목<br /><input type="text" name="title" defaultValue={boardData.title} onChange={onChangeHandler}/> <br />
      내용<br /><textarea name="content" defaultValue={boardData.content} onChange={onChangeHandler}></textarea> <br />
      <button onClick={() => history.back()}>취소</button>
      <button onClick={() => {
        if(!update.title && !update.content) {
          alert('수정된 내용이 없습니다');
          return;
        }

        if(!confirm('수정하시겠습니까?')) {
          return;
        }

        axiosInstance.put('/board', update)
          .then(response => {
            alert(response.data);
            setRerender(!rerender);
            navigate('/');
          }).catch(error => {
            console.error(error);
          })
      }}>수정완료</button>
    </div>
  )
}

export default UpdateBoard;