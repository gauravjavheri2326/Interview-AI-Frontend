import { createBrowserRouter } from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Protected from "./features/auth/components/Protected"
import Home from "./features/interview/pages/Home"
import Interview from "./features/interview/pages/Interview"

import { InterviewHome, TechnicalQuestions, BehavioralQuestions, PreparationPlan } from "./features/interview/pages/allpath.routes"

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/",
        element:<Protected><Home/></Protected>
    },
    {
        path: "/interview/:interviewId",
        element:(
            <Protected><Interview/></Protected> 
        ),
        children: [
            {
                index: true,
                element: <InterviewHome/>
            },
            {
                path:"technical questions",
                element: <TechnicalQuestions/>
            },
            {
                path: "behavioral questions",
                element: <BehavioralQuestions/>
            },
            {
                path: "preparation plan",
                element: <PreparationPlan/>
            }
        ]
    }
])