import React, { useContext, useRef, useState } from 'react'
import { CloudUpload, MoveRight, CircleUserRound, FolderCheck, Loader } from 'lucide-react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import DisplayMsg from '../../display message/components/DisplayMsg'
import { MsgContext } from '../../display message/message.context'

const Home = () => {

    const msgContext = useContext(MsgContext)
    const { setStatus, setMsg } = msgContext

    const { loading, generateReport } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [resumeFile, setResumeFile] = useState(null)
    const resumeInputRef = useRef()
    const { user, handleLogout } = useAuth()

    const navigate = useNavigate()
    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]

                const data = await generateReport({ jobDescription, selfDescription, resumeFile })
                setMsg(data)
                navigate(`/interview/${data._id}`)
            
    }


    

  return (
    // pending responsive
    <main className="home-main min-h-screen w-full flex lg:items-center lg:justify-center flex-col lg:gap-5 md:gap-[3vw] gap-[5vw] relative lg:py-0 md:py-[10vw] py-[20vw]">
        <DisplayMsg/>
        
        <div className='w-full h-[3vw] absolute z-1  lg:top-0 top-[3.3vw] flex items-center justify-between 2xl:px-10 px-2'>
            <div className='flex items-center h-full gap-1 text-[#FFDADB] text-lg'>
                <CircleUserRound size={22} color="#E61E50" />
                <h3>{user.username}</h3>
            </div>
            <div 
                className='bg-[#E61E50] rounded-xl lg:px-3 lg:py-1 md:px-7 md:py-2 px-3 py-0.2 cursor-pointer text-[#FFDADB] '
                onClick={() => {
                  handleLogout()  
                }}
            >Log out</div>
        </div>

        <div>
            <h1 className='2xl:text-4xl md:text-[5vw] text-[8vw] text-[#e1034d] font-bold lg:leading-[3vw] leading-[7vw] lg:px-0 px-[5vw] text-center'>Generate Your Interview Report</h1>
        </div>

        <div className='xl:h-[80vh] min-h-[80vh] xl:w-[70vw] w-full flex lg:flex-center lg:flex-row flex-col lg:gap-[1vw] lg:px-0 px-[5vw]'>
            
            {/* Enter Job Description */}
            <div className="lg:h-full h-2/5 lg:w-1/2 w-full">
                <h1 className='uppercase lg:text-sm text-md'>Job Description</h1>
                <textarea 
                    onChange={(e) => {
                        setJobDescription(e.target.value)
                    }}
                    name="jobDescription" 
                    id="jobDescription" 
                    placeholder='Paste the full job description here... (Responsibilities, requirements, company culture, etc.)'
                    className='hover lg:h-[97%] h-[70vw] w-full bg-[#1a1f27] rounded-xl border border-[#c6c6c600]  focus:border-[#e1034d] hover:border-[#c6c6c6eb] transition-colors duration-300 ease-linear'
                ></textarea>

            </div>
            
            {/* Candidate related */}
            <div className="lg:h-full h-3/5 flex flex-col justify-between lg:w-1/2 w-full">

                {/* Upload Resume */}
                <div className="lg:h-auto h-1/3">
                    <h1 className='uppercase lg:text-sm text-md'>Candidate Data</h1>
                    <div className='w-full lg:h-[15vw] h-[35vw]'>
                        <label 
                            htmlFor="resume" 
                            className='group flex-center flex-col lg:gap-3 h-full lg:py-0 py-[2vw] bg-[#1a1f27] rounded-xl border-2 border-dashed border-[#c6c6c627]    hover:bg-[#1a1f2791] hover:border-[#c6c6c6eb] transition-all duration-300 ease-linear'
                        >
                            <div className={`${ !resumeFile ? 'bg-[#1f252f]' : 'bg-[#ff005547]' } lg:p-7 p-5 rounded-full   group-hover:bg-[#ff005547] transition-all`}>
                                {

                                    resumeFile ?
                                        <FolderCheck className='text-[#e1034d]' />
                                        :
                                        <CloudUpload className='group-hover:text-[#e1034d] transition-all' />

                                }
                            </div>
                            <div className='text-center'>
                                <h3>Click to upload or drag & drop</h3>
                                <p className='text-xs text-[#c6c6c689]'>.pdf(MAX. 3MB)</p>
                            </div>
                        </label>
                        <input
                            ref={resumeInputRef}
                            hidden 
                            type="file" 
                            name='resume' 
                            id='resume' 
                            accept='.pdf' 
                            onChange={(e) => setResumeFile(e.target.files[0] || null)}
                        />
                    </div>
                </div>
                
                {/* Enter SelfDescription  */}
                <div className="lg:h-auto h-2/3">
                    <label htmlFor="selfDescription" className='uppercase lg:text-sm text-md '>Self Description</label>
                    <textarea 
                        onChange={(e) => {
                            setSelfDescription(e.target.value)
                        }}
                        name="selfDescription" 
                        id="selfDescription" 
                        placeholder='Describe yourself in a few sentences... Key achievements, career goals, or technical strengths.'
                        className='border border-transparent bg-[#1a1f27] rounded-xl w-full lg:h-[18vw] h-[50vw] focus:border-[#e1034d] hover:border-[#c6c6c6eb] transition-colors duration-300 ease-linear'
                    ></textarea>
                </div>

                <button 
                    onClick={handleGenerateReport}
                    className='w-full lg:h-[3vw] h-[10vw] bg-[#e1034d] rounded-xl text-[#FFDADB] lg:mt-0 mt-[1vw]'
                >   
                    {
                        loading ?
                        <div className='w-full flex-center gap-3'>
                            <Loader size={36} strokeWidth={2.5} className="mini-loader" />
                            Creating Your Analysis...   
                        </div>
                        :
                        <div className='w-full flex-center gap-3 hover:gap-7 transition-all duration-250 ease-linear'>
                            Generate Interview Report
                            <MoveRight size={16} /> 
                        </div>
                        
                    }
                    
                </button>
            </div>
            

        </div>

    </main>
  )
}

export default Home