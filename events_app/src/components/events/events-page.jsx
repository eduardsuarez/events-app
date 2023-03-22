import Image from 'next/image'
import React from 'react'

const SingleEvent = ({ data }) => {
  return (
    <div>
      <Image src={data.image} width={500} height={300} alt={data.title} />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <input type='email' /><button type='submit'> submit</button>
    </div>
  )
}

export default SingleEvent
