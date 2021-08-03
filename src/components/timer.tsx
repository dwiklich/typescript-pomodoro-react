import React from 'react';
import { secondsToMinutes } from '../utils/seconds-to-minutes';

type Props = {
  mainTime: number;
};

export function Timer(props: Props): JSX.Element {
  return (
    <div className="timer" color={'#000'}>
      {secondsToMinutes(props.mainTime)}
    </div>
  );
}
