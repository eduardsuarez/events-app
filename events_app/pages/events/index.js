import AllEvents from './events-page'

const EventsPage = ({ data }) => {
  return <AllEvents data={data} />
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
