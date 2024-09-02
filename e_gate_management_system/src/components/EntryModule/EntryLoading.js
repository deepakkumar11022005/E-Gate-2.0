import React from 'react'
import "./EntryLoading.css"
const EntryLoading = () => {
  return (
    <div className="entry-loader-wrapper">
      <div className="entry-loader"></div> 
      <p className='entry-text'>Verifying ....</p>
    </div>
  )
}

export default EntryLoading