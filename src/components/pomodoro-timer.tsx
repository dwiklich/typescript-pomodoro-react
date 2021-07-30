import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTimer: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = React.useState(false);
  const [working, setWorking] = React.useState(false);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
  };

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button
          text="Work"
          onClick={() => {
            configureWork();
            document.querySelector('body')?.classList.add('working');
          }}
        />
        <Button
          text="Pause"
          onClick={() => {
            setTimeCounting(false);
            document.querySelector('body')?.classList.remove('working');
          }}
        />
        <Button
          text="Rest"
          onClick={() => {
            console.log(1);
          }}
        />
      </div>
      <div className="details">
        <p>Teste</p>
        <p>Teste</p>
        <p>Teste</p>
        <p>Teste</p>
      </div>
    </div>
  );
}
