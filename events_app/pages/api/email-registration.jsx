import path from 'path'
import fs from 'fs'

function buildPath () {
  return path.join(process.cwd(), 'data', 'data.json')
}

function extractData (filePath) {
  const jsonData = fs.readFileSync(filePath)
  const data = JSON.parse(jsonData)
  return data
}

export default function handler (req, res) {
  const { method } = req

  const filePath = buildPath()
  const { eventsCategories, allEvents } = extractData(filePath)

  if (!allEvents) {
    return res.status(404).json({
      status: 404,
      message: 'Events data not found'
    })
  }

  if (method === 'POST') {
    const { email, eventId } = req.body

    if (!email || !eventId) {
      res.status(422).json({ message: 'Invalid email' })
    }

    const newAllEvents = allEvents.map(ev => {
      if (ev.id === eventId) {
        if (ev.emails_registered.includes(email)) {
          res.status(409).json({ message: 'THis email has already been registered' })
          return ev
        }
        return {
          ...ev, emails_registered: [...ev.emails_registered, email]
        }
      }
      return ev
    })

    fs.writeFileSync(filePath, JSON.stringify({ eventsCategories, allEvents: newAllEvents }))

    res.status(201).json({
      message: `You has been registered successfully with th email: ${email} for the event ${eventId} `
    })
  }
}
