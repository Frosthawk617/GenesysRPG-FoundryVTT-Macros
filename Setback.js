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

