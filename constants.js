const scale = 10;



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

const rotateLeftMap = new Map([
    ['n', 'nnw'],
    ['nnw', 'nw'],
    ['nw', 'wnw'],
    ['wnw', 'w'],
    ['w', 'wsw'],
    ['wsw', 'sw'],
    ['sw', 'ssw'],
    ['ssw', 's'],
    ['s', 'sse'],
    ['sse', 'se'],
    ['se', 'ese'],
    ['ese', 'e'],
    ['e', 'ene'],
    ['ene', 'ne'],
    ['ne', 'nne'],
    ['nne', 'n']
]);

const rotateRightMap = new Map([
    ['n', 'nne'],
    ['nne', 'ne'],
    ['ne', 'ene'],
    ['ene', 'e'],
    ['e', 'ese'],
    ['ese', 'se'],
    ['se', 'sse'],
    ['sse', 's'],
    ['s', 'ssw'],
    ['ssw', 'sw'],
    ['sw', 'wsw'],
    ['wsw', 'w'],
    ['w', 'wnw'],
    ['wnw', 'nw'],
    ['nw', 'nnw'],
    ['nnw', 'n']
]);

const moveXMap = new Map([
    ['n', 0],
    ['nne', 0.45],
    ['ne', 1],
    ['ene', 0.9],
    ['e', 1],
    ['ese', 0.9],
    ['se', 1],
    ['sse', 0.45],
    ['s', 0],
    ['ssw', -0.45],
    ['sw', -1],
    ['wsw', -0.9],
    ['w', -1],
    ['wnw', -0.9],
    ['nw', -1],
    ['nnw', -0.45]
]);

const moveYMap = new Map([
    ['n', -1],
    ['nne', -0.9],
    ['ne', -1],
    ['ene', -0.45],
    ['e', 0],
    ['ese', 0.45],
    ['se', 1],
    ['sse', 0.9],
    ['s', 1],
    ['ssw', 0.9],
    ['sw', 1],
    ['wsw', 0.45],
    ['w', 0],
    ['wnw', -0.45],
    ['nw', -1],
    ['nnw', -0.9]
]);
