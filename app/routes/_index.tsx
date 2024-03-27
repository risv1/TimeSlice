import SetTimes from "components/SetTimes";
import { useTime } from "layouts/TimeContext";
import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Home = () => {
  const links = [
    {
      name: "Timer",
      tag: "timer",
    },
    {
      name: "Short Break",
      tag: "sbreak",
    },
    {
      name: "Long Break",
      tag: "lbreak",
    },
  ];

  const [activeLink, setActiveLink] = useState(links[0].name);
  const { times, updateTimes } = useTime();
  const [activeTime, setActiveTime] = useState<number>(times.timer);
  const [minutes, setMinutes] = useState(activeTime);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(minutes * 60 + seconds);
  const [timerRunning, setTimerRunning] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    console.log("Timer running status:", timerRunning);
    console.log("Total seconds:", totalSeconds);
    if (timerRunning) {
      const timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          setTotalSeconds(totalSeconds - 1);
        } else {
          clearInterval(timerInterval);
          setTimerRunning(false);
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timerRunning, totalSeconds]);

  useEffect(() => {
    const newMinutes = Math.floor(totalSeconds / 60);
    const newSeconds = totalSeconds % 60;
    setMinutes(newMinutes);
    setSeconds(newSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    const newPercentage = ((minutes * 60 + seconds) / (activeTime * 60)) * 100;
    setPercentage(newPercentage);
    console.log("New percentage:", newPercentage);
  }, [totalSeconds]);

  useEffect(() => {
    setTotalSeconds(minutes * 60 + seconds);
  }, [minutes, seconds]);

  useEffect(() => {
    console.log("Active time:", activeTime);
    setMinutes(activeTime);
    setTotalSeconds(activeTime * 60);
  }, [activeTime]);

  useEffect(() => {
    console.log("Times updated:", times);
    setActiveTime(
      activeLink === "Timer"
        ? times.timer
        : activeLink === "Short Break"
        ? times.sbreak
        : times.lbreak
    );
  }, [times]);

  const handleSetLink = (link: string) => {
    setActiveLink(link);
    if (link === "Timer") {
      setActiveTime(times.timer);
    }
    if (link === "Short Break") {
      setActiveTime(times.sbreak);
    }
    if (link === "Long Break") {
      setActiveTime(times.lbreak);
    }
    setMinutes(activeTime);
  };

  const startTimer = () => {
    console.log("Starting timer...");
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setMinutes(activeTime);
    setSeconds(0);
    setTotalSeconds(minutes * 60 + seconds);
    setTimerRunning(false);
    console.log("reset", minutes, seconds, totalSeconds);
  };

  return (
    <div className="bg-slate-900 w-screen h-screen flex flex-col items-center">
      <h1 className="text-white p-10 text-6xl font-medium">
        Time<span className="text-fuchsia-500">Slice</span>
      </h1>
      <div className="w-full bg-slate-900 flex flex-col gap-10 items-center h-full">
        <div className="w-full md:w-3/5 lg:w-2/5 xl:w-1/3 h-20 flex justify-center">
          <div className="w-full pl-3 pr-3 pt-3 pb-3 bg-slate-700 rounded-full flex justify-around">
            {links.map((link, index) => (
              <div
                key={index}
                className={`w-1/3 text-white text-2xl font-medium hover:cursor-pointer flex p-3 justify-center items-center ${
                  activeLink === link.name
                    ? "bg-slate-500 text-fuchsia-400"
                    : ""
                } rounded-full flex justify-center`}
                onClick={() => handleSetLink(link.name)}
              >
                {link.name}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-full flex justify-center bg-slate-900">
          <div className="w-80">
            <CircularProgressbar
              value={percentage}
              text={`${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`}
              styles={buildStyles({
                textColor: "fuchsia",
                pathColor: "fuchsia",
                trailColor: "white",
              })}
            />
            <div className="flex flex-row justify-center mt-3 gap-5 bg-slate-900 w-full">
              <button
                className="bg-red-500 p-3 rounded-lg text-white font-medium"
                onClick={startTimer}
              >
                Start
              </button>
              <button
                className="bg-red-500 p-3 rounded-lg text-white font-medium"
                onClick={stopTimer}
              >
                Stop
              </button>
              <button
                className="bg-red-500 p-3 rounded-lg text-white font-medium"
                onClick={resetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="mt-auto pb-5 w-full bg-slate-900 flex justify-center">
          <SetTimes />
        </div>
      </div>
    </div>
  );
};

export default Home;
