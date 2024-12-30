const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({ context, width, height }) => {
    // Fill the background with black
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;

    const w = width * 0.10;
    const h = height * 0.10;
    const gap = width * 0.03;
    const ix = width * 0.17;
    const iy = height * 0.17;

    const off = width * 0.02;

    let x, y;

    // Helper function to generate random RGB color
    function getRandomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return { r, g, b };
    }

    // Helper function to invert RGB color (for light colors on black background)
    function invertColor({ r, g, b }) {
      return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
    }

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;

        // Set the outer rectangle color to white
        context.fillStyle = 'white';
        context.beginPath();
        context.rect(x, y, w, h);
        context.fill();
        context.stroke();

        if (Math.random() > 0.5) {
          // Generate random color for the inner rectangle
          const randomColor = getRandomColor();
          const invertedColor = invertColor(randomColor);

          // Set the inner rectangle to the random inverted color
          context.fillStyle = invertedColor;
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.fill();
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
