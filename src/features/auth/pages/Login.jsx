import React, { useContext, useState } from 'react'
import { Link } from 'react-router'
import "../auth.form.css"
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import { Loader, EyeOff, Eye } from 'lucide-react'
import { MsgContext } from '../../display message/message.context'


const Login = () => {

  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const msgContext = useContext(MsgContext)
  const { setStatus, setMsg } = msgContext

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await handleLogin({ email, password })
      navigate('/')
      setEmail('')
      setPassword('')
      
      setMsg(data.message)
    } catch (err) {
      setMsg(err.response?.data?.message)
      setStatus(err.response?.status)
    }
    
  }

  if(loading) {
    return (<main className='loading-main'><Loader size={36} strokeWidth={2.5} className="loader" /></main>)
  }

  return (
    <main className='main-auth'>
      <div className='flex flex-col gap-5 lg:w-auto md:w-[50%] w-[80%]'>
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
            <div className="flex">
              <input
                type={showPass ? "text" : "password"}
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

          <button className='button'>Login</button>
        </form>

        <p>Don't have an account? <Link to={"/register"}>Register</Link></p>

      </div>
    </main>
  )
}

export default Login