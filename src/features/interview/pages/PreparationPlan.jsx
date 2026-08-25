import { useInterview } from "../hooks/useInterview"
import { ChevronRight } from "lucide-react"



const PreparationPlan = () => {

  const { report } = useInterview()

  return (
    <div>

      <div className='uppercase flex items-center justify-between mb-[3vw]'>
        <h1 className='text-[#B9C8DE] 2xl:text-[1.05vw] lg:text-[1.5vw] md:text-[3vw] text-xs'>Executive Preparation Plan</h1>
        <h3 className='text-[#FFB2B8] 2xl:text-[1.05vw] lg:text-[1.5vw] md:text-[3vw] text-xs'>{report?.preparationPlan?.length || 0} days Roadmap</h3>
      </div>

      <div className={`grid grid-rows-${report?.preparationPlan?.length} gap-[2vw]`}>
        {
          report?.preparationPlan?.map((plan, idx) => {
            return <div key={idx} className="bg-int-sec-col border border-[#39485A] rounded-xl min-h-[15vw] p-[2vw] ">

              <div className="flex justify-between items-center xl:mb-[1.5vw] lg:mb-[2vw] mb-[2.5vw]">
                <h2 className="font-semibold text-[#D4E4FA] 2xl:text-[1.1vw] xl:text-[1.4vw] lg:text-[1.5vw] text-[3.5vw]">{plan.focus}</h2>
                <div className="bg-[rgb(255,178,184,0.2)] text-[#FFB2B8] 2xl:text-[1.1vw] xl:text-[1.4vw] lg:text-[1.5vw] text-[3.5vw] rounded-lg h-full px-[1.2vw] font-bold">Day {plan.day}</div>
              </div>

              <div className="p-[1.5vw] bg-[#0d1c2d66] border border-[#ffdadb1a] rounded-lg 2xl:min-h-[8vw] lg:min-h-[9vw] min-h-[20vw] flex flex-col gap-[0.8vw] ">
                { 
                  plan.tasks.map((task, idx) => (
                    <div key={idx} className="text-[#C3C6D2] flex items-start gap-[1.05vw]">
                      <ChevronRight className="text-[#FF8793]  2xl:size-[1.2vw] xl:size-[1.3vw] lg:size-[1.5vw] md:size-[3.3vw] size-[3vw] 2xl:mt-[0.1vw] lg:mt-[0.5vw] md:mt-[0.8vw] mt-[0.25vw]"/>
                      <p className="2xl:text-[1vw] xl:text-[1.3vw] lg:text-[1.5vw] md:text-[3.3vw] text-[3vw] ">{task}</p>
                    </div>
                  ))
                }
              </div>

            </div>
          })
        }
      </div>
      <div className='w-full h-[5vw]'></div>

    </div>
  )
}

export default PreparationPlan