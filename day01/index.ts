import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename: string) {
    const result = readFileSync(join(__dirname, filename), 'utf-8');

    // console.log(result); // 👉️ "hello world hello world ..."

    return result;
}

const input = syncReadFile('./input.txt');

const elfSnackList = input.split('\n\n');

const elfCalorieSummations = elfSnackList.map((s) => {
    return s.split('\n').reduce((s:any, currentValue:any) => {
        return parseInt(currentValue)+parseInt(s);
    },0);
})

let max:number = 0;
let index:number = 0;

elfCalorieSummations.forEach((n, i) => {
    if (n > max) {
        max = n;
        index = i;
    }
})

console.log(`Part 1: Elf #${index+1} with ${max} Calories`);


console.log(`Part 2: Calorie Summation ${elfCalorieSummations.sort((a,b) => b-a).filter((n,i) => i < 3).reduce((a,b) => a+b,0)}`);


