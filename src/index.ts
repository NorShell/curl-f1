import { Hono } from 'hono'
import { ConstructorStanding_Response } from './types/eragst/constructorStandingTypes'
import { format_Constructors_Standings, format_Drivers_Standings, format_response, separator } from './utils/formatter';
import { format_side_by_side } from './utils/sideBySide';
import { foot_note } from './utils/footNote';

const app = new Hono<{ Bindings: CloudflareBindings }>()


app.get("/", async (c) => {

  let constructors_data: ConstructorStanding_Response | null = null
  let drivers_data: DriverStandings_Response | null = null

  try {
    // constructors api call
    const constructors_Api_Response = await fetch("https://api.jolpi.ca/ergast/f1/2024/constructorstandings/")
    constructors_data = await constructors_Api_Response.json() as ConstructorStanding_Response

    // drivers api call
    const drivers_Api_Response = await fetch("https://api.jolpi.ca/ergast/f1/2024/driverstandings/")
    drivers_data = await drivers_Api_Response.json() as DriverStandings_Response

  } catch (error) {
    console.error(error)
  }

  if (!constructors_data || !drivers_data) return

  // extract only the drivers/constructors array from the response
  const constructors_Standings_Array = constructors_data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
  const drivers_Standings_Array = drivers_data.MRData.StandingsTable.StandingsLists[0].DriverStandings

  // format the drivers/constructors so they look pretty
  const formatted_Constructors_Standings = format_Constructors_Standings(constructors_Standings_Array)
  const formatted_Drivers_Standings = format_Drivers_Standings(drivers_Standings_Array)

  const response = format_side_by_side(formatted_Drivers_Standings, formatted_Constructors_Standings)

  return c.text("\n You are currently seeing the standings for the 2024 season because the 2025 season has not started yet! \n\n" + response + foot_note)
})


export default app
