import { Hono } from 'hono'
import { ConstructorStanding_Response } from './types/eragst/constructorStandingTypes'
import { formatRow, separator } from './utils/formatter';

const app = new Hono<{ Bindings: CloudflareBindings }>()


app.get("/", async (c) => {

  // constructors api

  const constructorsApiResponse = await fetch("https://api.jolpi.ca/ergast/f1/2024/constructorstandings/")
  const data = await constructorsApiResponse.json() as ConstructorStanding_Response

  const constructorStandingsArray = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings

  const formattedConstructorStandings = constructorStandingsArray
    .map((constructor) => formatRow(
      {
        name: constructor.Constructor.name,
        position: constructor.position,
        points: constructor.points
      }))
    .join('') + separator;

  // drivers api

  const driversApiResponse = await fetch("https://api.jolpi.ca/ergast/f1/2024/driverstandings/")
  const data1 = await driversApiResponse.json() as DriverStandings_Response

  const driversStandingsArray = data1.MRData.StandingsTable.StandingsLists[0].DriverStandings

  let formattedDriverStandings = driversStandingsArray
    .map((driver) => formatRow(
      {
        name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
        points: driver.points,
        position: driver.position
      }))
    .join('') + separator;

  const response = "\n CONSTRUCTORS \n\n" + formattedConstructorStandings + "\n\n DRIVERS \n\n" + formattedDriverStandings + "\n"

  return c.text(response)
})


export default app
