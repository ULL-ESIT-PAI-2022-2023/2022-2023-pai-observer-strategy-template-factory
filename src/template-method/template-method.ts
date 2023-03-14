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
 * The Abstract Class defines a template method that contains a skeleton of some
 * algorithm, composed of calls to (usually) abstract primitive operations.
 */
abstract class GameAI {
  /**
   * The template method defines the skeleton of an algorithm, subclasses must 
   * leave this intact
   */
  public templateMethod(): void {
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
  protected heal(): void {
    console.log('I need to heal');
  }

  protected runAway(): void {
    console.log('I am running away');
  }

  protected pickUpItem(): void {
    console.log('I am going to pick up an item');
  }

  /** These operations have to be implemented in subclasses */
  protected abstract raiseAlarm(): void;

  protected abstract talkToPlayer(): void;

  /**
   * These are hooks, they can be overriden (if not they already have an empty
   * implementation in the abstract class)
   */
  protected attackPlayer(): void { }

  protected askPlayerForHelp(): void { }
}

/**
* Concrete classes have to implement all abstract operations of the base class.
* They can also override hooks with a default implementation.
*/
class FriendlyAI extends GameAI {
  protected raiseAlarm(): void {
    console.log('Sound the alarm, call the player');
  }

  protected talkToPlayer(): void {
    console.log('Thank goodness you were there to save us');
  }
  protected askPlayerForHelp(): void {
    console.log('I left a prized family heirloom at my old house, could you help me retrieve it?');
  }
}

class EnemyAI extends GameAI {
  protected raiseAlarm(): void {
    console.log('Sound the alarm, the player is attacking!');
  }

  protected talkToPlayer(): void {
    console.log('You will never defeat me!');
  }
  protected attackPlayer(): void {
    console.log('There he is, attack!');
  }
}

/**
* The client code calls the template method to execute the algorithm. Client
* code does not have to know the concrete class of an object it works with, as
* long as it works with objects through the interface of their base class.
*/
function clientCode(nonPlayableCharacter: GameAI) {
  nonPlayableCharacter.templateMethod();
}

function main() {
  console.log('Possible actions for a friendly AI:');
  clientCode(new FriendlyAI());
  console.log('');

  console.log('Possible actions for an enemy AI:');
  clientCode(new EnemyAI());
}

main();