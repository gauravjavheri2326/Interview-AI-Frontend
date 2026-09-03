import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import { Analytics } from "@vercel/analytics/react"
import { MsgProvider } from "./features/display message/message.context.jsx"
import DisplayMsg from "./features/display message/components/DisplayMsg.jsx"

function App() {

  return (

    <MsgProvider>
      <AuthProvider>
        <InterviewProvider>
          <Analytics />
          <DisplayMsg/>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </MsgProvider>
  )
}

export default App
