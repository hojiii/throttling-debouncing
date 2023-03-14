import React, { useEffect } from "react";
import { debounce, throttle } from "lodash";
import { useNavigate } from "react-router-dom";

function Home() {
  let timerId = null;
  const navigate = useNavigate();
  //메모리 누수 막는법
  useEffect(() => {
    return () => {
      //언마운트 시
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  });

  const throttle = (delay) => {
    if (timerId) {
      return;
    }
    console.log(`API요청 실행 ${delay}ms 동안 추가요청은 안받습니다.`);
    timerId = setTimeout(() => {
      console.log(`${delay}ms 지남 추가요청 받습니다!`);
    }, delay);
  };

  //반복적인 이벤트 이후, delay가 지나면 funtion
  const debounce = (delay) => {
    if (timerId) {
      //할당되어 있는 timerId에 해당하는 타이머 제거
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      console.log("마지막 요청으로부터 $(delay)ms 지났으므로 API 요청 실행!");
      timerId = null;
    }, delay);
  };
  return (
    <div
      style={{
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <h1>Button 이벤트 예제</h1>
      <button onClick={() => throttle(2000)}>쓰로틀링 버튼</button>
      <button onClick={() => debounce(2000)}>디바운싱 버튼</button>
      <div>
        <button
          onClick={() => {
            navigate("company");
          }}
        >
          페이지 이동
        </button>
      </div>
    </div>
  );
}

export default Home;
