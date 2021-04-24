const Canvas = require("canvas")

Canvas.registerFont(`${__dirname}/src/fonts/LemonMilk.otf`, { family: "Bold" });
Canvas.registerFont(`${__dirname}/src/fonts/JosefinSans-Regular.ttf`, { family: "Normal" });
Canvas.registerFont(__dirname + '/src/fonts/normal.ttf', {
  family: 'Manrope',
  weight: 'regular',
  style: 'normal'
});
Canvas.registerFont(__dirname + '/src/fonts/bold.ttf', {
  family: 'Manrope',
  weight: 'bold',
  style: 'normal'
});


module.exports = {
  CanvasSenpai: require("./src/canva.js")
}

