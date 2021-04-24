const Canvas = require("canvas");
const jimp = require("jimp");
const { getAverageColor } =  require('fast-average-color-node');

const gradians = require("./gradiants.json");
class CanvasSenpai {


  /**
   [*]: it means the option is required
   
   * @param {Object} [options]
   * @param {string} *[options.name] ( Name of the person )
   * @param {string | number} *[option.discriminator] ( discriminator of the person )
   * @param {string} *[options.avatar] ( Avatar URL of person, it should be in png or jpg)
   * @param {number | string} *[options.rank] ( Rank of the person )
   * @param {number | string} *[options.xp] ( Xp of the person )
   * @param {string} [options.background] ( background of the image)
   * @param {string} [options.cardLight] ( color of back overlay of image )
   * @param {string} [options.cardDark] ( color of front overly of image)
   * @param {boolean} [options.blue] ( wheater you want blue bkg or not)
   * 
   */

  async profile({ name, discriminator, avatar, rank, xp, background, cardLight, cardDark, blur=true } = {}) {

    if (!name) throw new Error("profile name is not given")
    if (!avatar) throw new Error("Avatar image url is not given")
    if (!rank) throw new Error("Rank is not given.")
    if (!xp) throw new Error("Xp is not given.")
    let color = await getAverageColor(background ? background : __dirname  + "/images/erased.png")
    if(!color.hex) color = "black";
    else color = color;
  

    const canvas = Canvas.createCanvas(740, 259)
    const ctx = canvas.getContext('2d')
  
  if(blur) {
    background = await jimp.read(background ? background :  __dirname  + "/images/erased.png");
    background.blur(5);
    let image = await background.getBufferAsync("image/png");
    image = await Canvas.loadImage(image);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  } else {
    let image = await Canvas.loadImage(background ? background : __dirname + "/images/erased.png");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

    ctx.fillStyle = cardLight ? cardLight : color.hex;
    ctx.globalAlpha = 0.8
    ctx.fillRect(43, 0, 170, 300);
    ctx.globalAlpha = 1;

    avatar = await jimp.read(avatar);
    avatar.resize(1024, 1024);
    let raw = await avatar.getBufferAsync("image/png");
    avatar = await Canvas.loadImage(raw);
    ctx.drawImage(avatar, 53, 15, 150, 150);

    ctx.fillStyle = cardDark ? cardDark : "black";
    ctx.globalAlpha = 0.2;
    ctx.fillRect(53, 180, 150, 30);
    ctx.fillRect(53, 220, 150, 30);
    ctx.fillRect(720 - (name.length >= 29 ? (29 * 12) : (name.length * 12.5)  ), 13.5, 400, 30);
    ctx.fillRect(650, 50, 200, 25)
     ctx.globalAlpha = 1;

    ctx.fillStyle = "white"
    ctx.font = `20px Bold`;
    ctx.textAlign = "center";
    ctx.globalAlpha = 0.8;
    ctx.fillText("RANK : #" + rank, 125, 202)
    ctx.globalAlpha = 1;

    ctx.font = `bold 20px Bold`;
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.strokeStyle = "#f5f5f5";
    ctx.globalAlpha = 0.8;
    ctx.fillText("XP : " + xp, 126, 242)
    ctx.globalAlpha = 1;

    ctx.font = `bold 20px Manrope`;
    name = name.length > 29 ? name.substring(0, 29).trim() + ".." : name;
    ctx.textAlign = "right"
    ctx.fillText(`${name}`, 730, 35);
    ctx.fillText(`#${discriminator}`, 730, 69.5);

    return canvas.toBuffer();
  }


  /**
   * @param {object} *[member]
   * @param {object} *[options]
   * @param {string} *[options.link]
   * @param {boolean} [options.blur]
   * @param {boolean} [options.block]
   */


  async welcome(member, { link, gradiant, blur, block } = {}) {
   blur !== false ? blur = true : blur


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

    const font = 'Manrope';

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

    if (block !== false) {

      let blurImage = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/735118044145123348/735477847526998077/20200722_181613.png"
      );


      ctx.drawImage(blurImage, 0, 0, canvas.width, canvas.height);
    }
    let xname = member.user.username;

    ctx.font = `bold 36px ${font}`;
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "start";
    ctx.strokeStyle = "#f5f5f5";

    const name =
      xname.length > 12 ? xname.substring(0, 12).trim() + "..." : xname;
    ctx.fillText(`${name}`, 278, 113);
    ctx.strokeText(`${name}`, 278, 113);

    ctx.font = `bold 20px ${font}`;
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

  /**
   * @param {object} *[options]
   * @param {string} *[options.name]
   * @param {string} *[options.discriminator]
   * @param {string | number} *[options.currentXP]
   * @param {string | number} *[options.fullXP]
   * @param {string | number} *[options.level]
   * @param {string | number} *[options.rank]
   * @param {string} *[options.avatar]
   * @param {string} [options.gradiant]
   * @param {boolean} [options.block]
   */

  async rankcard({
    name,
    discriminator,
    currentXP,
    fullXP,
    level,
    rank,
    avatar,
    link,
    gradiant,
    block
  } = {}) {

    if (!name) throw new Error("Please provide the name of the person");
    if (!discriminator)
      throw new Error(
        "Please provide the discriminator of person as it is main element in rank card."
      );
    if (!currentXP)
      throw new Error(
        "Its madatory to have current xp of the person to show stats."
      );
    if (!fullXP) throw new Error("Its madatory to have Full xp number.");
    if (!level) {
      throw new Error("You did not gave Level of the person");
    }
    if (!rank) throw new Error("You did not gave Rank of the person");
    if (!avatar) throw new Error("Avatar is missing");
    if (!link) {
      if (!gradiant) {
        throw new Error("Please give link of background image");
      }
    }


    if (gradiant) {
      if (link) throw new Error("You can not use link and gradiant at a same time")
      let color = gradians.find(x => x.name === gradiant.toLowerCase());
      if (!color) {
        throw new Error("Invalid Color name")
      }

      link = color.link;

    }


    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");

    const background = await jimp.read(link);
    const font = 'Manrope';
    background.blur(5);

    let mraw = await background.getBufferAsync("image/png");

    const fixedbkg = await Canvas.loadImage(mraw);

    ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    if (block !== false) {
      let blurImage = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/636154061724450826/738273549525057556/20200730_112506.png"
      );

      ctx.drawImage(blurImage, 0, 0, canvas.width, canvas.height);
    }

    let image = await jimp.read(avatar);
    image.resize(1024, 1024);
    image.circle();
    let raw = await image.getBufferAsync("image/png");

    const profile = await Canvas.loadImage(raw);

    ctx.drawImage(profile, 44, 48, 155, 155);
    ctx.font = `bold 20px ${font}`;
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "start";
    ctx.strokeStyle = "#f5f5f5";

    const xname =
      name.length > 18 ? name.substring(0, 18).trim() + "..." : name;
    ctx.fillText(`${name}`, 340, 52);

    ctx.font = `bold 20px ${font}`;
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "start";
    ctx.strokeStyle = "#f5f5f5";

    ctx.fillText(`${discriminator}`, 580, 84);

    let x = 240;
    let y = 142;
    ctx.font = `bold 22px ${font}`;
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "start";
    ctx.fillText(
      "/ " + change(fullXP),
      x + ctx.measureText(change(currentXP)).width + 15,
      y
    );

    ctx.fillText(change(currentXP), x, y);

    let converted = currentXP;
    if (typeof currentXP === "string") converted = parseInt(currentXP)
    let widthXP = (converted * 439) / fullXP;
    if (widthXP > 439 - 18.5) widthXP = 439 - 18.5
    ctx.beginPath();

    ctx.fillRect(239, 119.5 + 36.25, widthXP, 23.5);


    const RankN = rank.length > 5 ? rank.substring(0, 5).trim() + "+" : rank;
    ctx.fillText(`${RankN}`, 310, 210);

    const levelN =
      level.length > 6 ? level.substring(0, 6).trim() + "+" : level;
    ctx.fillText(`${levelN}`, 500, 210);

    return canvas.toBuffer();
  }

  }


/* Functions */

function change(num) {
  if (!num) return "NaN";
  if (typeof num === "string") num = parseInt(num);
  let decPlaces = Math.pow(10, 1);
  var abbrev = ["K", "M", "B", "T"];
  for (var i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);
    if (size <= num) {
      num = Math.round((num * decPlaces) / size) / decPlaces;
      if (num == 1000 && i < abbrev.length - 1) {
        num = 1;
        i++;
      }
      num += abbrev[i];
      break;
    }
  }
  return num;
}

module.exports = CanvasSenpai;
