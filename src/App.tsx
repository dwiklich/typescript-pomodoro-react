import React from 'react';
import { PomodoroTimer } from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="App">
      <PomodoroTimer
        pomodoroTime={3}
        shortRestTime={3}
        longRestTimer={9}
        cycles={4}
      />
    </div>
  );
}

export default App;
