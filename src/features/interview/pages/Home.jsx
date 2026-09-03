import React, { useEffect, useRef, useState } from 'react'
import { CloudUpload, MoveRight, CircleUserRound, FolderCheck, Loader, Trash2 } from 'lucide-react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import DisplayMsg from '../../display message/components/DisplayMsg'

const Home = () => {

    

    const { loading, generateReport, reports, getReports, deleteReport } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [resumeFile, setResumeFile] = useState(null)
    const resumeInputRef = useRef()
    const { user, handleLogout } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        getReports()
    }, [])

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]

        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        
        navigate(`/interview/${data._id}`)
            
    }


    

  return (
    <main className="home-main min-h-screen w-full overflow-x-hidden flex lg:items-center lg:justify-center flex-col lg:gap-5 md:gap-[3vw] gap-[5vw] relative md:py-[10vw] py-[20vw] 2xl:px-[2vw] px-[3vw] xl:py-[5vw] lg:py-[8vw] ">
        {/* <DisplayMsg/> */}
        
        {/* name & logout button */}
        <div className='w-full h-[3vw] absolute z-5  lg:top-0 top-[3.3vw] flex items-center justify-between 2xl:px-10 lg:pr-0 pr-[5vw]'>
            
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
        
        {/* Title */}
        <div>
            <h1 className='2xl:text-4xl xl:text-[2.5vw] lg:text-[2.8vw] md:text-[5vw] text-[8vw] text-[#e1034d] font-bold lg:leading-[3vw] leading-[7vw] lg:px-0 px-[5vw] text-center'>Generate Your Interview Report</h1>
        </div>

        {/* Field to fill data  */}
        <div className='xl:h-[80vh] min-h-[80vh] xl:w-[70vw] w-full flex lg:flex-center lg:flex-row flex-col lg:gap-[1vw] lg:px-0'>
            
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
        
        {/* Recent reports section  */}
        {
            reports?.length > 0 && (
                <section className='w-full 2xl:mt-[2vw] xl:mt-[1.7vw] lg:mt-[1.8vw] mt-[5vw]'>
                    
                    <h2 className='text-[#e1034d] font-extrabold text-center xl:text-[2vw] text-[6vw] 2xl:mb-[2vw] xl:mb-[1.7vw] lg:mb-[2vw] mb-[8vw] '>My Recent Interview Plans</h2>
                    
                    {/* All reports list */}
                    <div className='w-full grid lg:grid-cols-3 lg:gap-[0.5vw] gap-[2.5vw]'>
                        
                        {reports.map(report => (
                            
                            // All Reports mapping
                            <div
                                key={report._id}
                                className='bg-[#1a1f27] rounded-2xl cursor-pointer flex lg:justify-between 2xl:h-[5vw] xl:h-[7vw] h-[30vw] 2xl:p-[0.8vw] xl:p-[1vw] p-[3vw] 2xl:leading-[1.5vw] xl:leading-[1.6vw] leading-[7vw]   hover:bg-[#233143] transition-colors duration-300 ease-linear'
                                onClick={() => navigate(`/interview/${report._id}`)}
                            >

                                {/* Job Title and date when it created  */}
                                <div>
                                    <h3 className='text-[#FF506D] font-bold 2xl:text-[1.4vw] xl:text-[1.5vw] text-[6.5vw] uppercase'>{report.jobTitle || 'Untitled Position'}</h3>

                                    <p className='2xl:text-[1vw] xl:text-[1.1vw] text-[4.5vw]'>
                                        Generated on {" "}
                                        {new Date(report.createdAt).toLocaleDateString("en-GB")}
                                    </p>
                                </div>

                                {/* delete icon  */}
                                <Trash2 
                                    className='lg:size-[1.5vw] hover:text-[#e1034d] transition-colors duration-300 ease-linear'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deleteReport(report._id)
                                    }}
                                />
                            </div>

                        ))}

                    </div>

                </section>
            )
        }


    </main>
  )
}

export default Home