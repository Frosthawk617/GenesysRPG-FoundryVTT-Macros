
Hooks.on("ready", () => {
    game.socket.on(`module.___Genesys_Automation`, request => {
        if (request.action ==="boostStart"){
        RoundBoost.boostStart();
    }else if(request.action === "endEffectTurn"){
      RoundBoost.endEffect();
    } else {return}
    });
  });

class RoundBoost {
static boostStart(push=false) {
    if (push){
    game.socket.emit(`module.___Genesys_Automation`, {action: "boostStart"});
    }
    const setFaction = findCurretFaction();
    let addBoostDie = (event) => {
        var checkId = event.roll.data.token._id
        var checkFaction = game.combat.data.combatants.contents.find(x => x.data.tokenId === checkId);
        if (setFaction === checkFaction.data.name){
        event.dicePool.boost += 1;
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
    Hooks.on("ffgDiceMessage",(event) => {
        if(push){
            game.socket.emit(`module.___Genesys_Automation`, {action: "endEffectTurn"});}
        console.log(event);
        console.log(addBoostDie);
            endEffect();
        function endEffect(){
            Hooks.off("getRollBuilderFFGHeaderButtons", addBoostDie);
        }
    })
        } else {
            Hooks.once("updateCombat", (event) =>{addBoostToFaction(event, prevFaction);});
        }
    }
    }


}
window.RoundBoost = RoundBoost;