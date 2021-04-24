# CANVAS SENPAI FOR DISCORD
Package that will let you do canvas things very easily :D

## WELCOME IMAGE GENERATOR

```js
const Discord = require("discord.js");
const client = new Discord.Client();
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();

client.once("ready", () => {
  console.log("Ready!");
});


client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
	if (!channel) return;

   let data = await canva.welcome(member, { link: "https://wallpapercave.com/wp/wp5128415.jpg" })

    const attachment = new Discord.MessageAttachment(
      data,
      "welcome-image.png"
    );

    channel.send(
      `Welcome to the server, ${member.user.username}!`,
      attachment
    );   
   });

client.login("TOKEN");
```

![](https://cdn.discordapp.com/attachments/636154061724450826/735537767483965511/unknown.png)

### OPTIONS OF WELCOME

```js
let data = await canva.welcome(member, {options})
```

**link**: Link of the background image of welcome image || String
```js
  let data = await canva.welcome(member, { link: "https://wallpapercave.com/wp/wp5128415.jpg" })
```
**blur**: Disable and enable blur effect (default = true) || Boolean
```js
 let data = await canva.welcome(member, { link: "https://wallpapercave.com/wp/wp5128415.jpg", blur: false }) //Disables The Blur
```
**gradiant**: Add gradiant image as background image of welcome image || String
```js
 let data = await canva.welcome(member, { gradiant: "peakblue" })
 //GRADIANTS NAME - coldsky, peakblue, pinkman, aqua, darkness, angel
```

**block**: Remove the transparent image from image
```js
 let data = await canva.welcome(member, { link: "https://wallpapercave.com/wp/wp5128415.jpg", block: false })
```



## RANK CARD(CUSTOM BKGROUND)

```js
const Discord = require("discord.js");
const client = new Discord.Client();
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();


client.on("ready", () => {
  console.log("ready to test")
})

client.on("message", async message => {
  if(message.content === "!rank") {
    
   let data = await canva.rankcard(
     {
       link: "https://i.pinimg.com/originals/76/0e/d7/760ed7f52c90870503762ac92db92adc.jpg",
       name: message.author.username,
       discriminator: message.author.discriminator,
       level: 10,
       rank: 6,
       currentXP: 679,
       fullXP: 1000,
       avatar: message.author.displayAvatarURL({ format: "png"})
     
     })


    
     const attachment = new Discord.MessageAttachment(
     data,
      "rank.png"
    );
 
    message.channel.send(
      ``,
      attachment
    );   
    
    
    
  }
})

client.login("TOKEN")
```

## RESULT
![](https://cdn.discordapp.com/attachments/636154061724450826/738711754791452702/unknown.png)


## PROFILE CARD (v1)
```js
const Discord = require("discord.js");
const client = new Discord.Client();
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();


client.on("ready", () => {
  console.log("ready to test")
})

client.on("message", async message => {
  if(message.content === "!rank") {
    
   let data = await canva.profile(
     {
      name: message.author.username,
      discriminator: message.author.discriminator,
      avatar: message.author.displayAvatarURL({format: "png"}),
      rank: 1,
      xp: 8989,
      blur: false
     })

     const attachment = new Discord.MessageAttachment(
     data,
      "profile.png"
    );
 
    message.channel.send(
      ``,
      attachment
    );   
    
    
    
  }
})

client.login("TOKEN")
```

## RESULT
![](https://cdn.discordapp.com/attachments/675669552796925987/835234694353518624/welcome-image.png)