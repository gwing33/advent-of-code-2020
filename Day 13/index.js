function getPart1Answer(notes) {
  const [_time, _ids] = notes.split("\n");
  const time = Number(_time);
  const ids = _ids
    .split(",")
    .filter((id) => id !== "x")
    .map((id) => Number(id));
  const sortedTimes = ids
    .map((id) => {
      const mod = time % id;
      return [id, id - mod];
    })
    .sort((a, b) => a[1] - b[1]);
  return sortedTimes[0][0] * sortedTimes[0][1];
}

function absMod(a, n) {
  // Because we don't want any negatives
  while (a < 0) {
    a += n;
  }
  return a % n;
}

function getPart2Answer(notes) {
  const [_, _ids] = notes.split("\n");
  const ids = _ids
    .split(",")
    .map((id, i) => (id !== "x" ? [Number(id), i] : id))
    .filter((x) => Array.isArray(x))
    // Sort by the largest to speed up search
    .sort((a, b) => b[0] - a[0])
    .map(([id, i]) => [id, absMod(id - i, id)]);

  const value = ids.reduce(
    ([x, acc], [id, offset]) => {
      if (x === 0) {
        return [id, offset];
      }
      while (acc % id !== offset) {
        acc += x;
      }
      return [x * id, acc];
    },
    [0, 0]
  );
  return value[1];
}

const fullNotes = `1001287
13,x,x,x,x,x,x,37,x,x,x,x,x,461,x,x,x,x,x,x,x,x,x,x,x,x,x,17,x,x,x,x,19,x,x,x,x,x,x,x,x,x,29,x,739,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,x,x,x,23`;

console.log("Part 1 Answer:", getPart1Answer(fullNotes));
console.log("Part 2 Answer:", getPart2Answer(fullNotes));
