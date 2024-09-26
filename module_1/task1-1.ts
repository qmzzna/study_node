// var arr = [1, 2, 3, 4, 5, , 5, 7, 8];
// // document.write('要输出的内容', arr);
// console.log(arr);
// console.log(arr.reverse());

// var string = 'test data';
// // document.write('要输出的内容', arr);
// console.log(string);
// console.log(string.split("").reverse().join(""));
import readline from "readline";

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (line) {
  console.log(line.split(' ').reverse().join(' '));
})