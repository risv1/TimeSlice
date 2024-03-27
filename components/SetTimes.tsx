import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useEffect, useRef, useState } from "react";
import { useTime } from "layouts/TimeContext";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import TimerForm from "./TimerForm";
import ViewSessions from "./ViewSessions";

const SetTimes = () => {
  const [tempTimes, setTempTimes] = useState({
    timer: 20,
    sbreak: 3,
    lbreak: 15,
  });
  const [seeForm, setSeeForm] = useState(true);
  const { updateTimes } = useTime();

  const timeRef = useRef<HTMLInputElement>(null);
  const sbreakRef = useRef<HTMLInputElement>(null);
  const lbreakRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (timeRef.current) {
      timeRef.current.value = String(tempTimes.timer);
    }
    if (sbreakRef.current) {
      sbreakRef.current.value = String(tempTimes.sbreak);
    }
    if (lbreakRef.current) {
      lbreakRef.current.value = String(tempTimes.lbreak);
    }
  }, [tempTimes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("Name:", name);
    console.log("Value:", value);
    setTempTimes({
      ...tempTimes,
      [name]: parseInt(value),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting times...");
    updateTimes({
      timer: tempTimes.timer,
      sbreak: tempTimes.sbreak,
      lbreak: tempTimes.lbreak,
    });
  };

  const handleSeeForm = () => {
    setSeeForm(!seeForm);
  }

  return (
    <div className="overflow-hidden">
      <Dialog>
        <DialogTrigger className="hover:rotate-180 hover:scale-125 duration-150 p-3 ease-in-out">
          <Settings color="#ffffff" width={70} height={70} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black font-semibold text-3xl border-b pb-3 border-gray-500">
              Settings
            </DialogTitle>
            <div className="w-full flex justify-evenly p-3 flex-row">
              <button onClick={handleSeeForm} className="font-medium text-xl hover:underline underline-offset-2 duration-150 ease-in-out decoration-black" >Timer Settings</button>
              <button onClick={handleSeeForm} className="font-medium text-xl hover:underline underline-offset-2 duration-150 ease-in-out decoration-black" >Sessions</button>
            </div>
            <div>
              {seeForm ? (
                <div className="w-full h-full">
                  <TimerForm
                    onHandleChange={handleChange}
                    onHandleSubmit={handleSubmit}
                    thisLbreakRef={lbreakRef}
                    thisSbreakRef={sbreakRef}
                    thisTimeRef={timeRef}
                    thisTempTimes={tempTimes}
                  />
                </div>
              ) : (
                <div className="w-full h-full">
                  <ViewSessions />
                </div>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SetTimes;
