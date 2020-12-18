function parseCubeData(data) {
  return [
    data.split("\n").reduce((acc, line, y) => {
      return acc.concat([line.split("")]);
    }, []),
  ];
}

function printCube(cube) {
  cube.forEach((layer, i) => {
    console.log("Layer " + i);
    console.log(layer.map((row) => row.join("")).join("\n"));
    console.log("\n");
  });
}
function printHypercube(hypercube, times) {
  hypercube.forEach((cube, w) => {
    cube.forEach((layer, i) => {
      console.log("z=" + (i - times) + ", w=" + (w - times));
      console.log(layer.map((row) => row.join("")).join("\n"));
      console.log("\n");
    });
  });
}

function unshiftCube(hypercube, cube) {
  const newHyperCube = hypercube.concat();
  newHyperCube.unshift(cube);
  return newHyperCube;
}

function addCube(hypercube, cube) {
  return hypercube.concat([cube]);
}

function unshiftLayer(cube, layer) {
  const newCube = cube.concat();
  newCube.unshift(layer);
  return newCube;
}

function addLayer(cube, layer) {
  return cube.concat([layer]);
}

function unshiftRow(cube, row) {
  return cube.reduce((_cube, layer, z) => {
    const newLayer = layer.concat();
    newLayer.unshift(row);
    _cube[z] = newLayer;
    return _cube;
  }, cube.concat());
}

function addRow(cube, row) {
  return cube.reduce((_cube, layer, z) => {
    const newLayer = layer.concat([row]);
    _cube[z] = newLayer;
    return _cube;
  }, cube.concat());
}

function unshiftCol(cube) {
  return cube.reduce((_cube, layer, z) => {
    const newLayer = layer.reduce((_layer, row, x) => {
      const newRow = row.concat();
      newRow.unshift(".");
      _layer[x] = newRow;
      return _layer;
    }, layer.concat());
    _cube[z] = newLayer;
    return _cube;
  }, cube.concat());
}

function addCol(cube) {
  return cube.reduce((_cube, layer, z) => {
    const newLayer = layer.reduce((_layer, row, x) => {
      const newRow = row.concat(".");
      _layer[x] = newRow;
      return _layer;
    }, layer.concat());
    _cube[z] = newLayer;
    return _cube;
  }, cube.concat());
}

function addShell(cube) {
  const blankLayer = cube[0].map((row) => row.map(() => "."));
  const cubeWithLayers = unshiftLayer(addLayer(cube, blankLayer), blankLayer);
  const blankRow = cubeWithLayers[0][0].map(() => ".");
  const cubeWithRows = unshiftRow(addRow(cubeWithLayers, blankRow), blankRow);
  const fullCube = unshiftCol(addCol(cubeWithRows));
  return fullCube;
}

function addHypershell(hypercube) {
  const blankRow = hypercube[0][0][0].map(() => ".");
  const blankLayer = hypercube[0][0].map(() => blankRow.concat());
  const blankCube = hypercube[0].map(() => blankLayer.concat());
  const newHypercube = unshiftCube(addCube(hypercube, blankCube), blankCube);
  return newHypercube.map((cube) => addShell(cube));
}

function getRelativeSides(cube, [x, y, z]) {
  const range = Array(3)
    .fill()
    .map((_, i) => i - 1);
  const activeRelativeSides = [];
  range.forEach((xOffset) => {
    range.forEach((yOffset) => {
      range.forEach((zOffset) => {
        if (xOffset === 0 && yOffset === 0 && zOffset === 0) {
          return;
        }
        const _x = x + xOffset;
        const _y = y + yOffset;
        const _z = z + zOffset;
        if (cube[_z] && cube[_z][_y] && cube[_z][_y][_x] === "#") {
          activeRelativeSides.push([_x, _y, _z]);
        }
      });
    });
  });
  return activeRelativeSides;
}

function getRelativeHyperSides(cube, [x, y, z, w]) {
  const range = Array(3)
    .fill()
    .map((_, i) => i - 1);
  const activeRelativeSides = [];
  range.forEach((xOffset) => {
    range.forEach((yOffset) => {
      range.forEach((zOffset) => {
        range.forEach((wOffset) => {
          if (
            xOffset === 0 &&
            yOffset === 0 &&
            zOffset === 0 &&
            wOffset === 0
          ) {
            return;
          }
          const _x = x + xOffset;
          const _y = y + yOffset;
          const _z = z + zOffset;
          const _w = w + wOffset;
          if (
            cube[_w] &&
            cube[_w][_z] &&
            cube[_w][_z][_y] &&
            cube[_w][_z][_y][_x] === "#"
          ) {
            activeRelativeSides.push([_x, _y, _z, _w]);
          }
        });
      });
    });
  });
  return activeRelativeSides;
}

function cycleCube(cube, times) {
  return Array(times)
    .fill()
    .reduce((_cube) => {
      const wrappedCube = addShell(_cube);
      return wrappedCube.reduce((wc, layer, z) => {
        layer.forEach((row, y) => {
          row.forEach((state, x) => {
            const activeRelativeSides = getRelativeSides(wrappedCube, [
              x,
              y,
              z,
            ]);
            if (state === "#") {
              if (![2, 3].includes(activeRelativeSides.length)) {
                wc[z][y][x] = ".";
              }
            } else if (state === "." && activeRelativeSides.length === 3) {
              wc[z][y][x] = "#";
            }
          });
        });
        return wc;
      }, JSON.parse(JSON.stringify(wrappedCube)));
    }, cube);
}

function getPart1Answer(cube) {
  console.log("\n");
  const cycledCube = cycleCube(cube, 6);
  // printCube(cycledCube);

  return cycledCube.reduce((count, layer) => {
    return (
      count +
      layer.reduce((c, row) => {
        return (
          c +
          row.reduce((acc, state) => {
            if (state === "#") {
              return acc + 1;
            }
            return acc;
          }, 0)
        );
      }, 0)
    );
  }, 0);
}

function cycleHypercube(hypercube, times) {
  return Array(times)
    .fill()
    .reduce((_hypercube) => {
      const wrappedHypercube = addHypershell(_hypercube);
      return wrappedHypercube.reduce((whc, cube, w) => {
        cube.forEach((layer, z) => {
          layer.forEach((row, y) => {
            row.forEach((state, x) => {
              const activeRelativeSides = getRelativeHyperSides(
                wrappedHypercube,
                [x, y, z, w]
              );
              if (state === "#") {
                if (![2, 3].includes(activeRelativeSides.length)) {
                  whc[w][z][y][x] = ".";
                }
              } else if (state === "." && activeRelativeSides.length === 3) {
                whc[w][z][y][x] = "#";
              }
            });
          });
        });
        return whc;
      }, JSON.parse(JSON.stringify(wrappedHypercube)));
    }, hypercube);
}

function getPart2Answer(cube) {
  const hypercube = [cube];
  console.log("\n");
  const times = 6;
  const cycledHypercube = cycleHypercube(hypercube, times);
  // printHypercube(cycledHypercube, times);

  let _count = 0;
  cycledHypercube.forEach((_cube) => {
    _cube.forEach((layer) => {
      layer.forEach((row) => {
        row.forEach((state) => {
          if (state === "#") {
            _count = _count + 1;
          }
        });
      });
    });
  });
  return _count;
}

const _data = `..#..#.#
##.#..#.
#....#..
.#..####
.....#..
...##...
.#.##..#
.#.#.#.#`;

console.log("Part 1 Answer:", getPart1Answer(parseCubeData(_data)));
console.log("Part 2 Answer:", getPart2Answer(parseCubeData(_data)));
