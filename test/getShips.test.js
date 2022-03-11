import chai from 'chai';
import { getShips } from "../index.js";
import { boards } from './boards/boards.js';
const assert = chai.assert;

for (let board of boards) {
    describe('test getShips function for a given board', () => {
        it('should detect ships according to the board', () => {
            let result = getShips(board.layout);
            assert.deepEqual(result, board.result);
        });
    });
}