import { Volume2 } from "lucide-react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type TimerDisplayProps = {
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  timerRunning: boolean;
  percentage: number;
  minutes: number;
  seconds: number;
  playing: boolean;
  onHandlePlaying: () => void;
};

const TimerDisplay = (props: TimerDisplayProps) => {
  return (
    <div className="w-80 h-80">
      <div className="bg-gradient-to-br w-full h-full from-slate-700 to-fuchsia-900 rounded-full flex justify-center items-center">
        <div className="bg-slate-900 rounded-full w-11/12">
          <CircularProgressbarWithChildren
            value={props.percentage}
            text={`${props.minutes.toString().padStart(2, "0")}:${props.seconds
              .toString()
              .padStart(2, "0")}`}
            strokeWidth={4}
            styles={buildStyles({
              pathTransitionDuration: 0.95,
              textColor: "fuchsia",
              pathColor: "fuchsia",
              trailColor: "white",
              textSize: "1.3rem",
            })}
          >
            {props.playing && (
              <button
                onClick={props.onHandlePlaying}
                className="text-slate-400 mb-40 tracking-wider font-medium flex flex-row items-center gap-2 text-xl"
              >
                <Volume2 width={30} height={30} /><span>STOP</span>
              </button>
            )}
            {!props.timerRunning ? (
              <button
                className="text-slate-400 absolute mt-40 tracking-widest font-medium text-xl"
                onClick={props.startTimer}
              >
                START
              </button>
            ) : (
              <button
                className="text-slate-400 absolute mt-40 tracking-widest font-medium text-xl"
                onClick={props.stopTimer}
              >
                STOP
              </button>
            )}
          </CircularProgressbarWithChildren>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-3 gap-5 bg-slate-900 w-full">
        <button
          className="text-slate-400 p-1 tracking-widest font-medium text-xl"
          onClick={props.resetTimer}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default TimerDisplay;
