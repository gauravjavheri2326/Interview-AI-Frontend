import { CodeXml } from 'lucide-react'
import QuestionStructure from '../components/QuestionStructure'

const TechnicalQuestions = () => {

  

  return (
    <div>

      <QuestionStructure icon={CodeXml} title="Technical Assessment" questionKey="technicalQuestions"/>
      <div className='w-full lg:h-[3vw] md:h-[15vw] h-[5vw]'></div>
    </div>
  )
}

export default TechnicalQuestions