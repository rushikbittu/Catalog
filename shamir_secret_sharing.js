const fs = require("fs");

// Function to parse and decode the JSON input
function parseTestCase(filePath) {
  const rawData = fs.readFileSync(filePath);
  const data = JSON.parse(rawData);

  const { n, k } = data.keys;
  const points = Object.entries(data)
    .filter(([key, _]) => key !== "keys")
    .map(([x, obj]) => [parseInt(x), parseInt(obj.value, parseInt(obj.base))]);

  return { points, k };
}

// Function to compute Lagrange interpolation at x=0
function lagrangeInterpolation(points, k) {
  let secret = 0;

  for (let i = 0; i < k; i++) {
    let [xi, yi] = points[i];
    let li = 1;

    for (let j = 0; j < k; j++) {
      if (i !== j) {
        let [xj, _] = points[j];
        li *= -xj / (xi - xj);
      }
    }

    secret += yi * li;
  }

  return Math.round(secret);
}

// Main execution
function main() {
  const testCase1 = parseTestCase("input1.json");
  const testCase2 = parseTestCase("input2.json");

  const secret1 = lagrangeInterpolation(testCase1.points, testCase1.k);
  const secret2 = lagrangeInterpolation(testCase2.points, testCase2.k);

  console.log("Secret for Test Case 1:", secret1);
  console.log("Secret for Test Case 2:", secret2);
}

main();