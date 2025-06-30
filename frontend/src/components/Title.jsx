import React from 'react'

const Title = (props) => {

    const {text1, text2} = props;

  return (
    <div className='w-full flex justify-center items-center gap-2 mt-4 mb-4 text-2xl'>
        <p>{text1}</p><p>{text2}</p>
    </div>
  )
}

export default Title