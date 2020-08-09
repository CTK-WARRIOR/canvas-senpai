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
**gradient**: Add gradient image as background image of welcome image || String
```js
 let data = await canva.welcome(member, { gradient: "peakblue" })
 //GRADIANTS NAME - coldsky, peakblue, pinkman, aqua, darkness, angel
```



## UPCOMING

 - Rank Card
 - Leave Image
 - Fun Images
 - Profile Card
