import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router"
import { Loader } from 'lucide-react'


const Protected = ({ children }) => {

    const { loading, user } = useAuth()

    if(loading) {
        return (<main className='loading-main'><Loader size={36} strokeWidth={2.5} className="loader" /></main>)
    }

    if(!user) {
        return <Navigate to={'/login'} />
    }

    return children
}

export default Protected