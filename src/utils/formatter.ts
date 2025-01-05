import { ConstructorStanding } from "../types/eragst/constructorStandingTypes"
import { addSpaces } from "./addSpaces"

export const separator = " +" + "-".repeat(50) + "+"

interface Row {
  points: string,
  name: string,
  position: string
}

export function format_Row({ name, points, position }: Row) {
  const formattedPosition = addSpaces(position + ".", 3)
  const formatedName = addSpaces(name, 35)
  const formatedPoints = addSpaces(points, 4)

  return ` ${separator}\n  | ${formattedPosition} | ${formatedName} | ${formatedPoints} |\n`
}

export function format_Constructors_Standings(input: ConstructorStanding[]) {
  const output = input
    .map((constructor) => format_Row(
      {
        name: constructor.Constructor.name,
        position: constructor.position,
        points: constructor.points
      }))
    .join('') + " " + separator;

  const output_with_header = "   " + constructors_Heading_Row + output

  return output_with_header
}

export function format_Drivers_Standings(input: DriverStanding[]) {

  const output = input
    .map((driver) => format_Row(
      {
        name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
        points: driver.points,
        position: driver.position
      }))
    .join('') + " " + separator;

  const output_with_header = drivers_Heading_Row + output

  return output_with_header
}

// formats the final response
export function format_response(drivers: string, constructors: string) {
  return "\n" + constructors + "\n\n" + drivers + "\n"
}

const drivers_Heading_Row = format_Row({
  name: "\x1b[31mDRIVER\x1b[0m",
  position: "P",
  points: "PTS"
})

const constructors_Heading_Row = format_Row({
  name: "\x1b[31mCONSTRUCTOR\x1b[0m",
  position: "P",
  points: "PTS"
})

