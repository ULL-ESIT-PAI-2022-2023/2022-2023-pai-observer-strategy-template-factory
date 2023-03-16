/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley, Daniel Mendéz Rodríguez
 * @since Mar 20 2023
 * @desc Example code following the Template Method dessign pattern 
 */

/**
 * @class The Abstract Class defines a template method that contains a skeleton of some
 * algorithm, composed (usually) of calls to abstract primitive operations.
 */
abstract class GameAI {
  /** @desc The template method, subclasses must leave this intact */
  public printDialogue(): void {
    // Implemented in the Abstract class
    this.heal();
    this.runAway();
    this.pickUpItem();

    // Implemented by all subclasses
    this.raiseAlarm();
    this.talkToPlayer();

    // Optionally implemented by subclasses
    this.attackPlayer();
    this.askPlayerForHelp();
  }

  /** These operations already have implementations */
  /** @desc Prints dialogue for when the AI is healing */
  protected heal(): void {
    console.log('HEAL: "I need to heal"');
  }

  /** @desc Prints dialogue for when the AI is runnign away */
  protected runAway(): void {
    console.log('RUN: "I am running away"');
  }

  /** @desc Prints dialogue for when the AI is picking up an item */
  protected pickUpItem(): void {
    console.log('PICK UP ITEM: "I am going to pick up an item"');
  }

  /** These operations have to be implemented in subclasses */
  /** @desc Prints dialogue for when the AI is trying to raise an alarm*/
  protected abstract raiseAlarm(): void;

  /** @desc Prints dialogue for when the AI is talking to the player */
  protected abstract talkToPlayer(): void;

  /**
   * These are hooks, they can be overriden (if not, they already have an empty
   * implementation in the abstract class)
   */
  /** @desc Prints dialogue for when the AI is attacking the player */
  protected attackPlayer(): void { }

  /** @desc Prints dialogue for when the AI is asking for help */
  protected askPlayerForHelp(): void { }
}

/**
* Concrete classes have to implement all abstract operations of the base class.
* They can also override hooks with a default implementation.
*/
/** @class Represents AI that is friendly towards the player */
class FriendlyAI extends GameAI {
  /** @desc Prints dialogue for when the AI is trying to raise an alarm, subclass is forced to implement */
  protected raiseAlarm(): void {
    console.log('RAISE ALARM: "Sound the alarm, call the player"');
  }

  /** @desc Prints dialogue for when the AI is talking to the player, subclass is forced to implement */
  protected talkToPlayer(): void {
    console.log('TALK TO PLAYER: "Thank goodness you were there to save us"');
  }

  /** @desc Prints dialogue for when the AI is asking for help, subclass choses to implement this */
  protected askPlayerForHelp(): void {
    console.log('ASK FOR HELP: "I left a prized family heirloom at my old house, could you help me retrieve it?"');
  }
}

/** @class Represents AI that will be hostile to the player */
class EnemyAI extends GameAI {
  /** @desc Prints dialogue for when the AI is trying to raise an alarm, subclass is forced to implement */
  protected raiseAlarm(): void {
    console.log('RAISE ALARM: "Sound the alarm, the player is attacking!"');
  }

  /** @desc Prints dialogue for when the AI is talking to the player, subclass is forced to implement */
  protected talkToPlayer(): void {
    console.log('TALK TO PLAYER: "You will never defeat me!"');
  }

  /** @desc Prints dialogue for when the AI is attacking the player, subclass choses to implement this */
  protected attackPlayer(): void {
    console.log('ATTACK PLAYER: "There he is, attack!"');
  }
}

/**
 * @desc Calls the template method to execute the algorithm through the interface of their base class.
 * @param {GameAI} nonPlayableCharacter Concrete class we're going to call the template method for
 */
function clientCode(nonPlayableCharacter: GameAI): void {
  nonPlayableCharacter.printDialogue();
}

function main() {
  console.log('Possible dialogue for a friendly AI:');
  clientCode(new FriendlyAI());
  console.log('');

  console.log('Possible dialogue for an enemy AI:');
  clientCode(new EnemyAI());
}

main();