import React, { useCallback, useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval';
import { secondsToTime } from '../utils/seconds-to-time';
import { Button } from './button';
import { Timer } from './timer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTimer: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoro, setNumberOfPomodoro] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  // const configureWork = () => {
  //   setMainTime(props.pomodoroTime);
  //   setTimeCounting(true);
  //   setWorking(true);
  //   setResting(false);
  //   audioStartWorking.play();
  // };

  const configureWork = useCallback(() => {
    setMainTime(props.pomodoroTime);
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    audioStartWorking.play();
  }, [setMainTime, props.pomodoroTime, setTimeCounting, setWorking]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);

      if (long) {
        setMainTime(props.longRestTimer);
      } else {
        setMainTime(props.shortRestTime);
      }
      // long ? setMainTime(props.longRestTimer) : setMainTime(props.shortRestTime);

      audioStopWorking.play();
    },
    [
      setTimeCounting,
      setWorking,
      setResting,
      setMainTime,
      props.longRestTimer,
      props.shortRestTime,
    ],
  );

  // const configureRest = (long: boolean) => {
  //   setTimeCounting(true);
  //   setWorking(false);
  //   setResting(true);

  //   if (long) {
  //     setMainTime(props.longRestTimer);
  //   } else {
  //     setMainTime(props.shortRestTime);
  //   }
  //   // long ? setMainTime(props.longRestTimer) : setMainTime(props.shortRestTime);

  //   audioStopWorking.play();
  // };

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (!working) document.body.classList.remove('working');

    if (mainTime > 0) return;
    if (working) {
      if (cyclesQtdManager.length <= 0) {
        configureRest(true);
        setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      }
      if (cyclesQtdManager.length > 0) {
        configureRest(false);
        cyclesQtdManager.pop();
      }
    }
    if (resting) {
      configureWork();
      setNumberOfPomodoro(numberOfPomodoro + 1);
      if (cyclesQtdManager.length === props.cycles - 1)
        setCompletedCycles(completedCycles + 1);
    }
  }, [
    props.cycles,
    props.pomodoroTime,
    working,
    resting,
    mainTime,
    configureWork,
    configureRest,
    cyclesQtdManager,
    setCyclesQtdManager,
    fullWorkingTime,
    setFullWorkingTime,
    numberOfPomodoro,
    setNumberOfPomodoro,
    completedCycles,
    setCompletedCycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>Você está: {working ? 'Trabalhando' : 'Descansando'}</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button
          text="Work"
          onClick={() => {
            configureWork();
          }}
        />
        <Button
          text="Rest"
          onClick={() => {
            configureRest(false);
          }}
        />
        <Button
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => {
            setTimeCounting(!timeCounting);
          }}
          className={!working && !resting ? 'hidden' : ''}
        />
      </div>
      <div className="details">
        <p>Ciclos concluidos: {completedCycles}</p>
        <p>Pomodoros concluidos: {numberOfPomodoro}</p>
        <p>Tempo total trabalho: {secondsToTime(fullWorkingTime)}</p>
      </div>
    </div>
  );
}
