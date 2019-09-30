'use strict';

const debug = require('debug')('combination:large');

/**
 * Constructor
 * @param params
 * @constructor
 */
function Combine (params) {
    this.list = params.list;
    this.size = params.list.length;
    this.range = params.range;
    this.combinations = _numberOfCombinations(this.size, this.range);
    this.currentPosition = 1;
    this.targetPosition = 0;
    this.lastFound = null;

    debug(JSON.stringify(this.combinations, null, 2));

    return;
}

/**
 * Get next combination
 * @returns {*}
 */
Combine.prototype.next = function() {

    let self = this;

    self.targetPosition++;

    return self._combine();

};

/**
 * Get previous combination
 * @returns {*}
 */
Combine.prototype.previous = function() {

    let self = this;

    self.targetPosition--;

    return self._combine();

};

/**
 * Get latest combination position
 * @returns {number|*}
 */
Combine.prototype.getLastPosition = function() {
    return this.targetPosition;
};

/**
 * Return
 * @returns {number}
 */
Combine.prototype.getNumberOfCombinations = function() {

    if(this.combinations && this.combinations.total) return this.combinations.total;
    else return 0;

};

/**
 * Get an specific combination base on it's position
 * @param position
 * @returns {*}
 */
Combine.prototype.get = function(position) {

    let self = this;

    self.targetPosition = position;

    return self._combine();

};

Combine.prototype.reset = function() {
    this.targetPosition = 0;
};

/**
 * Private Method: Prepare combination process
 * @returns {null|*}
 * @private
 */
Combine.prototype._combine = function() {

    let self = this;

    self.lastFound = null;

    let position = self._getPositions(self.targetPosition);

    if(!position) return null;

    self.currentPosition = position.start -1;

    let blankSpots = self.size - position.pos;
    let fill = position.pos;

    let result = self._combineSequence([], 0, blankSpots, fill, position);

    result = result.map(function(i) {
        if(self.list[i]) return self.list[i];
    });

    result = result.filter(function(i) {
        if(typeof i !== 'undefined' && i !== null) return i;
    });

    return result;

};

/**
 * Private Method: Run combination
 * @param result
 * @param currentLevel
 * @param blankSpots
 * @param fill
 * @param position
 * @returns {*}
 * @private
 */
Combine.prototype._combineSequence = function(result, currentLevel, blankSpots, fill, position) {

    let self = this;

    for(let i = 0; i < 2; i++) {

        if(self.currentPosition === self.targetPosition)return result;

        debug('currentLevel:', currentLevel);
        debug('blankSpots: ', blankSpots);
        debug('fill: ', fill);
        debug('position: ', JSON.stringify(position, null, 2));
        debug('currentPosition', self.currentPosition);
        debug('targetPosition', self.targetPosition);

        result.splice(currentLevel, self.size-currentLevel);

        debug('i: ', i);

        if(i === 0 && blankSpots > 0) {

            result[currentLevel] = null;
            debug('result 1: ', result);
            if (currentLevel + 1 < self.size) result = self._combineSequence(result, currentLevel + 1, blankSpots - 1, fill, position);

        } else if(fill > 0) {

            result[currentLevel] = currentLevel;
            debug('result 3: ', result);
            if(currentLevel + 1 < self.size) result = self._combineSequence(result, currentLevel + 1, blankSpots, fill - 1, position);

        }

        let currentFound = result.join('-');

        if(currentLevel + 1 === self.size && currentFound !== self.lastFound) {
            self.lastFound = currentFound;
            self.currentPosition++;
            return result;
        }

    }

    return result;

};

/**
 * Private Method: Get position list
 * @param position
 * @returns {null|*}
 * @private
 */
Combine.prototype._getPositions = function(position) {

    if(this.combinations.total < position) return null;

    for(let i in this.combinations.list) {
        if(position >= this.combinations.list[i].start && position <= this.combinations.list[i].end) {
            return this.combinations.list[i];
        }
    }

    return null;

};

/**
 * Private Method: Get Combination Map strategy
 * @param size
 * @param range
 * @returns {{total: number, list: {}}}
 * @private
 */
function _numberOfCombinations(size, range) {

    if(!range) {
        range = {
            min: 1,
            max: size
        }
    } else {
        if(!range.min) {
            range.min = 1;
        }
        if(!range.max) {
            range.max = size;
        }
    }

    let result = {
        total: 0,
        list: {}
    };

    for(let i = range.min; i <= range.max; i++) {
        result.list[i] = {};
        result.list[i].pos = i;
        result.list[i].qty = Math.round(_fac(size) / (_fac(i) * _fac(size - i)));
        result.list[i].start = result.list[i-1] ? result.list[i-1].end + 1 : 1;
        result.list[i].end = result.list[i].start + result.list[i].qty - 1;
        result.total += result.list[i].qty;
    }

    return result;

}

/**
 * Private Method: Factorial function
 * @param n
 * @returns {number}
 * @private
 */
function _fac(n){
    return(n<2)?1:_fac(n-1)*n;
}

module.exports = Combine;



