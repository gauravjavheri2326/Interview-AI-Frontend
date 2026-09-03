import { useContext, useEffect } from "react"
import { MsgContext } from "../message.context"
import { TriangleAlert, CircleCheck } from 'lucide-react'
import { useAuth } from "../../auth/hooks/useAuth"


const DisplayMsg = () => {
    const msgContext = useContext(MsgContext)
    const { msg, setMsg, status, setStatus } = msgContext
    const { loading } = useAuth()
    useEffect(() => {
        if (msg && !loading) {
            const timer = setTimeout(() => {
                setMsg("")
                setStatus("")
            }, 3000)
            return () => clearTimeout(timer)
        }
        
    }, [msg, loading])

    

  return (
    <div className="fixed pointer-events-none z-9999 h-screen w-full bg-transparent flex justify-center ">
        <div className={`absolute mx-[3vw] bottom-[25%] flex gap-[.5vw] px-[5vw] py-[4vw] lg:px-[2vw] lg:py-[1vw] rounded-xl ${
          msg ? 
          "block":
          "hidden"
        }
        ${
            status ? 
            "bg-[#FF8793] text-[#E61E50]":
            "bg-[#B9C8DE] text-[#69788C]"
        }
        `}>
              {status ? <TriangleAlert className='scale-80' /> : <CircleCheck className='scale-80' />}
          <p>{msg}</p>
        </div>
    </div>
  )
}

export default DisplayMsg