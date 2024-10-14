let defaultplayerstable24 = null;
let defaultplayernamestable24 = null;
let defaultdcplayernamestable24 = null;
let defaultnationstable24 = null;
let burnedplayerids=[];
let newplayers=null;

function makeplayers(){

    loggerupdate("• Making players");
    let outputplayers=[];
    let gender = document.getElementById("makewomenchx").checked ? 1 : 0;

    newplayers.forEach(player => { 

        player=parsetemplateplayer(player);
        
        let demo=builddemographics(
            player.height || 180, 
            player.weight || 75, 
            player.birthdate || Date.parse("01/01/2000"), 
            player.foot || "Right",
            player.weakfoot || "Bad",
            player.finovr);

        let appr=buildplayerappearances(
            gender || 0, 
            player.nat || "Uganda");

        

        let attr=buildplayerattributes(
            player.pos1??14, 
            player.pos2??-1, 
            player.pos3??-1, 
            player.pos4??-1, 
            player.finovr, 
            player.age);

        let othr={
            playerid: findplayerid(player.playerid) || 0,
            nationality: defaultnationstable24.find(nation => nation.nationname === player.nat).nationid || 146,
            firstname: player.given || "",
            surname: player.sur || "",
            playerjerseyname: player.jersey || "",
            commonname: player.nick || "",
            firstnameid: findnameid(player.given),
            lastnameid: findnameid(player.sur),
            playerjerseynameid: findnameid(player.jersey),
            commonnameid: findnameid(player.nick),
            gkglovetypecode: getgkglove() || 73,
            jerseystylecode: 1,
            attackingworkrate: player.attwrk || 0,
            defensiveworkrate: player.defwrk || 0,
            skillmoves: player.skillmoves || 0,
            trait2: 0,
            tattooback: 0,
            accessorycode4: 0,
            gksavetype: randbetween(0, 1),
            tattooleftarm: 0,
            animpenaltiesstartposcode: 0,
            isretiring: 0,
            shoecolorcode2: 31,
            socklengthcode: randbetween(0, 2),
            finishingcode1: 0,
            accessorycode3: 0,
            accessorycolourcode1: 0,
            driref: 66,
            hasseasonaljersey: 0,
            shoetypecode: getshoe(),
            tattoohead: 0,
            tattooleftleg: 0,
            phypos: 66,
            trait1: 0,
            hashighqualityhead: 0,
            tattoorightarm: 0,
            headassetid: 267277,
            defspe: 62,
            usercaneditname: 1,
            avatarpomid: 0,
            finishingcode2: 0,
            paskic: 66,
            iscustomized: 1,
            runningcode2: 0,
            modifier: 0,
            jerseysleevelengthcode: 0,
            accessorycolourcode3: 0,
            accessorycode1: 0,
            playerjointeamdate: 160273,
            headclasscode: 1,
            tattoofront: 0,
            gkkickstyle: 0,
            accessorycolourcode4: 0,
            headvariation: 0,
            skillmoveslikelihood: 2,
            shohan: 60,
            shortstyle: 0,
            smallsidedshoetypecode: 503,
            emotion: 2,
            runstylecode: 0,
            jerseyfit: 0,
            accessorycode2: 0,
            shoedesigncode: 0,
            shoecolorcode1: 30,
            hairstylecode: 0,
            bodytypecode: 0,
            pacdiv: 60,
            runningcode1: 0,
            role3: 0,
            eyedetail: 0,
            skinsurfacepack: 0,
            role2: 0,
            role1: 0,
            skincomlexion: 0,
            accessorycolourcode2: 0,
            tattoorightleg: 0,
            faceposerpreset: randbetween(0, 4),
            contractvaliduntil: randbetween(2025,2029),
            icontrait1: 0,
            icontrait2: 0,
            muscularitycode: 0,
            animfreekickstartposcode: 0
    }
        
        outputplayers.push({...demo, ...appr, ...attr, ...othr});
    });

    loggerupdate("• Players made" + " (" + outputplayers.length + " players made)");
    
    let output = playerstableobjtostring24(outputplayers);

    loggerupdate("• Downloading players.txt");
    const now = new Date();
    const datetimeString = `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
    
    downloadtxt(output, `rm24output-players.txt-${datetimeString}.txt`);
    
    loggerupdate("• Building editedplayernames.txt");
    let editedplayernamesoutput=editedplayernamesobjtostring24(outputplayers);
    downloadtxt(editedplayernamesoutput, `rm24output-editedplayernames.txt-${datetimeString}.txt`);
    loggerupdate("• All done! Happy Modding!");
}

async function startup(){
    await loaddefaults();
    logplayerids();
    guishow();
}

async function loaddefaults(){
    loggerupdate("• Starting up ");
    loggerupdate("• Loading default tables");

    loggerupdate("• Loading default players.txt");
    
      let playersfilecontent = await fetchfile('https://cdn.jsdelivr.net/gh/scyppan/Roster-Maker-24@v0.0.1/eafc24defaultplayers.txt', 'utf-16le');
  
      defaultplayerstable24 = await readtxtfile(playersfilecontent); // fileContent is a string, not a File or Blob
      if(defaultplayerstable24){
          loggerupdate("• Default players.txt loaded");
      }else{
          loggerupdate("• Error loading default players.txt");
          return;
      }
    
    loggerupdate("• Loading default playernames.txt");
    
      let playernamesfilecontent = await fetchfile('https://cdn.jsdelivr.net/gh/scyppan/Roster-Maker-24@v0.0.1/eafc24defaultplayernames.txt', 'utf-8');
      
      defaultplayernamestable24 = await readtxtfile(playernamesfilecontent); // fileContent is a string, not a File or Blob
      
      if(defaultplayernamestable24){
          loggerupdate("• Default playernames.txt loaded");
      }else{
          loggerupdate("• Error loading default playernames.txt");
          return;
      }
    

    //load default dcplayernames
    loggerupdate("• Loading default dcplayernames.txt");
   
      let dcplayernamesfilecontent = await fetchfile('https://cdn.jsdelivr.net/gh/scyppan/Roster-Maker-24@v0.0.1/eafc24defaultdcplayernames.txt', 'utf-16le');
  
      defaultdcplayernamestable24 = await readtxtfile(dcplayernamesfilecontent); // fileContent is a string, not a File or Blob
      if(defaultdcplayernamestable24){
          loggerupdate("• Default dcplayernames.txt loaded");
      }else{
          loggerupdate("• Error loading default dcplayernames.txt");
          return;
      }

      loggerupdate("• Loading default nations.txt");
    
      let nationsfilecontent = await fetchfile('https://cdn.jsdelivr.net/gh/scyppan/Roster-Maker-24@v0.0.1/eafc24defaultnations.txt', 'utf-8');
      
      defaultnationstable24 = await readtxtfile(nationsfilecontent); // fileContent is a string, not a File or Blob
      if(nationsfilecontent){
          loggerupdate("• Default nations.txt loaded");
      }else{
          loggerupdate("• Error loading default nations.txt");
          return;
      }
}

function logplayerids(){
    defaultplayerstable24.forEach(player => {
        burnedplayerids.push(player.playerid);
    });
}

async function templatetoobj(){
    loggerupdate("• Parsing template");
    let template = await filereader(document.getElementById('uploadtemplate').files[0]);
    newplayers = template.filter(item => item.nat);
    document.getElementById("templateuploadcontainer").style.display = "none";
    loggerupdate("• Template parsed" + " (" + newplayers.length + " players found)");
    makeplayers();
}

document.addEventListener('DOMContentLoaded', (event) => {
    startup();
});

startup();