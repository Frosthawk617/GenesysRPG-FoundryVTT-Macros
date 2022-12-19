let addBoostDie = (event) => {
    var eventId = event.roll.data.actor._id;
    var targId = token.actor.data._id;
    var eventName = "BoostDie" + event.roll.data.actor.name;
    console.log(eventId, '   ',targId);
    if (event.roll.data.actor._id === token.actor.data._id) {
    event.dicePool.boost += 1;
    Hooks.off("getRollBuilderFFGHeaderButtons", addBoostDie);
    Sequencer.EffectManager.endEffects({name: eventName});
    }
};
const token = canvas.tokens.controlled[0];
Hooks.on("getRollBuilderFFGHeaderButtons", addBoostDie);
var mess = "Just added a boost die to " + token.actor.data.name;

var die = new Sequence()
.effect()
.file("modules/jb2a_patreon/Library/Generic/Item/IounStone_01_Protection_Pink_200x200.webm")
.atLocation(token)
.attachTo(token)
.size(35)
.tint("#03dbfc")
.spriteOffset({x: 25, y:-25})
.loopProperty("spriteContainer", "rotation", { from: 0, to: 360, duration: 5000, delay: 0 })
.name('BoostDie'+ token.actor.data.name)
.persist()
.play();

ChatMessage.create({
    content: mess
})
