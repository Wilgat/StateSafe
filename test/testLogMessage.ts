// test/testLogMessage.ts

import { StateSafe } from '../src/StateSafe';

// Define a type for valid methods
type StateSafeMethod = 'infoMsg' | 'criticalMsg' | 'safeMsg';

describe('StateSafe Class', () => {
    let stateLogic: StateSafe;

    beforeEach(() => {
        stateLogic = new StateSafe("Test Author", "StateSafe Test", "1", "0", "0");
        stateLogic.transition("freeze", "LIQUID", "SOLID");
        stateLogic.transition("condense", "GAS", "LIQUID");
    });

    describe('Logging Messages', () => {
        const logTypes: { method: StateSafeMethod; message: string; expectedTag: string; }[] = [
            { method: 'infoMsg', message: "Test info message", expectedTag: "INFO" },
            { method: 'criticalMsg', message: "Test critical message", expectedTag: "WARNING" },
            { method: 'safeMsg', message: "Test safe message", expectedTag: "DONE" },
        ];

        logTypes.forEach(({ method, message, expectedTag }) => {
            test(`should log correctly formatted messages for ${method}`, () => {
                const logSpy = jest.spyOn(console, 'log').mockImplementation(); // Mock console.log

                // Assert type as Function to allow dynamic calling
                (stateLogic[method] as Function)(message,expectedTag);
                
                expect(logSpy).toHaveBeenCalledTimes(1); // Ensure logging occurred once
                const loggedMessage = logSpy.mock.calls[0][0]; // Get the first argument logged

                const timestampPattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/; // Matches ISO format
                const expectedHeader = "StateSafe Test(v1.0.0)";

                expect(loggedMessage).toMatch(expectedHeader);
                expect(loggedMessage).toMatch(timestampPattern);
                expect(loggedMessage).toContain(message);
                expect(loggedMessage).toContain(expectedTag);

                logSpy.mockRestore(); // Restore original console.log
            });
        });
    });
    
});