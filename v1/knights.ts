type coordinate = [number, number];

function knightMoves(start: coordinate, end: coordinate) {
    const visited: coordinate[] = [];
    const queue: [coordinate, coordinate[]][] = [];

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

    queue.push([start, [start]]);

    while (queue.length > 0) {
        const [currentCoords, traveledPath]: [coordinate, coordinate[]] = queue.shift()!;

        if ((currentCoords[0] == end[0]) && (currentCoords[1] == end[1])) {
            let success = `You made it in ${traveledPath.length} moves. Here's your path:\n`;

            traveledPath.forEach(move => {
                success += `[${move}]\n`;
            });

            return success;
        }

        visited.push(currentCoords);

        const nextMoves: coordinate[] = [];

        movements.forEach(movement => {
            if (
                !((movement[0] + currentCoords[0]) > 7) && !((movement[0] + currentCoords[0] < 0)) &&
                !((movement[1] + currentCoords[1]) > 7) && !((movement[1] + currentCoords[1] < 0))
            ) {
                nextMoves.push([movement[0] + currentCoords[0], movement[1] + currentCoords[1]]);
            }
        })

        nextMoves.forEach(move => {
            if (visited.find(visit => (move[0] == visit[0]) && (move[1] == visit[1]))) {
                return;
            } else {
                queue.push([move, [...traveledPath, move]]);
            }
        })
    }
} // https://stackfull.dev/graph-data-structure-in-typescript

console.log(knightMoves([0,0],[7,7]));
