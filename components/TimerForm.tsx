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
    timerRunning: boolean
};


const TimerForm: FC<TimerFormProps> = (props: TimerFormProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numericValue = parseInt(value, 10);
    if (isNaN(numericValue) || numericValue < 1) {
        numericValue = 1;
    }
    props.onHandleChange({
        ...e,
        target: {
            ...e.target,
            name,
            value: numericValue.toString(),
        },
    });
};

    return (
        <>
            <div className="text-fuchsia-500 mb-4 font-normal text-xl tracking-widest pt-2">
                  TIME (MINUTES)
                </div>
                <div className="flex flex-row pt-2 w-full h-60 justify-center items-center">
                  <form onSubmit={props.onHandleSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-row items-center mb-4">
                      <label htmlFor="timer" className="text-lg mr-2">
                        Timer:
                      </label>
                      <input
                        type="number"
                        id="timer"
                        name="timer"
                        min={1}
                        className="border ml-12 rounded px-2 py-1 bg-gray-300 text-black"
                        ref={props.thisTimeRef}
                        onChange={handleChange}
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
                        min={1}
                        className="border rounded px-2 py-1 bg-gray-300 text-black"
                        ref={props.thisSbreakRef}
                        onChange={handleChange}
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
                        min={1}
                        className="border ml-1 rounded px-2 py-1 bg-gray-300 text-black"
                        ref={props.thisLbreakRef}
                        onChange={handleChange}
                        value={props.thisTempTimes.lbreak}
                      />
                    </div>
                    <Close>
                      <button
                        type="submit"
                        disabled={props.timerRunning}
                        className="bg-fuchsia-500 disabled:bg-gray-500 w-full hover:bg-fuchsia-600 duration-150 ease-in-out text-white font-semibold py-2 px-4 rounded"
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