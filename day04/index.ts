import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename: string) {
    const result = readFileSync(join(__dirname, filename), 'utf-8');

    // console.log(result); // 👉️ "hello world hello world ..."

    return result;
}

const input = syncReadFile('./input.txt');

const elfPairs = input.split('\n');

type ElfPairs = {
  firstStart: number;
  firstEnd: number;
  secondStart: number;
  secondEnd: number;
}

const typedElfPairs:ElfPairs[] = elfPairs.map((s) => {
  const [firstStart,firstEnd] = s.split(',')[0].split('-').map(x => parseInt(x))
  const [secondStart,secondEnd] = s.split(',')[1].split('-').map(x => parseInt(x))
  return {
    firstStart,
    firstEnd,
    secondStart,
    secondEnd
  }
})

const badPairs: ElfPairs[] = typedElfPairs.filter((pair) => {
  return pair.firstStart <= pair.secondStart && pair.firstEnd >= pair.secondEnd ||
  pair.secondStart <= pair.firstStart && pair.secondEnd >= pair.firstEnd
})

console.log(`Bad Pairs are: ${badPairs.length}`)

const mehPairs: ElfPairs[] = typedElfPairs.filter((pair) => {
  return pair.firstStart <= pair.secondStart && pair.secondStart <= pair.firstEnd ||
  pair.secondStart <= pair.firstStart && pair.firstStart <= pair.secondEnd
})

console.log(`Meh Pairs are: ${mehPairs.length}`)