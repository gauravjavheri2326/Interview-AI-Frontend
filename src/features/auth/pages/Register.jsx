import React, { useState } from 'react'
import { Link } from 'react-router'
import "../auth.form.css"
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import { Loader, EyeOff, Eye, TriangleAlert } from 'lucide-react'


const Register = () => {

  const { loading, handleRegister } = useAuth()
  const navigate = useNavigate()
  
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleRegister({ username, email, password })
      navigate('/')
      setUsername('')
      setEmail('')
      setPassword('')

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
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id='username'
              name='username'
              placeholder='Enter username'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
          </div>

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
            <div className="flex">
              <input
                type={ showPass ? "text" : "password"}
                id='password'
                name='password'
                placeholder='Enter password'
                className='rounded-r-none'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />

              <label htmlFor="showPass" className='px-3 py-1.5 flex-center bg-white rounded-r-md text-[#E61E50]'>
                {
                  showPass ? <Eye /> : <EyeOff />
                }
              </label>
              <input
                type="checkbox"
                name="showPass"
                id="showPass"
                hidden
                onChange={() => {
                  setShowPass(!showPass)
                }}
              />
            </div>
          </div>

          <button className='button'>Register</button>
        </form>
        
        <p>Already have an account? <Link to={"/login"}>Log in</Link></p>
      </div>

      <div className={`absolute bottom-30 flex bg-[#e61e503a] text-[#E61E50] gap-[.5vw] px-8 py-1 rounded-xl ${error ?
          "block" :
          "hidden"
        }`}>
        <TriangleAlert className='scale-80' />
        <p>{error}</p>
      </div>
    </main>
  )
}

export default Register