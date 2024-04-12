const arr = [1, 2, 3, 4, 5, 6];

console.log("map ------------------------------------------");

arr.map((num) => {
    console.log(num * 5)
})

console.log("ForEatch ------------------------------------------")

arr.forEach((num) => {
    console.log(num * 10);
})

console.log("Filter ------------------------------------------")

const newData = arr.filter((num) => num % 2 === 0);
console.log(newData)
console.log(newData.length);

console.log("Slice ------------------------------------------")

arr.slice(2, 5).map((num) => {
    console.log(num * 3);
});

console.log("concat-------------------------------------------");

const firstName = "Kushal";
const lastName = "Kamble";

const fullname = firstName.concat(lastName);
console.log(fullname, 34)


const a = ["Kushal", "Vishal", "SALMAN", "Shaharukh", "Shahid"];
console.log(a);

const b = a.slice(1, 2);
console.log(b,  40);

console.log("reduce-------------------------------------------");

const numbers= [1,2,3,4,5,6,7,8,9]

const addition = numbers.reduce((acc, crr) =>{
    return crr+acc;
},0);

console.log(addition, 50)


console.log("reverse-------------------------------------------");


function reveFunction(str){
   const resString = str.split('').reverse().join('');
   return resString
}
console.log(reveFunction('Mahesh Gitte'));


