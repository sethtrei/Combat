const scale = 10;

// shapes

const obstacles = [
    [0, 8, 160, 5],
    [0, 115, 160, 5],
    [0, 13, 4, 102],
    [156, 13, 4, 102],
    [76, 28, 8, 18],
    [76, 82, 8, 18],
    [44, 59, 16, 10],
    [100, 59, 16, 10],
    [20, 50, 8, 5],
    [20, 73, 8, 5],
    [24, 55, 4, 18],
    [132, 50, 8, 5],
    [132, 73, 8, 5],
    [132, 55, 4, 18]];


const nne = [
    [0, 3, 8, 2],
    [4, 5, 3, 2],
    [1, 1, 2, 2],
    [3, 2, 2, 1],
    [5, 0, 1, 2],
    [2, 0, 1, 1],
    [7, 2, 1, 1],
    [1, 5, 1, 1],
    [5, 7, 1, 1]
]

const ese = [
    [3, 0, 2, 8],
    [1, 4, 2, 3],
    [5, 1, 2, 2],
    [5, 3, 1, 2],
    [6, 5, 2, 1],
    [2, 1, 1, 1],
    [7, 2, 1, 1],
    [0, 5, 1, 1],
    [5, 7, 1, 1]
]

const ssw = [
    [0, 3, 8, 2],
    [1, 1, 3, 2],
    [5, 5, 2, 2],
    [3, 5, 2, 1],
    [2, 6, 1, 2],
    [2, 0, 1, 1],
    [6, 2, 1, 1],
    [0, 5, 1, 1],
    [5, 7, 1, 1]
]

const wnw = [
    [3, 0, 2, 8],
    [5, 1, 2, 3],
    [1, 5, 2, 2],
    [0, 2, 2, 1],
    [2, 3, 1, 2],
    [2, 0, 1, 1],
    [7, 2, 1, 1],
    [0, 5, 1, 1],
    [5, 6, 1, 1]
]

const ene = [
    [3, 0, 2, 8],
    [1, 1, 2, 3],
    [5, 5, 2, 2],
    [6, 2, 2, 1],
    [5, 3, 1, 2],
    [5, 0, 1, 1],
    [0, 2, 1, 1],
    [7, 5, 1, 1],
    [2, 6, 1, 1]
]

const sse = [
    [0, 3, 8, 2],
    [4, 1, 3, 2],
    [1, 5, 2, 2],
    [3, 5, 2, 1],
    [5, 6, 1, 2],
    [5, 0, 1, 1],
    [1, 2, 1, 1],
    [2, 7, 1, 1],
    [7, 5, 1, 1]
]

const wsw = [
    [3, 0, 2, 8],
    [5, 4, 2, 3],
    [1, 1, 2, 2],
    [2, 3, 1, 2],
    [0, 5, 2, 1],
    [5, 1, 1, 1],
    [0, 2, 1, 1],
    [2, 7, 1, 1],
    [7, 5, 1, 1]
]

const nnw = [
    [0, 3, 8, 2],
    [1, 5, 3, 2],
    [5, 1, 2, 2],
    [2, 0, 1, 2],
    [3, 2, 2, 1],
    [0, 2, 1, 1],
    [5, 0, 1, 1],
    [6, 5, 1, 1],
    [2, 7, 1, 1]
]

const e = [
    [0, 0, 6, 2],
    [0, 5, 6, 2],
    [2, 2, 3, 3],
    [5, 3, 3, 1]
]
const w = [
    [2, 0, 6, 2],
    [2, 5, 6, 2],
    [3, 2, 3, 3],
    [0, 3, 3, 1]
]
const s = [
    [0, 0, 2, 6],
    [5, 0, 2, 6],
    [2, 2, 3, 3],
    [3, 5, 1, 3]
]
const n = [
    [0, 2, 2, 6],
    [5, 2, 2, 6],
    [2, 3, 3, 3],
    [3, 0, 1, 3]
]
const ne = [
    [3, 3, 5, 2],
    [3, 0, 2, 3],
    [1, 2, 2, 2],
    [4, 5, 2, 2],
    [0, 4, 2, 1],
    [3, 6, 1, 2],
    [2, 1, 1, 1],
    [0, 3, 1, 1],
    [5, 2, 1, 1],
    [6, 1, 1, 1],
    [7, 0, 1, 1],
    [6, 5, 1, 1],
    [4, 7, 1, 1]
]
const nw = [
    [3, 0, 2, 5],
    [0, 3, 3, 2],
    [2, 5, 2, 2],
    [5, 2, 2, 2],
    [6, 4, 2, 1],
    [4, 6, 1, 2],
    [0, 0, 1, 1],
    [1, 1, 1, 1],
    [2, 2, 1, 1],
    [5, 1, 1, 1],
    [7, 3, 1, 1],
    [1, 5, 1, 1],
    [3, 7, 1, 1]
]
const sw = [
    [0, 3, 5, 2],
    [3, 5, 2, 3],
    [2, 1, 2, 2],
    [5, 4, 2, 2],
    [4, 0, 1, 2],
    [6, 3, 2, 1],
    [3, 0, 1, 1],
    [1, 2, 1, 1],
    [7, 4, 1, 1],
    [5, 6, 1, 1],
    [0, 7, 1, 1],
    [1, 6, 1, 1],
    [2, 5, 1, 1]
]
const se = [
    [3, 3, 2, 5],
    [5, 3, 3, 2],
    [4, 1, 2, 2],
    [1, 4, 2, 2],
    [3, 0, 1, 2],
    [0, 3, 2, 1],
    [4, 0, 1, 1],
    [6, 2, 1, 1],
    [0, 4, 1, 1],
    [2, 6, 1, 1],
    [5, 5, 1, 1],
    [6, 6, 1, 1],
    [7, 7, 1, 1]]


// bullet positions
const bulletCoords = new Map([
    [n, [3, 0]],
    [nnw, [2, 0]],
    [nw, [0, 0]],
    [wnw, [0, 2]],
    [w, [0, 3]],
    [wsw, [0, 5]],
    [sw, [0, 7]],
    [ssw, [2, 7]],
    [s, [3, 7]],
    [sse, [5, 7]],
    [se, [7, 7]],
    [ese, [7, 5]],
    [e, [7, 3]],
    [ene, [7, 2]],
    [ne, [7, 0]],
    [nne, [5, 0]]
]);


// rotation
const rotateLeftMap = new Map([
    [n, nnw],
    [nnw, nw],
    [nw, wnw],
    [wnw, w],
    [w, wsw],
    [wsw, sw],
    [sw, ssw],
    [ssw, s],
    [s, sse],
    [sse, se],
    [se, ese],
    [ese, e],
    [e, ene],
    [ene, ne],
    [ne, nne],
    [nne, n]
]);

const rotateRightMap = new Map([
    [n, nne],
    [nne, ne],
    [ne, ene],
    [ene, e],
    [e, ese],
    [ese, se],
    [se, sse],
    [sse, s],
    [s, ssw],
    [ssw, sw],
    [sw, wsw],
    [wsw, w],
    [w, wnw],
    [wnw, nw],
    [nw, nnw],
    [nnw, n]
]);

const moveXMap = new Map([
    [n, 0],
    [nne, 0.45],
    [ne, 1],
    [ene, 0.9],
    [e, 1],
    [ese, 0.9],
    [se, 1],
    [sse, 0.45],
    [s, 0],
    [ssw, -0.45],
    [sw, -1],
    [wsw, -0.9],
    [w, -1],
    [wnw, -0.9],
    [nw, -1],
    [nnw, -0.45]
]);

const moveYMap = new Map([
    [n, -1],
    [nne, -0.9],
    [ne, -1],
    [ene, -0.45],
    [e, 0],
    [ese, 0.45],
    [se, 1],
    [sse, 0.9],
    [s, 1],
    [ssw, 0.9],
    [sw, 1],
    [wsw, 0.45],
    [w, 0],
    [wnw, -0.45],
    [nw, -1],
    [nnw, -0.9]
]);
