"use strict";
// src/StateSafe.ts
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var TransitionWrapper = /** @class */ (function () {
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
    function TransitionWrapper(from, to, event) {
        if (TransitionWrapper.validateEvent(event)) {
            this.transitionData = { from: from, to: to, event: event };
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
    TransitionWrapper.validateEvent = function (event) {
        if (TransitionWrapper.reservedWords.includes(event)) {
            return false;
        }
        else {
            return true;
        }
    };
    Object.defineProperty(TransitionWrapper.prototype, "data", {
        /**
         * Retrieves the transition data associated with this transition.
         *
         * @returns {TransitionData} The transition data containing the from state, to state, and event name.
         */
        get: function () {
            return this.transitionData;
        },
        enumerable: false,
        configurable: true
    });
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
    return TransitionWrapper;
}());
/**
 * FSM (Finite State Machine) class that manages states and transitions between them based on events.
 * The class allows defining unique states and events while providing hooks for before, on, and after event handling.
 */
var FSM = /** @class */ (function () {
    function FSM() {
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
    FSM.prototype.transition = function (event, from, to) {
        var _this = this;
        // Check for duplicate transition before adding
        if (TransitionWrapper.validateEvent(event)) {
            if (!this.transitions.some(function (transition) {
                return transition.data.from === from && transition.data.to === to;
            })) {
                if (!this.transitions.some(function (transition) { return transition.data.event === event; })) {
                    var transition = new TransitionWrapper(from, to, event);
                    this.transitions.push(transition);
                    // Collect unique states and events
                    this.uniqueStates.add(from);
                    this.uniqueStates.add(to);
                    this.uniqueEvents.add(event);
                    var methodName = this.nameConvert(event);
                    this[methodName] = function () { return _this.fire(event); };
                }
            }
        }
    };
    /**
     * Gets or sets the current state of the FSM.
     * Setting the state is only allowed if the current state is null and the new state is valid.
     *
     * @param {string} [newState] - The new state to set. If provided, sets the state.
     * @returns {string | null} - Returns the current state or null if a new state is set.
     */
    FSM.prototype.state = function (newState) {
        if (newState) {
            // Set the state only if it is currently null and is a valid state
            if (this._state === null && this.uniqueStates.has(newState)) {
                this._state = newState; // Set the state only if current state is null and newState is valid
            }
            // Return null as stated in the requirements
            return null;
        }
        return this._state; // Get the current state
    };
    /**
     * Retrieves all unique states in the FSM, sorted alphabetically.
     *
     * @returns {string[]} - An array of unique states in alphabetical order.
     */
    FSM.prototype.states = function () {
        var sortedStates = Array.from(this.uniqueStates).sort();
        return sortedStates;
    };
    /**
     * Retrieves all unique events in the FSM, sorted alphabetically.
     *
     * @returns {string[]} - An array of unique events in alphabetical order.
     */
    FSM.prototype.events = function () {
        var sortedEvents = Array.from(this.uniqueEvents).sort();
        return sortedEvents;
    };
    /**
     * Executes a transition based on the provided event name.
     * Invokes any registered before, on, and after hooks in that order.
     *
     * @param {string} eventName - The event name that triggers the transition.
     */
    FSM.prototype.fire = function (eventName) {
        var _this = this;
        // Check if the event name is valid
        if (this.uniqueEvents.has(eventName)) {
            // Find the transition for the current state and event
            var transition = this.transitions.find(function (t) {
                return t.data.event === eventName && t.data.from === _this._state;
            });
            // Check if there are any before hooks and invoke them
            // Invoke before hooks if they exist
            var beforeMethod = this.nameConvert("before_".concat(eventName));
            var beforeHooks = this.beforeHooks[eventName] || [];
            var beforeHook2 = this[beforeMethod];
            var canProceed2 = true;
            this._transitionName = eventName;
            this._fromState = this._state;
            if (transition) {
                this._toState = transition.data.to;
            }
            this._nextState = "";
            if (typeof beforeHook2 === 'function') {
                canProceed2 = beforeHook2.call(this); // Execute before hook and check return value
            }
            var canProceed1 = beforeHooks.every(function (hook) { return hook(); }); // Check if all hooks return true
            if (canProceed1 && canProceed2 && transition) {
                if (transition) {
                    this._nextState = transition.data.to;
                }
                // Invoke on hooks if they exist
                var onMethod = this.nameConvert("on_".concat(eventName));
                var onHook = this[onMethod];
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
                var afterMethod = this.nameConvert("after_".concat(eventName));
                var afterHook = this[afterMethod];
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
    };
    FSM.prototype.stateChanged = function (func) {
        if (func === void 0) { func = ""; }
        // Check if the environment variable STATE or state is set to 'show'
        if ((process.env.STATE && process.env.STATE.toLowerCase() === 'show') ||
            (process.env.state && process.env.state.toLowerCase() === 'show')) {
            if (func !== "") {
                func = " in ".concat(func);
            }
            var name_1 = this.transitionName() || '';
            var fromState = this.fromState() || '';
            var toState = this.toState() || '';
            var infoMsgHook = this["infoMsg"];
            if (typeof infoMsgHook === 'function') {
                infoMsgHook.call(this, "Transition (".concat(name_1).concat(func, ") : [").concat(fromState, "] -> [").concat(toState, "]"), "STATE CHANGED");
            }
        }
    };
    FSM.prototype.transitionName = function () {
        return this._transitionName;
    };
    FSM.prototype.fromState = function () {
        return this._fromState;
    };
    FSM.prototype.toState = function () {
        return this._toState;
    };
    FSM.prototype.nextState = function () {
        return this._nextState;
    };
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
    FSM.prototype.nameConvert = function (inputString) {
        var splitParts = inputString.split('_');
        var firstPart = splitParts[0], remainingParts = splitParts.slice(1);
        var convertedParts = remainingParts.map(function (part) { return part.charAt(0).toUpperCase() + part.slice(1); });
        // Return the first part in lowercase followed by the converted parts
        return firstPart.toLowerCase() + convertedParts.join('');
    };
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
    FSM.prototype.after = function (eventName, callbackOrMethod) {
        if (!this.afterHooks[eventName]) {
            this.afterHooks[eventName] = [];
        }
        if (typeof callbackOrMethod === 'function') {
            // Register an anonymous function
            this.afterHooks[eventName].push(callbackOrMethod.bind(this)); // Bind to the FSM context
        }
        else if (typeof callbackOrMethod === 'string') {
            // Register a method by name
            var method = this[callbackOrMethod]; // Get the method from the class instance
            if (typeof method === 'function') {
                this.afterHooks[eventName].push(method.bind(this)); // Bind to the FSM context
            }
        }
    };
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
    FSM.prototype.on = function (eventName, callbackOrMethod) {
        var onMethod = this.nameConvert("on_".concat(eventName));
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
            var method = this[callbackOrMethod]; // Get the method from the class instance by name
            if (typeof method === 'function') {
                this.onHooks[eventName].push(method.bind(this)); // Bind to the FSM context
            }
        }
    };
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
    FSM.prototype.before = function (eventName, callbackOrMethod) {
        var beforeMethod = this.nameConvert("before_".concat(eventName));
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
            var method = this[callbackOrMethod]; // Get the method from the class instance by name
            if (typeof method === 'function') {
                this.beforeHooks[eventName].push(method.bind(this)); // Bind to the FSM context
            }
        }
    };
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
    FSM.prototype.invokeOnHooks = function (eventName) {
        var hooks = this.onHooks[eventName] || [];
        hooks.forEach(function (hook) { return hook(); }); // Execute all hooked methods
    };
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
    FSM.prototype.invokeAfterHooks = function (eventName) {
        var hooks = this.afterHooks[eventName] || [];
        console.log("Invoke After hook");
        hooks.forEach(function (hook) { return hook(); }); // Execute all hooked methods
    };
    return FSM;
}());
/**
 * StateSafe class extends the FSM (Finite State Machine) to add
 * logging capabilities with formatted output based on the application's state.
 *
 * This class is specifically designed to log messages with various severity levels
 * (info, safe, critical) alongside metadata like the author, application name, and
 * versioning information. It supports ANSI color codes for enhanced readability
 * in console outputs.
 */
var fs = require("fs"); // Importing the file system module
var StateSafe = /** @class */ (function (_super) {
    __extends(StateSafe, _super);
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
    function StateSafe(author, appName, majorVersion, minorVersion, patchVersion) {
        var _this = _super.call(this) || this;
        _this.logFileLocation = ''; // Property to store log file location
        _this.logQueue = []; // Queue for log messages
        _this.writing = false; // Flag to indicate if we're currently writing
        // Properties for tag, message, etc.
        _this.message = '';
        _this.tag = '';
        _this.useColor = true; // You may want to implement this based on your environment
        _this.authorName = author;
        _this.appName = appName;
        _this.majorVersion = majorVersion;
        _this.minorVersion = minorVersion;
        _this.patchVersion = patchVersion; // Initialize patch version
        return _this;
    }
    /**
     * Sets the log file location for logging messages.
     * If this location is set, log messages will be written to the specified file.
     *
     * @param {string} filePath - The path of the file where logs should be written.
     */
    StateSafe.prototype.logTo = function (filePath) {
        this.useColor = false; // Disable colors in log file
        this.logFileLocation = filePath; // Sets the file location for logging
    };
    /**
     * Logs an info message to the console with formatting and a tag.
     * The message is prefixed with a timestamp, header, and optional tag.
     *
     * @param {string} msg - The message to log.
     * @param {string} tag - An optional tag for categorizing the log message.
     * @returns {StateSafe} - The instance of StateSafe (for method chaining).
     */
    StateSafe.prototype.infoMsg = function (msg, tag) {
        if (tag === void 0) { tag = ''; }
        this.tag = tag;
        this.message = msg;
        // Constructing the formatted message
        var formattedMsg = this.formatMessage(StateSafe.DARK_BLUE, StateSafe.LIGHT_BLUE, StateSafe.LIGHT_TURQUOISE);
        this.log(formattedMsg);
        return this;
    };
    /**
     * Logs a safe message to the console with formatting and a tag.
     * Similar to infoMsg but uses a different color scheme.
     *
     * @param {string} msg - The message to log.
     * @param {string} tag - An optional tag for categorizing the log message.
     * @returns {StateSafe} - The instance of StateSafe (for method chaining).
     */
    StateSafe.prototype.safeMsg = function (msg, tag) {
        if (tag === void 0) { tag = ''; }
        this.tag = tag;
        this.message = msg;
        // Constructing the formatted message
        var formattedMsg = this.formatMessage(StateSafe.DARK_TURQUOISE, StateSafe.LIGHT_TURQUOISE, StateSafe.LIGHT_GREEN);
        this.log(formattedMsg);
        return this;
    };
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
    StateSafe.prototype.criticalMsg = function (msg, tag) {
        if (tag === void 0) { tag = ''; }
        this.tag = tag;
        this.message = msg;
        // Constructing the formatted message
        var formattedMsg = this.formatMessage(StateSafe.DARK_AMBER, StateSafe.LIGHT_RED, "".concat(StateSafe.LIGHT_AMBER).concat(StateSafe.FLASHING));
        this.log(formattedMsg);
        return this;
    };
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
    StateSafe.prototype.formatMessage = function (headerColor, msgColor, colorTag) {
        var timestamp = this.now(headerColor); // Get current timestamp
        var header = this.formatHeader(headerColor);
        var tagMessage = this.formatTag(colorTag);
        return "".concat(timestamp, " ").concat(header, " ").concat(tagMessage, "\n").concat(this.coloredMsg(msgColor));
    };
    /**
     * Formats the application header with the application's name and version.
     * The header is styled with the specified color and bold formatting.
     *
     * @private
     * @param {string} color - The color code to apply to the header text.
     * @returns {string} - The formatted header string for display.
     */
    StateSafe.prototype.formatHeader = function (color) {
        if (this.useColor) {
            return "".concat(color).concat(StateSafe.BOLD).concat(this.appName, "(v").concat(this.majorVersion, ".").concat(this.minorVersion, ".").concat(this.patchVersion, ")").concat(StateSafe.END);
            // Include patchVersion
        }
        else {
            return "".concat(this.appName, "(v").concat(this.majorVersion, ".").concat(this.minorVersion, ".").concat(this.patchVersion, ")");
            // Include patchVersion
        }
    };
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
    StateSafe.prototype.formatTag = function (color) {
        return this.useColor && this.tag ? " [".concat(color).concat(this.tag).concat(StateSafe.END, "]: ") : "[".concat(this.tag, "]: ");
    };
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
    StateSafe.prototype.coloredMsg = function (color) {
        var _this = this;
        // Split the coloredMsg into lines, and indent all but the first line
        var indentedMsg = this.message.split('\n')
            .map(function (line, index) {
            // Indent if it's not the first line
            return _this.useColor ? "  ".concat(color).concat(line).concat(StateSafe.END) : "  ".concat(line);
        })
            .join('\n'); // Join back into a single string with newline characters
        return indentedMsg;
    };
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
    StateSafe.prototype.now = function (color) {
        var timeMsg = new Date().toISOString();
        return this.useColor ? "".concat(color).concat(StateSafe.BOLD).concat(StateSafe.ITALICS).concat(timeMsg).concat(StateSafe.END) : timeMsg;
    };
    StateSafe.prototype.log = function (data) {
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
    };
    StateSafe.prototype.processLogQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var message, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.writing = true; // Indicate that we are currently writing
                        _a.label = 1;
                    case 1:
                        if (!(this.logQueue.length > 0)) return [3 /*break*/, 6];
                        message = this.logQueue.shift();
                        if (!message) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs.promises.appendFile(this.logFileLocation, message + '\n')];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.error("Failed to write log to file ".concat(this.logFileLocation, ": ").concat(err_1));
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 1];
                    case 6:
                        this.writing = false; // Reset the writing flag when done
                        return [2 /*return*/];
                }
            });
        });
    };
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
    return StateSafe;
}(FSM));
exports.StateSafe = StateSafe;
