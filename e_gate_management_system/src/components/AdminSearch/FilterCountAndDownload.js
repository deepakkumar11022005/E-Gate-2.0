import React from 'react'

const FilterCountAndDownload = ({filterCount}) => {
  return (
    <>
      
     <div className="person-info-header">
                <div className=""></div>
                <div className="result">
                    <h4>Result </h4>
                </div>
                <div className="count-download">
                    <span className='total-entries'>Total Entries: {filterCount}</span>
                    <button className="download-btn">Download</button>
                </div>
            </div>
    </>
  )
}

export default FilterCountAndDownload