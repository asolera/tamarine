let _logTypes = ["info", "error", "warning", "notice", "fatal", "debug", "sql"];
const _defaultEnabledLogTypes = ["info", "error", "fatal"];
let _allowedLogTypes = {};

const _enableDefaultLogTypes = () => _logTypes.forEach(logType => {
  if (_defaultEnabledLogTypes.includes(logType)) {
    _enableLogType(logType);
  } else {
    _disableLogType(logType);
  }
});

const _reset = (value) => _logTypes.forEach(logType => _allowedLogTypes[logType] = value);
const _enableLogType = (logType) => _allowedLogTypes[logType] = true;
const _disableLogType = (logType) => _allowedLogTypes[logType] = false;
const _addLogType = (logType) => _logTypes.push(logType);
const _getLogTypeStatus  = (logType) => _allowedLogTypes[logType];

const _init = () => {
  _reset(false);
  _enableDefaultLogTypes();
};

const _getDate = () => new Date().toLocaleString();

const _printLog = (logText, logType) => {
  const date = _getDate();
  const type = `[${logType.toUpperCase()}]`;
  if (_getLogTypeStatus(logType)) {
    console.log(_getDate(), type, logText);
  }
}

const line = () => '================================================================================';
const info = (text) => _printLog(text, 'info');
const debug = (text) => _printLog(text, 'debug');
const error = (text) => _printLog(text, 'error');
const warning = (text) => _printLog(text, 'warning');
const notice = (text) => _printLog(text, 'notice');
const fatal = (text) => _printLog(text, 'fatal');
const sql = (text) => _printLog(text, 'sql');
const custom = (logType, text) => _printLog(text, logType);

// SetAllowedLogs defines which log types will be printed.
// You can use any combination you want. Log types must be joined by pipe (|).
// You can also use `none` to disable logging and `all` to automatically enable all log types.
const setAllowedLogs = (allowedLogTypesString) => {
  if (allowedLogTypesString == "all") {
		_reset(true);
	} else if (allowedLogTypesString == "none") {
		_reset(false);
	} else {
		_reset(false);
    allowedLogTypesArray = allowedLogTypesString.split('|');
    allowedLogTypesArray.forEach(logType => {
      if (_logTypes.includes(logType)) _enableLogType(logType)
    });
  }
};

// SetCustomLog allows to create a custom log type.
// A custom type called `example` will be converted to `[EXAMPLE]`.
// Custom types should also be defined in `SetAllowedLogs` in order to be printed.
// This method must be declared BEFORE `SetAllowedLogs` method.
const setCustomLog = (logType) => _addLogType(logType);

const logger = {
  setAllowedLogs,
  setCustomLog,
  line,
  info,
  debug,
  error,
  warning,
  notice,
  fatal,
  sql,
  custom,
};

_init();

module.exports = logger;