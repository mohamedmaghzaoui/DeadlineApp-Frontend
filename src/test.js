let array = [1, 4, 85];
array.forEach((number) => {
  if (number == 4) {
    array.push(4, 5, 8);
  }
});
console.log(array);
