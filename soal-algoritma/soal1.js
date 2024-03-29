/**
 * 1&2
 *
 * Soal Algoritma Nomor 1 dan 2
 */
const sentence = "Saya sangat senang mengerjakan soal algoritma"
function longest(sentence)
{
  let arrSentence = sentence.split(' ');
  let sortByLongest = arrSentence.sort(function(a, b) {
    return b.length - a.length
  })
  let longestWord = sortByLongest[0]
  let longestWordLength = longestWord.length

  console.info(`${longestWord} : ${longestWordLength} characters`)
  return `${longestWord} : ${longestWordLength} characters`
}
longest(sentence)

/**
 * 3
 *
 * Soal Algoritma Nomor 3
 */
const input = ['xc', 'dz', 'bbb', 'dz']
const query = ['bbb', 'ac', 'dz']
function countWordPresence(input = [], query = [])
{
  let countResult = [];

  for(let i = 0; i < query.length; i++) {
    let count = 0;
    for(let j = 0; j < input.length; j++) {
      if (query[i] == input[j]) {
        count += 1;
      }
    }
    countResult.push(count)
  }

  console.info(`countWordPresence = `, countResult)
  return countResult
}
countWordPresence(input, query)

/**
 * 4
 *
 * Soal Algoritma Nomor 4
 */
const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
function substractDiagonal(input)
{
  let first = 0;
  let last = 0;
  let result = 0;

  for(let i = 0; i < input.length; i++) {
    first += Number.parseInt( input[i][i] )
    last += Number.parseInt( input[i][input.length - (i+1)] )
  }
  result = first - last;

  console.info(`substractDiagonal = `, result)
  return result;
}
substractDiagonal(matrix)
