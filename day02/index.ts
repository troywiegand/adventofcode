import { readFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename: string) {
    const result = readFileSync(join(__dirname, filename), 'utf-8');

    // console.log(result); // 👉️ "hello world hello world ..."

    return result;
}

// A Rock
// B Paper
// C Scissors
//
// 

enum RPSOpts {
  A,
  B,
  C
}
const RPSNormal = new Map<RPSOpts, number>([
  [RPSOpts.A, 1],
  [RPSOpts.B, 2],
  [RPSOpts.C, 3],
]);

enum RPSOptsStrat {
  X,
  Y,
  Z
}
const RPSStrat = new Map<RPSOptsStrat, number>([
  [RPSOptsStrat.X, 1],
  [RPSOptsStrat.Y, 2],
  [RPSOptsStrat.Z, 3],
]);

const scoreMatch = (x: RPSOpts, y: RPSOptsStrat) => {
  const xVal = RPSNormal.get(x) || 0;
  const yVal = RPSStrat.get(y) || 0;
  if (xVal === yVal) {
    return xVal ? 3 : 0;
  } else if (xVal + yVal  === 4){
    return xVal > yVal ? 6 : 0
  } else {
    return xVal < yVal ? 6 : 0
  }
}

const scorePick = (y: RPSOptsStrat) => {
  return RPSStrat.get(y) || 0;
}

const input = syncReadFile('./input.txt');

const roundActions = input.split('\n');

const roundScores = roundActions.map((s) => {
  const picks = s.split(' ');
  const opponentPick = RPSOpts[picks[0] as keyof typeof RPSOpts];
  const myPick = RPSOptsStrat[picks[1] as keyof typeof RPSOptsStrat];
  const opponentScore = scoreMatch(opponentPick, myPick);
  const myScore = scorePick(myPick);
  // console.log(`${JSON.stringify(picks)} -> Opponent picked ${opponentPick} and I picked ${myPick} so I get ${myScore} and they get ${opponentScore}`)
  return opponentScore + myScore;
})

console.log(`Your overal score would be: ${roundScores.reduce((x,y) => x+y,0)}`)
