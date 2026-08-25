import React from 'react'
import NavbarLink from './NavbarLink'
import { LayoutGrid, Code, Handshake, NotebookPen } from 'lucide-react'

const InterviewNav = () => {
  const navData = [
    {
      name: "Home",
      link: ".",
      icon: LayoutGrid,
      end: true
    },
    {
      name: "Technical Question",
      link: "technical questions",
      icon: Code
    },
    {
      name: "Behavioral Question",
      link: "behavioral questions",
      icon: Handshake
    },
    {
      name: "Preparation Plan",
      link: "preparation plan",
      icon: NotebookPen
    }
  ]

  return (
    <div className='w-full lg:h-full text-white flex-center lg:flex-col lg:gap-1 gap-[8vw]'>
      {navData.map((data, idx) => {
        return <NavbarLink key={idx} name={data.name} link={data.link} end={data.end} icon={data.icon} />
      })}
    </div>
  )
}

export default InterviewNav