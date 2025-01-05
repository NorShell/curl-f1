import { addSpaces } from "./addSpaces"

export const separator = " +" + "-".repeat(50) + "+"

interface Row {
  points: string,
  name: string,
  position: string
}

export function formatRow({ name, points, position }: Row) {
  const formattedPosition = addSpaces(position + ".", 3)
  const formatedName = addSpaces(name, 35)
  const formatedPoints = addSpaces(points, 4)

  return ` ${separator}\n  | ${formattedPosition} | ${formatedName} | ${formatedPoints} |\n`
}

