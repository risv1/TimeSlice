import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type Session = {
    startTime: string;
    duration: number;
    status: string;
}

type SessionContextType = {
    sessions: Session[];
    setSessions: (sessions: Session[]) => void;
    addSession: (session: Session) => void;
    clearSessions: () => void;
}

const SessionContext = createContext<SessionContextType>({
    sessions: [],
    setSessions:  () => {},
    addSession: () => {},
    clearSessions: () => {},
});

export const SessionProvider = (props: {children: ReactNode}) => {
    const [sessions, setSessions] = useState<Session[]>([]);

    const addSession = (session: Session) => {
        setSessions([...sessions, session]);
    };

    const clearSessions = () => {
        setSessions([]);
    };

    return (
        <SessionContext.Provider value={{sessions, setSessions, addSession, clearSessions}}>
            {props.children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if(!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
}
