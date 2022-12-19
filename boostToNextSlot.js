const setFaction = findCurretFaction();
let addBoostDie = (event) => {
    var checkId = event.roll.data.token._id
    var checkFaction = game.combat.data.combatants.contents.find(x => x.data.tokenId === checkId);
    console.log(checkFaction.data.name);
    console.log(setFaction);
    if (setFaction === checkFaction.data.name){
    console.log(event.roll.data.token._id);
    event.dicePool.boost += 1;
    Hooks.once("ffgDiceMessage",() => {
        Hooks.off("getRollBuilderFFGHeaderButtons", addBoostDie);
    })
}
};

function findCurretFaction() {
    var cID = game.combat.current.tokenId;
    var combatants = game.combat.data.combatants.contents
    var cObject = combatants.find(x => x.data.tokenId === cID)
    var faction = cObject.data.name;
    Hooks.once("updateCombat", (event) =>{addBoostToFaction(event, faction);});
    return faction;
}

var addBoostToFaction = (event, prevFaction) => {
    var cID = event.current.tokenId;
    var combatants = event.data.combatants.contents
    var cObject = combatants.find(x => x.data.tokenId === cID)
    var boostFaction = cObject.data.name;
    if(prevFaction === boostFaction) {
Hooks.on("getRollBuilderFFGHeaderButtons", addBoostDie);
        var mess = "Added boost die from spent advantage." ;
        ChatMessage.create({
            content: mess
        })
    } else {
        Hooks.once("updateCombat", (event) =>{addBoostToFaction(event, prevFaction);});
    }
}


