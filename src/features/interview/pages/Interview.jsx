import React, { useEffect } from 'react'
import InterviewNav from '../components/InterviewNav'
import { Outlet, useParams } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import { useInterview } from '../hooks/useInterview'
import { Loader } from 'lucide-react'
import DisplayMsg from '../../display message/components/DisplayMsg'


const Interview = () => {

  const { handleLogout } = useAuth()
  const { report, getReportById } = useInterview()
  const { interviewId } = useParams()

  useEffect(() => {
        getReportById(interviewId)
  }, [interviewId])

  if(!report) {
    return  (<main className='loading-main'><Loader size={36} strokeWidth={2.5} className="loader" /></main>)
  }

  return (
    <main className= 'flex lg:flex-row flex-col  h-screen overflow-hidden relative'>
       {/* <DisplayMsg/> */}
      {/* navbar or Left side of page */}
      <div className='bg-int-sec-col text-[#FF8793] lg:border-r lg:border-b-0 border-b-2 lg:border-[#FF8793]  border-[#0D1C2D] lg:h-screen h-[10vw] xl:w-[20vw] lg:w-[25vw] w-full lg:px-[1.5vw] lg:py-[.5vw] px-[2vw] lg:relative absolute top-0 left-0  z-10 lg:block flex justify-between items-center '>

        <h1 className='font-bold lg:text-2xl md:text-3xl text-2xl text-center '>Interview Ai</h1>
        
        <div className='hidden lg:block lg:h-full'>
          <InterviewNav/>
        </div>

        {/* logout button for android */}
        <div
          className='bg-[#E61E50] rounded-xl md:px-7 md:py-2 px-3 py-0.5 cursor-pointer text-[#FFDADB] md:text-2xl text-sm lg:hidden'
          onClick={() => {
            handleLogout()
          }}
        >
          Log out
        </div>

      </div>
      
      {/* content side or Right side of page */}
      <div className='bg-[#0D1C2D] xl:h-full xl:w-[80vw] lg:w-[75vw] flex flex-col relative overflow-auto no-scrollbar'>

        <div className='bg-[#0D1C2D]   scroll w-full h-[3vw] sticky top-0 px-10 py-5 lg:flex hidden items-center justify-end lg:border-b border-[#FF8793]'>
          <div
            className='bg-[#E61E50]  rounded-xl px-3 py-1 cursor-pointer text-[#FFDADB] lg:block hidden'
            onClick={() => {
              handleLogout()
            }}
          >
            Log out
          </div>
        </div>

        <div className='xl:w-full xl:h-full px-[2.5vw] flex-1 my-10'>
          <div className='lg:hidden h-[10vw]'>
            {/* space on top for android */}
          </div>
          <Outlet/>
          
        </div>

        

        
      </div>

      {/* nav for android */}

        <div className='lg:hidden  absolute z-10 bottom-0 w-full bg-int-sec-col h-[12vw] flex-center py-4 border-t-2 border-[#0D1C2D]'>
          <InterviewNav/>
        </div>
    </main>
  )
}

export default Interview