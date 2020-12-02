// Part 1: Find two numbers whos values total 2020. Once found, multiply them together.
function getPart1Answer(report) {
  return report.reduce((acc1, entry1, i) => {
    // If we have a value, no need to continue on.
    if (acc1) {
      return acc1;
    }
    // Try and find the corrct 2 numbers that sum up to 2020
    const matchingEntry = report.slice(i, report.length).find((entry2) => {
      return entry1 + entry2 === 2020;
    });
    return matchingEntry ? entry1 * matchingEntry : null;
  }, null);
}

// Part 2: Find three numbers whos values total 2020. Once found, multiply them together.
function getPart2Answer(report) {
  return report.reduce((acc1, entry1, i1) => {
    // If we have a value, no need to continue on.
    if (acc1) {
      return acc1;
    }

    return report.slice(i1, report.length).reduce((acc2, entry2, i2) => {
      // If we have a value, no need to continue on.
      if (acc2) {
        return acc2;
      }
      // Let's not continue if we're alrady past our limit.
      if (entry1 + entry2 >= 2020) {
        return null;
      }
      // Try and find the corrct 3 numbers that sum up to 2020
      const entry3 = report.slice(i1 + i2, report.length).find((e) => {
        return entry1 + entry2 + e === 2020;
      });
      return entry3 ? entry1 * entry2 * entry3 : null;
    }, null);
  }, null);
}

const expenseReport = [
  1028,
  1987,
  1938,
  1136,
  1503,
  1456,
  1107,
  1535,
  1946,
  1986,
  855,
  1587,
  1632,
  1548,
  1384,
  1894,
  1092,
  1876,
  1914,
  1974,
  1662,
  1608,
  2004,
  1464,
  1557,
  1485,
  1267,
  1582,
  1307,
  1903,
  1102,
  1578,
  1421,
  1184,
  1290,
  1786,
  1295,
  1930,
  1131,
  1802,
  1685,
  1735,
  1498,
  1052,
  1688,
  990,
  1805,
  1768,
  1922,
  1781,
  1897,
  1545,
  1591,
  1393,
  1186,
  149,
  1619,
  1813,
  1708,
  1119,
  1214,
  1705,
  1942,
  1684,
  1460,
  1123,
  1439,
  1672,
  1980,
  1337,
  1731,
  1203,
  1481,
  2009,
  1110,
  1116,
  1443,
  1957,
  1891,
  1595,
  1951,
  1883,
  1733,
  1697,
  1321,
  1689,
  1103,
  1300,
  1262,
  1190,
  1667,
  1843,
  1544,
  1877,
  1718,
  1866,
  1929,
  1169,
  1693,
  1518,
  1375,
  1477,
  1222,
  1791,
  1612,
  1373,
  1253,
  1087,
  1959,
  1970,
  1112,
  1778,
  1412,
  1127,
  1767,
  1091,
  1653,
  1609,
  1810,
  1912,
  1917,
  935,
  1499,
  1878,
  1452,
  1935,
  1937,
  968,
  1905,
  1077,
  1701,
  1789,
  1506,
  1451,
  1125,
  1686,
  1117,
  1991,
  1215,
  1776,
  1976,
  846,
  1923,
  1945,
  1888,
  1193,
  1146,
  1583,
  1315,
  1372,
  1963,
  1491,
  1777,
  1799,
  1363,
  1579,
  1367,
  1863,
  1983,
  1679,
  1944,
  1654,
  1953,
  1297,
  530,
  1502,
  1738,
  1934,
  1185,
  1998,
  1764,
  1856,
  1207,
  1181,
  1494,
  1676,
  1900,
  1057,
  339,
  1994,
  2006,
  1536,
  2007,
  644,
  1173,
  1692,
  1493,
  1756,
  1916,
  1890,
  1908,
  1887,
  1241,
  1447,
  1997,
  1967,
  1098,
  1287,
  1392,
  1932,
];

console.log("Part 1 Answer", getPart1Answer(expenseReport));
console.log("Part 2 Answer", getPart2Answer(expenseReport));
