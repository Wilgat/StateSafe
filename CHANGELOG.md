# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-3-25

### Added
- **State Management**: Introduced the `StateSafe` class that extends the base `FSM` class for robust state management.
- **Logging Functionality**: Added comprehensive logging capabilities with three levels of severity: info, safe, and critical.
- **Transition Handling**: Implemented a transition system allowing smooth navigation between states based on events.
- **Validation of Transitions**: Included `TransitionWrapper` to validate transition events against reserved JavaScript keywords.
- **Console Output**: Enhanced console logging with ANSI color codes to support colored text output.
- **Log File Support**: Added functionality for centralized logging by specifying a log file location for persistent log storage.

### Changed
- **Transition Duplication Prevention**: Improved the transition management to prevent duplicate transitions from being added.
- **Message Formatting**: Enhanced logging messages to include optional headers, timestamps, and tags for better clarity.

### Fixed
- **Event Name Validation**: Resolved issues in `TransitionWrapper` to correctly validate event names against reserved words in JavaScript.
- **Concurrency in Logging**: Fixed potential race conditions in the logging mechanism to ensure messages are logged without overlap.