const fs = require('fs');

function decodeValue(value, base) {
    return parseInt(value, base);
}

function lagrangeInterpolation(xValues, yValues, degree) {
    let c = 0;
    for (let i = 0; i <= degree; i++) {
        let numerator = 1;
        let denominator = 1;
        for (let j = 0; j <= degree; j++) {
            if (i !== j) {
                numerator *= (0 - xValues[j]);
                denominator *= (xValues[i] - xValues[j]);
            }
        }
        c += yValues[i] * (numerator / denominator);
    }
    return Math.round(c); 
}

function findSecret(jsonInput) {
    const data = JSON.parse(jsonInput);
    const n = data.keys.n;
    const k = data.keys.k;
    const m = k - 1; 

    const xValues = [];
    const yValues = [];

    for (const key in data) {
        if (key !== 'keys' && data.hasOwnProperty(key)) {
            const x = parseInt(key);
            const base = parseInt(data[key].base);
            const y = decodeValue(data[key].value, base);
            xValues.push(x);
            yValues.push(y);
        }
    }

    const selectedX = xValues.slice(0, k);
    const selectedY = yValues.slice(0, k);

    const c = lagrangeInterpolation(selectedX, selectedY, m);
    return c;
}

// Test Case 1
const jsonInput1 = `
{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}
`;

// Test Case 2
const jsonInput2 = `
{
    "keys": {
        "n": 10,
        "k": 7
    },
    "1": {
        "base": "6",
        "value": "13444211440455345511"
    },
    "2": {
        "base": "15",
        "value": "aed7015a346d63"
    },
    "3": {
        "base": "15",
        "value": "6aeeb69631c227c"
    },
    "4": {
        "base": "16",
        "value": "e1b5e05623d881f"
    },
    "5": {
        "base": "8",
        "value": "316034514573652620673"
    },
    "6": {
        "base": "3",
        "value": "2122212201122002221120200210011020220200"
    },
    "7": {
        "base": "3",
        "value": "20120221122211000100210021102001201112121"
    },
    "8": {
        "base": "6",
        "value": "20220554335330240002224253"
    },
    "9": {
        "base": "12",
        "value": "45153788322a1255483"
    },
    "10": {
        "base": "7",
        "value": "1101613130313526312514143"
    }
}
`;

const secret1 = findSecret(jsonInput1);
const secret2 = findSecret(jsonInput2);

console.log("Secret for Test Case 1:", secret1);
console.log("Secret for Test Case 2:", secret2);