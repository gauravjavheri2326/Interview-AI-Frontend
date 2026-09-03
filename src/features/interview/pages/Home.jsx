import React, { useContext, useEffect, useRef, useState } from 'react'
import { CloudUpload, MoveRight, CircleUserRound, FolderCheck, Loader, Trash2 } from 'lucide-react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import { MsgContext } from '../../display message/message.context'

const Home = () => {

    

    const { loading, generateReport, reports, getReports, deleteReport } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [resumeFile, setResumeFile] = useState(null)
    const resumeInputRef = useRef()
    const { user, handleLogout } = useAuth()

    const msgContext = useContext(MsgContext)
    const { setStatus, setMsg } = msgContext

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
    <main className="home-main min-h-screen w-full overflow-x-hidden flex lg:items-center lg:justify-center flex-col xl:gap-5 lg:gap-[3vw] md:gap-[3vw] gap-[5vw] relative md:py-[10vw] py-[20vw] 2xl:px-[2vw] px-[3vw] xl:py-[5vw] lg:py-[8vw] ">
        
        
        {/* name & logout button */}
        <div className='w-full h-[4vw] absolute z-5  lg:top-0 top-[3.3vw] flex items-center justify-between 2xl:px-10 lg:px-[4vw]  pr-[5vw]'>
            
            <div className='flex items-center h-full gap-1 text-[#FFDADB] text-lg'>
                <CircleUserRound size={22} color="#E61E50" />
                <h3>{user.username}</h3>
            </div>

            <div 
                className='bg-[#E61E50] rounded-xl lg:px-3 lg:py-[0.4vw] md:px-7 md:py-2 px-3 py-0.2 cursor-pointer text-[#FFDADB]'
                onClick={() => {
                  handleLogout()  
                }}
            >Log out</div>
        </div>
        
        {/* Title */}
        <div>
            <h1 className='2xl:text-4xl xl:text-[2.5vw] lg:text-[3vw] md:text-[5vw] text-[8vw] text-[#e1034d] font-bold lg:leading-[3vw] leading-[7vw] lg:px-0 px-[5vw] text-center'>Generate Your Interview Report</h1>
        </div>

        {/* Field to fill data  */}
        
        <div className="lg:h-[80vh] min-h-[80vh] xl:w-[70vw] w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-[1vw]">

            {/* Job Description */}
            <div className="md:h-full flex flex-col h-[90vw]">

                <h1 className="uppercase 2xl:text-[0.9vw] xl:text-[1.2vw] lg:text-[1.5vw] text-md mb-2">
                    Job Description
                </h1>

                <textarea
                    onChange={(e) => {
                        setJobDescription(e.target.value)
                    }}
                    name="jobDescription"
                    id="jobDescription"
                    placeholder="Paste the full job description here... (Responsibilities, requirements, company culture, etc.)"
                    className="flex-1 min-h-0 w-full bg-[#1a1f27] rounded-xl border border-[#c6c6c600] focus:border-[#e1034d] hover:border-[#c6c6c6eb] transition-colors duration-300 ease-linear p-3 resize-none"
                />

            </div>


            {/* Candidate Data */}
            <div className="h-full grid lg:grid-rows-[auto_1fr_auto] md:grid-rows-[auto_1fr_auto] grid-rows-[auto_auto_auto] gap-[1vw]">

                {/* Resume Upload */}
                <div>

                    <h1 className="uppercase 2xl:text-[0.9vw] xl:text-[1.2vw] lg:text-[1.5vw] text-md mb-2">
                        Candidate Data
                    </h1>

                    <div className="w-full 2xl:h-[15vw] lg:h-[13vw] md:h-[20vw] h-[35vw]">

                        <label
                            htmlFor="resume"
                            className="group flex-center flex-col xl:gap-3 lg:gap-1 h-full lg:py-0 py-[2vw] bg-[#1a1f27] rounded-xl border-2 border-dashed border-[#c6c6c627] hover:bg-[#1a1f2791] hover:border-[#c6c6c6eb] transition-all duration-300 ease-linear"
                        >

                            <div
                                className={`${!resumeFile ? "bg-[#1f252f]" : "bg-[#ff005547]"} xl:p-7 lg:p-6 p-5 rounded-full group-hover:bg-[#ff005547] transition-all`}
                            >

                                {resumeFile ? (
                                    <FolderCheck className="text-[#e1034d]" />
                                ) : (
                                    <CloudUpload className="group-hover:text-[#e1034d] transition-all" />
                                )}

                            </div>

                            <div className="text-center">

                                <h3>
                                    Click to upload or drag & drop
                                </h3>

                                <p className="text-xs text-[#c6c6c689]">
                                    .pdf(MAX. 3MB)
                                </p>

                            </div>

                        </label>

                        <input
                            ref={resumeInputRef}
                            hidden
                            type="file"
                            name="resume"
                            id="resume"
                            accept=".pdf"
                            onChange={(e) =>
                                setResumeFile(e.target.files[0] || null)
                            }
                        />

                    </div>

                </div>


                {/* Self Description */}
                <div className="min-h-0 flex flex-col md:h-auto h-[70vw]">

                    <label
                        htmlFor="selfDescription"
                        className="uppercase 2xl:text-[0.9vw] xl:text-[1.2vw] lg:text-[1.5vw] text-md mb-2"
                    >
                        Self Description
                    </label>

                    <textarea
                        onChange={(e) => {
                            setSelfDescription(e.target.value)
                        }}
                        name="selfDescription"
                        id="selfDescription"
                        placeholder="Describe yourself in a few sentences... Key achievements, career goals, or technical strengths."
                        className="flex-1 min-h-0 border border-transparent bg-[#1a1f27] rounded-xl w-full focus:border-[#e1034d] hover:border-[#c6c6c6eb] transition-colors duration-300 ease-linear p-3 resize-none"
                    />

                </div>


                {/* Generate Button */}
                <button
                    onClick={handleGenerateReport}
                    className="w-full lg:h-[3vw] md:h-[8vw] h-[10vw] bg-[#e1034d] rounded-xl text-[#FFDADB] lg:mt-0 mt-[1vw]"
                >

                    {loading ? (
                        <div className="w-full flex-center gap-3">

                            <Loader
                                size={36}
                                strokeWidth={2.5}
                                className="mini-loader"
                            />

                            Creating Your Analysis...

                        </div>
                    ) : (
                        <div className="w-full flex-center gap-3 hover:gap-7 transition-all duration-250 ease-linear">

                            Generate Interview Report

                            <MoveRight size={16} />

                        </div>
                    )}

                </button>

            </div>

        </div>


        
        {/* Recent reports section  */}
        {
            reports?.length > 0 && (
                <section className='w-full 2xl:mt-[2vw] xl:mt-[1.7vw] lg:mt-[1.8vw] mt-[5vw]'>
                    
                    <h2 className='text-[#e1034d] font-extrabold text-center xl:text-[2.5vw] lg:text-[3vw] md:text-[5vw] text-[6vw] 2xl:mb-[2vw] xl:mb-[1.7vw] lg:mb-[2vw] md:mb-[4vw] mb-[8vw] '>My Recent Interview Plans</h2>
                    
                    {/* All reports list */}
                    <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 lg:gap-[0.5vw] gap-[2.5vw]'>
                        
                        {reports.map(report => (
                            
                            // All Reports mapping
                            <div
                                key={report._id}
                                className='bg-[#1a1f27] rounded-2xl cursor-pointer flex justify-between 2xl:h-[5vw] xl:h-[7vw] lg:h-[7.5vw] md:h-[20vw] h-[30vw] 2xl:p-[0.8vw] xl:p-[1vw] lg:p-[1.5vw] p-[3vw] 2xl:leading-[1.5vw] xl:leading-[1.6vw] lg:leading-[1.7vw] md:leading-[4vw] leading-[7vw]   hover:bg-[#233143] transition-colors duration-300 ease-linear'
                                onClick={async () => {
                                    await navigate(`/interview/${report._id}`)
                                    if (loading) {
                                        setMsg(`${report.jobTitle} report opening`)
                                    }
                                    setMsg(`${report.jobTitle} report opened`)
                                }}
                            >

                                {/* Job Title and date when it created  */}
                                <div>
                                    <h3 className='text-[#FF506D] font-bold 2xl:text-[1.4vw] xl:text-[1.5vw] lg:text-[1.6vw] md:text-[3vw] text-[6.5vw] uppercase'>{report.jobTitle || 'Untitled Position'}</h3>

                                    <p className='2xl:text-[1vw] xl:text-[1.1vw] lg:text-[1.2vw] md:text-[2vw] text-[4.5vw]'>
                                        Generated on {" "}
                                        {new Date(report.createdAt).toLocaleDateString("en-GB")}
                                    </p>
                                </div>

                                {/* delete icon  */}
                                <Trash2 
                                    className='lg:size-[1.5vw] md:size-[5vw] size-[7vw]   hover:text-[#e1034d] transition-colors duration-300 ease-linear'
                                    onClick={async (e) => {
                                        e.stopPropagation()
                                        try {
                                            await deleteReport(report._id)
                                            setMsg("Report deleted successfully")
                                        } catch (error) {
                                            setMsg("Failed to delete report")
                                            setStatus(500)
                                        }
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