const network = new brain.NeuralNetwork();

network.train([
  { input: { r: 0.62, g: 0.72, b: 0.88 }, output: { white: 1 } },
  { input: { r: 0.1, g: 0.84, b: 0.72 }, output: { white: 1 } },
  { input: { r: 0.33, g: 0.24, b: 0.29 }, output: { dark: 1 } },
  { input: { r: 0.74, g: 0.78, b: 0.86 }, output: { white: 1 } },
  { input: { r: 0.31, g: 0.35, b: 0.41 }, output: { dark: 1 } },
  { input: { r: 1, g: 0.99, b: 0 }, output: { white: 1 } },
  { input: { r: 1, g: 0.42, b: 0.52 }, output: { dark: 1 } },
]);

document.querySelector('#color-picker').addEventListener('change', e => {
  const result = brain.likely(getRgb(e.target.value), network);
  document.querySelector('body').style.background = e.target.value
  document.querySelector('#texto-container').style.color = result === 'dark' ? 'white' : 'black'
});

function getRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
    g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
    b: Math.round(parseInt(result[3], 16) / 2.55) / 100,
  } : null;
}