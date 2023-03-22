
import CatEvent from '../../../src/components/events/catEvent'

const EventsCatPage = ({ data, pageName }) => <CatEvent data={data} pageName={pageName} />

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
