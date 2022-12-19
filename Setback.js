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