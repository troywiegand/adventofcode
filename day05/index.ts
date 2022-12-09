import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename: string) {
    const result = readFileSync(join(__dirname, filename), 'utf-8');

    // console.log(result); // 👉️ "hello world hello world ..."

    return result;
}

const input = syncReadFile('./input.txt');

const Dockyard: (string|undefined)[][] = [[],[],[],[],[],[],[],[],[],[]];

const [map,moves] = input.split('\n\n');

map.split('\n').map(x => x.split('')).forEach((row) => {
  row.forEach((col:string,i) => {
    if(i%4 === 1) {
      if(col!==' ' && !Number.parseInt(col)){
        Dockyard[Math.floor(i/4)] = [col, ...Dockyard[Math.floor(i/4)]]
      }
    }
  })
  
})

// console.log(Dockyard)

const movesArray = moves.split('\n').map(x => {
  const words = x.split(' ')
  return {
    count: Number.parseInt(words[1]),
    source: Number.parseInt(words[3])-1,
    destination: Number.parseInt(words[5])-1
  }
})
// console.log(movesArray)

const crateMover9000: (string|undefined)[][] = JSON.parse(JSON.stringify(Dockyard))

movesArray.forEach((move) => {
  const {count, source, destination} = move
  for(let i = 0; i < count; i++) {
    crateMover9000[destination].push(crateMover9000[source].pop())
  }
})

// console.log(Dockyard)

console.log(`The top of each stack is ${crateMover9000.reduce((x,y) => y[y.length-1]?x+y[y.length-1]:x,'')}`)

const crateMover9001: (string|undefined)[][] = JSON.parse(JSON.stringify(Dockyard))

movesArray.forEach((move) => {
  const {count, source, destination} = move
  const movingCrates = crateMover9001[source].slice(-count)
  crateMover9001[destination] = [...crateMover9001[destination], ...movingCrates]
  for(let i = 0; i < count; i++) {
    crateMover9001[source].pop()
  }

})

console.log(`The top of each stack is ${crateMover9001.reduce((x,y) => y[y.length-1]?x+y[y.length-1]:x,'')}`)
