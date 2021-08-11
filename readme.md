# Dungeon of Doom

This is going to be an easy and fun text based game that I work on periodically throughout my school.

The user will be able to travel through the woods and ultimately into a **castle** at night and find _items_ and fight _monsters_.

Items will be stored in the `state = {}` and monsters in the `monsters = {}`.

Thigns I would still like to implement:
* an engine that generates levels, which changes backgrounds, text, and eventually music?
* an array of monsters who are accessible through random encounters.
* a random dice roller to determine outcomes.
* a status bar that should HP and Sanity
* an inventory container that shows the list of items the user has in their posession.

The journey will go as following:
1. start in the woods (straight forward, level 1).
2. enter the castle (two levels with different encounters, items, art, and textNodes).
4. fight boss (4th level).

Items to be discovered are:
* healing potions (restore the HP by 5).
* various weapons and shields (changes the users power and HP Bonus or AC).
* holy relics (not sure yet, perhaps decreases change of random encounter? e.g. textNode 1-5 is free, 6-10 monsters.  Relic lets your roll a 1d6 oppose to 1d10?).
* gold (just for fun, no purpose?  Maybe = score?).

This link leads to the [github](https://github.com/CollinClifford/textgame)

![This is an image of a castle](img/castle.jpg)


Thanks!