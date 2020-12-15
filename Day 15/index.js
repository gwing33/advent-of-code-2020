function getNextNumber(last, index, dataMap) {
    const lastIdx = dataMap[last];
    const lastMatchIndex = typeof lastIdx === 'undefined' ? -1 : lastIdx;
    return lastMatchIndex === -1 ? 0 : index - lastMatchIndex;
}

function getLastNumber(data, n) {
    const dataMap = data.reduce((acc, d, i) => {
        if (i == data.length - 1) {
            return acc;
        }
        acc[d] = i;
        return acc;
    }, Array(n));

    let newNumber;
    let last = data[data.length - 1];
    let i = data.length - 1;
    while(i < n) {
        newNumber = getNextNumber(last, i, dataMap);
        dataMap[last] = i;
        if (i < n - 1) {
            last = newNumber;
        }
        i++;
    }
    return last;
}

function getPart1Answer(data) {
    return getLastNumber(data, 2020);
};

function getPart2Answer(data) {
    return getLastNumber(data, 30000000);
};

const _data = `8,13,1,0,18,9`.split(',').map(x => Number(x));

console.log('Part 1 Answer:', getPart1Answer(_data));
console.log('Part 2 Answer:', getPart2Answer(_data));