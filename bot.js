const Discord = require("discord.js"); 

const PREFIX = "s!"

function generateHex() {
    return "#"+Math.floor(Math.random()*16777215).toString(16);
}

var fortunes = [
    "Yes.",
    "No.",
    "Maybe."
];

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("Ready");
});

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "𝔀𝓮𝓵𝓬𝓸𝓶𝓮").sendMessage(member.toString() + " Welcome! Make sure you read the rules so the mods don't fuck you. Enjoy your stay.");

    member.addRole(member.guild.roles.find("name", "New"));

    member.guild.createRole({
        name: member.user.username,
        color: generateHex(),
        permissions: []
    }).then(function(role) {
        member.addRole(role);
    });
});



bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    
    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "help":
        var embed = new Discord.RichEmbed()
                  .addField("s!Help/info", "Various help and informational messages.", true)
                  .addField("s!Question", "Yes-no question.")
                  .addField("Test Title", "Test Description", true)
                  .addField("Test Title", "Test Description", true)
                  .addField("Test Title", "Test Description", true)
                  .setColor(0x00FFFF)
                  .setFooter("Still Working. :)")
                  .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(embed);
            break;
        case "info":
        var embed = new Discord.RichEmbed()
                 .setDescription("Bot was created by Scutch")
        message.channel.sendEmbed(embed);
        break;
        case "question":
           if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
           else message.channel.sendMessage("Can't read that.");
           break;
        case "mention":  
        message.channel.sendMessage(message.author.toString() + " test");
        break;
        case "removerole":
             message.member.removeRole(message.guild.roles.find("name", "-"));
             break;
        case "deleterole":
            message.guild.roles.find("name", "-r").delete();
            break;
        default:
               message.channel.sendMessage("Invalid command.");
    }
});

client.login(process.env.BOT_TOKEN);
