import React, { useState } from 'react'
import { Link } from 'react-router'
import "../auth.form.css"
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import { Loader } from 'lucide-react'
import { TriangleAlert } from 'lucide-react'

const Login = () => {

  const { user, loading, handleLogin } = useAuth()
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await handleLogin({ email, password })
      navigate('/')
      setEmail('')
      setPassword('')
      console.log(data.message)
    } catch (err) {
      setError(err.response?.data?.message)
    }
    
    setTimeout(() => {
      setError("")
    }, 3000)
  }

  if(loading) {
    return (<main className='loading-main'><Loader size={36} strokeWidth={2.5} className="loader" /></main>)
  }

  return (
    <main className='main-auth'>
        <div className='flex flex-col gap-5'>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id='email' 
                  name='email' 
                  placeholder='Enter email address'
                  value={email} 
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id='password' 
                  name='password' 
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }} 
                />
              </div>
              
              <button className='button'>Login</button>
            </form>

            <p>Don't have an account? <Link to={"/register"}>Register</Link></p>

        </div>

        {/* used to display message */}
        <div className={`absolute bottom-30 flex bg-[#e61e503a] text-[#E61E50] gap-[.5vw] px-8 py-1 rounded-xl ${
          error ? 
          "block":
          "hidden"
        }`}>
          <TriangleAlert className='scale-80'/>
          <p>{error}</p>
        </div>
    </main>
  )
}

export default Login