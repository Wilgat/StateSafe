# StateSafe

StateSafe is a finite state machine (FSM) implementation that extends the basic FSM functionality by adding robust logging capabilities. It provides a structured approach to managing states and transitions within your application while offering informative logging features for monitoring application behavior.

## Python version
A corresponding python version is at https://github.com/Wilgat/Statelogic or https://pypi.org/project/statelogic/

## Key Features

1. State Transitions:
 - Allows the definition of transitions between various states using a simple syntax (e.g., s.transition("event", "from_state", "to_state")).
2. State Management:
 - Provides methods to set and retrieve the current state (e.g., s.state("STATE_NAME") to set, and s.state() to get the current state).
3. Event Handlers:
 - Supports on methods (e.g., onMelts, onFreeze) to define custom actions that occur when a specific transition is initiated.
 - Allows for before methods (e.g., beforeMelts) to prompt or validate conditions before a transition occurs.
 - Supports after methods (e.g., afterMelts) to execute actions immediately after a transition is completed.
4. Custom Behavior:
 - Users can define custom functions for each of the on, before, and after methods, allowing for flexible and dynamic behavior during state transitions.
5. User Input Handling:
 - The library can incorporate user input to decide whether to allow certain transitions (e.g., confirming a melt transition).
6. Error Handling:
 - Can handle invalid state transitions gracefully, providing feedback when an attempt is made to set an invalid state.
7. Intuitive API:
 - Provides an easy-to-use and intuitive API for managing complex state behaviors, making it suitable for various applications, such as simulations, games, and control systems.
8. Clear State Representation:
 - States and transitions can be easily listed, providing clarity on the current configuration of the state machine.


## Installation

To use StateSafe in your project, install the package via npm (or yarn):

```bash
npm install statesafe
```

## Usage

### Simple example:
```
import StateSafe from 'statesafe';

// Create an instance of StateSafe with application details
const logger = new StateSafe('Your Name', 'MyApp', '1', '0', '0');

// Logging messages with various severity levels
logger.infoMsg('Application started');        // Logs an informational message
logger.safeMsg('Operation is safe');           // Logs a safe operation message
logger.criticalMsg('Critical failure occurred!');// Logs a critical error message

// Define states and transitions
logger.transition('start', 'idle', 'busy');   // Add a transition from 'start' to 'busy' on 'idle' event
logger.state('idle');                          // Set the initial state to 'idle'

// Triggering a transition based on events
logger.fire('start');                          // Will invoke registered hooks and transition the state
```

### A full example
```
import { StateSafe } from '../src/StateSafe';

/**
 * Matter class extends the StateSafe to model the behavior of different states 
 * of matter (solid, liquid, gas) and their transitions (e.g., freezing, melting).
 * This class incorporates logging and event handling capabilities to trace 
 * state changes in a substance based on temperature dynamics.
 */
class Matter extends StateSafe {

    freeze() {
        throw new Error('Method not implemented.');
    } 
    public temperature: number;

    /**
     * Constructs a Matter instance with author, application name, and version information.
     * Initializes the temperature and defines the transitions and event hooks for 
     * the states of matter.
     *
     * @param {string} author - The name of the author.
     * @param {string} appName - The name of the application.
     * @param {string} majorVersion - The major version of the application.
     * @param {string} minorVersion - The minor version of the application.
     * @param {string} patchVersion - The minor version of the application.
     */
    constructor(author: string, appName: string, majorVersion: string, minorVersion: string, patchVersion: string) {
        super(author, appName, majorVersion, minorVersion, patchVersion);
        
        // Initialize temperature
        this.temperature = 110;

        // Define transitions for different states of matter
        this.transition("freeze", "LIQUID", "SOLID");   // Liquid to Solid
        this.transition("melts", "SOLID", "LIQUID");    // Solid to Liquid
        this.transition("evaporate", "LIQUID", "GAS");   // Liquid to Gas
        this.transition("condense", "GAS", "LIQUID");    // Gas to Liquid
        this.transition("sublimate", "SOLID", "GAS");    // Solid to Gas
        this.transition("deposition", "GAS", "SOLID");    // Gas to Solid

        // Set up event hooks for each event
        this.after("freeze", "logFreeze");
        this.after("melts", "logMelts");
        this.after("evaporate", "logEvaporate");
        this.after("condense", "logCondense");

        // Set up the before hook for the "cool" event
        this.before("condense", "checkCondense");
        this.on("condense", "showCondense");
        this.on("condense", "showCondense2");
    }

     /**
     * Hook method executed when the "condense" event occurs.
     * Logs a message indicating that the condense event was triggered.
     */
    private onCondense(): void {
        this.safeMsg("On Condense.", "CONDENSE");
    }

    /**
     * Hook method executed during the "condense" event.
     * Logs an additional message about the condensation process.
     */
    private showCondense(): void {
        this.safeMsg(`Another On ${this.transitionName()}: ${this.fromState()} -> ${this.nextState()}`, "CONDENES");
    }

    /**
     * Hook method executed during the "condense" event.
     * Logs yet another message about the condensation process.
     */
    private showCondense2(): void {
        this.safeMsg(`(2) Another On ${this.transitionName()}: ${this.fromState()} -> ${this.nextState()}`, `${this.transitionName()?.toUpperCase()}`);
    }

    /**
     * Hook method executed before the "condense" event.
     * Checks if the current temperature is suitable for condensation.
     * If the temperature is below 120, allows the transition; otherwise, prevents it.
     *
     * @returns {boolean} - Returns true if condensation can occur, false otherwise.
     */
    private checkCondense(): boolean {
        if (this.temperature < 120) {
            this.safeMsg("Condense success", "CONDENSE SUCCESS");
            return true; // Allow the transition
        } else {
            this.safeMsg("Condense failed: temperature too high.", "CONDENES FAILED");
            return false; // Prevent the transition
        }
    }

    /**
     * Hook method executed after the "freeze" event.
     * Logs a message indicating that the substance has transitioned 
     * from liquid to solid.
     */
    private logFreeze(): void {
        this.safeMsg("The substance has frozen from liquid to solid.", "FROZEN");
    }

    /**
     * Hook method executed after the "melts" event.
     * Logs a message indicating that the substance has transitioned 
     * from solid to liquid.
     */
    private logMelts(): void {
        this.safeMsg("The substance has melted from solid to liquid.", "MELTED");
    }

    /**
     * Hook method executed after the "evaporate" event.
     * Logs a message indicating that the substance has transitioned 
     * from liquid to gas.
     */
    private logEvaporate(): void {
        this.safeMsg("The substance has evaporated from liquid to gas.", "EVAPORATED");
    }

    /**
     * Hook method executed after the "condense" event.
     * Logs a message indicating that the substance has transitioned 
     * from gas to liquid.
     */
    private logCondense(): void {
        this.infoMsg("The substance has condensed from gas to liquid.", "CONDENSED");
    }
}
```


### Running test
```
npm run test
```