# Tamarine

Tamarine is a simple Node.js logging library, inspired on https://github.com/asolera/loggr.

It allows you to:
- define any combination of log levels/types;
- create custom log types.

It supports, by default, the following levels: `INFO`, `NOTICE`, `WARNING`, `ERROR`, `FATAL`, `DEBUG`, `SQL`.

## Getting Started

Install Tamarine in your project:

```sh
npm i tamarine
```

Start logging:

```js
const logger = require('tamarine')

logger.info(logger.line())
logger.info('Hello world!')
logger.info(logger.line())
```

Code output:
```
2020-6-15 15:10:06 [INFO] ================================================================================
2020-6-15 15:10:06 [INFO] Hello world!
2020-6-15 15:10:06 [INFO] ================================================================================
```

## Configuring Log Levels

Tamarine allows you to configure allowed levels in a simple string, joined by pipe operator, thus making simpler for working with different environments.

By default (wthout any configuration) only `info`, `error` and `fatal` logs will be printed in console.

Call the method below (at the very beggining of your script), passing in the desired log levels:

```js
const logger = require('tamarine')

logger.setAllowedLogs('info|error|debug')

logger.debug('It works!')
```

You can also define `all` (all log types will be printed) or `none` (disable any logging) options.

## Creating custom types

You can also define a custom type of log by calling this method **before** configuration (`setAllowedLogs`):

```js
const logger = require('tamarine')

logger.setCustomLog("example")
logger.setAllowedLogs('info|error|example')

logger.custom('example', 'It works!')
```

Output:

```
2020-6-15 15:10:06 [EXAMPLE] It works!
```

Custom types are also subject for allowed types configuration and must be called before anything.

## Logging

Docs by example:

```js
const logger = require('tamarine')

logger.setCustomLog("test")
logger.setAllowedLogs("all") // this is needed in order to print all the messages below

logger.info(logger.line()) // prints a line inside an info message
logger.info("Info message...")
logger.notice("Notice message...")
logger.warning("Warning message...")
logger.error("Error message...")
logger.fatal("Fatal message...")
logger.debug("Debug message...")
logger.sql("SELECT something FROM example")
logger.custom("test", "A custom log type message...")
logger.info(logger.line())
```

Output:
```
2020-6-15 16:39:24 [INFO] ================================================================================
2020-6-15 16:39:24 [INFO] Info message...
2020-6-15 16:39:24 [NOTICE] Notice message...
2020-6-15 16:39:24 [WARNING] Warning message...
2020-6-15 16:39:24 [ERROR] Error message...
2020-6-15 16:39:24 [FATAL] Fatal message...
2020-6-15 16:39:24 [DEBUG] Debug message...
2020-6-15 16:39:24 [SQL] SELECT something FROM example
2020-6-15 16:39:24 [TEST] A custom log type message...
2020-6-15 16:39:24 [INFO] ================================================================================
```

## Full Documentation

| **Method** | **Default** | **Description** |
|---|---|---|
| setCustomLog(_`typeName`_) | | Allows to create a custom log type.<br>A custom type called `example` will be converted to `[EXAMPLE]`.<br>Custom types should also be defined in `setAllowedLogs` in order to be printed.<br>This method must be declared BEFORE `setAllowedLogs` method. |
| setAllowedLogs(_`logTypes`_) | `info|error|fatal` | Defines which log types will be printed.<br>You can use any combination you want. Log types must be joined by pipe (|).<br>You can also use `none` to disable logging and `all` to automatically enable all log types. |
| line() | | Prints a line. |
| info(_`message`_) | | Prints the message with `[INFO]` prefix. |
| notice(_`message`_) | | Prints the message with `[NOTICE]` prefix. |
| warning(_`message`_) | | Prints the message with `[WARNING]` prefix. |
| error(_`message`_) | | Prints the message with `[ERROR]` prefix. |
| fatal(_`message`_) | | Prints the message with `[FATAL]` prefix. |
| debug(_`message`_) | | Prints the message with `[DEBUG]` prefix. |
| sql(_`message`_) | | Prints the message with `[SQL]` prefix. |
| custom(_`typeName, message`_) | | Prints the message with a custom prefix.<br>In order to work, the custom log type must be set in `setCustomLog` method and defined in `setAllowedLogs` method.<br>First argument is prefix and second argument is the message. Multiple custom log types are also allowed. |

## Contributing

1. Fork it
1. Download your fork to your PC (`git clone https://github.com/asolera/tamarine && cd tamarine`)
1. Create your feature branch (git checkout -b my-new-feature)
1. Make changes and add them (git add .)
1. Commit your changes (git commit -m 'Add some feature')
1. Push to the branch (git push origin my-new-feature)
1. Create new pull request

## Author

Andrew Solera - andrewsolera@gmail.com