const readline = require("readline")

rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on("line", (input) => {
  if (input.toLowerCase().trim() === "exit") {
    console.log("exiting...")
    rl.close()
  }

  console.log(`You entered: ${input}`)
})
