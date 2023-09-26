type coord = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const movements = [
    [1, 2],
    [2, 1],
    [-1, -2],
    [-2, -1],
    [-1, 2],
    [-2, 1],
    [1, -2],
    [2, -1]
]

class Knight {
    coords: [number, number];
    nextMoves: [number, number][] = [];

    constructor(x:coord, y:coord) {
        this.coords = [x, y];
        
        movements.forEach(movement => {
            if (
                !((movement[0] + x) > 7) && !((movement[0] + x < 0)) &&
                !((movement[1] + y) > 7) && !((movement[1] + y < 0))
            ) {
                this.nextMoves.push([movement[0] + x, movement[1] + y]);
            }
        })
    }
}

console.log(new Knight(3, 3).nextMoves);
