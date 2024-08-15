import './App.css';
import { useState } from 'react';

function App() {
  let [글제목, 글제목변경] = useState(['여자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [날짜, 날짜변경] = useState('2월 17일 발행');
  let [modal, setModal] = useState(false);
  let [선택된글, 선택된글변경] = useState(0);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [입력값, 입력값변경] = useState('');

  // 제목 수정 함수
  const updateTitle = () => {
    let copy = [...글제목];
    copy[선택된글] = '남자 코트 추천'; // 제목을 '남자 코트 추천'으로 변경
    글제목변경(copy);
    setModal(false);
    입력값변경('');
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

     

      {/* 글 목록 */}
      <div className="list">
        {글제목.map((제목, i) => (
          <div className="list" key={i}>
            <h4 
              onClick={() => {
                선택된글변경(i);
                setModal(true);
              }}
            >
              {제목}
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  let 따봉복사 = [...따봉];
                  따봉복사[i] += 1; // 클릭한 글의 따봉 증가
                  따봉변경(따봉복사);
                }}
              >
                👍
              </span>
              {따봉[i]}
            </h4>
            <p>{날짜}</p>
            <button onClick={() => {
              let copy = [...글제목];
              copy.splice(i, 1);
              글제목변경(copy);
              let 따봉복사 = [...따봉];
              따봉복사.splice(i, 1); // 삭제된 글의 따봉도 제거
              따봉변경(따봉복사);
            }}>삭제</button>
          </div>
        ))}
      </div>

      {/* 글 발행 기능 */}
            <input 
              value={입력값}
              onChange={(e) => 입력값변경(e.target.value)}
            />
            <button onClick={() => {
              let copy = [...글제목];
              copy.unshift(입력값);
              글제목변경(copy);
              따봉변경([...따봉, 0]); // 새 글에 대해 따봉 초기화
              입력값변경(''); // 입력창 초기화
            }}>글발행</button>


      {/* 모달 표시 여부에 따라 */}
      {modal && (
        <Modal
          제목={글제목[선택된글]}
          updateTitle={updateTitle}
          closeModal={() => setModal(false)}
        />
      )}
    </div>
  );
}

// 모달 컴포넌트
function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.제목}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={props.updateTitle}>글수정</button>
      <button onClick={props.closeModal}>닫기</button>
    </div>
  );
}

export default App;
