/**
 * FSM (Finite State Machine) class that manages states and transitions between them based on events.
 * The class allows defining unique states and events while providing hooks for before, on, and after event handling.
 */
declare class FSM {
    private _state;
    private _transitionName;
    private _fromState;
    private _toState;
    private _nextState;
    private transitions;
    private uniqueStates;
    private uniqueEvents;
    private onHooks;
    afterHooks: {
        [eventName: string]: ((...args: any[]) => void)[];
    };
    private beforeHooks;
    /**
     * Defines a transition from one state to another triggered by an event.
     * Prevents duplicate transitions from being added and ensures unique states and events.
     *
     * @param {string} event - The name of the event that triggers the transition.
     * @param {string} from - The state from which the transition originates.
     * @param {string} to - The state to which the transition leads.
     */
    transition(event: string, from: string, to: string): void;
    /**
     * Gets or sets the current state of the FSM.
     * Setting the state is only allowed if the current state is null and the new state is valid.
     *
     * @param {string} [newState] - The new state to set. If provided, sets the state.
     * @returns {string | null} - Returns the current state or null if a new state is set.
     */
    state(newState?: string): string | null;
    /**
     * Retrieves all unique states in the FSM, sorted alphabetically.
     *
     * @returns {string[]} - An array of unique states in alphabetical order.
     */
    states(): string[];
    /**
     * Retrieves all unique events in the FSM, sorted alphabetically.
     *
     * @returns {string[]} - An array of unique events in alphabetical order.
     */
    events(): string[];
    /**
     * Executes a transition based on the provided event name.
     * Invokes any registered before, on, and after hooks in that order.
     *
     * @param {string} eventName - The event name that triggers the transition.
     */
    fire(eventName: string): void;
    stateChanged(func?: string): void;
    transitionName(): string | null;
    fromState(): string | null;
    toState(): string | null;
    nextState(): string | null;
    /**
     * Converts a snake_case string to camelCase format.
     * The first part of the string will be converted to lowercase, while subsequent parts will be capitalized.
     * This is useful for dynamically creating method names or variable names that follow the camelCase convention.
     *
     * @param {string} inputString - The snake_case string to be converted to camelCase.
     * @returns {string} - The converted string in camelCase format.
     *
     * @example
     * // Converts 'event_name' to 'eventName'
     * const result = nameConvert('event_name'); // result: 'eventName'
     */
    private nameConvert;
    /**
     * Registers an 'after' hook for a specified event.
     * This hook is executed after the event transition has occurred. It can be used
     * for cleanup actions or additional tasks that need to happen after a transition.
     * This can either be an anonymous function or an existing method name.
     *
     * @param {string} eventName - The name of the event for which the function will be executed after the transition.
     * @param {Function | string} callbackOrMethod - The anonymous function to execute or the method name to invoke after the transition.
     *
     * @example
     * // Register an after hook for the 'start_work' event
     * fsm.after('start_work', 'logCompletion');
     *
     * // method to be registered
     * logCompletion() {
     *     // logic to log completion of work
     * }
    */
    after(eventName: string, callbackOrMethod: Function | string): void;
    /**
     * Registers an 'on' hook for a specified event.
     * This hook is executed when the event is triggered. It can be used for
     * performing actions directly associated with the event.
     * This can either be an anonymous function or an existing method name.
     *
     * @param {string} eventName - The name of the event for which the function will be executed after the transition.
     * @param {Function | string} callbackOrMethod - The anonymous function to execute or the method name to invoke after the transition.
     *
     * @example
     * // Register an on hook for the 'start_work' event
     * fsm.on('start_work', 'performWork');
     *
     * // method to be registered
     * performWork() {
     *     // logic to perform work
     * }
     */
    on(eventName: string, callbackOrMethod: Function | string): void;
    /**
     * Registers a 'before' hook for a specified event.
     * This hook is executed before the event is processed. If any 'before' hook
     * returns `false`, the transition will not occur.
     * This can either be an anonymous function or an existing method name.
     *
     * @param {string} eventName - The name of the event for which the function will be executed after the transition.
     * @param {Function | string} callbackOrMethod - The anonymous function to execute or the method name to invoke after the transition.
     *
     * @example
     * // Register a before hook for the 'start_work' event
     * fsm.before('start_work', 'checkPermissions');
     *
     * // method to be registered
     * checkPermissions() {
     *     // logic to check permissions
     *     return true; // return false to prevent the transition
     * }
     */
    before(eventName: string, callbackOrMethod: Function | string): void;
    /**
     * Invokes all registered 'on' hooks associated with a given event.
     * This method executes each 'on' hook in the order they were registered.
     * It is typically called after a transition has successfully occurred
     * to allow for additional actions tied to that event.
     *
     * @param {string} eventName - The name of the event for which the 'on' hooks should be invoked.
     *
     * @example
     * // Assuming 'start_work' event has on hooks registered
     * fsm.invokeOnHooks('start_work');
     * // This will execute all methods registered with fsm.on('start_work', ...)
     */
    private invokeOnHooks;
    /**
     * Invokes all registered 'after' hooks associated with a given event.
     * This method executes each 'after' hook in the order they were registered.
     * It is called after a transition has occurred to allow for cleanup actions
     * or tasks that need to happen following the completion of the event's transition.
     *
     * @param {string} eventName - The name of the event for which the 'after' hooks should be invoked.
     *
     * @example
     * // Assuming 'start_work' event has after hooks registered
     * fsm.invokeAfterHooks('start_work');
     * // This will execute all methods registered with fsm.after('start_work', ...)
     */
    private invokeAfterHooks;
}
export declare class StateSafe extends FSM {
    static version: string;
    private authorName;
    private appName;
    private majorVersion;
    private minorVersion;
    private patchVersion;
    private logFileLocation;
    private logQueue;
    private writing;
    private static BOLD;
    private static DARK_AMBER;
    private static DARK_BLUE;
    private static DARK_TURQUOISE;
    private static END;
    private static FLASHING;
    private static ITALICS;
    private static LIGHT_RED;
    private static LIGHT_AMBER;
    private static LIGHT_BLUE;
    private static LIGHT_GREEN;
    private static LIGHT_TURQUOISE;
    private message;
    private tag;
    private useColor;
    /**
     * Constructs a StateSafe instance with author, application name,
     * and version information.
     *
     * @param {string} author - The name of the author.
     * @param {string} appName - The name of the application.
     * @param {string} majorVersion - The major version of the application.
     * @param {string} minorVersion - The minor version of the application.
     * @param {string} patchVersion - The patch version of the application. // New parameter
     */
    constructor(author: string, appName: string, majorVersion: string, minorVersion: string, patchVersion: string);
    /**
     * Sets the log file location for logging messages.
     * If this location is set, log messages will be written to the specified file.
     *
     * @param {string} filePath - The path of the file where logs should be written.
     */
    logTo(filePath: string): void;
    /**
     * Logs an info message to the console with formatting and a tag.
     * The message is prefixed with a timestamp, header, and optional tag.
     *
     * @param {string} msg - The message to log.
     * @param {string} tag - An optional tag for categorizing the log message.
     * @returns {StateSafe} - The instance of StateSafe (for method chaining).
     */
    infoMsg(msg: string, tag?: string): this;
    /**
     * Logs a safe message to the console with formatting and a tag.
     * Similar to infoMsg but uses a different color scheme.
     *
     * @param {string} msg - The message to log.
     * @param {string} tag - An optional tag for categorizing the log message.
     * @returns {StateSafe} - The instance of StateSafe (for method chaining).
     */
    safeMsg(msg: string, tag?: string): this;
    /**
     * Logs a critical message to the console with formatting and a tag.
     * This method highlights the critical nature of the message by using
     * distinct color codes. The message is prefixed with a timestamp, header,
     * and optional tag to signify its importance.
     *
     * @param {string} msg - The message to log.
     * @param {string} tag - An optional tag for categorizing the log message.
     * @returns {StateSafe} - The instance of StateSafe (for method chaining).
     *
     * @example
     * // Logging a critical message
     * fsm.criticalMsg('A critical failure occurred!', 'ERROR');
     */
    criticalMsg(msg: string, tag?: string): this;
    /**
     * Constructs a formatted message string for logging, incorporating
     * a timestamp, message header, and tag. The message is styled with
     * the specified colors for visibility.
     *
     * @private
     * @param {string} headerColor - The color code for the header text.
     * @param {string} coloredMsg - The color code for the main message text.
     * @param {string} colorTag - The color code for the tag text.
     * @returns {string} - The formatted message string, ready for output.
     *
     * @example
     * // Creating a formatted message for logging
     * const message = this.formatMessage(StateSafe.DARK_BLUE, StateSafe.LIGHT_BLUE, StateSafe.LIGHT_TURQUOISE);
     */
    private formatMessage;
    /**
     * Formats the application header with the application's name and version.
     * The header is styled with the specified color and bold formatting.
     *
     * @private
     * @param {string} color - The color code to apply to the header text.
     * @returns {string} - The formatted header string for display.
     */
    private formatHeader;
    /**
     * Formats the tag used in log messages with optional coloring.
     * The tag is displayed alongside the message and is styled based on
     * the flag indicating whether to use color and the specific color passed.
     *
     * @private
     * @param {string} color - The color code to apply to the tag text.
     * @returns {string} - The formatted tag string for display.
     *
     * @example
     * // Formatting a tag with color
     * const tag = this.formatTag(StateSafe.LIGHT_GREEN);
     */
    private formatTag;
    /**
     * Applies color formatting to the message text based on the flag
     * indicating whether to use color. If color is enabled, the message
     * is returned with the specified color; otherwise, it returns the
     * message in plain text.
     *
     * @private
     * @param {string} color - The color code to apply to the message.
     * @returns {string} - The colored message string or plain text.
     *
     * @example
     * // Getting a colored message for logging
     * const message = this.coloredMsg(StateSafe.LIGHT_BLUE);
     */
    private coloredMsg;
    /**
     * Generates a timestamp string formatted as an ISO string, optionally
     * styled with color. This method provides the current date and time,
     * which can be included in log messages.
     *
     * @private
     * @param {string} color - The color code to apply to the timestamp text.
     * @returns {string} - The formatted timestamp string, with optional color.
     *
     * @example
     * // Generating a colored timestamp for logging
     * const timestamp = this.now(StateSafe.DARK_BLUE);
     */
    private now;
    private log;
    private processLogQueue;
}
export {};
