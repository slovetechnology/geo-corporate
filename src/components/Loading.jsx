import React from 'react'
import spins from '/src/assets/images/spins.gif'

const Loading = () => {
  return (
    <div className='fixed left-0 top-0 w-full h-screen bg-blue-50/50 z-20 flex items-center justify-center'>
      <img src={spins} alt={spins} className='w-16 h-auto' />
    </div>
  )
}

export default Loading
