const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭────✧${𖣘𝑴𝑨𝑿𝑾𝑬𝑳𝑳-𝑴𝑫♡}✧────◆
│   *P𝕣𝕖𝕗𝕝𝕚𝕩* : ${s.PREFIXE}
│   *𝕠𝕨𝕟𝕖𝕣* : ${s.OWNER_NAME}
│   *Mode* : ${mode}
│   *Commands* : ${cm.length}
│   *Date* : ${date}
│   *Hour* : ${temps}
│   *M𝕖𝕞𝕠𝕣𝕪* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│   *𝕡𝕝𝕒𝕥𝕗𝕠𝕣𝕞* : ${os.platform()}
│   *D𝕖𝕧𝕠𝕝𝕠𝕡𝕖𝕣* :𝙼𝙰𝚇𝚆𝙴𝙻𝙻 
│ *𝕔𝕦𝕤𝕥𝕠𝕞𝕖𝕣 𝕤𝕖𝕧𝕚𝕔𝕖:https://wa.me/2349120730021
╰─────✧𖣘𝑴𝑨𝑿𝑾𝑬𝑳𝑳-𝑴𝑫♡●✧─────◆ \n\n`;
    
let menuMsg = `
👋  what's up${nomAuteurMessage} 👋

*𝚕𝚒𝚜𝚝 𝚘𝚏 𝚖𝚊𝚡𝚠𝚎𝚕𝚕 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 :*
◇                             ◇
`;

    for (const cat in coms) {
        menuMsg += `╭────❏ ${cat} ❏`;
        for (const cmd of coms[cat]) {
            menuMsg += `
│ ${cmd}`;
        }
        menuMsg += `
╰═════════════⊷ \n`
    }

    menuMsg += `
◇            ◇
*»»—————𝑴𝑨𝑿𝑾𝑬𝑳𝑳-𝑴𝑫—————««*
"To use a command, insert ${prefixe} followed by the command_name."
 
    Powered by 𖣘𝑴𝑨𝑿𝑾𝑬𝑳𝑳-𝑴𝑫♡●
                                                
*»»————— 𝑴𝑨𝑿𝑾𝑬𝑳𝑳 —————««*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *𖣘𝑴𝑨𝑿𝑾𝑬𝑳𝑳-𝑴𝑫♡●*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *𖣘𝑴𝑨𝑿𝑾𝑬𝑳𝑳-𝑴𝑫♡●*, développé par Djalega++" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
