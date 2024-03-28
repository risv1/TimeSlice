import SetTimes from "components/SetTimes";
import TimerDisplay from "components/TimerDisplay";
import { useSession } from "layouts/SessionContext";
import { useTime } from "layouts/TimeContext";
import { useEffect, useRef, useState } from "react";
import alarm from "public/alarm.mp3"
import { toast } from "sonner"

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
  const { times } = useTime();
  const [activeTime, setActiveTime] = useState<number>(times.timer);
  const [minutes, setMinutes] = useState(activeTime);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(minutes * 60 + seconds);
  const [timerRunning, setTimerRunning] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const { sessions, setSessions, addSession } = useSession();
  const audioRef = useRef<HTMLAudioElement>(null);

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

          audioRef?.current?.play();
          setPlaying(true);

          toast("Times up!.")

          saveSession();
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [timerRunning, totalSeconds]);

  useEffect(() => {
    loadSessions();
  }, []);

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
    const remainingSeconds = totalSeconds;
    const sessionData = {
      startTime: new Date().toISOString(),
      duration: activeTime * 60 - remainingSeconds,
      status: "Incomplete"
    };

    addSession(sessionData);
    const updatedSessions = [...sessions, sessionData];
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));

    setMinutes(activeTime);
    setSeconds(0);
    setTotalSeconds(minutes * 60 + seconds);
    setTimerRunning(false);
    console.log("reset", minutes, seconds, totalSeconds);
  };

  const loadSessions = () => {
    const sessionsFromLocalStorage = localStorage.getItem("sessions");
    if (sessionsFromLocalStorage) {
      try {
        const parsedSessions = JSON.parse(sessionsFromLocalStorage);
        setSessions(parsedSessions);
      } catch (error) {
        console.error("Error parsing sessions from localStorage:", error);
      }
    }
  };

  const saveSession = () => {
    const sessionData = {
      startTime: new Date().toISOString(),
      duration: activeTime * 60, 
      status: "Complete",
    };

    const updatedSessions = [...sessions, sessionData];
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
    loadSessions();
  };

  const handleStopPlaying = () => {
    audioRef?.current?.pause();
    setPlaying(false);
  }

  return (

    <div className="bg-slate-900 w-screen h-screen flex flex-col items-center overflow-x-hidden">
      <audio ref={audioRef} src={alarm} />
      <h1 className="text-white p-10 text-6xl font-medium">
        Time<span className="text-fuchsia-500">Slice</span>
      </h1>
      <div className="w-full bg-slate-900 flex flex-col gap-10 items-center h-fit">
        <div className="w-full md:w-3/5 lg:w-2/5 xl:w-1/3 h-20 flex justify-center">
          <div className="w-full pl-3 pr-3 pt-3 pb-3 bg-slate-700 rounded-full flex justify-around">
            {links.map((link, index) => (
              <button
                disabled={timerRunning}
                key={index}
                className={`w-1/3 text-white text-2xl font-medium hover:cursor-pointer flex p-3 justify-center items-center ${
                  activeLink === link.name
                    ? "bg-fuchsia-500"
                    : ""
                } rounded-full flex justify-center`}
                onClick={() => handleSetLink(link.name)}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full h-fit flex justify-center bg-slate-900">
          <TimerDisplay
            playing={playing}
            onHandlePlaying={handleStopPlaying}
            percentage={percentage}
            resetTimer={resetTimer}
            startTimer={startTimer}
            stopTimer={stopTimer}
            timerRunning={timerRunning}
            minutes={minutes}
            seconds={seconds}
          />
        </div>
        <div className="w-full bg-slate-900 flex justify-center">
          <SetTimes />
        </div>
      </div>
    </div>
  );
};

export default Home;
