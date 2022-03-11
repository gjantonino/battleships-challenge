function crawler(r,c, board, knownShips, size = 0) {
    const h = board.length;     //board height
    const w = board[0].length;  //board width
    let key = r+','+c;
    let keyRight = r+','+ (c+1);
    let keyLeft = r+','+(c-1);
    let keyDown = (r+1)+','+c;
    
    //base case - coords belong to a ship that was already counted.
    if (key in knownShips) return 0;

    //base case - coords are out of the board.
    if (r >= h || c >= w) return 0;

    //base case - coord is not ship.
    if (board[r][c] === '.') return 0;
    
    //increment ship size.
    size ++;

    //check for adjacent ship parts to know in which direction to crawl next.
    let left = c - 1 >= 0 && !(keyLeft in knownShips) ? board[r][c - 1] === '#' : false;
    let right = c + 1 < w && !(keyRight in knownShips) ? board[r][c + 1] === '#' : false;
    let down = r + 1 < h && !(keyDown in knownShips) ? board[r + 1][c] === '#' : false;

    //if no adjacent ship parts, then we are at one of the ends of the ship.
    if ( !left && !right && !down) {
        knownShips[key] = true;
        return size;
    }

    //adds coords as part of a ship.
    knownShips[key] = true;
    
    //crawl in the direction where there are adjacent ship parts.
    let sumRight = right ? crawler(r,c + 1, board, knownShips, size) : 0;
    let sumLeft = left ? crawler(r, c - 1, board, knownShips,size) : 0;
    let sumDown = down ? crawler(r + 1, c, board, knownShips, size) : 0;
    
    //store the total count of ship parts from all directions.
    let totalSize = sumDown + sumLeft + sumRight;
    
    //if the ship spawns in two different directions, we substract 1 from the sum, to avoid duplication of parent coord.
    if (right && down ) {
        totalSize --;
    }

    //return the ship size.
    return totalSize;
}

export function getShips(board) {
    const h = board.length;     //board height
    const w = board[0].length;  //board width
    let destroyers = 0;
    let submarines = 0;
    let patrolBoats = 0; //initialize ship counters
    let knownShips = {}; //initialize memo of known ship coordinates.

    //iterate through the board and attempt to crawl on each coordinate.
    for(let r = 0; r < h; r ++) {
        for(let c = 0; c < w; c ++) {
            let size = crawler(r,c,board, knownShips);
            if(size === 3) destroyers ++;
            if(size === 2) submarines ++;
            if(size === 1) patrolBoats ++;

        }
    }
    console.log('destroyers:', destroyers);
    console.log('submarines:', submarines);
    console.log('patrolBoats:', patrolBoats);
    return ( [destroyers, submarines, patrolBoats] );
}

