import React from 'react'

const FilterCountAndDownload = ({dataCount}) => {
  return (
    <>
     {/* Row 1: Count and Download Button */}
     <div className="person-info-header">
                <div className=""></div>
                <div className="result">
                    <h4>Result </h4>
                </div>
                <div className="count-download">
                    <span className='total-entries'>Total Entries: {dataCount}</span>
                    <button className="download-btn">Download</button>
                </div>
            </div>
    </>
  )
}

export default FilterCountAndDownload