// 'use strict'
//
// function Combine (params) {
//     this.list = params.list;
//     this.size = params.list.length;
//     this.max = numberOfCombinations(this.size);
//     this.lastPos = {
//         currentPosition: 0,
//         start: 0,
//         currentLevel: 0,
//         result: []
//     };
//
//     this.targetPosition = 0;
//     this.currentPosition = 0;
//
//     return;
// }
//
// /*Combine.prototype.combine = function(result, currentLevel) {
//
//     let self = this;
//
//     for(let i = currentLevel; i < self.size; i++) {
//
//         if(self.currentPosition >= self.targetPosition) {
//             console.log('XXXXXXXXX');
//             break;
//         }
//
//         result.splice(currentLevel, self.size-currentLevel);
//         //result[currentLevel] = self.list[i];
//         result.push(self.list[i]);
//
//         self.currentPosition++;
//
//         console.log('---------------------------------------');
//         console.log('i: ', i);
//         console.log('result: ', result);
//         console.log('targetPosition: ', self.targetPosition);
//         console.log('currentPosition: ', self.currentPosition);
//         console.log('currentLevel: ', currentLevel);
//
//         if(i < self.size && self.targetPosition > self.currentPosition) {
//             console.log('Submerge to: ', i + 1);
//             result = self.combine(result, i + 1);
//         }
//
//     }
//
//     return result;
//
// };*/
//
// Combine.prototype.combine=function(result, start, currentLevel){
//
//     let self = this;
//
//     for(let i = start; i < self.size; i++) {
//
//         if(self.currentPosition >= self.targetPosition) {
//             //console.log('XXXXXXXXX');
//             break;
//         }
//
//         result.splice(currentLevel, self.size-currentLevel);
//         result[currentLevel] = self.list[i];
//         //result.push(self.list[i]);
//
//         self.currentPosition++;
//
//         console.log('---------------------------------------');
//         console.log('i: ', i);
//         console.log('result: ', result);
//         console.log('targetPosition: ', self.targetPosition);
//         console.log('currentPosition: ', self.currentPosition);
//         console.log('start: ', start);
//         console.log('currentLevel: ', currentLevel);
//
//         if(i < self.size && self.currentPosition < self.targetPosition) {
//             //console.log('Submerge to: ', (currentLevel + 1) + ' with start: ' + (i + 1));
//             result = self.combine(result, i + 1, currentLevel + 1);
//         }
//
//     }
//
//     return result;
//
// };
//
// Combine.prototype.next = function() {
//
//     let self = this;
//
//     self.targetPosition++;
//
//     if(self.targetPosition > self.max) return null;
//
//     self.currentPosition = 0;
//
//     return self.combine([], 0, 0);
//
// };
//
// function numberOfCombinations(size, dec, result) {
//     if(dec === 0) return result;
//     if(!result) result = 0;
//     if(!dec) dec = size;
//     result = result + fac(size) / (fac(dec) * fac(size - dec));
//     return numberOfCombinations(size, dec-1, result);
// }
//
// function fac(n){
//     return(n<2)?1:fac(n-1)*n;
// }
//
// module.exports = Combine;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
