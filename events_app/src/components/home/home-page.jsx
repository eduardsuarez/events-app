import Image from 'next/image'
import Link from 'next/link'

export const HomePage = ({ data }) => {
  return (
    <div className='home_body'>

      {data.map((ev) => (
        <Link className='card' key={ev.id} href={`/events/${ev.id}`} passHref>
          <div className='image'>

            <Image width={400} height={300} alt={ev.title} src={ev.image} />
          </div>

          <div className='content'>

            <h2>{ev.title}</h2> <p>{ev.description}</p>
          </div>

        </Link>

      ))}

    </div>
  )
}
