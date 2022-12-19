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
    } else {}
}
Hooks.off("getRollBuilderFFGHeaderButtons", upgradeDiff);
Sequencer.EffectManager.endEffects({name: eventName});
}

const token = canvas.tokens.controlled[0];
Hooks.on("getRollBuilderFFGHeaderButtons", upgradeDiff);

var mess = "Just upgraded the difficulty of " + token.actor.data.name +"'s next check";

var die = new Sequence()
.effect()
.file("modules/jb2a_patreon/Library/Generic/Item/IounStone_01_Protection_Pink_200x200.webm")
.atLocation(token)
.attachTo(token)
.size(35)
.tint("#cf0022")
.spriteOffset({x: 25, y:-25})
.loopProperty("spriteContainer", "rotation", { from: 0, to: 360, duration: 5000, delay: 0 })
.name('UpgradeDiff'+ token.actor.data.name)
.persist()
.play();

ChatMessage.create({
    content: mess
})