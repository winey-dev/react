import './App.css';
import Controller from './Components/Controller/Controller';
import Viewer from './Components/Viewer/Viewer';

function App() {





  return (
    <div className='App'>
      <Controller />
      <Viewer />
    </div>
  );
}

export default App;
// Query의 기본 Layoute은 Tap을 이용한 이동방식
// Controller는      PeriodSelect {realtime, 1m , 5m}  QueryButton, Interval {realtime 일 경우 , 1min 일 경우 5min 일 경우 다 다름} Select Run Button 
// Viewer는 Submit 결과를 전송