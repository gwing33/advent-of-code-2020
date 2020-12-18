function parseData(data, acc = []) {
  if (!data) {
    return acc;
  }

  const c = data.charAt(0);
  const rest = data.substring(1, data.length);

  if (c === ")") {
    return [rest, acc];
  }

  if (c === " ") {
    return parseData(rest, acc);
  }

  if (["+", "*"].includes(c)) {
    return parseData(rest, acc.concat(c));
  }

  if (c === "(") {
    const [_rest, group] = parseData(rest, []);
    return parseData(_rest, acc.concat([group]));
  }

  return parseData(rest, acc.concat(Number(c)));
}

function calc(data) {
  return data.reduce(
    ([acc, opr], x) => {
      if (Array.isArray(x)) {
        const [r] = calc(x);
        if (opr) {
          return opr === "+" ? [acc + r, null] : [acc * r, null];
        }
        return [r, null];
      }
      if (["+", "*"].includes(x)) {
        return [acc, x];
      }
      if (typeof x === "number") {
        if (opr) {
          return opr === "+" ? [acc + x, null] : [acc * x, null];
        }
        return [x, null];
      }
      return [acc, opr];
    },
    [0, null]
  );
}

function getPart1Answer(datas) {
  return datas.reduce((total, data) => {
    const [val] = calc(parseData(data));
    return total + val;
  }, 0);
}

function calcDos(data) {
  let skipNext = false;
  const result = data.reduce((acc, x, i) => {
    if (skipNext) {
      skipNext = false;
      return acc;
    }
    if (Array.isArray(x)) {
      const [v] = calc(calcDos(x));
      return acc.concat(v);
    }
    if (x === "+") {
      skipNext = true;
      const [nextVal] = Array.isArray(data[i + 1])
        ? calc(calcDos(data[i + 1]))
        : [data[i + 1]];
      // console.log(acc[acc.length - 1], nextVal);
      return acc.slice(0, acc.length - 1).concat(acc[acc.length - 1] + nextVal);
    }
    return acc.concat(x);
  }, []);
  return result;
}

function getPart2Answer(datas) {
  return datas.reduce((total, data) => {
    const [val] = calc(calcDos(parseData(data)));
    return total + val;
  }, 0);
}

const _data = `(6 + 6 * 9) * 7 * 9 + (7 * (7 + 3 * 4 + 8 * 9 + 2) + 3 * 2 * 4 + 5) + 8 * 2
6 * 5 * 4 * 4 * 7
2 + 9 * 7 + 2 + 8 * 4
6 * (5 + (6 * 7 * 3 * 3 + 2 + 3) + 6 * (4 + 7 * 3 + 5 + 5 + 2) * 4 + 4) * 9
((2 + 3 + 4) + (7 + 7 + 8) + 8) + 5 + (4 + 9)
5 + (7 + 6 * 9 * 3) + 4 + 3 * 7
3 + 8 + (3 * (7 + 8 + 8 * 5 + 5 * 9) + 9 * (9 * 3 + 7 + 9 + 6) + 4) * 9
3 * 7 + 5 + (5 * 5 * (7 + 5)) + (2 + (9 + 9 + 6 * 3 + 9 + 2) + (4 * 4 + 3 + 2 + 2 * 3))
2 + (8 * (2 + 4 + 7 * 9 + 3) * (8 * 5 + 8 + 4 * 8 + 9) * 2 * 2)
5 + ((7 * 6) + 8 * 2) * 8 * 4 * 2
6 + (9 + 8 + 8 + 8 + 3 + (4 * 2 + 9 + 8 * 6)) * 7 + ((2 * 7 + 3) * 9 * (3 + 7 * 8) + 2 + (7 + 5 * 2 * 4 * 6 * 5))
8 + 9 * 2 + (2 * (2 * 7 + 6 * 7 + 4 * 6) * 6 * 8) * 8 + (4 * (6 * 9 * 5 * 9 + 6))
(6 + 4 * 2 * 7 * (3 * 5 * 4 + 3) + 4) * 7 + 2 * 6
((5 + 8 * 3 + 9 + 5) * 5 * (4 * 6 * 8 * 7 + 6)) + 6
2 + ((3 * 4 * 4 * 4 * 8 + 7) * 5) + (5 + 5 + 2 * 4) * (3 * 9 + (6 + 7 * 3 + 4 * 3 * 5) + (7 + 9 * 9 * 7 * 8 + 9) + 7) * 3 * 2
7 + ((3 + 8 + 2 + 5) * 2) * 5 + 4
(5 + 3 * 7 * 9 + 6) * 8 * 6 * 3 + (9 + 7 * 6 * (3 * 3))
(6 + (6 * 2 + 9 + 7) + (7 + 5 * 5 + 7) * (9 * 2 + 9) * 6 * (8 + 4 + 5 + 9 * 4 * 2)) + 7
9 * 4 + 3 * (5 * 4) * (9 * (2 * 5 * 5 * 7)) * 6
8 + ((2 + 5 + 7) + (9 + 5 + 2 * 2) + 2 + 2) * ((7 + 8 * 2 + 2 * 5) + (5 + 6 * 2) * 7 * 8)
((6 * 6 + 3 + 4 * 5 * 9) + 8) + ((9 * 6 * 5 + 3) * 3)
4 + 8 * 7 * 2 * (7 * 6 * 9 + 7 * 3) * 8
(2 * 9 * 7 * 4 + 4 + 7) * (9 * 3 + 5 + 6 * 3 * 3) * (7 + 6 + 2 + 6 + 8) * (8 * 3)
(4 + 4 + 9 + 2 + (2 + 6)) * (6 * 4 * 4 * 8 * 6) * 2
3 + 4 * 9 * 2 * ((3 + 7 * 2 + 6 + 4 * 5) * 3 * 9 + (7 + 9) * 7) + (5 * 2 * 2 + 6 * 4 * 5)
4 * 6 * 9 * (7 * 2 * 8)
9 + 5
(8 * 9 * 4 * (8 * 2 * 8 + 8)) + 8 + 8 * 6 * 3
2 * 3 * 8 + 5 * 8 + 7
3 + (7 * 2 + 6 + 8 + 8) * (9 + 6 * 3) * 9 + ((5 * 8 * 4 + 4 + 8 * 2) * 8 + 5 * 2) * 7
(8 + 2) + (3 + 2 * 5 * 9 + 5) + 2 * (2 + 9 + 4 + 6) * 4 * 2
9 * 7 + (8 + 9 * 5) + (3 * 2 + (8 + 8) * 7 * 9) * 2
3 + 9 + (7 * (7 * 9 + 5 + 3 * 3) + 4) * 4 * (3 + 2 * 5 * 6 * 8) + 5
8 + 2 + 4 * (2 * 6 + 6 * 8 * 6 * 4) + 7 + 7
4 + 9 * (6 * 9) * 2
5 + (4 * 8) + ((9 + 6 + 6 * 7 * 9 * 6) * 4 * (6 + 8) * 3 * 4 + 5)
5 * 7 + (8 + 7 + (3 * 7 * 9)) * 5
3 * 9 + 7 * (6 * 2 * 5 + 4 + 7) * ((4 * 6) * (5 * 2 * 6 + 8 + 9) * 9 * 8 + (3 + 5))
6 * (3 * 6 * 2 + 3 * 5) * 9
9 * 7 * (8 * 4 * 9) + 5 + ((2 + 7 + 8 + 7 + 3 * 8) * 9 * 2 * (6 + 9 * 6) * 8) + 8
(6 + 7 * 7) * 3 * 4
(7 * 6 * (3 * 8 * 7 + 5) * 7 * 8) + 4 + (2 + 2 * 2 + 9 * (3 + 3 + 4) * 7) * (2 + 5 * (8 * 3 + 3 * 5 * 3 * 4) + 9 * 2)
3 * 2 + (6 * 2 + 3 * 5 + 6) + 7 * 8 + 3
4 + 5 + 4 * (2 * 8 * 4 * (5 * 2 + 6) + 2 + 7) + 7 + 9
7 * 4 * ((3 * 8) + 3 * 2)
(2 + 8 * (7 + 3 * 7 + 2 + 6 * 5) * 7) + ((3 * 2 * 4 + 3) + 8 * 5 * 2 + 6 * (3 + 5 + 7 + 2 + 8 * 5)) * 8 + 5 + 9 * 9
7 * 4 * (6 + 3 + 2 * 9 + (7 * 5 + 4 * 5 * 9)) * (8 * (2 + 7 * 5) * 6 * 5 * 5) + 5
4 + 3 * (4 * (2 + 4) * 3)
(7 + 5 * (5 * 3 * 8 * 7 + 4) + (7 + 9 * 2 + 5 * 4 * 6) + 3 + 5) * 4 * 7 + 3
5 + 4 * 2 + 7 * 8 + (3 * 6 + 7 + 5 + 3 * (8 * 7 + 7))
2 + 8 + (3 + 5) * (8 + 2 + 5 + 9 * 2 * 7) + 7 + 4
5 * 5 * 2 + (2 + (7 + 3) * (7 * 4 * 3 * 4 * 6 + 5)) * 5
7 * 2 * (8 * (9 * 3 * 5 + 6) + 6 + (9 + 6 + 3 + 4) * 7)
(2 + 9 * 7 + 7) + 5 + 7 + 3 * (5 + 6 * 9 + 9)
3 * (5 * (5 + 2 * 9 * 9 * 5) * 3 + (6 * 2 + 7 * 5)) + (4 * 2 * 6) + 6 + 7 + 6
6 + 4
3 + 8 + 5 + (4 * 7 + 7 * 2 * 9)
((9 + 4 + 5 * 3) + 3 * 3 * 4 * 7) + 5 + 2 * (5 + 3 + 4 * (7 * 4 * 7 + 9) + 3 * 4) + 7 + 4
4 + 9 * (6 + 6 * (3 * 9 + 5 + 5 + 9 + 4) * 3) * 4
5 + 7 * 2 + 7 + (9 + (5 * 2 * 4 + 3) + 7) + (9 * (2 + 3) * 9)
3 * 8 + 5 + (6 + 3 * (2 * 2 + 5 + 6 * 9)) * ((3 * 4 + 9 * 2 + 8 + 5) * 2 + 4 * 3 * 9 + 8)
2 + (6 + 7 + 4 * 2) * (7 + 2 + 4 + 4 * 6 * (6 * 5 + 3 + 7)) + 6 + 9 * ((8 * 6 + 9 + 2 * 8) + 2)
((4 * 5 * 7 * 5 + 3 * 6) + 7 * 4) + 4 * 5
4 + 7 + ((8 + 3 + 9) * 6 * 8 * 4 * 2 + 2)
(3 + (3 + 8 + 3)) * 8 * 5 * 8 + 8
3 + (7 * 2 * (7 + 3 + 5) * 8) + 7 * 7
(2 * 6 + (5 + 8 * 3 + 3 + 5) * (2 * 4 + 2 * 2) * 4) * 8 + 7
(9 + 7 * 2 + 2) + 6 * 2
8 + 7 + (3 + 2 * 2 * (2 * 8 * 4) * 2 * 2) * 4 * (7 * 8 * 4 * 8 + 3) + 7
6 + 9 + ((5 + 8 + 5) + 7) * 6 * 8
7 * (7 + (7 * 6 * 3 + 8) + 5) * (2 * 9) * 5 * 5 * 9
(7 + (4 + 9) * 5 + 5 * 2 * (8 * 7 + 6 + 2 + 6 + 8)) + 6 + 3
9 * 7 * 2 + 5 * 5 + (6 + 9 + (4 * 6 * 6 + 7) + 2 * 7 * 6)
5 + (6 * 5 * 5)
(5 * (3 * 2 + 2) * 6 * 2 + 9) + 5 * 9
6 + 8 + (3 * 2 + (8 * 3 * 7 + 5) + (3 * 7 + 6 + 2 * 4) + 2)
(2 * 9 + 8 + 3 + 2) + (6 + 2) * 7 * 2
9 + (9 * (9 + 5 + 7 + 5)) + 5
5 + (8 * 5 + (3 + 7 + 6 + 7 * 5) + 8) * 4 * 8 + 7
((2 + 9 * 6) * 4 + 3) * (3 + 9 + 5 + 5)
8 + 3 + 3 + (7 * (9 * 3) * 9 * 7) * (3 + (3 * 3 * 4 + 6 * 8) * 7 + 5) + 7
7 + 6 * ((5 + 2) * 9 * 7 * 6 * 5 * 9) * 8
6 + (5 * 5) + 6 * 2 * 6
(4 + 2 * 2 * 8 + 5) * 6 * ((5 + 4 + 6 + 6 + 4 + 5) + 8 * (4 * 6 * 9 + 2 * 8 * 9) * 4 * (8 + 5) + 8)
(4 + 8 + 9 + 4 * 5 * (3 + 4 + 4 + 5 + 4)) + 2 + 9 * (3 + (9 * 6 + 9 * 7 * 8) + 6) * 8
(8 * 9) + (8 + 3 * 8 * 5 * 4 * 8) + (6 + 2)
9 * (6 * 4) * 9
9 * 9 + 9 * 3 + ((3 * 5 + 2 + 4) + 5 * (7 * 3) * 7 + 5)
((7 + 8 * 6 * 7 + 8 + 3) + 3 * 4 * 3 + 4 + 4) + 4
4 * (7 + (7 + 2)) * 6 * 8 + 8
3 + 9 + 4 + (7 + 4 + (7 * 9 * 8 * 2) + 4 * 3) * (4 * 6 + (3 + 2 * 9))
(3 + (5 + 3 * 7 * 8 * 4 + 2) + (8 + 5 * 4 + 9 + 9 * 4) + 4 + 8) * 3
6 + (7 + 5 * (4 * 4) + 8) * (6 * 2 * 4 + 8)
6 * (3 + 9) * 8 + 4 * ((9 + 2 + 3 + 4 * 7 + 8) * (5 + 7 + 2 * 9) * (8 * 4) + 2 * (6 * 9 + 4 + 7) * 6)
7 + 8 + 2 + ((7 + 4 + 9 * 5 + 4) + 7)
(4 * 6 * 5 * (5 * 8 * 4 * 4) * 8 * (7 + 3 + 9 + 7)) + 8 + (9 + (9 + 3 + 9) + 8) + 7 + 7
7 * 3 + 4 * 6 * 6 * (5 * (6 * 3) * 9 * 2)
(4 + 8 * 2 + (3 * 7 + 4 + 6) * 2) + (8 * 3 * 2 * 6) + 3 * (4 * (5 + 6 + 9) + 5) * 7 * 3
((5 * 5) + 9 * 6 * (3 + 3 + 5)) * 4 * 8 * 7 * 5 * 6
6 + 6 * 5 * (6 * 4) * (9 + 4 * 7 + 5 * (7 * 4 * 9 * 8)) + 2
7 + 7 + (2 + 3 * 9) * 5 * 2
3 + 7 * (6 * (6 * 2 * 8))
9 + 8 * ((6 + 6 + 2 * 6) + 4 + 5 + 9 + 9 * 3)
(6 + 7 * 8 * 8 * 2) * (5 * 6) * 7 * (7 + (8 * 9) + 7)
6 + (6 + 2 * 8) * ((9 + 9 * 5 * 9) * (2 + 8 + 8 + 5) * 6 + 5 * 5) + 8 + 8 + 2
(8 + 7 * 3 * 5) + (5 * 7 + 4 * 3) * (5 * 7 + 3 * (3 * 8 + 7) * 2) * (7 + 5 * 9) * 2 + (4 + (4 * 2 * 2) + 8 * (4 + 2 + 4 + 5 * 9))
(9 + 2 + 4 + 4 * 4) * 2 + 4 * 2
(6 + 5 + 4 * 9 * 8) * 5 * 7 + 5 * 4 + (3 + 3 + 4 + 3 * 6)
(6 + 8 + 3 * 5 * 3 * 6) * (6 + 6) + (8 * 8 + 3 + 6 * 9 + 2) * 6 + 7 * 5
(3 * (4 + 3) + 8 + 9 * 9 + 3) + 4
(4 * (3 + 2 + 8 + 8) + 8 + 2) * 4
8 + 8 * 4 * 8 * 4 + 3
7 + (9 * 2)
((4 + 2 + 5 * 2 * 6 * 8) * 7 + 6 * 3 * 8 + 4) * 3 * 2
6 + 6 * (5 + 9 * 7 + 2 + 3 + 9) + 5 + 7 * 3
((4 + 4) + 6 * 5) + 7
5 + 4 * 7 + 9
6 + 8 * 5 + (2 * (9 + 6) * 6) + 4 * 5
(3 + 6 * (6 * 4 + 6 + 2) + (6 * 4 * 8 * 2)) * 3
9 + 5 * (9 + 2) * (8 + (4 + 5 + 2 * 3 * 2 * 3) * (6 + 5 + 6 + 4)) + 6 * 5
(4 * (6 * 5 + 5) * 7) * 9 * 5 + (8 * 9 + 2 * 2) + 6
(4 + 8 * 2) + (7 + 5 + (7 + 3 + 4) * (2 * 8) + (3 * 7 + 2 + 4 + 9))
6 + (7 * 4 + 5 * 7 + 4) * 3 + (6 * 7)
9 + (9 * (2 * 3 + 3) + (5 + 9 + 7))
(6 + 6 + (9 + 8 * 9 + 2) * 7 + 6) * 7 + 5 * 4
9 + 6 * 6 + 9 * 6
7 * (9 * 9 * 6) + 4 + ((7 * 8 * 7) * 9 * 9 * 2)
2 * 2
3 + 4 + (9 + 6 + 4 + 8) * 7
9 * (2 + (8 + 7) + 8 * 5 + (7 + 9) + 9) * 7 * 8 + 5 * 6
(8 + 3 + 4 + 6 * 6 + 5) * 9 + 5 + (5 * (9 * 8 * 5 * 5) * 7 * 4 * 2) * ((2 + 7 + 3 + 5) + 7) * (4 + 3 + 9 + 4 * 5 + 4)
3 + 2 + 6 * (5 * (4 * 5 + 2) * (5 * 4))
5 + 2 * 2 * (6 + (6 + 9 * 9 * 8 * 7 * 6)) + 5 + 7
8 + 7 + 8 * 6 * 2
((5 * 7 + 9) * 9 * 2 + 9 + 7 * 6) * 5 + 2 * (9 + 2 + 6 * 2 + 9) + 6 * 7
3 * ((7 * 8) + 4) * 8
(9 + (2 * 8 * 2 + 5 * 2 + 6) + 8 * 8 * 7 + (5 * 2)) * (2 + 8 + (6 + 7 * 4 + 6 * 8) + (3 + 3 + 6 + 5) * 2) + 7 + 6 + 2
(7 + 3 + (5 * 6 + 6 * 8) + 4 * 3 + 5) * 3 + 6 + 7 * 7 * 9
4 * (9 + 6 + 7 + 2 + 4 + 2) + 3 + 4 * 7
6 + (4 * 4 + 6) * 4 * ((4 + 3) * 2 + 4) * (9 * 6 * 3) * (7 + 7 + 3 + 4)
2 * (5 * 6 * 5 * 8) + 3 + 2 + (8 * 9 + 6) + 4
((8 * 6 * 6 * 7) * 6 * 3) + 2 * (3 * 9) + 9 + (6 * 5 * (4 * 5) + 5 + 3) * (6 * 7 * (2 * 5 * 2 + 6 * 6 + 3) + 4 + 3 + 3)
5 + 4
((5 + 8 + 8 + 9) + 8 + 3 + 8 + 9 + 6) + 6 * 7 * 3 * 3
(5 + 9 + 2) * 9
4 + (3 + (7 + 3 + 6)) + 2 * 6 * 5 + 8
7 + 9 * (3 + 2 * (3 + 5 + 2 * 7 + 4)) * 4 * (2 + 7 + 2 * (4 + 5 + 8 * 4 + 9) + 9 + 3) * ((7 + 9) + 8 * 3 + 5 * 7)
((2 + 9 + 5 * 6 * 4 * 3) + (2 + 4 * 2 * 7 * 3)) * 7 + 2 + 9 + 8
7 + 7 + 9 + 2 * 3
2 + 2 * (3 + 7) + (9 + 8 + 7 + 7 + (2 * 4 + 2) * 5) * 8 + 3
(3 * 6 * (7 * 4 * 4 + 7 + 7) + (6 + 9) * 4 * 3) * 9 * 9
(5 + 3 * 9 * 7 * 8 * 7) + 9
3 * 2 + (5 + 7 * (6 + 2)) + 2 * 8
4 * ((5 * 6 * 3 + 3) + 6 * 7 + 9 + 7) + 2 * 5 * ((3 * 3 * 8 + 8 * 9) + 9 + 5 * 3 + 7 * 9)
9 + (7 + (8 + 6 * 9 + 5 + 8) * 6 * 7 * 3)
((7 * 4 + 7) + 8 * 7 * 9) + 3 + 4 * 4
(5 * 8 * (3 * 8 * 3 * 3 + 2) * 6 * 2 * 2) + 6 + 7 * 6
5 + 7 + 7 + 4 + 3 + (6 + 5)
9 * (7 + (2 * 3) + 9) * 7 + 6
2 * (2 + (3 * 6 + 9 * 3 + 9) + 8 * 7) + 6 + 6 + 7
(6 * 3) + 7 * (8 * (8 * 7))
((7 + 3 + 7 * 5 * 9 + 3) * 7 * 3 + 7 + 7) + 8 * 7 + 9 * 2 + (3 + 7)
(7 + 7 * 6 + (5 * 3 * 2 * 4 * 8)) + (2 * 6 * 8 + 7 * 5) + 2 * ((2 * 4 + 3) * 6 * 8) * ((8 * 5 * 5 + 8) * 2 + 5 * 9 * 7) + 5
3 + 6 + (9 * (3 * 9 * 2 * 9 + 3) + 7 + 2) * (7 * (4 + 5 * 5 + 7 * 5)) + 2
3 + ((5 + 8 + 4 + 9 * 6 * 8) + (9 + 8 + 2 * 3 + 5 * 8) * 6 + (9 * 9 * 2) * 3 + 4)
3 + (5 + 2 + 9 * 7) + 9
2 * 6 + (9 + 4 * 3 + 4 + 4 + 2) * 3
7 * 9 * (3 * (5 * 5)) * (8 * 9)
6 + 2 * 9 * (7 + 7 * 3 + 8) * 5
5 + 3 + 6 * (4 * 7 * (6 * 7 * 3 * 9) + 7) * 3 + 2
6 + 8 + ((5 * 4 + 5 * 2) * 2) * 5 * 9 * 9
5 * 7 + (4 + 4 + 9 + 7) * (2 + 2 + 2 + 9 + (2 + 8 + 5) + 4) + 3 + 7
8 + 9 + (9 * 2 * 6 * (7 * 6 * 3) + (3 * 5 * 2 * 3))
8 + 5 * ((9 * 4 * 8 * 7 * 5 + 8) * (7 + 7 + 6 + 9 + 8 * 6)) * 5
9 * 2 + 4 * 9
(5 * 3 + 5 + 8 * 5 * 4) + 3 * 2 * 6 * 6 + 9
((2 * 9 * 6) * 2 * (7 + 3 * 7) * (4 + 2 * 2 + 9)) + 6 * 5 + (8 + 6 + 5 * 8 * 3)
(5 * 6 * 7 + (7 * 4) * (6 + 3 * 4) * 4) + (8 + 4 + (3 * 5 * 6 * 3 * 3 * 4) + 9 * 3) * ((9 + 8 * 8 * 9 * 2 * 4) * 9 * 2 * 8 * 7) * 4 * 8
8 + (2 * (8 * 7 * 6) * 3 * (2 * 7 * 8 + 9 * 9 + 7) * 2)
2 + (9 + (9 * 9 + 9)) * 6 * (7 + 5 * 2 * 9 + 8)
6 * 9 * 6 + (3 + 2 * 9) * 5
9 * 7 * 2 * 6 * 7 * 6
5 + 2 * (3 * (3 + 5 + 2 + 5) + (5 + 5 * 5 * 6) * (9 + 8 * 4 * 8) * 3 * (4 + 9 + 4 * 2 + 5)) + 9 + 8 * (7 + 4)
8 + (9 + 7 * 3 * 2 + 5 + 6) + (7 + 2 * (3 * 9 + 5 * 9 * 5 + 7) + 8 + 2)
9 + 5 * ((4 * 3 * 5 * 2) * (7 + 9 * 3) * 4 * 7 + 9 + 8) + (6 + 6 + 3 + 5 + 3)
8 + ((2 * 8 * 8 * 7 + 9) + 6 * (5 * 4 * 5) + 2 * (2 + 3))
(5 + 4 + 5 * 9) * (5 + 3 * 5) * 5
3 + 4 * ((5 + 8 * 6 * 9 + 9 * 8) + 5 * (3 + 4 + 9) + 5)
(9 * 4 * 6 + 7 * 4) * 3 * 7
((2 + 7 * 3) * 7 + 7 * (4 + 4 + 8) + 8 * 7) + 7 * 7 * ((7 + 6 + 6 * 6 * 8) * 8 + 3 + 5 * 8 + 2)
2 * 8 + 2 + 4 + 6 + (8 * 5 * (3 * 8 + 5 + 2 * 2))
5 * 6 * 3 + 3 * ((5 + 4 * 4 + 6) * 9 + 4 * 5) * 7
5 * (7 + 4 + 7 + 5) + (9 + 2 * (5 + 7 + 9 + 3 * 9 + 5) * 7 + (8 * 2 * 8 * 7 * 9) + (5 * 8)) * 6 * 6
4 * ((3 + 4 * 6 + 6 * 2 + 4) * 9 + 5 * 2 + (4 * 9 + 8 + 8 + 6 * 2) * 6) + 6
(8 + (4 * 6) + 7 + 6) * 3 + 3 + 9
7 * (4 * 5 + 8 + 2 + 4 * 3)
7 + (6 + 7 * 3 + 5) * (3 * 6 * 7 + 8 + 4 + 8) * (4 * 6 * 9 + (6 + 6)) * 3
5 + 9 + ((4 + 8 * 8) * 6)
4 + 7 * 3 * 3 * 2 + (6 * 5 * (4 * 8 * 3 + 9 * 5 + 5) * 2)
4 + 5 + (5 * 6 + (4 + 8) * (8 + 8 * 6 * 4 + 7 * 3) + 3)
((8 * 4 + 4) + 5 * 6 + 5 + 3 + (2 * 4 + 7 * 9 + 5)) + (3 * 2 * 3 + 7 + 5)
(9 * 6 + 4 * 3 + (3 * 4 + 8) + 6) * 8 * 6 * 2 + 4
2 + 2 * 9 * ((9 * 3 * 6 + 3 + 2 * 8) + 5 * 6)
7 * 8 * 7 * 7 + 9 * (8 * (5 + 6 + 4 + 2) * 5 + 7 + 8)
(3 + 2 * 4 * 9) + 6 * 3 * 3 + 3 + 3
4 * 6 * (2 * (6 + 5 + 7 + 7) * 7 * 7 * 6 * 4) + 5 * 8
(6 * 8 * 8) * 4 * 3 + 6
6 + (3 * 3 * 8 * (5 * 8 * 2 + 4 + 2 + 4))
5 * 2 * (8 * 3 + 3) * ((6 * 3 + 6 * 9 * 5 + 2) + 2 + 2 + 9 + (5 * 3 + 3))
(6 + (9 + 3 * 8 * 9 * 4 + 4) + 7 * 8 + 5) * ((8 + 4 + 7 * 9 * 7 + 6) + 4 + 5 * 2 + 4) * 5 * 2 * 8
7 * (4 * 2 * 5 * 9 * 7) + 4 * 7
(5 * (4 * 2 + 6 + 5) + (9 * 3 * 2 + 2 * 4 * 2) * 7 * 9 * 8) + 8 + 4 + 9 * ((9 * 9 * 9 * 7 * 6) + 6 * (4 * 5 + 7 * 8) + 5 * 3)
3 * 3 + 5 + (6 * (3 + 5)) + 4 + 7
9 + 4 + (9 + (9 + 7 * 3 + 8 + 4) + 6 + 7 + 7 * 5) * 6
9 + (9 * 6 * (9 * 5 * 6 + 9 + 9) + (4 + 2 + 9) * 4) + 6 + 8 * ((6 * 8 + 4 * 4 + 4) + 2 + 7 + 7 * 3 * 6)
3 + (9 * 2 * (5 * 8 + 8 * 6))
2 + 8 * ((4 * 5 * 2 + 5 * 3) + (5 * 2)) * 5 * 4 * (6 + 7)
2 + (4 * 8 + 9 + 6 + 5) + (3 + 5 + 4 + 3 + 6) * 6
4 + (5 + (2 * 4 + 8 + 6 * 8 * 5))
4 + 6 + 2 + (4 + 3) + 6 * 5
8 * 4 + ((8 * 7 + 9 + 4) * 7 + 4)
(2 + 5) * 6
9 * (3 + (7 + 7) + 7 + 4 + 5 * 2) + 9 * 5
4 * (7 * (2 * 4 * 5 * 7 + 8) + 8 + 6)
4 * (5 * 2 * 3 * 9)
3 * 6 + (9 + 3 * 4 * 3 * 6 + 7) * (4 * 8 + 8 + 7) * 8 * 8
5 * 4 * (3 + 5 + 8 * 4 + 3 * 2) + 3 * 7
(6 * 7 * 3 * 9 * (9 + 4 * 5)) + 7 * (2 + (7 + 2 * 5 + 3 + 6)) + ((5 + 7) * 9 * 7 * 2 + 4) * 7 * 3
4 + 2 * (4 + 3 + 5 + 9)
(6 * (2 * 7)) + 5 * 3 + 8 * 4
(8 + 3 * (5 * 7 + 4 + 9 * 3) + 5 * (6 + 8) + 8) * 8 * 4 * 2 * 7
(8 + (3 + 8 * 2) + 4) + 5 * 2 + 7 * 6 * 9
(8 * 7 * 6 * 3 * 3 * 4) * 7 + 3 * 4 * 4
5 + (5 * (9 + 9 + 4) + 2 * 5)
3 + 8 + (3 + 8 * 4 + 2) * 6 * 6
(8 + 8 + 2 * 8 * 8 * 7) + (6 * 2 + 8 + 3 + 3) + 2 + (8 * 6 * 4 * 3 * 9 * 3)
8 + 9 * (5 + (4 * 5 + 9) * 2 * 6 * 9 * (8 * 3)) * 5 + (4 * 4 + 7 * (6 * 4 * 8 + 6) * 2 * 8)
6 * 8 * (9 * 6 * 7 * 6) + (9 + 9 * 7) + (2 + 5 * 8)
7 * 8 * 6 * (7 * 6)
3 * 3 + 5
((7 + 8 + 9 * 8 * 8 * 4) * (4 * 7 * 4 + 3) + 9 * (8 + 6 + 3) + 5 + 2) + 2 * (8 + 3 + (5 * 4 * 8 * 2 + 3 + 7) + 4) + 3 + ((7 + 4 + 6) * 6 + 9 * 6 + 9 + (4 + 3 * 9 + 8)) + 2
2 + (9 + 6 + (8 * 2 * 5)) * 5 + 4
9 + 2 * 4 + 4 + (4 * 9 + 8 * 9 + 2 + 2)
2 * (8 * 5 + 7 * 5) * 5 + 5 * 7 + 6
4 + 5 * 6 * 9 + 7 * 4
(5 + 4 + 7 * 3 + (7 + 6 + 3 + 4 * 7 * 5) * 2) * 3
3 * (7 * 7 * 9 + 3) * 3 + 5
9 * 5 + (8 * 9 * (3 * 3 + 3 * 2) * 3 + (5 + 4 + 2 + 7) * 9) * 3 * 6
4 + (8 * 5 + 7 * (9 + 3 * 3 + 2 + 7 * 8) * 6 * (9 + 6 + 6 + 6)) + 9
4 + 8 * 6 * 5
7 * 2 * (3 + 2 + (4 * 5 + 3 * 3 + 3)) + 2 * (2 * 5) + 8
(4 + 3 * 4) * 8 + 7 + 2 + 8 + 7
5 + ((3 * 8 * 7 + 7) + 5 + 3 * 5 * 4 * 3) * 8 * 7 * (3 * 5) + 3
6 * 8 * (7 + 2 * 2) * 9
6 * 9 + 2 + ((4 * 7 + 5 + 2 + 9) + 2 + 9 * 4) * (5 + 9 * (6 * 3 * 5 + 4 + 3 + 7) + 9)
5 * 4 + 8 * ((4 + 7) + 9 + 3 * 7 + 6 * 2) * 3 + 8
8 + 7 * (8 * 6 * (7 * 3 * 5 * 5) + 8) * 4 + 8
(8 + 4 * 3 + 7 + 9) * (6 + (2 + 8) * (7 * 2)) * 7 * 8 + (3 * 3 + 6 * 3)
6 + 8 + 5 + 8 * ((8 * 3 + 6 + 4 * 9 + 9) + (4 * 5 * 6 + 3 * 7 * 8)) + ((5 + 4 + 4) * (2 + 4 * 8 * 6) * 6 + (4 + 9))
7 * (2 * 5 + (8 * 9 * 7 * 6 * 3) * (2 + 2) * 8) + 2 + (5 * 4)
(6 + 4) + 5 + 2
7 + ((5 * 3 + 8 + 3 * 5) * 7 + (5 + 9 + 9) * 4 + 5 * 5)
9 * 6 + 4 + (5 * 5 * 2 * (5 * 8 * 6 + 7 * 5 + 2) + 7) + 6 + 2
8 + ((4 * 5 + 6 + 2) + (5 * 4) + 9 * 4) * (4 + 2) + 4 * 9 * 5
8 * (8 * 5 + (2 + 7 * 4 + 7 * 2) + (4 + 3 * 6) * 8 * 6)
4 * ((8 + 8 * 8) + 4 * 8 * 6 + 8) + (4 * 3 + 5 * 2) * (5 + (2 * 3) + (7 * 7 * 9 + 6) + 9 + (9 + 4) + 9)
8 * 9 + 9 + (3 + 3) + 7
((6 + 5 + 6 * 2 * 9) * 9) * 2 + 4
4 + 2 + (5 + 4 + 3 * 6 + 5)
((7 * 5 * 4 + 8 + 5 * 6) * 4 * 5 * 4 + 3 + (6 + 2 * 8 * 8)) * 5 + (3 * 5 * 2 * 2) + 2
8 + 4 * (9 * (8 * 7 + 6 + 8)) * (3 + (6 * 7 * 5 * 3 + 4 * 7) * 9 * (3 * 2 * 3) + 5) + 8
3 * 2 + ((6 * 3) * (2 + 7) + 5) * 4 * 4 * 7
((5 + 7) + (8 + 4) + 3) * 2 * 3
2 * 6 * 2
3 + 6 * 2 + 6 + (4 + 6 + (7 * 4) + 8) * 8
7 * (3 + 7 + 5 * 5 * 5 + 6) * (3 * 3) + 5
((3 * 3 * 7 + 8 + 3) + 3 * 6) + 6 + 6 * 4
((8 * 7 * 5) + 2) + (3 + (4 * 6))
8 + 7 + ((3 + 2 + 6 + 3 * 5 + 7) * (9 + 6) + 7 + 6 * 7 + 6)
(5 * (4 + 2 + 6 + 4) * 3) * (3 * 6) + 5
6 + (6 + 9 + 3) * 6
(2 + 7 + 3 + 3 * 2 + 9) * (4 + 6 + 2)
2 + (6 + 6 * 2) + 7 * 4 + (4 * 7 + 2 * 5 * 6 * 5)
(8 * (7 + 7 * 7) * 7 + 4 * 7) + 7 * 4 + 5
(8 + (8 + 2 * 5 + 8 + 7)) + 5 + 5 + 5 + 2
((7 + 3 + 4 * 9 * 9) + 2 * (7 * 4 + 2) * 4) + 2 + 7
4 * 6 + 8 + (7 + 5 + 8 + 9 * 9) * 8
3 * (2 * 6 * 6 + (2 * 5 + 7) * (8 * 8 * 7 * 2) * 8) * 4
3 + 5 * 5 * (2 * 4 * (8 + 2 * 7) * 5)
(8 * 5) * ((5 * 4) * 7 + (2 + 8 * 7) * 7) + 4
8 + 2 + 7 * 4
(3 * 3 * 5) * (8 + 3 + 9) * 9 * 9 * 3
8 * 6 + (3 + (2 + 9 + 5) + 5 + (5 + 8 * 4 + 5 + 8)) + 3
((5 + 6 + 8 + 7) + 4 * 9 * 2) + (9 * 2 + 4 * 6) + 8 * 6 + (5 + 3 + (3 + 6 + 9 * 9 + 3 * 8))
2 + (2 + (3 * 6 + 2) * 4 * 9 + 6 * 7) * 8 + 8 * (7 * 9 + 7) * 2
3 + 4 + ((7 * 9 + 5 * 8 * 3 * 7) + 3 + 3 * 6 * 5 * 2)
6 + 5 * 5 + ((2 * 5 + 4 + 6) * 6 * 9) * 8
3 * 7 * 5 + (5 + 5 + 3 + (4 + 3 * 9 + 4) * (4 * 3))
7 + 7 + (7 * 4 * 6 + (5 + 4 * 6) + 5) + (2 + 5 * 5)
5 * 3 * 6 * 7 + ((6 + 2) * 9 + (8 + 5) * 3 * 7 + 2)
(7 + 8 * 2 * 3 + 3 * 3) + 2 * (9 + 2 * 5) * 3 + (8 * 4 * 7 + 3)
(7 * 9 + 2 + 9 + (2 + 4 * 5 * 8 + 2 + 8)) * 4 + 7 * 2 + 2
(7 + 4 * 2) * (8 + 9 + 6)
(4 * 9 * 8 * 9) * 4 * (5 * 2 + 3 * 9 * 3 * 3) * 5 + 5 * 9
5 * 2 * 9 + 5
((8 + 4 * 2) * (2 + 2 * 8 + 3 + 9 + 9) + (4 * 6 + 9 + 5 * 3 * 6) + 3 + 9 * 3) + 8
2 + 6 + (4 * (4 + 3 + 5 * 9 + 5) * 9 + 8) * 8
2 * ((4 + 3 + 2 * 7 * 8 + 9) * (7 + 5 + 3 + 9 + 2) * 3 * 9) + 6 + 9 + 7
7 * 2 * 7
(5 * 3 * (3 + 6 * 2 + 9 + 8 * 4) * 9 + 7 * 8) * 8
4 + (8 * 8 + 2 * 9 * (6 * 8) * (8 + 9 * 6)) + 8 + 3 + 8 * 9
5 * (5 + 9 + 6) + 4 + 6
(4 + (4 * 3 * 3 * 7 * 2 + 2) * (6 * 8 * 4 + 8 + 4)) + 3 * 4 + 8 * 7
9 * (2 * 3) * 5 * 2
8 + 3 + (3 * 7 * 8 + 7 + 4) + 6 * (2 + 5) * (2 + 7 * 8 * (3 * 8 * 2 * 3))
8 * (7 * 8 * 5 * 2) + 2 * 6 + 6 + (3 * (9 + 5) + 2)
2 + (4 * 2 + 8 * 6 * 9) * (3 * 9 * 9) + 8
7 * (5 + 3 + 9) * 5 * (9 + 4 * 4 + 6 * 4)
6 + 3 + 6 + ((9 + 5 * 7 * 8 * 9) * 2 * (2 * 5 * 3) * 9) * (8 * 8) * 5
3 + (9 * 7 * (9 * 4) + 6) * 5
2 * 7 * 2 + (4 + 5 + 9) * 4 * 9
(8 * (3 + 7 * 2 * 7)) + 4 + 2
4 * (8 * 3 * 2 + 4 + 2 * 2) + 8
(3 * 9 + (6 + 7 + 3 + 6 * 8 * 5) + 2) * 5 + 6 * (9 * 4)
(2 * 4) * ((8 * 3 + 9) + 2 + 8 + 2)
(7 + 9) + (7 + 8 * 6) * 6 * (7 * 6 * 6 * 7 * 6 * 5) * 2
(9 + (6 * 4 * 6 * 9 + 9 + 7) + 5) * 6 + 4 + 3 + 7 + 8
9 + 9 + 8 + 7 * (5 + 3)
8 + ((5 + 2 * 4) + 7) + 2 + (9 * 8 * (8 * 4 * 6) + 4) * (2 * 2 + 8 * 3 * 6) + 9
2 * (7 * 7 * 4 * 6 * 7) + 9 + 3 * (5 + 5 * 9 + 3 * 4 * 8)
2 * 6 * 4 + (4 + 7 + (7 * 6 * 4 + 6) * 5 * 2 + 8) + 5
(4 + 6) + 5 + 8 + 4 + 7 + 8
9 + 4 + 5 * 8 * 7
5 * 9 * (7 + 7 + (6 * 9 * 8) + 4 + 8 * 9) * 4 + 5
(4 * 6 * (6 + 6 + 3) + 4 + 4) * 8 * 8
7 * 5 * (4 * 6 + 5)
(5 * 4 * 5 + 8 * 9 + 9) * 6 * 5 * 8 * (5 + 2 * 9 * 6)
5 + (2 * 3 * (7 * 9 + 7)) + 6
5 * 8 * 7 + 2 * (7 * 5 * 6 * 7 * 5)
8 + 7 + 4 * ((3 + 5 + 5) * (4 + 4 + 7 + 4 + 9)) * 4 * 4
(4 + 8 + 7 * 7) * (5 * 5)
((4 * 4 + 2 * 4) * 2 * (4 + 7) + (9 + 9 * 7)) * (7 + 8 + 6)
3 * (9 * 7) * 7 + (9 + (5 + 2 * 7 + 5 * 7 + 8) * 4 + 2 * (6 + 7) + 5) * 2 * 4
8 + 2 * 5
3 + 5 + 7 + (3 * (5 * 6 + 7 * 2) + 8 + (6 * 8 + 7 + 8 + 3) + 6 * 2) + 9 + 6
6 + 6 * (5 + 9 + (6 + 5) + 4 + 6) * 8
(9 + 5 * 5 * 4) + (6 * 7 * (8 * 3 * 5 * 2 + 2) + 6 + 3) * (9 * 7 + (4 * 6 * 9 + 7 * 8 + 7)) * 3 + 2
8 + (6 + 2 * 2) * 5 * (9 * (9 + 3 * 2 + 3 + 5 + 3) + 6) + (5 + (9 * 8 * 2 * 8 + 6))
4 + 7 + (4 * 7 * (4 * 2)) * 9
(3 + (9 + 8 * 8 + 3) * 2 + 2 + 4) + 5 * 7 + 7 + (8 * 4 * 8 * 8 * 5)
5 + (8 * 7 * (5 * 2) + (8 + 2 + 7 + 4 + 2 + 8) + 4 * 8) * 6
(9 + 3 + 9 * 9) * 4 * 2 + (4 + 8 * 2 + (2 + 7 * 8) + 6)
6 + (5 + 2 + (5 * 7 + 4 + 2) * 8 + 8) * 2 + 9 + 9
(3 * (2 + 4)) * 4 * 5
2 * 5 + 5 + 3 * ((4 + 7 + 8 * 4 * 3 * 8) * 4 + (3 * 7 + 7) + 9 * 7) + 8
9 * 2
(4 + 9 * 2 + 5 + 3) * 8 * 5 + (9 + (6 + 8 * 8 * 5 + 4 + 5) + 7 * 2 * 5 + 3) + 5 * 8
8 + 2 * (7 * (6 + 5 + 5 + 5) + 4) + 8 * 2
7 * 9 + 6 + (9 + 5 + 6 * 3)
4 + 2 * 4 * (8 + 7 * 4 * (2 * 6 + 3 + 7 + 2 * 8) * 3 + 3) * 6
6 + 8 * (9 * 7 * (6 + 5 + 2 * 2 + 5) * 4 + 3 + 6) + 5
4 + (4 + 5 + 6 * 5 + 9) * 2 * 3 + (6 * 4 * 2)
((2 + 9 * 3 * 3 + 4) * (7 + 3 * 6 * 6) * (9 + 3) * (8 * 2 * 4) + (2 * 8) * (5 + 9 + 9)) * 4 + 6 * 5
(4 * 2 * 3 + 2) + (4 * (4 + 9 + 9)) + 4 * 6
((9 * 9 * 8 * 4) * 5) * (6 + 6 * 7 * 4 * 7 + 5) + 8 * (2 * 5 + (9 + 7 + 8 * 3 * 3 * 6) * 2 * 2 * 9)
((9 * 4 + 5 + 7 * 2 * 7) + 9 + 3 + 9 + 6 * 6) + 7 * ((9 * 6 * 7) + 7 * 8) + 4 * 8 + ((9 + 4) * (4 * 7))
8 + 4 * 4 + 4 * (3 + (4 * 5 * 4) + 5)
2 * 4 * 3
4 * ((3 + 2 * 6 * 6 * 7) + 7 + 7 * 5 * 9) + 7 * 5 + 4 + 3
5 * 8 * ((4 * 8 * 3 * 4 * 7 + 6) + 6 + 5 * 9) + 5 * ((3 + 4 + 4) + 3 * 4 + 8 * 4)
(7 + 6 + 3 + (8 + 7 * 8) + 6) + ((6 * 5 * 7 + 3) + 2 + 3) + 2
6 + 5 + (3 * 3) * 9 * (7 + (3 * 6 + 2 + 3 * 3 * 8) * 5 + 4 + 7 + (7 * 8 + 8 + 2 * 3)) * 9
((2 + 3 * 6 * 2) * 5 * 7 * 7 * 2) + 4 + 2 * 6 + 5 + (6 + 7 * 4 + 5)
3 * ((2 + 8) + (8 * 8 + 6 + 9 * 5) * 5 + 2 + (4 * 2 + 8 * 4) + 9)
8 + 8 + 8 * 5 + (7 * 8 + 2 + 8) * ((7 * 4 * 2) + 4)
5 * (4 + 2 * 9 + 4 + 5) * 6 + 7 + (4 + 3 * (6 * 2) * 4 * 5 + (8 * 2 * 6 * 9 + 7))
3 * (9 * 3) + 6 + 5 + 4 * ((6 * 7 + 9 + 6) * 8 * 5 * (8 + 9 * 6 * 5) * 7)
7 * 4 + (8 * 4 + (6 + 9 + 7 + 3) + 8) * 8 + (9 * 2 * 2 + 4 + 9 * (3 + 5 * 9 * 9 * 5 * 9)) * (3 * 9 * 6 * 9)`.split(
  "\n"
);

console.log("Part 1 Answer:", getPart1Answer(_data));
console.log("Part 2 Answer:", getPart2Answer(_data));
