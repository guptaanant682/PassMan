import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col fixed bottom-0 w-full justify-center items-center'>
      <div className="logo font-bold text-white text-2xl ">
        <span className='text-green-700'> &lt;</span>
        Pass
        <span className='text-green-700'>Manager/&gt;</span>
      </div>
      <div>  
        <div className='flex justify-center items-center'>
        Created with <img className="w-6 mx-2" src=" icons/heart.png " alt="" /> by Infinity
        </div>
      </div>
    </div>
  ) 
}
export default Footer