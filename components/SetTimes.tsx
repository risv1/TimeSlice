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

const SetTimes = () => {
  const [tempTimes, setTempTimes] = useState({
    timer: 20,
    sbreak: 3,
    lbreak: 15,
  });
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

  return (
    <div className="overflow-hidden">
      <Dialog>
        <DialogTrigger className="hover:rotate-180 duration-150 ease-in-out">
          <Settings color="#ffffff" width={70} height={70} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black font-semibold text-3xl border-b pb-3 border-gray-500">
              Settings
            </DialogTitle>
            <div>
              <div className="w-full h-full">
                <div className="text-black font-normal text-xl tracking-widest pt-2">
                  TIME (MINUTES)
                </div>
                <div className="flex flex-row pt-2">
                  <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex flex-row items-center mb-4">
                      <label htmlFor="timer" className="text-lg mr-2">
                        Timer:
                      </label>
                      <input
                        type="number"
                        id="timer"
                        name="timer"
                        className="border rounded px-2 py-1 bg-gray-300"
                        ref={timeRef}
                        onChange={handleChange}
                        value={tempTimes.timer}
                      />
                    </div>
                    <div className="flex flex-row items-center mb-4">
                      <label htmlFor="sbreak" className="text-lg mr-2">
                        Short Break:
                      </label>
                      <input
                        type="number"
                        id="sbreak"
                        name="sbreak"
                        className="border rounded px-2 py-1 bg-gray-300"
                        ref={sbreakRef}
                        onChange={handleChange}
                        value={tempTimes.sbreak}
                      />
                    </div>
                    <div className="flex flex-row items-center mb-4">
                      <label htmlFor="lbreak" className="text-lg mr-2">
                        Long Break:
                      </label>
                      <input
                        type="number"
                        id="lbreak"
                        name="lbreak"
                        className="border rounded px-2 py-1 bg-gray-300"
                        ref={lbreakRef}
                        onChange={handleChange}
                        value={tempTimes.lbreak}
                      />
                    </div>
                    <DialogPrimitive.Close>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </DialogPrimitive.Close>
                  </form>
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SetTimes;
