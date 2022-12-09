import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename: string) {
    const result = readFileSync(join(__dirname, filename), 'utf-8');

    // console.log(result); // 👉️ "hello world hello world ..."

    return result;
}

const priorityScore = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const input = syncReadFile('./input.txt');

const rucksacks = input.split('\n');

const rucksackPriorities = rucksacks.map((s) => {
  const firstCompartment = s.slice(0,s.length/2);
  const secondCompartment = s.slice(s.length/2);
  return firstCompartment.split('').filter(x=>secondCompartment.includes(x)).reduce((x,y):number => {
    if(x < priorityScore.indexOf(y)){
      return priorityScore.indexOf(y)
    } else {
      return x
    }
  },0)
  
})

console.log(`Your overal score would be: ${rucksackPriorities.reduce((x,y) => x+y,0)}`)

const groupBadges = rucksacks.reduce((runningBadges:number[],currentSack,currentSackSpot,array) => {
  if(currentSackSpot%3 === 0){
    const commonPriority = currentSack.split('').filter(x=>array[currentSackSpot+1].includes(x) && array[currentSackSpot+2].includes(x)).reduce((x,y):number => {
      if(x < priorityScore.indexOf(y)){
        return priorityScore.indexOf(y)
      } else {
        return x
      }
    },0)
    return [...runningBadges,commonPriority]
  } else {
    return runningBadges
  }
},[])

console.log(`Your overal group score would be: ${groupBadges.reduce((x,y) => x+y,0)}`)
