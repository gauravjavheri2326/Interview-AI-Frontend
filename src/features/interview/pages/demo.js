import React, { useRef, useState } from 'react'
import { CloudUpload, MoveRight, CircleUserRound, FolderCheck, Loader } from 'lucide-react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

const Home = () => {

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

                navigate(`/interview/${data._id}`)
            
    }

    

  return (
    <main className="home-main min-h-screen w-full lg:flex-center flex items-center lg:pt-0 pt-[20vw] flex-col gap-5 relative">

        <div className='w-full h-[3vw] absolute lg:top-0 top-[3.3vw] flex items-center justify-between 2xl:px-10 px-2'>
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

        <div className='leading-auto'>
            <h1 className='2xl:text-4xl text-[8vw] text-[#e1034d]  font-bold'>Generate Your Interview Report</h1>
        </div>

        <div className='xl:h-[80vh] xl:w-[70vw] flex-center gap-[1vw]'>

            <div className="h-full w-1/2">
                <h1 className='uppercase text-sm'>Job Description</h1>
                <textarea 
                    onChange={(e) => {
                        setJobDescription(e.target.value)
                    }}
                    name="jobDescription" 
                    id="jobDescription" 
                    placeholder='Paste the full job description here... (Responsibilities, requirements, company culture, etc.)'
                    className='hover h-[97%] w-full bg-[#1a1f27] rounded-xl border border-[#c6c6c600]  focus:border-[#e1034d] hover:border-[#c6c6c6eb] transition-colors duration-300 ease-linear'
                ></textarea>

            </div>

            <div className="h-full flex flex-col justify-between w-1/2">
                <div className="">
                    <h1 className='uppercase text-sm'>Candidate Data</h1>
                    <div className='w-full h-[15vw]'>
                        <label 
                            htmlFor="resume" 
                            className='group flex-center flex-col gap-3 h-full bg-[#1a1f27] rounded-xl border-2 border-dashed border-[#c6c6c627]    hover:bg-[#1a1f2791] hover:border-[#c6c6c6eb] transition-all duration-300 ease-linear'
                        >
                            <div className='bg-[#1f252f] p-7 rounded-full   group-hover:bg-[#ff005547] transition-all'>
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
                         
                <div className="">
                    <label htmlFor="selfDescription" className='uppercase text-sm '>Self Description</label>
                    <textarea 
                        onChange={(e) => {
                            setSelfDescription(e.target.value)
                        }}
                        name="selfDescription" 
                        id="selfDescription" 
                        placeholder='Describe yourself in a few sentences... Key achievements, career goals, or technical strengths.'
                        className='border border-transparent bg-[#1a1f27] rounded-xl w-full h-[18vw]    focus:border-[#e1034d] hover:border-[#c6c6c6eb] transition-colors duration-300 ease-linear'
                    ></textarea>
                </div>
                <button 
                    onClick={handleGenerateReport}
                    className='w-full h-[3vw] bg-[#e1034d] rounded-xl text-[#FFDADB]'
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