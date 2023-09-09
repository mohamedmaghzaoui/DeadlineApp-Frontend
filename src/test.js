let reverse = (x) => {
  x = String(x);
  let reversed = "";
  for (numbers of x) {
    reversed = numbers + reversed;
  }
  if (reversed.includes("-")) {
    reversed = reversed.slice(0, -1); // Remove the last character
    reversed = "-" + reversed;
  }
  console.log(reversed);
};
reverse(-45);
