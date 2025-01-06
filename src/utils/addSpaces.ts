export function addSpaces(input: string, totalLength: number) {

  let inputLength = input.length
  if (input.includes('\x1b[31m')) {
    inputLength -= 9
  }

  let output: string = ""

  if (totalLength >= inputLength) {
    output += input + " ".repeat(totalLength - inputLength)
  }

  return output

}

// name: "\x1b[31mDRIVER\x1b[0m",
