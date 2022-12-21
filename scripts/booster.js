
Hooks.on('getActorSheetHeaderButtons',(sheet, buttons)=>{
  const token = sheet.token;
  const actor = sheet.actor;
  console.log(actor);
  
  
  buttons.unshift({
      class: 'add-button',
      label: 'Adder',
      icon: 'fas fa-book',
      onclick: () => {
          main(token, actor);
      }
  });
});

//socket reciever
Hooks.on("ready", () => {
  game.socket.on(`module.___Genesys_Automation`, request => {
          switch(request.action){
            case "upgradeAbil":
                upgradeAbil(request.data.token, request.data.actor);
            break;
            case "upgradeDiff":
                upgradeDiff(request.data.token, request.data.actor);
            break;
            case "setback":
                setback(request.data.token, request.data.actor);
            break;
            case "boost":
                boost(request.data.token, request.data.actor);
            break;
          }
  });
});


function boost(token, actor, push=false) {
if (push) {
  game.socket.emit(`module.___Genesys_Automation`, { action: "boost", data: {token, actor} });
}
  let addBoostDie = (event) => {
    var eventId = event.roll.data.actor._id;
    if (typeof actor._id === "undefined") {
      var targId = actor.data._id;
    } else {var targId = actor._id;}
    var eventName = "BoostDie" + event.roll.data.actor.name;
    console.log(eventId, "   ", targId);
    if (event.roll.data.actor._id === targId) {
      event.dicePool.boost += 1;
      Hooks.off("getRollBuilderFFGHeaderButtons", addBoostDie);
      Sequencer.EffectManager.endEffects({ name: eventName });
    }
  };
  Hooks.on("getRollBuilderFFGHeaderButtons", addBoostDie);
  var mess = "Just added a boost die to " + actor.name;

  var die = new Sequence()
  .effect()
  .file(
    "modules/jb2a_patreon/Library/Generic/Item/IounStone_01_Protection_Pink_200x200.webm"
  )
  .atLocation(token)
  .attachTo(token)
  .size(35)
  .tint("#03dbfc")
  .spriteOffset({ x: 25, y: -25 })
  .loopProperty("spriteContainer", "rotation", {
    from: 0,
    to: 360,
    duration: 5000,
    delay: 0,
  })
  .name("BoostDie" + token.actor.data.name)
  .persist()
  .play();


  if (push) {
    ChatMessage.create({
      content: mess,
    });
}
}

function setback(token, actor, push=false) {
  if (push) {
    game.socket.emit(`module.___Genesys_Automation`, { action: "setback", data: {token, actor} },(response)=> {
      console.log(response);
      setback(response.data.token,response.data.actor)
    });
}
  let addSetbackDie = (event) => {
  var eventId = event.roll.data.actor._id;
  if (typeof actor._id === "undefined") {
    var targId = actor.data._id;
  } else {var targId = actor._id;}
  var eventName = "SetbackDie" + event.roll.data.actor.name;
  console.log(eventId, '   ',targId);
  if (event.roll.data.actor._id === targId) {
  event.dicePool.setback += 1;
  Hooks.off("getRollBuilderFFGHeaderButtons", addSetbackDie);
  Sequencer.EffectManager.endEffects({name: eventName});
  }
};
Hooks.on("getRollBuilderFFGHeaderButtons", addSetbackDie);
var mess = "Just added a setback die to " + actor.name;

var die = new Sequence()
.effect()
.file("modules/jb2a_patreon/Library/Generic/Item/IounStone_01_Protection_Pink_200x200.webm")
.atLocation(token)
.attachTo(token)
.size(35)
.tint("#222626")
.spriteOffset({x: 25, y:-25})
.loopProperty("spriteContainer", "rotation", { from: 0, to: 360, duration: 5000, delay: 0 })
.name('SetbackDie'+ token.actor.data.name)
.persist()
.play();


if (push) {
  ChatMessage.create({
    content: mess,
  });
}
}

function upgradeDiff(token, actor, push=false) {
  if (push) {
    game.socket.emit(`module.___Genesys_Automation`, { action: "upgradeDiff", data: {token, actor}});
}
  let upgradeDiff = (event) => {
    var eventId = event.roll.data.actor._id;
    if (typeof actor._id === "undefined") {
      var targId = actor.data._id;
    } else {var targId = actor._id;}
    var eventName = "UpgradeDiff" + event.roll.data.actor.name;
    if (eventId === targId) {
      if (event.dicePool.difficulty > 0) {
        event.dicePool.difficulty -= 1;
        event.dicePool.challenge += 1;
      } else if (event.dicePool.difficulty === 0) {
        event.dicePool.difficulty += 1;
      } else {
      }
    }
    Hooks.off("getRollBuilderFFGHeaderButtons", upgradeDiff);
    Sequencer.EffectManager.endEffects({ name: eventName });
  };

  Hooks.on("getRollBuilderFFGHeaderButtons", upgradeDiff);

  var mess =
    "Just upgraded the difficulty of " +
   actor.name +
    "'s next check";

    var die = new Sequence()
    .effect()
    .file(
      "modules/jb2a_patreon/Library/Generic/Item/IounStone_01_Protection_Pink_200x200.webm"
    )
    .atLocation(token)
    .attachTo(token)
    .size(35)
    .tint("#cf0022")
    .spriteOffset({ x: 25, y: -25 })
    .loopProperty("spriteContainer", "rotation", {
      from: 0,
      to: 360,
      duration: 5000,
      delay: 0,
    })
    .name("UpgradeDiff" + token.actor.data.name)
    .persist()
    .play();

    if (push) {
      ChatMessage.create({
        content: mess,
      });
  }
}
function upgradeAbil(token, actor, push=false) {
  console.log("sending");
  if (push) {
      game.socket.emit(`module.___Genesys_Automation`, { action: "upgradeAbil", data: {token, actor} }); 
  }
      console.log("sent maybe");
  let upgradeAbil = (event) => {
    var eventId = event.roll.data.actor._id;
    if (typeof actor._id === "undefined") {
      var targId = actor.data._id;
    } else {var targId = actor._id;}
    var eventName = "UpgradeAbil" + event.roll.data.actor.name;
    if (eventId === targId) {
      if (event.dicePool.ability > 0) {
        event.dicePool.ability -= 1;
        event.dicePool.proficiency += 1;
      } else if (event.dicePool.ability === 0) {
        event.dicePool.ability += 1;
      } else {
      }
    }
    Hooks.off("getRollBuilderFFGHeaderButtons", upgradeAbil);
    Sequencer.EffectManager.endEffects({ name: eventName });
  };

  Hooks.on("getRollBuilderFFGHeaderButtons", upgradeAbil);

  var mess = "Just upgraded the ability of " + actor.name + "'s next check";

  var die = new Sequence()
  .effect()
  .file(
    "modules/jb2a_patreon/Library/Generic/Item/IounStone_01_Protection_Pink_200x200.webm"
  )
  .atLocation(token)
  .attachTo(token)
  .size(35)
  .tint("#f3ff12")
  .spriteOffset({ x: 25, y: -25 })
  .loopProperty("spriteContainer", "rotation", {
    from: 0,
    to: 360,
    duration: 5000,
    delay: 0,
  })
  .name("UpgradeAbil" + token.actor.data.name)
  .persist()
  .play();


if (push) {
  ChatMessage.create({
    content: mess,
  });
}
}
function main (token, actor){ 
var menu = new Dialog({
  title: "Die Adder",
  content: "What do you want to add ?",
  buttons: {
    button1: {
      label: "Boost",
      callback: () => {
        boost(token, actor, true);
        menu.render(true);
      },
      icon: `<i class="fas fa-check"></i>`,
    },
    button2: {
      label: "Setback",
      callback: () => {
        setback(token, actor, true);
        menu.render(true);
      },
      icon: `<i class="fas fa-check"></i>`,
    },
    button3: {
      label: "Upgrade Difficulty",
      callback: () => {
        upgradeDiff(token, actor, true);
        upgradeDiff(token, actor);
        menu.render(true);
      },
      icon: `<i class="fas fa-check"></i>`,
    },
    button4: {
      label: "Upgrade Ability",
      callback: () => {
          upgradeAbil(token, actor,true);
          menu.render(true);
      },
      icon: `<i class="fas fa-check"></i>`,
    },
  },
}).render(true);

}