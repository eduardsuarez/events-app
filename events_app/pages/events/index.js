import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EventsPage = ({ data }) => {
  return (
    <div>
      <h1>Event Page</h1>
      <div>
        {data.map((ev) => (
          <Link key={ev.id} href={`/events/${ev.id}`} passHref>
            <Image
              src={ev.image} alt={ev.title} width={300}
              height={300}
            />
            <h2>{ev.title}</h2>

          </Link>
        ))}

      </div>
    </div>
  )
}

export default EventsPage

export async function getStaticProps () {
  const { eventsCategories } = await import('../../data/data.json')
  return {
    props: {
      data: eventsCategories

    }
  }
}
