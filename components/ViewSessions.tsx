import { useSession } from "layouts/SessionContext";

const ViewSession = () => {

    const { sessions } = useSession();

    return(
        <div className="w-full max-w-md bg-white rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Sessions</h2>
          <ul>
            {sessions.map((session, index) => (
              <li key={index}>
                <p>Start Time: {session.startTime}</p>
                <p>Duration: {session.duration} seconds</p>
                <p>Status: {session.status}</p>
              </li>
            ))}
          </ul>
        </div>
    )
}

export default ViewSession;