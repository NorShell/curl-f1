import { Hono } from 'hono'
import { book } from './routes/books'

const app = new Hono<{ Bindings: CloudflareBindings }>().basePath('/api')

interface Constructor {
  name: string,
  points: string,
  position: string
}

app.get("/", async (c) => {

  const response = await fetch("https://api.jolpi.ca/ergast/f1/2024/constructorstandings/")
  const data = await response.json() as any

  const standingsArray = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings


  const constructors: Constructor[] = standingsArray
    .map((standing: any) => {
      return {
        name: standing.Constructor.name,
        points: standing.points,
        position: standing.position
      }
    })


  const separator = "------------------";
  const formattedStandings = constructors
    .map((item) => `${separator}\n${item.position}. ${item.name} \n`)
    .join('') + separator;


  return c.text(formattedStandings)
})


app.get('/drivers', async (c) => {

  const response = await fetch("https://api.jolpi.ca/ergast/f1/2024/driverstandings/")
  const data = await response.json() as DriverStandings_Response

  const standingsArray = data.MRData.StandingsTable.StandingsLists[0].DriverStandings

  const separator = "------------------";
  const formattedStandings = standingsArray
    .map((item) => `${separator}\n${item.position}. ${item.Driver.givenName} ${item.Driver.familyName} ${item.points} \n`)
    .join('') + separator;

  return c.text(formattedStandings)
})

app.route('/book', book)
export default app
