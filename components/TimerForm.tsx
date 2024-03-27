import { Close } from "@radix-ui/react-dialog";
import { FC } from "react";

type TimerFormProps = {
    thisTempTimes: {
        timer: number;
        sbreak: number;
        lbreak: number;
    };
    thisTimeRef: React.RefObject<HTMLInputElement>;
    thisSbreakRef: React.RefObject<HTMLInputElement>;
    thisLbreakRef: React.RefObject<HTMLInputElement>;
    onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onHandleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};


const TimerForm: FC<TimerFormProps> = (props: TimerFormProps) => {
    return (
        <>
            <div className="text-black font-normal text-xl tracking-widest pt-2">
                  TIME (MINUTES)
                </div>
                <div className="flex flex-row pt-2">
                  <form onSubmit={props.onHandleSubmit} className="flex flex-col">
                    <div className="flex flex-row items-center mb-4">
                      <label htmlFor="timer" className="text-lg mr-2">
                        Timer:
                      </label>
                      <input
                        type="number"
                        id="timer"
                        name="timer"
                        className="border rounded px-2 py-1 bg-gray-300"
                        ref={props.thisTimeRef}
                        onChange={props.onHandleChange}
                        value={props.thisTempTimes.timer}
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
                        ref={props.thisSbreakRef}
                        onChange={props.onHandleChange}
                        value={props.thisTempTimes.sbreak}
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
                        ref={props.thisLbreakRef}
                        onChange={props.onHandleChange}
                        value={props.thisTempTimes.lbreak}
                      />
                    </div>
                    <Close>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </Close>
                  </form>
                </div>
        </>
    )
}

export default TimerForm;