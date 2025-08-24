import { useNavigate } from "react-router-dom";

const BoardList = ( {boards} ) => {
  const navigate = useNavigate();

  if(boards.length === 0)
    return <div>게시글 목록 불러오는 중...</div>

  return (
    <div>
      {
        boards.map((board, i) => {
          return (
            <div key={i}>
              <h2>{board.title}</h2>
              <p>{board.writer}</p>
              <button onClick={() => {
                navigate(`/board/${board.id}`);
              }}>상세보기</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default BoardList;