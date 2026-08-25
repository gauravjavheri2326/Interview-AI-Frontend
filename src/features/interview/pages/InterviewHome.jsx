import React, { useState } from 'react'
import { useInterview } from '../hooks/useInterview'
import { TriangleAlert, SignalHigh, Info, BriefcaseBusiness, NotebookText } from 'lucide-react'

const InterviewHome = () => {

  const { report } = useInterview()
  

  

  return (
    <div className=' grid lg:grid-cols-[1fr_2fr]  lg:grid-rows-[repeat(2,17vw)] lg:h-full min-h-screen gap-5 '>

      {/* matchscore */}
      <div className='bg-int-sec-col lg:row-span-2 flex-center lg:flex-col lg:gap-5 gap-[5vw] border border-[#39485A] rounded-xl lg:py-auto py-[2vw]'>
        
        <div className='flex flex-col justify-center items-center rounded-full 2xl:border-[1.1vw] lg:border-12 md:border-20 border-12 border-[#E61E50] text-[#FFB2B8] lg:size-[15vw] size-[30vw]  uppercase lg:leading-[3vw] md:leading-[5vw] leading-[6vw] lg:pt-[2vw] pt-[3vw]'>
          <p className='lg:text-[4.5vw] md:text-[9vw] text-[10vw] font-bold'>{report?.matchScore}%</p>
          <h1 className='lg:text-[1.3vw] text-[2.5vw]'>Match Score</h1>
        </div>

        <div className='lg:w-[16vw] w-[40vw] flex-center flex-col 2xl:leading-[1.6vw] lg:leading-[1.9vw] leading-[5.5vw] xl:text-[1.5vw] lg:text-[1.7vw] text-[4vw]'>
          <h3 className='text-[#C3C6D2] text-center'>Expectional alignment for</h3>
          <h2 className='text-[#FFB2B8] font-semibold text-center'>{report?.jobTitle}</h2>
        </div>

      </div>

      {/* about job and candidate */}
      <div className='bg-int-sec-col lg:row-span-2 w-full border border-[#39485A] rounded-xl flex lg:flex-row flex-row xl:p-[2.5vw] lg:p-[1.4vw] md:p-[2.5vw] p-[4vw] xl:gap-[1vw] lg:gap-[0.2vw] md:gap-[1vw] gap-[0.8vw]'>

        <div className='h-full w-1/2 2xl:p-[2.5vw] xl:p-[1.5vw] lg:p-[0.5vw]'>

          <div className='flex items-center gap-[1vw] text-[#FFB2B8] mb-5'>
            <BriefcaseBusiness strokeWidth={2.5} className='2xl:size-[2vw] xl:size-[1.8vw] lg:size-[2vw] size-[5vw]'/>
            <h3 className='uppercase font-bold 2xl:text-[1.5vw] xl:text-[1.7vw] lg:text-[1.8vw] text-[4vw] whitespace-nowrap'>Job Context</h3>
          </div>
          <p className='text-[#C3C6D2] 2xl:text-[1.1vw] xl:text-[1.3vw] lg:text-[1.5vw] md:text-[3.3vw] text-[3.5vw]'>{report?.describeJob}</p>

        </div>

        <div className='h-full w-1/2 2xl:p-[2.5vw] xl:p-[1.5vw] lg:p-[0.5vw]'>

          <div className='flex items-center gap-[1vw] text-[#FFB2B8] mb-5'>
            <NotebookText strokeWidth={2.5} className='2xl:size-[2vw] xl:size-[1.8vw] lg:size-[2vw] size-[5vw]'/>
            <h3 className='uppercase font-bold 2xl:text-[1.5vw] xl:text-[1.7vw] lg:text-[1.8vw] text-[4vw] whitespace-nowrap'>About Candidate</h3>
          </div>
          <p className='text-[#C3C6D2] 2xl:text-[1.1vw] xl:text-[1.3vw] lg:text-[1.5vw] md:text-[3.3vw] text-[3.5vw]'>{report?.describeCandidate}</p>

        </div>

      </div>

      {/* skill gap */}
      <div className='bg-int-sec-col xl:col-span-2 lg:col-span-2 border border-[#39485A] rounded-xl xl:p-[2vw] p-[2.5vw]'>
        
        <h1 className='xl:text-[1.4vw] lg:text-[1.8vw] text-[4vw] text-[#FFB2B8] lg:mb-[2vw] mb-[4vw] font-bold uppercase'>Comprehensive Skill Gap Analysis</h1>

        <div className='grid xl:grid-cols-3 lg:grid-cols-2 xl:gap-5 lg:gap-y-[0.5vw] lg:gap-x-[1.7vw] md:gap-[0.8vw] gap-5'>

          {
            report?.skillGaps.map((gap, idx) => {

              let cardBg = ''
              let h = ''
              let p = ''
              let logo = ''

              if (gap.severity == "high") {
                cardBg = "#E61E5033"
                h = "#E61E50"
                p = "#be003c"
                logo = <TriangleAlert className='xl:size-[1.2vw] lg:size-[1.7vw] size-[4.5vw]' />
              }
              else if (gap.severity == "medium") {
                cardBg = "#ffb2b833"
                h = "#ffb2b8"
                p = "#FF8793"
                logo = <SignalHigh className='xl:size-[1.2vw] lg:size-[1.7vw] size-[4.5vw]' />
              }
              else {
                cardBg = "#9DACC233"
                h = "#9DACC2"
                p = "#8392A6"
                logo = <Info className='xl:size-[1.2vw] lg:size-[1.7vw] size-[4.5vw]' />
              }

              return <div key={idx} className=' xl:w-[20vw] xl:h-[10vw] lg:h-[20vw] h-[50vw]'>
                <h4 className='w-full border-b border-[#FF8793] text-[#FFDADB] xl:text-[1vw] lg:text-[1.15vw] md:text-[2.5vw] text-[3vw] uppercase lg:mb-[1.2vw] md:mb-[3vw] mb-[3.5vw] font-semibold'>{gap.severity} Severity</h4>
                <div 
                  style={{
                    backgroundColor: cardBg, 
                    color: h
                  }}
                  className= 'rounded-xl xl:h-[75%] lg:h-[70%] md:h-[75%] h-[80%] lg:py-[.5vw] lg:px-[0.9vw] py-[2vw] px-[3vw] '
                >
                  <div className='w-full flex justify-between items-center xl:mb-auto lg:mb-[0.8vw] md:mb-[2vw] mb-[3vw]'>
                    <h4 className='font-bold xl:text-[1.3vw] lg:text-[1.8vw] text-[4.5vw]'>{gap.skillTitle}</h4>
                    {logo}
                  </div>
                  <p 
                    style={{ color: p }}
                    className='xl:text-sm lg:text-[1.4vw] text-[3.5vw]'
                  >
                    {gap.skill}
                  </p>
                </div>  
              </div>
              
            })
          }

          

        </div>

        
      </div>

      <div className='w-full h-[5vw]'></div>
    </div>
  )
}

export default InterviewHome