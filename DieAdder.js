function boost() {
  let addBoostDie = (event) => {
    var eventId = event.roll.data.actor._id;
    var targId = token.actor.data._id;
    var eventName = "BoostDie" + event.roll.data.actor.name;
    console.log(eventId, "   ", targId);
    if (event.roll.data.actor._id === token.actor.data._id) {
      event.dicePool.boost += 1;
      Hooks.off("getRollBuilderFFGHeaderButtons", addBoostDie);
      Sequencer.EffectManager.endEffects({ name: eventName });
    }
  };
  const token = canvas.tokens.controlled[0];
  Hooks.on("getRollBuilderFFGHeaderButtons", addBoostDie);
  var mess = "Just added a boost die to " + token.actor.data.name;

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

  ChatMessage.create({
    content: mess,
  });
}

function setback() {
  
  let addSetbackDie = (event) => {
  var eventId = event.roll.data.actor._id;
  var targId = token.actor.data._id;
  var eventName = "SetbackDie" + event.roll.data.actor.name;
  console.log(eventId, '   ',targId);
  if (event.roll.data.actor._id === token.actor.data._id) {
  event.dicePool.setback += 1;
  Hooks.off("getRollBuilderFFGHeaderButtons", addSetbackDie);
  Sequencer.EffectManager.endEffects({name: eventName});
  }
};
const token = canvas.tokens.controlled[0];
Hooks.on("getRollBuilderFFGHeaderButtons", addSetbackDie);
var mess = "Just added a setback die to " + token.actor.data.name;

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

ChatMessage.create({
  content: mess
})
}

function upgradeDiff() {
  let upgradeDiff = (event) => {
    var eventId = event.roll.data.actor._id;
    var targId = token.actor.data._id;
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

  const token = canvas.tokens.controlled[0];
  Hooks.on("getRollBuilderFFGHeaderButtons", upgradeDiff);

  var mess =
    "Just upgraded the difficulty of " +
    token.actor.data.name +
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

  ChatMessage.create({
    content: mess,
  });
}

function upgradeAbil() {
  let upgradeAbil = (event) => {
    var eventId = event.roll.data.actor._id;
    var targId = token.actor.data._id;
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

  const token = canvas.tokens.controlled[0];
  Hooks.on("getRollBuilderFFGHeaderButtons", upgradeAbil);

  var mess =
    "Just upgraded the ability of " + token.actor.data.name + "'s next check";

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

  ChatMessage.create({
    content: mess,
  });
}

var menu = new Dialog({
  title: "Die Adder",
  content: "My dialog content",
  buttons: {
    button1: {
      label: "Boost",
      callback: () => {
        boost();
        game.macros.get("JBMIa4jyQBWWfEg3").execute();
      },
      icon: `<i class="fas fa-check"></i>`,
    },
    button2: {
      label: "Setback",
      callback: () => {
        setback();
        game.macros.get("JBMIa4jyQBWWfEg3").execute();
      },
      icon: `<i class="fas fa-check"></i>`,
    },
    button3: {
      label: "Upgrade Difficulty",
      callback: () => {
        upgradeDiff();
        game.macros.get("JBMIa4jyQBWWfEg3").execute();
      },
      icon: `<i class="fas fa-check"></i>`,
    },
    button4: {
      label: "Upgrade Ability",
      callback: () => {
        upgradeAbil();
        game.macros.get("JBMIa4jyQBWWfEg3").execute();
      },
      icon: `<i class="fas fa-check"></i>`,
    },
  },
}).render(true);
