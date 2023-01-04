const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function reverseSentence(sentence) {
  const splitWholeSentece = sentence.split(" ");

  let result = splitWholeSentece.reverse().map((word) => {
    return word.split("").reverse().join("");
  });

  console.log(result.join(" "));
  console.log("\n");
}
function recursirve_call() {
  rl.question("", function (message) {
    reverseSentence(message);
    recursirve_call();
  });
}

recursirve_call();
