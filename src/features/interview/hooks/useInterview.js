import { useContext } from "react"
import { getAllInterviewReports, generateInterviewReport, getInterviewReportById } from "../services/interview.api.js"
import { InterviewContext } from "../interview.context.jsx"


export const useInterview = () => {
    
    const context = useContext(InterviewContext)
    
    if (!context) {
        throw new Error("useInterview must be used within an InterviewPovider")
    }
    
    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
        } catch (err) {
            throw(err)
            console.log(err.response?.data?.message)
        } finally {
            setLoading(false)
        }
        
        return response.interviewReport
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null

        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
        
        return response.interviewReport
    }

    const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }

        return response.interviewReports
    }

    return { loading, report, reports, generateReport, getReportById, getReports }

}
