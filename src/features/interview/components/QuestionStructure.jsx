import React from 'react'
import { useInterview } from '../hooks/useInterview'

const QuestionStructure = ({ icon: Icon, title, questionKey, }) => {

    const { report } = useInterview()
    const question = report?.[questionKey] || []
    

  return (
    <div>
        <div className='uppercase flex items-center justify-between mb-[3vw]'>
            <h1 className='text-[#B9C8DE] 2xl:text-[1.05vw] lg:text-[1.5vw] md:text-[3vw] text-xs'>{title}</h1>
            <h3 className='text-[#FFB2B8] 2xl:text-[1.05vw] lg:text-[1.5vw] md:text-[3vw] text-xs'>{question?.length || 0} Questions Generated</h3>
        </div>

        <div className={`grid grid-rows-${question?.length} lg:gap-[2vw] gap-[4vw] `}>
            {
                question?.map((que, index) => {
                    return <div key={index} className='bg-int-sec-col border rounded-xl border-[#39485A] min-h-[20vw] p-[2vw] '>

                        <div className='flex lg:flex-row flex-col lg:items-center items-start lg:gap-5 mb-[2vw] font-semibold'>
                            <Icon className='text-[#FFB2B8] lg:size-[1.5vw] size-[5vw]' />
                            <h2 className='text-[#D4E4FA] 2xl:text-[1.1vw] xl:text-[1.4vw] lg:text-[1.5vw] text-[3.5vw]'>{que.question}</h2>
                        </div>

                        <div className='grid lg:grid-cols-2 xl:gap-[3vw] gap-[1vw]'>

                            <div className='bg-[#0d1c2d66] 2xl:min-h-[12vw] lg:min-h-[10vw] min-h-[30vw] border border-[#ffdadb1a] rounded-lg lg:p-[1.05vw] p-[2.5vw]'>
                                <h3 className='text-[#FFB2B8] uppercase 2xl:text-[1.3vw] xl:text-[1.5vw] lg:text-[1.8vw] text-[3.5vw] mb-[0.25vw] font-bold'>Intention</h3>
                                <p className='text-[#C3C6D2] 2xl:leading-[1.75vw] 2xl:text-[1vw] xl:text-[1.3vw] lg:text-[1.5vw] md:text-[3.3vw] text-[3vw] italic '>{que.intention}</p>
                            </div>
                            <div className='bg-[#0d1c2d66] 2xl:min-h-[12vw] lg:min-h-[10vw] min-h-[30vw] border border-[#ffdadb1a] rounded-lg lg:p-[1.05vw] p-[2.5vw]'>
                                <h3 className='text-[#FFB2B8] uppercase 2xl:text-[1.3vw] xl:text-[1.5vw] lg:text-[1.8vw] text-[3.5vw] mb-[0.25vw] font-bold'>Answer</h3>
                                <p className='text-[#C3C6D2] 2xl:leading-[1.75vw] 2xl:text-[1vw] xl:text-[1.3vw] lg:text-[1.5vw] md:text-[3.3vw] text-[3vw] italic '>{que.answer}</p>
                            </div>

                        </div>

                    </div>
                })
            }
        </div>
     </div>
  )
}

export default QuestionStructure
