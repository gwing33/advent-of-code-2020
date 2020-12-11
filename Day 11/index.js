function parseData(d) {
  return d.split("\n").map((r) => r.split(""));
}
function joinData(data) {
  return data.map((d) => d.join("")).join("\n");
}

function adjacentSeats(data, row, column) {
  function findSeat(r, c, sr, sc) {
    return data[r + sr] && data[r + sr][c + sc];
  }
  return [
    findSeat(row, column, -1, -1),
    findSeat(row, column, -1, 0),
    findSeat(row, column, -1, 1),
    findSeat(row, column, 0, -1),
    findSeat(row, column, 0, 1),
    findSeat(row, column, 1, -1),
    findSeat(row, column, 1, 0),
    findSeat(row, column, 1, 1),
  ].filter((d) => !!d);
}

function adjacentSeatsFirstVisible(data, row, column) {
  function findSeat(r, c, sr, sc) {
    const tl = data[r + sr] && data[r + sr][c + sc];
    if (tl === ".") {
      return findSeat(r + sr, c + sc, sr, sc);
    }
    return tl;
  }

  return [
    findSeat(row, column, -1, -1),
    findSeat(row, column, -1, 0),
    findSeat(row, column, -1, 1),
    findSeat(row, column, 0, -1),
    findSeat(row, column, 0, 1),
    findSeat(row, column, 1, -1),
    findSeat(row, column, 1, 0),
    findSeat(row, column, 1, 1),
  ].filter((d) => !!d);
}

function adjustSeating(_data, limit = 4, firstVisible = false) {
  const data = parseData(_data);
  const _newData = data.map((r, i) => {
    return r.map((s, j) => {
      if (s === ".") {
        return s;
      }
      const adjacents = firstVisible
        ? adjacentSeatsFirstVisible(data, i, j)
        : adjacentSeats(data, i, j);
      if (s === "L") {
        return adjacents.includes("#") ? "L" : "#";
      }
      return adjacents.filter((a) => a === "#").length >= limit ? "L" : "#";
    });
  });
  const newData = joinData(_newData);
  return newData !== _data
    ? adjustSeating(newData, limit, firstVisible)
    : newData;
}

function countOccupiedSeats(data) {
  return parseData(data).reduce((acc, d) => {
    return acc + d.filter((s) => s === "#").length;
  }, 0);
}

function getPart1Answer(data) {
  const result = adjustSeating(data);
  return countOccupiedSeats(result);
}
function getPart2Answer(data) {
  const result = adjustSeating(data, 5, true);
  return countOccupiedSeats(result);
}

const fullData = `LLLLL.LLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLL.LLLLL
LLLLLLLLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLL.LLLLLL.L.LLLL.LLL.L.LLLLL
LLLLLLLLL.LLLLLL.L.LLLLLL.LLLLLLLLL.LLLL...LLLLLL.LLLLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLL.LLLLL.LLLLL
LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLL.L.LLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLL..LLLLLL.LLLLLLLLLLLLLLLLL..LLLLLL.LLLLLLL.LLLLLLL.LLLLL.LLLLLLLL.LLLL.LLLLLLLLLLL
LLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLL.LLLLLLL.LL.LLLL.LLLLLLL.LLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL
LLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLL..LLLLLLLLLLLLL.LLLL.LLLLLLLLLLL
LLLLLLLLL.LLLLLLL.L.LLLLL.LLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL
LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLL.LLLLLLLL.LLLL.LLLLL.LLLLL
L.LL...L..L.L...L...L..L...L.....L....LL..L.LLLL..LL.LL..LLL.L..LL....L..L....L...LL..LL.......L.
LLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLL..LLLL.LLLLL
LLLLLLLLL.LLLLLL.LLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLL.LLLLLLL.LLL
LLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLL.LLLLLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLLLL.LLLL
LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.L.LLLLL.L.LLL.L.LLLLL.LLLLLLLLLLLLL.LLLLLLLLLLL
LL..LLL......LLL.L...L.....L.....L.L.L..L.L.L.LLL.L.L.LLL....L...LL..L..L.L.LL......L.....LL.L...
LLLLLLLLL.LLLLLL.LLLLLLL..LLLLLLLLLLLLL.LLLLLLLLL.LLLLLLL.LLLLLLL.LLLLL.LLLLL.LL.LLLL.LLLLL.LLLLL
LLLLLLL.L.LLLLLL.LLLLLLLL.LLLLLLLLL.LLL.L.LLLLLLLLLLLLLLL.LLLLLLL.LLLLL.LL.LLLLLLLLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLL.LLLL.LLLLLLLL.LLLLLLLLLL.L..LLLLLLLLLLLLLLLL.LLLL.LLLLL.LLLLL
LLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.L.LLLLLLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLLL.LLLL.LLLLL.L.LLL
LLL.LLL.L.LL....L.....LL..L........L.LL.L...LLL.L...L.......L.L.L.L....LL...L.LLL........LL.....L
LLLLLLLLL.LL.LLLLL.LLLLLLLLLLLLLLLL.LLLLL.LLLLLLL..LLLLL..LLLLLLL.L.LLL.LLLLLLLL.LL.L.LLLLLLLLLLL
LLLLLLLLLLLLLLLLLL.LLLLLL.LLLL.LLLL.LLLLL.LLLLLLL.LLLL.LL.LLLLL.LLLLLLL..LLLLLLL.LLLLLLLLLL.LLLLL
LLLLLLLLL.LLLLLLLLLLLLLLL.LL.LLLL.LLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLL.LLL.LLLLLL.LLLLL.LLLLL
L.LLLLLLL.LLLLLL.LL.LLLLL.LLLL.LLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLL.LLLLL
LLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLL.LLLLLLL.LLLLL.LLL...L.LLLLL.LLLLL.LLLLL
LLLLLLLLL.LLLLLLLLLLLLL.L.LLL.LLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLLL.LLLL.LLLLL.LLLLL
LLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLLL.LL.LLLLLLLLLLL.LLLL.LLLLL.LLLLL
LLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLL.L.LLLLLLLL..LLLLLLL.LLL.L.L.LLLLL.LL.LLLLL.LLLLLLLL.L.LLLLL
LLLLL.LLL.LLLLLLLL.LLLLLL.LLLLLLLLL.LLL.L.LLLLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLLLLLLLLL
.L..LL...L....L..LL..LLLL......L.L..L.L.LL....L.L..L..L....L....LL..L.L..L.L.L..L..L.LL.L...L....
LLLLLLLLLLLLLLL.LLLLL.LLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLLL..LLLLLLL.LLLL.LLL.L.LLL.L
LLLLLLLLLLL.LLLL.LLLLLLLL.LLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLL.LLL..LLLLL.LLLLL
LLLLLLLLLLLLLLLL.LLLLLLL.LL.LLLLLLL.LLLLL.LLLL.LLLLLLLLLL.LLLLLLLLL.LLL.LLLLLLLLLLLLL.LLLLL.LLLLL
LLLLLLLLL.LLLLLL.LLLLLL.L.LLLLLLLLL.LLLLL.LLLLLLL.LLLLLLL.LLLLLLLLLLLLL..LLLLLLLLLLLLLLLLLLLLLLLL
LLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLL..LLLLLL.LLLLLLL.LLLLL.LLLLLLLL.LLLL.LLLLL.LLLLL
..L..L.L..L..LL..LLL.L..L..LL.L...LL.L.L..LL.L.LL.L....LLL..LLL..LLL.L.L...LL.LL.LL...L..L...L.LL
LLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLL.LLLL.LLL.LLL.LLLLLLLLLLLLL.LLLLL.LL..LLL.LLLLL.L.LLL
LLLLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLLLLLL.LLL.LLL.LLLL.LLLLLLLL.L.LLLLL
LLLLLLLLL.LLLLLLLL.LLLLLL.LLLLLLLLL.LLLLL.LLLLL.LLLLLLLLL.L.LLLLLLLLLLL.LLLLLLLL.LLL.LL.LLL.LLLLL
LLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLL.LLLLLLL.LLLL.
.LLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLL.LLLLL
....L...L.....L..L...LL.L....L......L.....L..LL...L.......L....L.....L.L..L...L..........LL.LL...
LLLLL.LLL.LLLLLL.LLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL..LLLLL.LLLLLLLL.LLLLLLLLLLLLLLLL
LLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLL.LL.LLLLLLL..LLLLLLLLLLLLL.LLLLL.LLLL.LLLLL
LLLLLLLLL.L.LLLLLLLLLLLLL.LLLLLLLLL.L..LLLLLLLLLL.LLLLLLLLLLLLL.L.LLLLLLLLLLLLLL.LLLL.LLLLL.LLLLL
LLLL.LL.L.LLLLLL.LLLLLLLL.LLLL.LLLL..LLLL.LLLLLLL..LLLLLLLLLLLLLL.LLLLLLLLLLLLLL.LLLL.LLLLLLLLLLL
LLLLLL.LLLLLLLLLLLLLL.LLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL
L.LLLLLLLLLLLLLL.LLLLL.LL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLL.LL.LLLLLLLLLLLLLLLLLLL.LLLLL.LLLLL
LLLLLLLL..LLLLLL.LLLLLLLLLLLLLLLL.L.LLLLL.LLLLLLLLLLLLLLL.LLLLLLL..LLLLLLLLLLLLL.LLLL.LLLLL.LLLLL
L...LLL.L..LL..L.LLL.....L......L...LLL..L....LLL..L...L...........L..L..L...LL.LL.L...LL.LLLLLL.
.LLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLLL.LLLLL
LLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLL....LLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLL.LLLL.LLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLLLLL.L.LLLLL.LLLLL.LLLLL.LLLLLLLLLLLLL.LLLLL
LLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLL.LLL.LLLLL.LLLLLLLL.LLLL.LLLLL.LLLLL
LLLLLLLL..LLLLLL.LLLLLLLLLLLLLLLLL.LLLLLL.L.LLLL..LLLLLLL.LLLLLLL.LLLLL.LLL.LLLL.LLLL.LLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLLL.LLLL.LL.LLLLLLLLLLLL.LLLLLLLL.LLLLLLLL.LLLL.LLL.LLLLLLL
LL.LLLLLL.L.LLLLLLLLLLL.L.LLLLLLLLL.LLLLLLLLLLLLL.L.LLLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLL.L.LLLLLLLLL
....LLL.LL.....LLLLL...........LLLL.L..L.L..L.L.L...L.LL...LL.LLL.LL....LLLL....L.L.......L...L.L
LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLL.LL.LL.LLLLL
LLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLL.LLLL
LLLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLL.L.LLLLL.LLLLL
LLLLL.LLL.LLLLLLLLLLLL.LLL.LLLLLL.L.LL.LL.LLLL.LL.LLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLLLL.
..L.L.LL........L.L...LL.LLL...L....LL......L.......LL.......L.L...L..LL.L..LL.L.L.L..L..........
LLLLLLLLL.LLLLLL.LLL.LLLL.LLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLLLLLL..LLLL.L.LLLLLL.LLLL.LLLLLLLLLLL
LLLLLLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LL.LLLLLLLLLL..LLLL.L.LLL.LLLLL
L.LLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLL.LLLLL.LL.LLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLL.LLLLL
LLLLLLLLLLLLLL.L.LLLLLLLL.LLLLLLLLL.LLLLL.LLLLL.L.LLLLLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLL.LLLLL.LLLLL
LLLLLLLLLLLLLLLLLLLLLLL.L.LLLLLLLLLL.LLLL.LLLLLLL.LLLLLLL.L.LLLLL.LLLLL..LLLLLL..LLLL.LLLLL.LLLLL
LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLL.LL.LLLLLLLLLLLLLLLLLLLLLLLLLL.LLLL.LLL.LLLL.LLLLL.LLLLL
.LLLLLLLL..LLLLLLLLLLLLLL....LLLL.L.LLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLL.LLLL.LL.LL.LLLLL
LL.LLLLLL.LLL.LLLLLLL..LLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLL.LLLLLLL..LLLL.LLLLLLLLLLLLL.LLLLL.LLLLL
LLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLL.L.LLLLL.LLLLLLL.LLLLLLL.LLLLL.LLLLLLLLLLLLL.LLLLL.LLLLL
.......L...L..L.L...L..LL..LL..L.....L..LL..L.L.L.....L.....L..L..LL.L..L..L.LL...LL..L.....L.L..
LLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLL.LLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLL.LLLLL.LLLLLLLLLL.LLLLL
LLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLL.LLLL.LL.LLLLL.LLLLLLLLLLLLLLLLLLL.LLLLL
LLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLL.LLLLLLLLL.LLLLLLLLLLLLLL.LLLL.LLLLL..LLLL
LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLL.L.LL.LLLLL.L.LLL
LLLLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLL.LLLLL.LLLL.LLLLLLLLLLLLLLLLLL.L.LLL.LLLLLLLL.LLLL.LLLLLLLLLLL
L.LLLLLLLLLLL.LL.LLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLLL.LLLL.LLLLL.L.LLLLLL.LLLLLLLLLL.LLLLL
LLLLLLLLL.LLLLLL.LLLL.LLL.LLLLLLLLL.LLLLL.LLLLLLL.LLLLLLL.LLLLLLL.LL.LLLLLLLLLLLLLLLLLLLLLL.LLLLL
LLLLLLLLL.LLLLLL.LLLL.LLLLLLLLLLLLL.LLLLL.LLLL.LL..LLL.LL.LL.LLLL.LLL.LLLLLLLLLL.LLLL.LLL.LLLLLLL
LLLL.LLL..LLLLLLLLLLLLLLL.LLLLLLLLL.LLLLL.LLLLLLL.LLLLLLL..LLLLLL.LLLLL.LLLLLLLL.LLLL.LLLLL..LL.L
.L......L....LLLL.......L.L...LL...L.L..L..L..LL..L.....L......LL..LL...L...L....L.L..L...LL.L.L.
L.LLLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLLL.LLLL.LL.LLLLLLL.LLLLLLL.LLLLLLLLLLLLLL.LLLLLLLLLL.LLLLL
LLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLL.LLLLL.LLLLLLLL.LL.L.LL.LLLLLLLL
LLLL.LLLLLLLLLLL.LLLLLLLL.LL.LLLLL..LLLLL.LLLLLLL.L.LLLLL.LLLLLLL.LLLLL.LL.LLLLL.LLLLLLLLLL..LLLL
LLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLL.LL.LLLLL.LLLLLLLLLLLLLLL.LLLLLLL...LLL.LLLLLLLL.LLLL.LLLLLLLLLLL
LLLLLLLLL.LLLLL.LLLLLLLLL.LLLLLLLLL.LLLLL.L.LLLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLL.L.LLLL.LLLLL.LLLLL
LLLL.LLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.L.LLLLLLLLLLLLLLLLLLLL.LLLL..LLLL.LLLLL
LLLLLLLLL.LLLLLL.LLLLLLLL.LLL.LLLLL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLLLLL.LL.LL
LLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLL.LLLL.LLLLLLL.LLLLLLL.LLLLL.LLLLLLLL.LLLL.LLLLLL.LLLL
LLLLLLLLLLLLLLLL.LLLLLLL..LLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLL.L..LLLL.L.LLLLL..LLLL.LLLLL.LLLLL`;

console.log("Part 1 Answer:", getPart1Answer(fullData));
console.log("Part 2 Answer:", getPart2Answer(fullData));