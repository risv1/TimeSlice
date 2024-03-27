import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const TimeContext = createContext({
    times: {
        timer: 20,
        sbreak: 3,
        lbreak: 15,
    },
    updateTimes: (newTimes: {timer: number, sbreak: number, lbreak: number}) => {},
});

export const TimeProvider = (props: {children: ReactNode}) => {
    const [times, setTimes] = useState({
        timer: 20,
        sbreak: 3,
        lbreak: 15,
    });

    const updateTimes = (newTimes: {timer: number, sbreak: number, lbreak: number}) => {
        setTimes(newTimes);
    }

    return (
        <TimeContext.Provider value={{times, updateTimes}}>
            {props.children}
        </TimeContext.Provider>
    );
}

export const useTime = () => {
    const context = useContext(TimeContext);
    if(!context) {
        throw new Error("useTime must be used within a TimeProvider");
    }
    return context;
}