import React from 'react';
import { secondsToTime } from '../utils/seconds-to-times';

type Props = {
  mainTime: number;
};

export function Timer(props: Props): JSX.Element {
  return <div className="timer">{secondsToTime(props.mainTime)}</div>;
}
