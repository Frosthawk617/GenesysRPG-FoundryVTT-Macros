Hooks.on("ready", () => {
  game.socket.on(`module.___Genesys_Automation`, request => {
    if (request.action === "addTurnBoost"){
      NextSlot.boost();
    } else if (request.action === "endTurnBoost"){
      NextSlot.endEffect(request.data.roll, request.data.message);
    }
  })})
class NextSlot {
static boost(push=false) {
  if (push) {game.socket.emit(`module.___Genesys_Automation`, { action: "addTurnBoost"});}
const adderId = game.combat.current.tokenId;
const adderObj = game.combat.data.combatants.contents.find(x => x.data.tokenId === adderId);
const adderFac = adderObj.data.name;
var facArray = [];
for (let i = 0; i < game.combat.data.combatants.contents.length; i++) {
  const element = game.combat.data.combatants.contents[i];
  var factoAdd = element.data;
  if (factoAdd.name === adderFac) {
    facArray.push(factoAdd.tokenId)
  }
}
console.log(facArray);
var combatCheck = Hooks.on("updateCombat",() =>{
  const newId = game.combat.current.tokenId;
const newObj = game.combat.data.combatants.contents.find(x => x.data.tokenId === newId);
const newFac = newObj.data.name;
if (newFac === adderFac) {
  Hooks.off("updateCombat", combatCheck);
  var roller = Hooks.on("getRollBuilderFFGHeaderButtons",(event)=>{
    if (facArray.includes(event.roll.data.token._id)) {
      event.dicePool.boost += 1;
      var rollCheck = event.roll.data.token._id;
     var messageH = Hooks.on("createChatMessage", (event)=>{
        if(event.data.speaker.token === rollCheck){
NextSlot.endEffect(roller, messageH);
        }
      })
    }
console.log(event);
  })
  console.log("turned off");
}
})
console.log(adderFac);
  }
  static endEffect(roll, message){
Hooks.off("getRollBuilderFFGHeaderButtons", roll);
Hooks.off("createChatMessage", message);
game.socket.emit(`module.___Genesys_Automation`, { action: "endTurnBoost", data: {roll, message} });
  }
}