import { Lightbulb } from 'lucide-react'
import QuestionStructure from '../components/QuestionStructure'

const BehavioralQuestions = () => {
  return (
    <div>

      <QuestionStructure icon={Lightbulb} title="Behavioral Strategy" questionKey="behavioralQuestions"/>
      <div className='w-full lg:h-[2vw] md:h-[15vw] h-[5vw]'></div>
    </div>
  )
}

export default BehavioralQuestions