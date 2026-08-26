import { useState } from "react";
import { createContext } from "react";


export const MsgContext = createContext()

export const MsgProvider = ({ children }) => {
    const [msg, setMsg] = useState("")
    const [status, setStatus] = useState("")

    return (
        <MsgContext.Provider value={{msg, setMsg, status, setStatus}}>
            {children}
        </MsgContext.Provider>
    )
}