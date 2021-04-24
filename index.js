const Canvas = require("canvas")

Canvas.registerFont(`${__dirname}/fonts/LemonMilk.otf`, { family: "Bold" });
Canvas.registerFont(`${__dirname}/fonts/JosefinSans-Regular.ttf`, { family: "Normal" });
Canvas.registerFont(__dirname + '/fonts/normal.ttf', {
  family: 'Manrope',
  weight: 'regular',
  style: 'normal'
});
Canvas.registerFont(__dirname + '/fonts/bold.ttf', {
  family: 'Manrope',
  weight: 'bold',
  style: 'normal'
});


module.exports = {
  CanvasSenpai: require("./src/canva.js")
}


