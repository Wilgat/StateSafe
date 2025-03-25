"use strict";
// src/StateSafe.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateSafe = void 0;
/**
 * TransitionWrapper is a class that encapsulates a transition in the finite state machine (FSM).
 * Each instance of TransitionWrapper contains a TransitionData object that holds details about the transition.
 * It also ensures that the event name used for the transition is valid.
 *
 * @class TransitionWrapper
 *
 * @example
 * const transition = new TransitionWrapper("idle", "busy", "start_work");
 * console.log(transition.data); // { from: "idle", to: "busy", event: "start_work" }
 */
class TransitionWrapper {
    /**
     * Creates an instance of TransitionWrapper.
     *
     * @constructor
     * @param {string} from - The initial state of the transition.
     * @param {string} to - The target state of the transition.
     * @param {string} event - The event that triggers this transition.
     *
     * @throws {Error} Will throw an error if the event name is a reserved word.
     */
    constructor(from, to, event) {
        if (TransitionWrapper.validateEvent(event)) {
            this.transitionData = { from, to, event };
        }
        else {
            this.transitionData = { 'from': '', 'to': '', 'event': '' };
        }
    }
    /**
     * Validates the event name against a list of reserved words.
     *
     * @private
     * @param {string} event - The event name to validate.
     * @throws {Error} Will throw an error if the event is a reserved word.
     */
    static validateEvent(event) {
        if (TransitionWrapper.reservedWords.includes(event)) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * Retrieves the transition data associated with this transition.
     *
     * @returns {TransitionData} The transition data containing the from state, to state, and event name.
     */
    get data() {
        return this.transitionData;
    }
}
TransitionWrapper.reservedWords = [
    "break", "case", "catch", "class", "const", "continue",
    "debugger", "default", "delete", "do", "else", "enum",
    "export", "extends", "false", "final", "finally", "for",
    "function", "if", "implements", "import", "in", "instanceof",
    "interface", "let", "module", "new", "null", "package",
    "private", "protected", "public", "return", "static", "super",
    "switch", "this", "throw", "try", "true", "type", "typeof",
    "var", "void", "while", "with", "yield", "as", "any", "boolean",
    "byte", "char", "double", "int", "long", "object", "short",
    "string", "undefined", "declare", "namespace", "require",
    "from", "extends", "implements", "interface", "keyof", "module",
    "typeof", "get", "set"
];
/**
 * FSM (Finite State Machine) class that manages states and transitions between them based on events.
 * The class allows defining unique states and events while providing hooks for before, on, and after event handling.
 */
class FSM {
    constructor() {
        this._state = null;
        this._transitionName = "";
        this._fromState = "";
        this._toState = "";
        this._nextState = "";
        this.transitions = [];
        this.uniqueStates = new Set();
        this.uniqueEvents = new Set();
        this.onHooks = {}; // Map of after hooks
        this.afterHooks = {}; // Map of after hooks
        this.beforeHooks = {}; // Map of before hooks
    }
    /**
     * Defines a transition from one state to another triggered by an event.
     * Prevents duplicate transitions from being added and ensures unique states and events.
     *
     * @param {string} event - The name of the event that triggers the transition.
     * @param {string} from - The state from which the transition originates.
     * @param {string} to - The state to which the transition leads.
     */
    transition(event, from, to) {
        // Check for duplicate transition before adding
        if (TransitionWrapper.validateEvent(event)) {
            if (!this.transitions.some(transition => transition.data.from === from && transition.data.to === to)) {
                if (!this.transitions.some(transition => transition.data.event === event)) {
                    const transition = new TransitionWrapper(from, to, event);
                    this.transitions.push(transition);
                    // Collect unique states and events
                    this.uniqueStates.add(from);
                    this.uniqueStates.add(to);
                    this.uniqueEvents.add(event);
                    const methodName = this.nameConvert(event);
                    this[methodName] = () => this.fire(event);
                }
            }
        }
    }
    /**
     * Gets or sets the current state of the FSM.
     * Setting the state is only allowed if the current state is null and the new state is valid.
     *
     * @param {string} [newState] - The new state to set. If provided, sets the state.
     * @returns {string | null} - Returns the current state or null if a new state is set.
     */
    state(newState) {
        if (newState) {
            // Set the state only if it is currently null and is a valid state
            if (this._state === null && this.uniqueStates.has(newState)) {
                this._state = newState; // Set the state only if current state is null and newState is valid
            }
            // Return null as stated in the requirements
            return null;
        }
        return this._state; // Get the current state
    }
    /**
     * Retrieves all unique states in the FSM, sorted alphabetically.
     *
     * @returns {string[]} - An array of unique states in alphabetical order.
     */
    states() {
        const sortedStates = Array.from(this.uniqueStates).sort();
        return sortedStates;
    }
    /**
     * Retrieves all unique events in the FSM, sorted alphabetically.
     *
     * @returns {string[]} - An array of unique events in alphabetical order.
     */
    events() {
        const sortedEvents = Array.from(this.uniqueEvents).sort();
        return sortedEvents;
    }
    /**
     * Executes a transition based on the provided event name.
     * Invokes any registered before, on, and after hooks in that order.
     *
     * @param {string} eventName - The event name that triggers the transition.
     */
    fire(eventName) {
        // Check if the event name is valid
        if (this.uniqueEvents.has(eventName)) {
            // Find the transition for the current state and event
            const transition = this.transitions.find(t => t.data.event === eventName && t.data.from === this._state);
            // Check if there are any before hooks and invoke them
            // Invoke before hooks if they exist
            const beforeMethod = this.nameConvert(`before_${eventName}`);
            const beforeHooks = this.beforeHooks[eventName] || [];
            const beforeHook2 = this[beforeMethod];
            let canProceed2 = true;
            this._transitionName = eventName;
            this._fromState = this._state;
            if (transition) {
                this._toState = transition.data.to;
            }
            this._nextState = "";
            if (typeof beforeHook2 === 'function') {
                canProceed2 = beforeHook2.call(this); // Execute before hook and check return value
            }
            const canProceed1 = beforeHooks.every(hook => hook()); // Check if all hooks return true
            if (canProceed1 && canProceed2 && transition) {
                if (transition) {
                    this._nextState = transition.data.to;
                }
                // Invoke on hooks if they exist
                const onMethod = this.nameConvert(`on_${eventName}`);
                const onHook = this[onMethod];
                if (typeof onHook === 'function') {
                    onHook.call(this); // Execute on hook
                }
                this.invokeOnHooks(eventName);
                // Perform the transition
                this._state = transition.data.to; // Move to the target state
                this._nextState = "";
                this.stateChanged();
                // Invoke hooks after the transition
                // Invoke after hooks if they exist
                const afterMethod = this.nameConvert(`after_${eventName}`);
                const afterHook = this[afterMethod];
                if (typeof afterHook === 'function') {
                    afterHook.call(this); // Execute after hook
                }
                this.invokeAfterHooks(eventName);
                this._transitionName = "";
                this._fromState = "";
                this._toState = "";
                this._nextState = "";
            }
        }
        // No return; the method operates based on state changes
    }
    stateChanged(func = "") {
        // Check if the environment variable STATE or state is set to 'show'
        if ((process.env.STATE && process.env.STATE.toLowerCase() === 'show') ||
            (process.env.state && process.env.state.toLowerCase() === 'show')) {
            if (func !== "") {
                func = ` in ${func}`;
            }
            const name = this.transitionName() || '';
            const fromState = this.fromState() || '';
            const toState = this.toState() || '';
            const infoMsgHook = this["infoMsg"];
            if (typeof infoMsgHook === 'function') {
                infoMsgHook.call(this, `Transition (${name}${func}) : [${fromState}] -> [${toState}]`, "STATE CHANGED");
            }
        }
    }
    transitionName() {
        return this._transitionName;
    }
    fromState() {
        return this._fromState;
    }
    toState() {
        return this._toState;
    }
    nextState() {
        return this._nextState;
    }
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
    nameConvert(inputString) {
        const splitParts = inputString.split('_');
        const [firstPart, ...remainingParts] = splitParts;
        const convertedParts = remainingParts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
        // Return the first part in lowercase followed by the converted parts
        return firstPart.toLowerCase() + convertedParts.join('');
    }
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
    after(eventName, callbackOrMethod) {
        if (!this.afterHooks[eventName]) {
            this.afterHooks[eventName] = [];
        }
        if (typeof callbackOrMethod === 'function') {
            // Register an anonymous function
            this.afterHooks[eventName].push(callbackOrMethod.bind(this)); // Bind to the FSM context
        }
        else if (typeof callbackOrMethod === 'string') {
            // Register a method by name
            const method = this[callbackOrMethod]; // Get the method from the class instance
            if (typeof method === 'function') {
                this.afterHooks[eventName].push(method.bind(this)); // Bind to the FSM context
            }
        }
    }
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
    on(eventName, callbackOrMethod) {
        const onMethod = this.nameConvert(`on_${eventName}`);
        if (onMethod === callbackOrMethod) {
            // same name of onMethod will be executed automatically 
            // and don't needed to be registered
            return;
        }
        if (!this.onHooks[eventName]) {
            this.onHooks[eventName] = [];
        }
        if (typeof callbackOrMethod === 'function') {
            // Register an anonymous function
            this.onHooks[eventName].push(callbackOrMethod.bind(this)); // Bind to the FSM context
        }
        else if (typeof callbackOrMethod === 'string') {
            const method = this[callbackOrMethod]; // Get the method from the class instance by name
            if (typeof method === 'function') {
                this.onHooks[eventName].push(method.bind(this)); // Bind to the FSM context
            }
        }
    }
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
    before(eventName, callbackOrMethod) {
        const beforeMethod = this.nameConvert(`before_${eventName}`);
        if (beforeMethod === callbackOrMethod) {
            // same name of beforeMethod will be executed automatically 
            // and don't needed to be registered
            return;
        }
        if (!this.beforeHooks[eventName]) {
            this.beforeHooks[eventName] = [];
        }
        if (typeof callbackOrMethod === 'function') {
            // Register an anonymous function
            this.beforeHooks[eventName].push(callbackOrMethod.bind(this)); // Bind to the FSM context
        }
        else if (typeof callbackOrMethod === 'string') {
            const method = this[callbackOrMethod]; // Get the method from the class instance by name
            if (typeof method === 'function') {
                this.beforeHooks[eventName].push(method.bind(this)); // Bind to the FSM context
            }
        }
    }
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
    invokeOnHooks(eventName) {
        const hooks = this.onHooks[eventName] || [];
        hooks.forEach(hook => hook()); // Execute all hooked methods
    }
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
    invokeAfterHooks(eventName) {
        const hooks = this.afterHooks[eventName] || [];
        console.log("Invoke After hook");
        hooks.forEach(hook => hook()); // Execute all hooked methods
    }
}
/**
 * StateSafe class extends the FSM (Finite State Machine) to add
 * logging capabilities with formatted output based on the application's state.
 *
 * This class is specifically designed to log messages with various severity levels
 * (info, safe, critical) alongside metadata like the author, application name, and
 * versioning information. It supports ANSI color codes for enhanced readability
 * in console outputs.
 */
const fs = __importStar(require("fs")); // Importing the file system module
class StateSafe extends FSM {
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
    constructor(author, appName, majorVersion, minorVersion, patchVersion) {
        super();
        this.logFileLocation = ''; // Property to store log file location
        this.logQueue = []; // Queue for log messages
        this.writing = false; // Flag to indicate if we're currently writing
        // Properties for tag, message, etc.
        this.message = '';
        this.tag = '';
        this.useColor = true; // You may want to implement this based on your environment
        this.authorName = author;
        this.appName = appName;
        this.majorVersion = majorVersion;
        this.minorVersion = minorVersion;
        this.patchVersion = patchVersion; // Initialize patch version
    }
    /**
     * Sets the log file location for logging messages.
     * If this location is set, log messages will be written to the specified file.
     *
     * @param {string} filePath - The path of the file where logs should be written.
     */
    logTo(filePath) {
        this.useColor = false; // Disable colors in log file
        this.logFileLocation = filePath; // Sets the file location for logging
    }
    /**
     * Logs an info message to the console with formatting and a tag.
     * The message is prefixed with a timestamp, header, and optional tag.
     *
     * @param {string} msg - The message to log.
     * @param {string} tag - An optional tag for categorizing the log message.
     * @returns {StateSafe} - The instance of StateSafe (for method chaining).
     */
    infoMsg(msg, tag = '') {
        this.tag = tag;
        this.message = msg;
        // Constructing the formatted message
        const formattedMsg = this.formatMessage(StateSafe.DARK_BLUE, StateSafe.LIGHT_BLUE, StateSafe.LIGHT_TURQUOISE);
        this.log(formattedMsg);
        return this;
    }
    /**
     * Logs a safe message to the console with formatting and a tag.
     * Similar to infoMsg but uses a different color scheme.
     *
     * @param {string} msg - The message to log.
     * @param {string} tag - An optional tag for categorizing the log message.
     * @returns {StateSafe} - The instance of StateSafe (for method chaining).
     */
    safeMsg(msg, tag = '') {
        this.tag = tag;
        this.message = msg;
        // Constructing the formatted message
        const formattedMsg = this.formatMessage(StateSafe.DARK_TURQUOISE, StateSafe.LIGHT_TURQUOISE, StateSafe.LIGHT_GREEN);
        this.log(formattedMsg);
        return this;
    }
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
    criticalMsg(msg, tag = '') {
        this.tag = tag;
        this.message = msg;
        // Constructing the formatted message
        const formattedMsg = this.formatMessage(StateSafe.DARK_AMBER, StateSafe.LIGHT_RED, `${StateSafe.LIGHT_AMBER}${StateSafe.FLASHING}`);
        this.log(formattedMsg);
        return this;
    }
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
    formatMessage(headerColor, msgColor, colorTag) {
        const timestamp = this.now(headerColor); // Get current timestamp
        const header = this.formatHeader(headerColor);
        const tagMessage = this.formatTag(colorTag);
        return `${timestamp} ${header} ${tagMessage}\n${this.coloredMsg(msgColor)}`;
    }
    /**
     * Formats the application header with the application's name and version.
     * The header is styled with the specified color and bold formatting.
     *
     * @private
     * @param {string} color - The color code to apply to the header text.
     * @returns {string} - The formatted header string for display.
     */
    formatHeader(color) {
        if (this.useColor) {
            return `${color}${StateSafe.BOLD}${this.appName}(v${this.majorVersion}.${this.minorVersion}.${this.patchVersion})${StateSafe.END}`;
            // Include patchVersion
        }
        else {
            return `${this.appName}(v${this.majorVersion}.${this.minorVersion}.${this.patchVersion})`;
            // Include patchVersion
        }
    }
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
    formatTag(color) {
        return this.useColor && this.tag ? ` [${color}${this.tag}${StateSafe.END}]: ` : `[${this.tag}]: `;
    }
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
    coloredMsg(color) {
        // Split the coloredMsg into lines, and indent all but the first line
        const indentedMsg = this.message.split('\n')
            .map((line, index) => {
            // Indent if it's not the first line
            return this.useColor ? `  ${color}${line}${StateSafe.END}` : `  ${line}`;
        })
            .join('\n'); // Join back into a single string with newline characters
        return indentedMsg;
    }
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
    now(color) {
        const timeMsg = new Date().toISOString();
        return this.useColor ? `${color}${StateSafe.BOLD}${StateSafe.ITALICS}${timeMsg}${StateSafe.END}` : timeMsg;
    }
    log(data) {
        if (this.logFileLocation) {
            // Add data to the log queue
            this.logQueue.push(data);
            // Start processing the queue if not already writing
            if (!this.writing) {
                this.processLogQueue();
            }
        }
        else {
            // Default to console logging
            console.log(data);
        }
    }
    processLogQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            this.writing = true; // Indicate that we are currently writing
            while (this.logQueue.length > 0) {
                const message = this.logQueue.shift(); // Get the next message from the queue
                if (message) {
                    try {
                        yield fs.promises.appendFile(this.logFileLocation, message + '\n');
                    }
                    catch (err) {
                        console.error(`Failed to write log to file ${this.logFileLocation}: ${err}`);
                    }
                }
            }
            this.writing = false; // Reset the writing flag when done
        });
    }
}
exports.StateSafe = StateSafe;
StateSafe.version = '1.0.1';
// ANSI color codes
StateSafe.BOLD = '\x1b[1m';
StateSafe.DARK_AMBER = '\x1b[33m';
StateSafe.DARK_BLUE = '\x1b[34m';
StateSafe.DARK_TURQUOISE = '\x1b[36m';
StateSafe.END = '\x1b[0m';
StateSafe.FLASHING = '\x1b[5m';
StateSafe.ITALICS = '\x1b[3m';
StateSafe.LIGHT_RED = '\x1b[91m';
StateSafe.LIGHT_AMBER = '\x1b[93m';
StateSafe.LIGHT_BLUE = '\x1b[94m';
StateSafe.LIGHT_GREEN = '\x1b[92m';
StateSafe.LIGHT_TURQUOISE = '\x1b[96m';
