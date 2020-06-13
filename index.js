// import mathJS module
const { evaluate, round, derivative, abs } = require('mathjs');

// Global definations
let Fxy = 'x^2 + y';
let stepSize = 0.2;
let lowerLimitOfX = 0;
let upperLimitOfX = 1;
let initialValueOfY = 1;

// NewtonRaphson method
function NewtonRaphson(X, h, Y, fxyz) {
    let count = 1;
    let localError = 1;
    let finalZ;
    let initialZ = Y;
    while (localError > 0.0001) {
        finalZ = initialZ - ((evaluate(fxyz, { x: X, y: Y, z: initialZ, h: h })) /
            (derivative(fxyz, 'z').evaluate({ x: X, y: Y, z: initialZ, h: h })))
        localError = abs(finalZ - initialZ)
        initialZ = finalZ;
        count++
        if (count > 50) break;
    }
    return round(finalZ, 6)
}

// Euler Backward Method
let count = round((upperLimitOfX - lowerLimitOfX) / stepSize)
console.log('Count', count)
let endX = lowerLimitOfX;
let endY = initialValueOfY;
let fxyz = `z - y - (h * (${Fxy.replace('y','z')}))`
console.log(fxyz)
let beforeX = 0,
    beforeY = 0,
    i;

for (i = 1; i <= count + 1; i++) {
    console.log(`For iteration ${i}`)

    beforeX = endX
    beforeY = endY
    console.log('X : ', round(beforeX, 6))
    console.log('Y :', round(endY, 6))
    endY = NewtonRaphson(beforeX, stepSize, beforeY, fxyz)
    endX = beforeX + stepSize
}