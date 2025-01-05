export function format_side_by_side(drivers: string, constructors: string) {
  const drivers_lines = drivers.trim().split("\n");
  const constructors_lines = constructors.trim().split("\n");

  const max_lines = Math.max(drivers_lines.length, constructors_lines.length)
  const space_padding = " ".repeat(5)

  const formattedLines = [];

  for (let i = 0; i < max_lines; i++) {
    const line1 = drivers_lines[i] || " ".repeat(drivers_lines[0].length); // Blank line if out of range
    const line2 = constructors_lines[i] || " ".repeat(constructors_lines[0].length); // Blank line if out of range
    if (i == 0) {
      formattedLines.push(`  ${line1}${space_padding}  ${line2}`);
    } else {
      formattedLines.push(`${line1}${space_padding}${line2}`);
    }
    // formattedLines.push(`${line1}${space_padding}${line2}`);
  }

  return formattedLines.join("\n") + "\n";

}
