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
  var substr = /Pierce(\<\/\w+\>|) (\d)/g;
  var valReg = /\d/g;
  var pierceString = special.match(substr)[0];
  var pierce = pierceString.match(valReg)[0];
  return pierce;
}

function getRollDetails(target, soak, wounds, pierce) {
  let dmg = Hooks.on("createChatMessage", (event) => {
    var success = event.roll.ffg.success;
    var wepDamage = event.roll.data.data.damage.value;
    if (soak < pierce) {
      var pvS = 0;
    } else {
      var pvS = soak - pierce;
    }
    var toWound = success + wepDamage - pvS;
    var finalWounds = wounds + toWound;
    var message = "Dealt " + toWound + " Wounds to " + target.data.name;
    ChatMessage.create({
      content: message,
    });
    applyDamage(target, finalWounds);
    Hooks.off("createChatMessage", dmg);
  });
}

function applyDamage(target, finalWounds) {
  target.update({ "data.stats.wounds.value": finalWounds });
}
