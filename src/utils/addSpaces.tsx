
export function addSpaces(input: string, totalLength: number) {

  const inputLength = input.length

  let output: string = ""

  if (totalLength >= inputLength) {
    output += input + " ".repeat(totalLength - inputLength)
  }

  return output

}

