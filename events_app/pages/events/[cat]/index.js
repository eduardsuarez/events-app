import Image from 'next/image'
import Link from 'next/link'

const EventsCatPage = ({ data, pageName }) => {
  return (
    <div>
      <h1>Events in {pageName} </h1>
      <div>
        {data.map((ev) => (
          <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref>

            <Image width={300} height={300} alt={ev.title} src={ev.image} />
            <h2>{ev.title} </h2>
            <p>{ev.description} </p>

          </Link>
        ))}

      </div>
    </div>
  )
}

export default EventsCatPage

export async function getStaticPaths () {
  const { eventsCategories } = await import('../../../data/data.json')
  const allPaths = eventsCategories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString()

      }
    }
  })
  console.log(allPaths)
  return {
    paths: allPaths,
    fallback: false
  }
}

export async function getStaticProps (context) {
  const id = context?.params.cat
  const { allEvents } = await import('../../../data/data.json')
  const data = allEvents.filter((ev) => ev.city === id)
  return { props: { data, pageName: id } }
}
