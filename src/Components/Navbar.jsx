import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
        <div className='myContainer w-3/4 flex justify-between items-center px-4 py-5 h-14'>

        <div className="logo font-bold text-2xl">
            <span className='text-green-700'> &lt;</span>
            Pass
            <span className='text-green-700'>Manager/&gt;</span>
        </div>
        <ul>
            <li className="flex gap-4 text-white ">
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="/">About</a>
                <a className='hover:font-bold' href="/">Contact</a>
                <a className='hover:font-bold' href="/">Services</a>
            </li>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar