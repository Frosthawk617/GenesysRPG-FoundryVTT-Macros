Hooks.on("getRollBuilderFFGHeaderButtons", (event) => {
  console.log(event);
  if(event.roll.item.hasOwnProperty('data')) {
  var special = event.roll.item.data.special.value;
  const target = game.user.targets.first().actor;
  const soak = target.data.data.stats.soak.value;
  const wounds = target.data.data.stats.wounds.value;
  var pierce = getPierceVal(special);
  var check = Hooks.on("ffgDiceMessage", () => {
    getRollDetails(target, soak, wounds, pierce);
  });
  Hooks.once("closeRollBuilderFFG", () => {
    Hooks.off("ffgDiceMessage", check);
  });
  }
});

function getPierceVal(special) {
  if (special.includes('Pierce')) { 
  var substr = /Pierce(\<\/\w+\>|) (\d)/g;
  var valReg = /\d/g;
  var pierceString = special.match(substr)[0];
  var pierce = pierceString.match(valReg)[0]; } else {
    pierce = 0;
  }
  return pierce;
}

function getRollDetails(target, soak, wounds, pierce) {
  let dmg = Hooks.on("createChatMessage", (event) => {
    console.log(event);
    var success = event.roll.ffg.success;
    if (success > event.roll.ffg.failure) {
    var wepDamage = event.roll.data.data.damage.adjusted;
    if (soak < pierce) {
      var pvS = 0;
    } else {
      var pvS = soak - pierce;
    }
    var toWound = success + wepDamage - pvS;
    var finalWounds = wounds + toWound;
    var message = "Dealt " + toWound + " Wounds to " + target.data.name;


    Dialog.confirm({
      title: "Shoot the right guy ?",
      content: "You aimed at "+target.data.name+"",
      yes: () => {
        ChatMessage.create({
          content: message,
        });
        applyDamage(target, finalWounds);
        Hooks.off("createChatMessage", dmg);
      },
      no: () => {ui.notifications.info("Pick the right target next time....")},
      defaultYes: false
    });

  } else {Hooks.off("createChatMessage", dmg);}
  });
}

function applyDamage(target, finalWounds) {
  target.update({ "data.stats.wounds.value": finalWounds });
}
