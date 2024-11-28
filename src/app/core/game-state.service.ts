import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Items, SkillItem, Upgrade} from '../interfaces/upgrade.interface';
import {ImageService} from '../services/image.service';
import {ClickerCookieService} from '../services/clicker-cookie.service';
import {GameSave} from '../interfaces/cookie.interface';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  // Coins
  private coins = new BehaviorSubject<number>(0);
  public coins$ = this.coins.asObservable();
  private coinsPerSecond = 0;
  private allCoins = new BehaviorSubject<number>(0);
  public allCoins$ = this.allCoins.asObservable();

  // Enemy
  private enemyMaxHealth = new BehaviorSubject<number>(100);
  public enemyMaxHealth$ = this.enemyMaxHealth.asObservable();
  private enemyCurrentHealth = new BehaviorSubject<number>(this.enemyMaxHealth.value);
  public enemyCurrentHealth$ = this.enemyCurrentHealth.asObservable();
  private damagePerSecond = 0;

  // Multipliers
  private clickMultiplier = new BehaviorSubject<number>(1);
  public clickMultiplier$ = this.clickMultiplier.asObservable();

  // Upgrades
  upgradesList: Upgrade[] = [
    {id: 0, name: 'Rouge', icon: '/characters/hobbitAI1.jpg', cost: 20, level:0,
      incomeMultiplier: 1, isAvailable: true, damageMultiplier: 0.2},
    {id: 1, name: 'Knight', icon: '/characters/knightAI1.jpg', cost: 50, level:0,
      incomeMultiplier: 3, isAvailable: true, damageMultiplier: 0.6},
    {id: 2, name: 'Huntress', icon: '/characters/huntressAI1.jpg', cost: 120, level:0,
      incomeMultiplier: 7, isAvailable: true, damageMultiplier: 1.2},
    {id: 3, name: 'Mage', icon: '/characters/mageAI1.jpg', cost: 1000, level:0,
      incomeMultiplier: 12, isAvailable: true, damageMultiplier: 1.7}
  ]
  upgrade = new BehaviorSubject<Upgrade[]>(this.upgradesList);
  upgrade$ = this.upgrade.asObservable();

  // Items
  itemsList: Items[] = [
    {
      id: 0, name: "Iron Sword", icon: "/items/ironSwordAI1.jpg", cost: 200, isPurchased: false,
        effect: () => this.increaseClickValue(2), isUnlocked: () => this.allCoins.value >= 50,
    },
    {
      id: 1, name: "Gold Sword", icon: "/items/goldSwordAI1.jpg", cost: 1200, isPurchased: false,
      effect: () => this.increaseClickValue(2), isUnlocked: () => this.allCoins.value >= 150,
    },
    {
      id: 2, name: "Platinum Sword", icon: "/items/platinumSwordAI1.jpg", cost: 10000, isPurchased: false,
      effect: () => this.increaseClickValue(2), isUnlocked: () => this.allCoins.value >= 250,
    },
    {
      id: 3, name: "Magic Ore Sword", icon: "/items/magicOreSwordAI1.jpg", cost: 45000, isPurchased: false,
      effect: () => this.increaseClickValue(2), isUnlocked: () => this.allCoins.value >= 350,
    }
  ]
  items = new BehaviorSubject<Items[]>(this.itemsList);
  items$ = this.items.asObservable();

  //Skills
  skillItemsList: SkillItem[] = [
    {
      id:0, name: "Sword Attack", icon: "/skills/swordAttackAI1.jpg", cooldown: 1000, damage: 10, isOnCooldown: false,
      effect: (x: any) => setInterval(() => this.skillCallback(x), x.cooldown, x), isUnlocked: false
    },
    {
      id:1, name: "Bow Attack", icon: "/skills/bowAttackAI1.jpg", cooldown: 5000, damage: 10, isOnCooldown: false,
      effect: (x: any) => setInterval(() => this.skillCallback(x), x.cooldown, x), isUnlocked: false
    },
    {
      id:2, name: "Fire Attack", icon: "/skills/fireBallSpellAttackAI1.jpg", cooldown: 8000, damage: 10, isOnCooldown: false,
      effect: (x: any) => setInterval(() => this.skillCallback(x), x.cooldown, x), isUnlocked: false
    },
    {
      id:3, name: "Barbarian Scream", icon: "/skills/barbarianAttackAI1.jpg", cooldown: 10000, damage: 10, isOnCooldown: false,
      effect: (x: any) => setInterval(() => this.skillCallback(x), x.cooldown, x), isUnlocked: false
    }
  ]
  skillItems = new BehaviorSubject<SkillItem[]>(this.skillItemsList);
  skillItems$ = this.skillItems.asObservable();

  constructor(private imageService: ImageService, private clickerCookieService: ClickerCookieService) {}

  addCoins(amount: number) {
    this.coins.next(this.coins.value + (amount * this.clickMultiplier.value));
    if(amount >= 0)
      this.allCoins.next(this.coins.value + (amount * this.clickMultiplier.value));
  }

  checkIfUpgradeIsAvailable() {
    for (let upgrade of this.upgrade.value) {
     upgrade.isAvailable = upgrade.cost <= this.coins.value;
    }
  }

  levelUpUpgrade(upgrade: Upgrade): void {
    // check if upgrade is available
    if (!upgrade.isAvailable) {
      return;
    }

    // Unlock corresponding skill
    if (upgrade.level == 0) {
      this.unlockSkill(upgrade.id)
    }

    // Decrease coins
    this.coins.next(this.coins.value - upgrade.cost);

    // Update upgrade
    upgrade.level += 1;
    upgrade.cost *= 1.3;
    this.upgrade.value[upgrade.id] = upgrade;

    this.coinsPerSecond += upgrade.incomeMultiplier;
    this.damagePerSecond += upgrade.damageMultiplier;
  }

  increaseClickValue(amount: number) {
    this.clickMultiplier.next((this.clickMultiplier.value * amount));
    console.log("CLICKER")
  }

  onEnemyHit(amount: number): void {
    this.enemyCurrentHealth.next(this.enemyCurrentHealth.value - amount)
    if(this.enemyCurrentHealth.value <= 0)
      this.onEnemyDeath()
  }

  onEnemyDeath() {
    this.addCoins(this.enemyMaxHealth.value);
    this.enemyMaxHealth.next(this.enemyMaxHealth.value * 1.3);
    this.enemyCurrentHealth.next(this.enemyMaxHealth.value);
    this.imageService.changeEnemyImage();
  }

  unlockSkill(id: number): void {
    const skill = this.skillItems.value.find((x)=> x.id === id);
    if (skill) {
      console.log("Enter: " + skill.name)
      skill.isUnlocked = true;
      skill.isOnCooldown = true;
      skill.effect(skill);
    }
  }

  skillCallback(skill: SkillItem): void {
    console.log(skill)
    this.onEnemyHit(skill.damage);
  }

  saveToCookie(): void {
    console.log("Save to cookie")

    const gameSave: GameSave = {
      allCoins: this.allCoins.value,
      clickMultiplier: this.clickMultiplier.value,
      coins: this.coins.value,
      coinsPerSecond: this.coinsPerSecond,
      damagePerSeconds: this.damagePerSecond,
      date: new Date().toString(),
      enemyCurrentHealth: this.enemyCurrentHealth.value,
      enemyMaxHealth: this.enemyMaxHealth.value,
      itemsList: this.items.value.map((x) => ({id: x.id, isUnlocked: x.isPurchased})),
      name: 'Save' + new Date().toString(),
      skillsList: this.skillItems.value.map((x) => ({id: x.id, isUnlocked: x.isUnlocked})),
      upgradesList: this.upgrade.value.map((x) => ({id: x.id, level: x.level}))
    };

    this.clickerCookieService.setCookieSave(JSON.stringify(gameSave));

    console.log(JSON.stringify(gameSave));
  }

  loadSaveFromCookie(): void {
    console.log('Load Save from Cookie');

    const gameSave = this.clickerCookieService.getCookieSave();

    //console.log(gameSave);

    if (gameSave != null) {
      console.log("SAVE: " + JSON.stringify(JSON.parse(gameSave)));
      const gameSaveObject: GameSave = JSON.parse(gameSave);

      this.allCoins.next(gameSaveObject.allCoins);
      this.clickMultiplier.next(gameSaveObject.clickMultiplier);
      this.coins.next(gameSaveObject.coins);
      this.coinsPerSecond = gameSaveObject.coinsPerSecond;
      this.damagePerSecond = gameSaveObject.damagePerSeconds;
      this.enemyCurrentHealth.next(gameSaveObject.enemyCurrentHealth);
      this.enemyMaxHealth.next(gameSaveObject.enemyMaxHealth);

      // ITEMS
      let itemsListTmp = this.itemsList;
      for (let savedItem of gameSaveObject.itemsList) {
        const item = itemsListTmp.find(x => x.id === savedItem.id);
        if (item) {
          item.id = savedItem.id;
          item.isPurchased = savedItem.isUnlocked;
        }
      }
      this.items.next(itemsListTmp);

      // SKILLS
      let skillsListTmp = this.skillItemsList;
      for (let savedItem of gameSaveObject.skillsList) {
        const item = skillsListTmp.find(x => x.id === savedItem.id);
        if (item) {
          item.id = savedItem.id;
          item.isUnlocked = savedItem.isUnlocked;
          if (savedItem.isUnlocked) {
            item.effect(item)
            item.isOnCooldown = true;
          }

        }
      }
      this.skillItems.next(skillsListTmp);

      // UPGRADE
      let upgradeListTmp = this.upgradesList;
      for (let savedItem of gameSaveObject.upgradesList) {
        const item = upgradeListTmp.find(x => x.id === savedItem.id);
        if (item) {
          item.id = savedItem.id;
          item.level = savedItem.level;
          item.cost = item.cost * Math.pow(1.3, savedItem.level);
        }
      }
      this.upgrade.next(upgradeListTmp);
    }
  }
}
