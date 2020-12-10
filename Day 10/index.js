function getPart1Answer(adapters) {
  const { one, three } = adapters.reduce(
    (acc, joltage, index) => {
      const lastJoltage = index === 0 ? 0 : adapters[index - 1];
      const difference = joltage - lastJoltage;
      switch (difference) {
        case 1:
          acc.one = acc.one + 1;
          break;
        case 2:
          acc.two = acc.two + 1;
          break;
        case 3:
          acc.three = acc.three + 1;
          break;
        default:
          acc.other = acc.other + 1;
      }
      return acc;
    },
    { one: 0, two: 0, three: 1, other: 0 }
  );
  return one * three;
}

function getPart2Answer(adapters) {
  const _adapters = [0].concat(adapters);
  const range = Array(3)
    .fill()
    .map((_, i) => i + 1);
  const counts = _adapters.reduce(
    (acc, _, i) => {
      return range.reduce((ways, j) => {
        ways[i] = ways[i] || 0;
        if (_adapters[i] <= _adapters[i - j] + 3) {
          ways[i] = ways[i] + ways[i - j];
        }
        return ways;
      }, acc);
    },
    [1]
  );
  return counts[counts.length - 1];
}

function parseRating(rating) {
  return rating
    .split("\n")
    .sort((a, b) => a - b)
    .map((x) => Number(x)); //.map(n => parseInt(n, 10)).sort((a,b) => a - b);
}

const adapterRatings = parseRating(`118
14
98
154
71
127
38
50
36
132
66
121
65
26
119
46
2
140
95
133
15
40
32
137
45
155
156
97
145
44
153
96
104
58
149
75
72
57
76
56
143
11
138
37
9
82
62
17
88
33
5
10
134
114
23
111
81
21
103
126
18
8
43
108
120
16
146
110
144
124
67
79
59
89
87
131
80
139
31
115
107
53
68
130
101
22
125
83
92
30
39
102
47
109
152
1
29
86`);

console.log("Part 1 Answer:", getPart1Answer(adapterRatings));
console.log("Part 2 Answer:", getPart2Answer(adapterRatings));
