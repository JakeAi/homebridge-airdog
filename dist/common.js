"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = exports.FanState = exports.SwitchState = exports.PowerState = void 0;
var PowerState;
(function (PowerState) {
    PowerState[PowerState["OFF"] = 0] = "OFF";
    PowerState[PowerState["ON"] = 1] = "ON";
})(PowerState = exports.PowerState || (exports.PowerState = {}));
var SwitchState;
(function (SwitchState) {
    SwitchState[SwitchState["OFF"] = 0] = "OFF";
    SwitchState[SwitchState["ON"] = 1] = "ON";
})(SwitchState = exports.SwitchState || (exports.SwitchState = {}));
var FanState;
(function (FanState) {
    FanState["AUTO"] = "0A";
    FanState["SLEEP"] = "0B";
    FanState["LOW"] = "01";
    FanState["MED"] = "02";
    FanState["HIGH"] = "03";
    FanState["MAX"] = "04";
})(FanState = exports.FanState || (exports.FanState = {}));
var Commands;
(function (Commands) {
    Commands["getAll"] = "getAll";
    Commands["sendChildrenLock"] = "sendChildrenLock";
})(Commands = exports.Commands || (exports.Commands = {}));
//# sourceMappingURL=common.js.map