// test/testStateSafe.ts

import { StateSafe } from '../src/StateSafe';

describe('StateSafe Class', () => {
    let stateLogic: StateSafe;

    beforeEach(() => {
        // Initialize a new instance of StateSafe before each test
        stateLogic = new StateSafe("Test Author", "StateSafe Test", "1", "0", "0");
        stateLogic.transition("freeze", "LIQUID", "SOLID");
        stateLogic.transition("condense", "GAS", "LIQUID"); // Set up transition
    });

    test('default state should be null', () => {
        expect(stateLogic.state()).toBeNull();
    });

    test('should show correct states', () => {
        const expectedStates = ["GAS", "LIQUID", "SOLID"];
        expect(stateLogic.states()).toEqual(expectedStates);
    });

    test('should not allow reserved words as transition event', () => {
        stateLogic.transition("default", "LIQUID", "PLASMA");
        const expectedTransitions = ["condense", "freeze"];
        expect(stateLogic.events()).toEqual(expectedTransitions);
    });

    test('should handle illegal state gracefully', () => {
        stateLogic.state("illegalState");
        expect(stateLogic.state()).toBeNull();
    });

    test('should handle illegal state transitions gracefully', () => {
        stateLogic.transition("illegalTransition", "LIQUID", "SOLID");
        const expectedTransitions = ["condense", "freeze"];
        expect(stateLogic.events()).toEqual(expectedTransitions);
    });

    test('should transition to first state correctly', () => {
        stateLogic.state("SOLID");
        expect(stateLogic.state()).toBe("SOLID");   // Next state is SOLID
    });

    test('should not transition other state than the first state', () => {
        stateLogic.state("SOLID");
        stateLogic.state("LIQUID");
        expect(stateLogic.state()).toBe("SOLID");   // Next state is SOLID
    });

    test('should transit to correctly by fire()', () => { 
        stateLogic.state("GAS");
        stateLogic.fire('condense');
        expect(stateLogic.state()).toBe("LIQUID");
        stateLogic.fire('freeze');
        expect(stateLogic.state()).toBe("SOLID");
    });

    test('should not transit for incorrect transition', () => { 
        stateLogic.state("GAS");
        stateLogic.fire('condense');
        expect(stateLogic.state()).toBe("LIQUID");
        stateLogic.fire('condense');
        expect(stateLogic.state()).toBe("LIQUID");
    });

    test('should transit to correctly by transition names.', () => {
        // Initialize a new instance of StateSafe before each test
        let s = new StateSafe("Test Author", "StateSafe Test", "1", "0", "0") as any;
        s.transition("freeze", "LIQUID", "SOLID");
        s.transition("condense", "GAS", "LIQUID"); // Set up transition
        s.state("GAS");
        s.condense();
        expect(s.state()).toBe("LIQUID");
        s.freeze();
        expect(s.state()).toBe("SOLID");
    });

    test('should log messages', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(); // Mock console.log

        stateLogic.infoMsg("Starting state transition");
        expect(logSpy).toHaveBeenCalled(); // Check if logging occurred

        logSpy.mockRestore(); // Restore original console.log
    });

    test('should call hook methods on state transition', () => {
        let count = 0;
        // Setup event hooks
        stateLogic.before('freeze', () => {
            count++;
            return true;
        });
        stateLogic.on('condense', () => {
            count++;
        });
        stateLogic.after('condense', () => {
            count++;
        });
        stateLogic.state('GAS');
        // Perform some transitions
        // Now trigger condense (assuming you set it up similarly)
        stateLogic.fire("condense"); // Trigger the condense transition
        expect(stateLogic.state()).toBe('LIQUID')
        // Expect the condense hook to have been called
        expect(count).toBe(2);
        stateLogic.fire("freeze"); // Trigger the freeze transition   
        // Expect the freeze hook to have been called
        expect(stateLogic.state()).toBe('SOLID')
        expect(count).toBe(3);
    });

    test('should fail transition for false returned by hook methods', () => {
        let count = 0;
        // Setup event hooks
        stateLogic.before('freeze', () => {
            count++;
            return false;
        });
        stateLogic.on('condense', () => {
            count++;
        });
        stateLogic.after('condense', () => {
            count++;
        });
        stateLogic.state('GAS');
        // Perform some transitions
        // Now trigger condense (assuming you set it up similarly)
        stateLogic.fire("condense"); // Trigger the condense transition
        expect(stateLogic.state()).toBe('LIQUID')
        // Expect the condense hook to have been called
        expect(count).toBe(2);
        stateLogic.fire("freeze"); // Trigger the freeze transition   
        // Expect the freeze hook to have been called
        expect(stateLogic.state()).toBe('LIQUID')
        expect(count).toBe(3);
    });
});
