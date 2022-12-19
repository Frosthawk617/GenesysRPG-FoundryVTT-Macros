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
    } else {}
}
Hooks.off("getRollBuilderFFGHeaderButtons", upgradeAbil);
Sequencer.EffectManager.endEffects({name: eventName});
}

const token = canvas.tokens.controlled[0];
Hooks.on("getRollBuilderFFGHeaderButtons", upgradeAbil);

var mess = "Just upgraded the ability of " + token.actor.data.name +"'s next check";

var die = new Sequence()
.effect()
.file("modules/jb2a_patreon/Library/Generic/Item/IounStone_01_Protection_Pink_200x200.webm")
.atLocation(token)
.attachTo(token)
.size(35)
.tint("#f3ff12")
.spriteOffset({x: 25, y:-25})
.loopProperty("spriteContainer", "rotation", { from: 0, to: 360, duration: 5000, delay: 0 })
.name('UpgradeAbil'+ token.actor.data.name)
.persist()
.play();

ChatMessage.create({
    content: mess
})