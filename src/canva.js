const Canvas = require("canvas");
const jimp = require("jimp");
const gradians = require("../gradiants.json");
class CanvasSenpai {
  async welcome(member, { link, gradiant, blur } = {}) {
    if (blur !== false) {
      blur = true;
    }
    if (link && gradiant) {
      return console.log("You can not use link and gradiant at a same time");
    }

    if (!link) {
      if (gradiant) {
        let color = gradians.find(x => x.name === gradiant.toLowerCase());
        if (!color) {
          return console.log("Invalid Gradiant Color :v");
        }

        link = color.link;
      } else {
        link = "https://coverfiles.alphacoders.com/470/47086.png";
      }
    }

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");
    if (blur) {
      const background = await jimp.read(link);

      background.blur(5);

      let mraw = await background.getBufferAsync("image/png");

      const fixedbkg = await Canvas.loadImage(mraw);

      ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
    } else {
      const fixedbkg = await Canvas.loadImage(link);

      ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
    }

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    let blurImage = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/735118044145123348/735477847526998077/20200722_181613.png"
    );

    ctx.drawImage(blurImage, 0, 0, canvas.width, canvas.height);
    let xname = member.user.username;

    ctx.font = `bold 36px Life`;
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "start";
    ctx.strokeStyle = "#f5f5f5";

    const name =
      xname.length > 12 ? xname.substring(0, 12).trim() + "..." : xname;
    ctx.fillText(`${name}`, 278, 113);
    ctx.strokeText(`${name}`, 278, 113);

    ctx.font = `bold 20px Life`;
    ctx.fillStyle = "#FFFFFF";

    ctx.fillText(`#${member.user.discriminator}`, 278, 160);

    let image = await jimp.read(
      member.user.displayAvatarURL({ format: "jpg", dynamic: true })
    );
    image.resize(1024, 1024);
    image.circle();
    let raw = await image.getBufferAsync("image/png");

    const avatar = await Canvas.loadImage(raw);
    // Draw a shape onto the main canvas
    ctx.drawImage(avatar, 72, 48, 150, 150);

    return canvas.toBuffer();
  }
}

module.exports = CanvasSenpai;
