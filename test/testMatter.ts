// test/testMatter.ts

// src/Matter.ts

import { StateSafe } from '../src/StateSafe';

/**
 * Matter class extends the StateSafe to model the behavior of different states 
 * of matter (solid, liquid, gas) and their transitions (e.g., freezing, melting).
 * This class incorporates logging and event handling capabilities to trace 
 * state changes in a substance based on temperature dynamics.
 */
export class Matter extends StateSafe {
    // Initialize temperature
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

describe('Matter Class', () => {
    let matter: Matter;

    beforeEach(() => {
        // Initialize a new instance of Matter before each test
        matter = new Matter("Test Author", "Matter Test App", "1", "0", "0");
    });

    test('should transition from LIQUID to SOLID on freeze', () => {
        matter.state("LIQUID")
        expect(matter.state()).toBe("LIQUID");
        matter.temperature = 100; // Set temperature for freezing
        matter.fire("freeze");
        expect(matter.state()).toBe("SOLID");
    });

    test('should transition from SOLID to LIQUID on melts', () => {
        matter.state("SOLID")
        expect(matter.state()).toBe("SOLID");
        matter.temperature = 80; // Set temperature for melting
        matter.fire("melts");
        expect(matter.state()).toBe("LIQUID");
    });

    test('should transition from LIQUID to GAS on evaporate', () => {
        matter.state("LIQUID")
        expect(matter.state()).toBe("LIQUID");
        matter.temperature = 110; // Set temperature for evaporation
        matter.fire("evaporate");
        expect(matter.state()).toBe("GAS");
    });

    test('should transition from GAS to LIQUID on condense when temperature is low', () => {
        matter.state("GAS")
        expect(matter.state()).toBe("GAS");
        matter.temperature = 100; // Set temperature for condensation
        matter.fire("condense");
        expect(matter.state()).toBe("LIQUID");
    });

    test('should not transition from GAS to LIQUID on condense when temperature is high', () => {
        matter.state("GAS")
        expect(matter.state()).toBe("GAS");
        matter.temperature = 130; // Set temperature too high
        matter.fire("condense");
        expect(matter.state()).toBe("GAS"); // No change
    });
});