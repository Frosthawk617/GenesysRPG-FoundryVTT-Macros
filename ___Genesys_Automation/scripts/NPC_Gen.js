Hooks.on('getActorSheetHeaderButtons',(sheet, buttons)=>{
    if (game.user.data.role === 4) {
    const target = (sheet.actor);
    buttons.unshift({
        class: 'gen-button',
        label: 'NPC-Gen',
        icon: 'fas fa-swimmer',
        onclick: () => {
            main(target);
        }
    });
    }
});
async function main(target){
    const pack = game.packs.get("genesys-talent-compendiums.gcrb-talents");
    const Characs = [
        {
            "name": "Small Creature",
            "characs": {
              "brawn": 1,
              "agility": 2,
              "intellect": 1,
              "cunning": 3,
              "willpower": 1,
              "presence": 1
            },
            "power_level": {
              "combat": -1,
              "social": -1,
              "general": 0
            },
            "ex": "Mouse, bird, snake, cat"
          },
          {
            "name": "Large Creature",
            "characs": {
              "brawn": 4,
              "agility": 2,
              "intellect": 1,
              "cunning": 2,
              "willpower": 1,
              "presence": 1
            },
            "power_level": {
              "combat": 1,
              "social": -1,
              "general": 0
            },
            "ex": "Bear, ox, horse, cow, ram"
          },
          {
            "name": "Stealthy Creature",
            "characs": {
              "brawn": 2,
              "agility": 3,
              "intellect": 1,
              "cunning": 3,
              "willpower": 1,
              "presence": 1
            },
            "power_level": {
              "combat": 0,
              "social": -1,
              "general": 0
            },
            "ex": "Puma, deer, shark"
          },
          {
            "name": "Huge Creature",
            "characs": {
              "brawn": 5,
              "agility": 1,
              "intellect": 1,
              "cunning": 1,
              "willpower": 1,
              "presence": 1
            },
            "power_level": {
              "combat": 1,
              "social": -1,
              "general": -1
            },
            "ex": "Elephant, dinosaur"
          },
          {
            "name": "Average Person ",
            "characs": {
              "brawn": 2,
              "agility": 2,
              "intellect": 2,
              "cunning": 2,
              "willpower": 2,
              "presence": 2
            },
            "power_level": {
              "combat": 0,
              "social": 0,
              "general": 0
            },
            "ex": "Any regular person"
          },
          {
            "name": "Tough Person",
            "characs": {
              "brawn": 3,
              "agility": 2,
              "intellect": 2,
              "cunning": 2,
              "willpower": 2,
              "presence": 1
            },
            "power_level": {
              "combat": 0,
              "social": -1,
              "general": 0
            },
            "ex": "Laborer, mob tough, soldier"
          },
          {
            "name": "Smart Person",
            "characs": {
              "brawn": 1,
              "agility": 2,
              "intellect": 3,
              "cunning": 2,
              "willpower": 2,
              "presence": 2
            },
            "power_level": {
              "combat": -1,
              "social": 0,
              "general": 0
            },
            "ex": "Student, medic, hacker"
          },
          {
            "name": "Sociable Person",
            "characs": {
              "brawn": 2,
              "agility": 2,
              "intellect": 2,
              "cunning": 2,
              "willpower": 1,
              "presence": 3
            },
            "power_level": {
              "combat": 0,
              "social": 0,
              "general": 0
            },
            "ex": "Politician, manager"
          },
          {
            "name": "Jack of All Trades",
            "characs": {
              "brawn": 3,
              "agility": 3,
              "intellect": 3,
              "cunning": 3,
              "willpower": 3,
              "presence": 3
            },
            "power_level": {
              "combat": 1,
              "social": 1,
              "general": 1
            },
            "ex": "Any competent person"
          },
          {
            "name": "Skilled Warrior",
            "characs": {
              "brawn": 4,
              "agility": 3,
              "intellect": 2,
              "cunning": 2,
              "willpower": 3,
              "presence": 1
            },
            "power_level": {
              "combat": 2,
              "social": 0,
              "general": 0
            },
            "ex": "Knight, berserker, veteran"
          },
          {
            "name": "Savant",
            "characs": {
              "brawn": 2,
              "agility": 1,
              "intellect": 5,
              "cunning": 2,
              "willpower": 2,
              "presence": 1
            },
            "power_level": {
              "combat": -1,
              "social": -1,
              "general": 1
            },
            "ex": "Scholar, researcher, surgeon"
          },
          {
            "name": "Born Leader",
            "characs": {
              "brawn": 2,
              "agility": 2,
              "intellect": 2,
              "cunning": 3,
              "willpower": 3,
              "presence": 5
            },
            "power_level": {
              "combat": 0,
              "social": 2,
              "general": 0
            },
            "ex": "President, ruler, general"
          },
          {
            "name": "Cunning Foe",
            "characs": {
              "brawn": 2,
              "agility": 4,
              "intellect": 2,
              "cunning": 4,
              "willpower": 2,
              "presence": 2
            },
            "power_level": {
              "combat": 1,
              "social": 0,
              "general": 1
            },
            "ex": "Spy, assassin, military scout"
          },
          {
            "name": "Mastermind",
            "characs": {
              "brawn": 3,
              "agility": 3,
              "intellect": 4,
              "cunning": 4,
              "willpower": 5,
              "presence": 3
            },
            "power_level": {
              "combat": 1,
              "social": 2,
              "general": 2
            },
            "ex": "The main villain in a story"
          }
    ]
    
    const Defense = [
        {
            "name": "Tough Skin",
            "ex": "Minions, rivals, nemeses",
            "power_level": {
              "combat": 0,
              "social": 0,
              "general": 0
            },
            "defense": {
              "soak": 1,
              "wound threshold": 2
            }
          },
          {
            "name": "Armored Hide",
            "ex": "Rival or nemesis animals or non-humans",
            "power_level": {
              "combat": 1,
              "social": 0,
              "general": 0
            },
            "defense": {
              "soak": 2,
              "wound threshold": 5
            }
          },
          {
            "name": "Dodgy",
            "ex": "Minions, rivals, nemeses",
            "power_level": {
              "combat": 0,
              "social": 0,
              "general": 0
            },
            "defense": {
              "melee defense": 1,
              "ranged defense": 1
            }
          },
          {
            "name": "Close Combatant",
            "ex": "Rivals, nemeses",
            "power_level": {
              "combat": 0,
              "social": 0,
              "general": 0
            },
            "defense": {
              "melee defense": 2
            }
          },
          {
            "name": "Camouflaged",
            "ex": "Rival or nemesis animals or non-humans",
            "power_level": {
              "combat": 1,
              "social": 0,
              "general": 0
            },
            "defense": {
              "melee defense": 1,
              "ranged defense": 2
            }
          },
          {
            "name": "Hardy",
            "ex": "Rivals, nemeses",
            "power_level": {
              "combat": 0,
              "social": 0,
              "general": 0
            },
            "defense": {
              "wound threshold": 5
            }
          },
          {
            "name": "Very Tough",
            "ex": "Rival animals or non-humans and all nemeses",
            "power_level": {
              "combat": 1,
              "social": 0,
              "general": 0
            },
            "defense": {
              "wound threshold": 10
            }
          },
          {
            "name": "Giant Body",
            "ex": "Silhouette 3 or higher animal rivals and nemeses",
            "power_level": {
              "combat": 2,
              "social": 0,
              "general": 0
            },
            "defense": {
              "wound threshold": 25
            }
          },
          {
            "name": "Savvy",
            "ex": "Nemeses",
            "power_level": {
              "combat": 0,
              "social": 0,
              "general": 0
            },
            "defense": {
              "strain threshold": 5
            }
          },
          {
            "name": "Mental Giant",
            "ex": "Main character nemeses",
            "power_level": {
              "combat": 0,
              "social": 1,
              "general": 0
            },
            "defense": {
              "strain threshold": 10
            }
          }
    ]
    
    const Skills = [{
        "name": "Basic Creature",
        "skills": {
          "athletics": 1,
          "brawl": 1,
          "survival": 2,
          "vigilance": 2
        },
        "power_level": {
          "combat": 0,
          "social": 0,
          "general": 0
        }
      },
      {
        "name": "Ferocious Creature",
        "skills": {
          "athletics": 3,
          "brawl": 4,
          "perception": 2,
          "survival": 3,
          "vigilance": 1
        },
        "power_level": {
          "combat": 1,
          "social": 0,
          "general": 1
        }
      },
      {
        "name": "Predatory Creature",
        "skills": {
          "brawl": 3,
          "coordination": 3,
          "perception": 4,
          "survival": 2,
          "stealth": 3
        },
        "power_level": {
          "combat": 1,
          "social": 0,
          "general": 1
        }
      },
      {
        "name": "Territorial Creature",
        "skills": {
          "brawl": 2,
          "resilience": 3,
          "survival": 4,
          "vigilance": 4
        },
        "power_level": {
          "combat": 0,
          "social": 0,
          "general": 2
        }
      },
      {
        "name": "Soldier",
        "skills": {
          "athletics": 2,
          "discipline": 1,
          "melee": 2,
          "ranged": 2,
          "resilience": 2,
          "vigilance": 2
        },
        "power_level": {
          "combat": 1,
          "social": 0,
          "general": 1
        }
      },
      {
        "name": "Duelist",
        "skills": {
          "cool": 3,
          "coordination": 3,
          "melee": 5,
          "stealth": 1
        },
        "power_level": {
          "combat": 1,
          "social": 0,
          "general": 0
        }
      },
      {
        "name": "Scout/Sniper",
        "skills": {
          "cool": 2,
          "perception": 3,
          "ranged": 5,
          "stealth": 4,
          "survival": 3,
          "vigilance": 3
        },
        "power_level": {
          "combat": 2,
          "social": 0,
          "general": 2
        }
      },
      {
        "name": "Brawler/Laborer",
        "skills": {
          "athletics": 3,
          "brawl": 2,
          "resilience": 3
        },
        "power_level": {
          "combat": 0,
          "social": 0,
          "general": 0
        }
      },
      {
        "name": "Gunslinger",
        "skills": {
          "cool": 3,
          "coordination": 2,
          "ranged": 4,
          "skulduggery": 3
        },
        "power_level": {
          "combat": 1,
          "social": 0,
          "general": 0
        }
      },
      {
        "name": "Sailor",
        "skills": {
          "athletics": 2,
          "operating": 3,
          "perception": 2,
          "ranged": 1,
          "vigilance": 1
        },
        "power_level": {
          "combat": 0,
          "social": 0,
          "general": 1
        }
      },
      {
        "name": "Spy/Con Artist",
        "skills": {
          "cool": 2,
          "charm": 3,
          "deception": 4,
          "knowledge": 1,
          "skulduggery": 4,
          "stealth": 3
        },
        "power_level": {
          "combat": 0,
          "social": 2,
          "general": 2
        }
      },
      {
        "name": "Thief/Assassin",
        "skills": {
          "coordination": 3,
          "deception": 2,
          "melee": 3,
          "skulduggery": 4,
          "stealth": 5,
          "streetwise": 3,
          "vigilance": 1
        },
        "power_level": {
          "combat": 1,
          "social": 0,
          "general": 4
        }
      },
      {
        "name": "Researcher",
        "skills": {
          "astrocartography": 5,
          "computers": 3,
          "discipline": 2,
          "knowledge": 5,
          "perception": 4
        },
        "power_level": {
          "combat": 0,
          "social": 0,
          "general": 5
        }
      },
      {
        "name": "Natural Philosopher",
        "skills": {
          "alchemy": 4,
          "knowledge": 4,
          "medicine": 2,
          "negotiation": 1,
          "perception": 2
        },
        "power_level": {
          "combat": 0,
          "social": 0,
          "general": 3
        }
      },
      {
        "name": "Doctor",
        "skills": {
          "cool": 2,
          "discipline": 2,
          "leadership": 1,
          "medicine": 4,
          "melee": 1
        },
        "power_level": {
          "combat": 0,
          "social": 1,
          "general": 2
        }
      },
      {
        "name": "Knight/Warrior Leader",
        "skills": {
          "athletics": 1,
          "discipline": 2,
          "driving": 3,
          "leadership": 3,
          "melee": 4,
          "riding": 3
        },
        "power_level": {
          "combat": 1,
          "social": 2,
          "general": 2
        }
      },
      {
        "name": "Captain of a Vessel",
        "skills": {
          "astrocartography": 4,
          "coercion": 2,
          "discipline": 3,
          "leadership": 4,
          "operating": 4,
          "ranged": 3
        },
        "power_level": {
          "combat": 1,
          "social": 2,
          "general": 3
        }
      },
      {
        "name": "Politician/Official",
        "skills": {
          "charm": 4,
          "coercion": 2,
          "cool": 2,
          "leadership": 3,
          "negotiation": 5,
          "vigilance": 1
        },
        "power_level": {
          "combat": 0,
          "social": 3,
          "general": 1
        }
      },
      {
        "name": "Mage",
        "skills": {
          "alchemy": 2,
          "arcana": 4,
          "coercion": 2,
          "knowledge": 4
        },
        "power_level": {
          "combat": 2,
          "social": 0,
          "general": 2
        }
      },
      {
        "name": "Priest",
        "skills": {
          "charm": 2,
          "discipline": 3,
          "divine": 4,
          "knowledge": 4
        },
        "power_level": {
          "combat": 2,
          "social": 1,
          "general": 2
        }
      },
      {
        "name": "Druid",
        "skills": {
          "knowledge": 4,
          "primal": 4,
          "survival": 3,
          "vigilance": 2
        },
        "power_level": {
          "combat": 2,
          "social": 0,
          "general": 2
        }
      },
      {
        "name": "Pilot/Driver/Rider",
        "skills": {
          "cool": 2,
          "coordination": 3,
          "driving": 4,
          "piloting": 4,
          "ranged": 3,
          "riding": 4
        },
        "power_level": {
          "combat": 1,
          "social": 0,
          "general": 3
        }
      },
      {
        "name": "Merchant",
        "skills": {
          "charm": 2,
          "deception": 3,
          "negotiation": 3,
          "perception": 2,
          "vigilance": 3
        },
        "power_level": {
          "combat": 0,
          "social": 3,
          "general": 0
        }
      },
      {
        "name": "Crime Boss",
        "skills": {
          "brawl": 4,
          "coercion": 5,
          "discipline": 2,
          "leadership": 2,
          "ranged": 2,
          "streetwise": 4
        },
        "power_level": {
          "combat": 2,
          "social": 3,
          "general": 1
        }
      },
      {
        "name": "Bureaucrat",
        "skills": {
          "cool": 3,
          "discipline": 3,
          "knowledge": 2,
          "negotiation": 2,
          "vigilance": 3
        },
        "power_level": {
          "combat": 0,
          "social": 3,
          "general": 1
        }
      },
      {
        "name": "Mechanic",
        "skills": {
          "athletics": 2,
          "brawl": 1,
          "computers": 1,
          "mechanics": 4,
          "resilience": 3
        },
        "power_level": {
          "combat": 0,
          "social": 0,
          "general": 3
        }
      },
      {
        "name": "Hacker",
        "skills": {
          "computers": 5,
          "cool": 2,
          "deception": 2,
          "streetwise": 2
        },
        "power_level": {
          "combat": 0,
          "social": 1,
          "general": 3
        }
      },
      {
        "name": "Criminal Tough",
        "skills": {
          "brawl": 2,
          "coercion": 3,
          "resilience": 3,
          "skulduggery": 3,
          "streetwise": 2
        },
        "power_level": {
          "combat": 0,
          "social": 1,
          "general": 2
        }
      },
      {
        "name": "Investigator",
        "skills": {
          "charm": 2,
          "coercion": 2,
          "discipline": 3,
          "perception": 3,
          "streetwise": 3,
          "survival": 3,
          "vigilance": 3
        },
        "power_level": {
          "combat": 0,
          "social": 2,
          "general": 3
        }
      },
      {
        "name": "Wrangler/Survivalist",
        "skills": {
          "athletics": 4,
          "coordination": 2,
          "perception": 3,
          "ranged": 2,
          "riding": 3,
          "survival": 4
        },
        "power_level": {
          "combat": 0,
          "social": 0,
          "general": 3
        }
      },
      {
        "name": "Cop/Town Guard",
        "skills": {
          "coercion": 2,
          "driving": 2,
          "leadership": 2,
          "melee": 2,
          "ranged": 2
        },
        "power_level": {
          "combat": 1,
          "social": 1,
          "general": 0
        }
      }]
    
    var page1Final = buildPage1();
    var page2Final = buildPage2();
    var page3Final = buildPage3();
    var page4Final = await buildPage4();
    
    
    new Dialog({
      title: "My Dialog Title",
      content: page1Final,
      buttons: {
        button1: {
          label: "Next",
          callback: (html) => {
            var checkedID = $(html).find(".chars:checkbox:checked")[0].id;
            var selectedChar = Characs.find(x=>x.id === checkedID);
            nextDialogue("Defense",page2Final,(html) => {
                var type = $(html).find("#type").val();
                console.log(type);
                var checkedIDArray = []; 
                for (var i =0; i < $(html).find(".defence:checkbox:checked").length; i++) {
                checkedIDArray.push($(html).find(".defence:checkbox:checked")[i].id);
                }
                var selectedDefArray =[];
                for (var selec of checkedIDArray) {
                var selectedDef = Defense.find(x=>x.id === selec);
                selectedDefArray.push(selectedDef)
                }
                nextDialogue("Skills",page3Final, (html)=>{
                    var checkedID = $(html).find(".skills:checkbox:checked")[0].id;
                    var selectedSkills = Skills.find(x=>x.id === checkedID);
                    console.log(page4Final);
                    nextDialogue("Talents",page4Final, (html)=>{
                        var talentIds = []; 
                        for (var i =0; i < $(html).find(".talent:checkbox:checked").length; i++) {
                            talentIds.push($(html).find(".talent:checkbox:checked")[i].id);
                        }
                        updateActor(selectedChar, selectedDefArray, selectedSkills,type, talentIds);
                    })
                })
            })
    
          },
        },
      },
    }).render(true);
    
   async function nextDialogue(title,content, callback) {
        new Dialog({
            title: title,
            content: content,
            buttons: {
              button1: {
                label: "Next",
                callback: callback
              },
            },
          }).render(true);
    }  
    
    function buildPage1() {
        var page = '';
        var i = 0;
        for (var element of Characs) {
            element.id = "select-"+i+"";
            var pageAdd = `<tr><td><input type="checkbox" name="" id="select-`+i+`" class="chars"></td><td>`+element.name+`</td><td>Brawn:`+element.characs.brawn+` Agility:`+element.characs.agility+` Intellect:`+element.characs.intellect+` Cunning:`+element.characs.cunning+` Willpower:`+element.characs.willpower+` Presence:`+element.characs.presence+`</td><td>`+element.ex+`</td></tr>`;
           i++;
            page = page + pageAdd;
    }
    var pageString = page.toString();
    var page1Final = `
    <div>
    <table>
    <tr><td></td><td>Name</td><td>Characteristics</td><td>Examples</td></tr>
    `+pageString+`
    </table>
        </div>
    `;
    return page1Final;
    }
    
    function buildPage2() {
        var page = '';
        var i = 0;
        for (var element of Defense) {
            element.id = "select-"+i+"";
            var keyDirty = Object.keys(element.defense);
            var valueDirty = Object.values(element.defense);
            var key = cleaner(keyDirty);
            var value = cleaner(valueDirty);
            var tempDefense = '';
            for (var j = 0; j < key.length; j++) {
              var keyPos = ''+key[j]+': '+value[j]+',          ';
              tempDefense = tempDefense + keyPos;
            }
            var pageAdd = `<tr><td><input type="checkbox" name="" id="select-`+i+`" class="defence"></td><td>`+element.name+`</td><td>`+tempDefense+`</td><td>`+element.ex+`</td></tr>`;
           i++;
            page = page + pageAdd;
    }
    var pageString = page.toString();
    var pageFinal = `
    <div>
    <table>
    <tr><td></td><td>Name</td><td>Defenses</td><td>Examples</td></tr>
    `+pageString+`
    <select id="type"><option value="minion">Minion</option><option value="rival">Rival</option><option value="Nemesis">Nemesis</option></select>
    </table>
        </div>
    `;
    return pageFinal;
    }
    
    function buildPage3() {
        var page = '';
        var i = 0;
        for (var element of Skills) {
            element.id = "select-"+i+"";
          var keyDirty = Object.keys(element.skills);
          var valueDirty = Object.values(element.skills);
          var key = cleaner(keyDirty);
          var value = cleaner(valueDirty);
          var tempSkill = '';
          for (var j = 0; j < key.length; j++) {
            var keyPos = ''+key[j]+': '+value[j]+',          ';
            tempSkill = tempSkill + keyPos;
          }
            var pageAdd = `<tr><td><input type="checkbox" name="" id="select-`+i+`" class="skills"></td><td>`+element.name+`</td><td>`+tempSkill+`</td></tr>`;
           i++;
            page = page + pageAdd;
    }
    var pageString = page.toString();
    var pageFinal = `
    <div>
    <table>
    <tr><td></td><td>Name</td><td>Skills</td></tr>
    `+pageString+`
    </table>
        </div>
    `;
    return pageFinal;
    }
    
    async function buildPage4() {
        var talents = game.packs.get("genesys-talent-compendiums.gcrb-talents").index.contents;
        var page = '';
        var i = 0;
        for (var t = 0; t < talents.length; t++) {
            var talent = await talents[t];
            var id =  talent._id;
            var doc = await pack.getDocument(id);
            var data = await game.items.fromCompendium(doc);
            console.log(data);
          var pageAdd = `<tr><td><input type="checkbox" name="" id="`+data.name+`" class="talent"></td><td>`+data.name+`</td><td>`+data.data.description+`</td></tr>`;
           i++;
         page = page + pageAdd;
    }
    var pageString = page.toString();
    var pageFinal = `
    <div>
    <table>
    <tr><td></td><td>Name</td><td>Skills</td></tr>
    `+pageString+`
    </table>
        </div>
    `;
    return pageFinal;
    }
    
    function cleaner(array) {
            var cleanArray = [];
            array.forEach(element => {
                if (typeof element !== 'undefined') {
                    cleanArray.push(element);
                }
            });
            return cleanArray;
          } 
    
    async function updateActor(selectedChar, selectedDefArray, selectedSkills, type, talentIds){
        // Attributes------------------------------------
        target.update({ "data.attributes.Brawn.value": selectedChar.characs.brawn });
        target.update({ "data.attributes.Agility.value": selectedChar.characs.agility });
        target.update({ "data.attributes.Intellect.value": selectedChar.characs.intellect });
        target.update({ "data.attributes.Cunning.value": selectedChar.characs.cunning });
        target.update({ "data.attributes.Willpower.value": selectedChar.characs.willpower });
        target.update({ "data.attributes.Presence.value": selectedChar.characs.presence });
    
        //Defence-----------------------------------------
        if (type === "minion") {
            var wound = 5;
            var strain = 0 + selectedChar.characs.willpower;
        } else if ( type === "rival") {
            var wound = 8;
            var strain = 0 + selectedChar.characs.willpower;
        } else {
            var wound = 12;
            var strain = 10 + selectedChar.characs.willpower; 
        }
      
        for (var y = 0; y < selectedDefArray.length; y++) {
        let key = Object.keys(selectedDefArray[y].defense);
        let value = Object.values(selectedDefArray[y].defense);
        for (var i = 0; i < key.length; i++) {
    
            switch (key[i]) {
                case "wound threshold":
                    wound += value[i];
                    break;
                case "strain threshold":
                    strain += value[i]
                    break;
                case "soak":
                    target.update({'data.attributes.Soak.value': value[i]});
                    break;    
                case "melee defense":
                    break;    
                case "ranged defense":
                    target.update({'data.attributes.Defence-Ranged.value': value[i]});
                    break;    
                default:
                    break;
            }
            if (target.data.type === "minion") {
                var minorChar = "data.unit_wounds.value"
            } else {
                var minorChar = "data.attributes.Wounds.value"
            }
    target.update({[`${minorChar}`]: wound});
    target.update({'data.attributes.Strain.value': strain});
        }
    
        }
    
    //Skills
    let skillKey = Object.keys(selectedSkills.skills);
    let skillValue = Object.values(selectedSkills.skills)
    for (let s = 0; s < skillKey.length; s++) {
        var skillLoc = capitalizeFirstLetter(skillKey[s]);
        target.update({[`data.attributes.${skillLoc}.value`]: skillValue[i]});
    }
    
    
    
    //Items /Talents
    
    for(var talent of talentIds) {
    const id = pack.index.getName(talent)._id;
    const doc = await pack.getDocument(id);
    const data = game.items.fromCompendium(doc);
    await target.createEmbeddedDocuments('Item', [data]);
}
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    }

