window.__require = function e(t, n, i) {
function r(o, c) {
if (!n[o]) {
if (!t[o]) {
var l = o.split("/");
l = l[l.length - 1];
if (!t[l]) {
var a = "function" == typeof __require && __require;
if (!c && a) return a(l, !0);
if (s) return s(l, !0);
throw new Error("Cannot find module '" + o + "'");
}
}
var h = n[o] = {
exports: {}
};
t[o][0].call(h.exports, function(e) {
return r(t[o][1][e] || e);
}, h, h.exports, e, t, n, i);
}
return n[o].exports;
}
for (var s = "function" == typeof __require && __require, o = 0; o < i.length; o++) r(i[o]);
return r;
}({
1: [ function(e, t, n) {
function i() {
this._events = this._events || {};
this._maxListeners = this._maxListeners || void 0;
}
t.exports = i;
i.EventEmitter = i;
i.prototype._events = void 0;
i.prototype._maxListeners = void 0;
i.defaultMaxListeners = 10;
i.prototype.setMaxListeners = function(e) {
if (!s(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
this._maxListeners = e;
return this;
};
i.prototype.emit = function(e) {
var t, n, i, s, l, a;
this._events || (this._events = {});
if ("error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
if ((t = arguments[1]) instanceof Error) throw t;
var h = new Error('Uncaught, unspecified "error" event. (' + t + ")");
h.context = t;
throw h;
}
if (c(n = this._events[e])) return !1;
if (r(n)) switch (arguments.length) {
case 1:
n.call(this);
break;

case 2:
n.call(this, arguments[1]);
break;

case 3:
n.call(this, arguments[1], arguments[2]);
break;

default:
s = Array.prototype.slice.call(arguments, 1);
n.apply(this, s);
} else if (o(n)) {
s = Array.prototype.slice.call(arguments, 1);
i = (a = n.slice()).length;
for (l = 0; l < i; l++) a[l].apply(this, s);
}
return !0;
};
i.prototype.addListener = function(e, t) {
var n;
if (!r(t)) throw TypeError("listener must be a function");
this._events || (this._events = {});
this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t);
this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [ this._events[e], t ] : this._events[e] = t;
if (o(this._events[e]) && !this._events[e].warned && (n = c(this._maxListeners) ? i.defaultMaxListeners : this._maxListeners) && n > 0 && this._events[e].length > n) {
this._events[e].warned = !0;
console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length);
"function" == typeof console.trace && console.trace();
}
return this;
};
i.prototype.on = i.prototype.addListener;
i.prototype.once = function(e, t) {
if (!r(t)) throw TypeError("listener must be a function");
var n = !1;
function i() {
this.removeListener(e, i);
if (!n) {
n = !0;
t.apply(this, arguments);
}
}
i.listener = t;
this.on(e, i);
return this;
};
i.prototype.removeListener = function(e, t) {
var n, i, s, c;
if (!r(t)) throw TypeError("listener must be a function");
if (!this._events || !this._events[e]) return this;
s = (n = this._events[e]).length;
i = -1;
if (n === t || r(n.listener) && n.listener === t) {
delete this._events[e];
this._events.removeListener && this.emit("removeListener", e, t);
} else if (o(n)) {
for (c = s; c-- > 0; ) if (n[c] === t || n[c].listener && n[c].listener === t) {
i = c;
break;
}
if (i < 0) return this;
if (1 === n.length) {
n.length = 0;
delete this._events[e];
} else n.splice(i, 1);
this._events.removeListener && this.emit("removeListener", e, t);
}
return this;
};
i.prototype.removeAllListeners = function(e) {
var t, n;
if (!this._events) return this;
if (!this._events.removeListener) {
0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e];
return this;
}
if (0 === arguments.length) {
for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
this.removeAllListeners("removeListener");
this._events = {};
return this;
}
if (r(n = this._events[e])) this.removeListener(e, n); else if (n) for (;n.length; ) this.removeListener(e, n[n.length - 1]);
delete this._events[e];
return this;
};
i.prototype.listeners = function(e) {
return this._events && this._events[e] ? r(this._events[e]) ? [ this._events[e] ] : this._events[e].slice() : [];
};
i.prototype.listenerCount = function(e) {
if (this._events) {
var t = this._events[e];
if (r(t)) return 1;
if (t) return t.length;
}
return 0;
};
i.listenerCount = function(e, t) {
return e.listenerCount(t);
};
function r(e) {
return "function" == typeof e;
}
function s(e) {
return "number" == typeof e;
}
function o(e) {
return "object" == typeof e && null !== e;
}
function c(e) {
return void 0 === e;
}
}, {} ],
Ball: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3cc2dnTpMVE/JFHaMV/dxhw", "Ball");
cc.Class({
extends: cc.Component,
properties: {
rb: cc.RigidBody
},
init: function(e, t) {
this.controller = e;
this.node.position = cc.v2(0, -350);
this.setSpeed(t);
},
setSpeed: function(e) {
var t = 800 + 800 * e / 100;
cc.log(t);
this.rb.linearVelocity = cc.v2(t, t);
},
onBeginContact: function(e, t, n) {
switch (n.tag) {
case 1:
this.controller.contactWithGround();
break;

case 2:
this.controller.contactWithBricks(n.node);
}
}
});
cc._RF.pop();
}, {} ],
Block: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "66802zyWGhAcIzqeOVZ8RB3", "Block");
var i = e("Mathf");
cc.Class({
extends: cc.Component,
properties: {
_canAttack: !0,
_currentHP: 0,
color1: cc.Color,
color2: cc.Color,
color3: cc.Color,
color4: cc.Color
},
setPos: function(e, t, n) {
this.node.x = (this.node.width + n) * t;
this.node.y = -(this.node.height + n / 2) * e;
},
health: function(e) {
var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
this._canAttack = t;
this.maxHP = e;
this._currentHP = e;
this.setColor(e);
},
takeDamage: function(e) {
if (this._canAttack) {
this._currentHP = i.clamp(this._currentHP - e, 1, this.maxHP);
this._currentHP > 1 ? this.setColor(this._currentHP) : this.node.destroy();
}
},
setColor: function(e) {
switch (e) {
case 1:
this.node.color = this.color1;
break;

case 2:
this.node.color = this.color2;
break;

case 3:
this.node.color = this.color3;
break;

case 4:
this.node.color = this.color4;
}
}
});
cc._RF.pop();
}, {
Mathf: "Mathf"
} ],
Bricks: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "7cca5HviUpGNaUMzGAjKZGu", "Bricks");
function i(e) {
if (Array.isArray(e)) {
for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
return n;
}
return Array.from(e);
}
cc.Class({
extends: cc.Component,
properties: {
block: cc.Prefab
},
init: function(e) {
this.node.removeAllChildren();
e = [].concat(i(e));
for (var t = 0; t < e.length; t++) {
e[t] = e[t].split(",");
for (var n = 0; n < e[t].length; n++) switch (Number(e[t][n])) {
case 1:
this.createBlock(t, n, 1, !1);
break;

case 2:
this.createBlock(t, n, 2);
break;

case 3:
this.createBlock(t, n, 3);
break;

case 4:
this.createBlock(t, n, 4);
}
}
},
createBlock: function(e, t, n, i) {
var r = cc.instantiate(this.block), s = r.getComponent("Block");
s.setPos(e, t, 15);
s.health(n, i);
r.parent = this.node;
}
});
cc._RF.pop();
}, {} ],
EventCode: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "44fcbw4UHFH3r5jFv0huVew", "EventCode");
t.exports = {
GAME: {
GET_LEVEL: "GET_LEVEL",
START: "START_GAME"
},
LEVEL: {
CLICK_LEVEL: "CLICK_LEVEL"
}
};
cc._RF.pop();
}, {} ],
EventEmitter: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9f2aeRH6bNGiLDm5qGvWusz", "EventEmitter");
var i = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var i = t[n];
i.enumerable = i.enumerable || !1;
i.configurable = !0;
"value" in i && (i.writable = !0);
Object.defineProperty(e, i.key, i);
}
}
return function(t, n, i) {
n && e(t.prototype, n);
i && e(t, i);
return t;
};
}();
function r(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var s = e("events"), o = function() {
function e() {
r(this, e);
this._emitter = new s();
this._emitter.setMaxListeners(100);
}
i(e, [ {
key: "emit",
value: function(e) {
for (var t, n = arguments.length, i = Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) i[r - 1] = arguments[r];
(t = this._emitter).emit.apply(t, [ e ].concat(i));
}
}, {
key: "registerEvent",
value: function(e, t) {
this._emitter.on(e, t);
}
}, {
key: "registerOnce",
value: function(e, t) {
this._emitter.once(e, t);
}
}, {
key: "removeEvent",
value: function(e, t) {
this._emitter.removeListener(e, t);
}
}, {
key: "destroy",
value: function() {
this._emitter.removeAllListeners();
this._emitter = null;
e.instance = null;
}
} ]);
return e;
}();
o.instance = null;
t.exports = o;
cc._RF.pop();
}, {
events: 1
} ],
EventHelper: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "98f7ac4i7lFW6AtLZdDbdYv", "EventHelper");
var i = e("EventEmitter"), r = function(e, t) {
if (i.instance && t.__eventMap && t.__eventMap[e]) {
t.__eventMap[e].forEach(function(t) {
return i.instance.removeEvent(e, t);
});
delete t.__eventMap[e];
}
};
t.exports = {
registerEvent: function(e, t, n) {
n.__eventMap || (n.__eventMap = {});
n.__eventMap[e] || (n.__eventMap[e] = []);
var r = t.bind(n);
n.__eventMap[e].push(r);
i.instance.registerEvent(e, r);
},
registerOnce: function(e, t, n) {
var r = t.bind(n);
i.instance.registerOnce(e, r);
},
removeEvent: r,
removeEvents: function(e) {
if (i.instance && e.__eventMap) {
for (var t in e.__eventMap) r(t, e);
e.__eventMap = {};
}
}
};
cc._RF.pop();
}, {
EventEmitter: "EventEmitter"
} ],
GameController: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "3b7c6EFi45Dhp1UAWcHr6Lj", "GameController");
var i = e("EventHelper").registerEvent, r = e("EventCode");
cc.Class({
extends: cc.Component,
properties: {
ball: e("Ball"),
bricks: e("Bricks"),
paddle: e("Paddle"),
menu: e("MenuController")
},
onLoad: function() {
this.initEvent();
this.init();
},
initEvent: function() {
i(r.GAME.GET_LEVEL, this.getLevel, this);
i(r.GAME.START, this.startGame, this);
},
init: function() {
this.physicsManager = cc.director.getPhysicsManager();
this.physicsManager.enabled = !0;
},
getLevel: function(e, t) {
this.level = e;
this.num = t;
},
startGame: function() {
this.resumeGame();
this.paddle.init();
this.ball.init(this, this.num);
this.bricks.init(this.level);
this.menu.closePanel();
},
pauseGame: function() {
this.physicsManager.enabled = !1;
},
resumeGame: function() {
this.physicsManager.enabled = !0;
},
contactWithGround: function() {
this.menu.openEnd();
this.pauseGame();
},
contactWithBricks: function(e) {
e.getComponent("Block").takeDamage(1);
}
});
cc._RF.pop();
}, {
Ball: "Ball",
Bricks: "Bricks",
EventCode: "EventCode",
EventHelper: "EventHelper",
MenuController: "MenuController",
Paddle: "Paddle"
} ],
LevelController: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "17c86P17QZHcYo9Kyr5yFiS", "LevelController");
var i = e("EventEmitter"), r = e("EventHelper").registerEvent, s = e("EventCode");
cc.Class({
extends: cc.Component,
properties: {
levelPrefab: cc.Prefab,
parentNode: cc.Node,
levels: [ cc.TextAsset ]
},
onLoad: function() {
this.initEvent();
this.init();
},
initEvent: function() {
r(s.LEVEL.CLICK_LEVEL, this.clickLevel, this);
},
init: function() {
var e = this;
this.levels.forEach(function(t, n) {
var i = cc.instantiate(e.levelPrefab);
i.getComponent("Level").setLevel(t, n + 1);
i.parent = e.parentNode;
});
},
clickLevel: function(e, t) {
var n = e.text.split("\r\n");
i.instance.emit(s.GAME.GET_LEVEL, n, t);
}
});
cc._RF.pop();
}, {
EventCode: "EventCode",
EventEmitter: "EventEmitter",
EventHelper: "EventHelper"
} ],
Level: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "41d0eeUIyZLG69R9sRoy6l9", "Level");
var i = e("EventEmitter"), r = e("EventCode");
cc.Class({
extends: cc.Component,
properties: {
levelText: cc.Label
},
onLoad: function() {
this.node.on("click", this.onClick, this);
},
setLevel: function(e, t) {
this.levelText.string = "Level " + t;
this.level = e;
this.num = t;
},
onClick: function() {
i.instance.emit(r.LEVEL.CLICK_LEVEL, this.level, this.num);
i.instance.emit(r.GAME.START);
}
});
cc._RF.pop();
}, {
EventCode: "EventCode",
EventEmitter: "EventEmitter"
} ],
MainController: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2a99a/ZVW5Ky6OPgC2OGw3m", "MainController");
var i = e("EventEmitter");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
i.instance = new i();
}
});
cc._RF.pop();
}, {
EventEmitter: "EventEmitter"
} ],
Mathf: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9af41+aDnZJZKgs6YabtbwF", "Mathf");
t.exports = {
clamp: function(e, t, n) {
return Math.min(Math.max(e, t), n);
}
};
cc._RF.pop();
}, {} ],
MenuController: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "899c2EeCCdDvplgWMkINcgk", "MenuController");
cc.Class({
extends: cc.Component,
properties: {
startPanel: cc.Node,
levelPanel: cc.Node,
endPanel: cc.Node
},
openStart: function() {
this.startPanel.active = !0;
},
openLevel: function() {
this.levelPanel.active = !0;
},
openEnd: function() {
this.endPanel.active = !0;
},
closePanel: function() {
this.startPanel.active = !1;
this.levelPanel.active = !1;
this.endPanel.active = !1;
}
});
cc._RF.pop();
}, {} ],
Paddle: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2e2c2pyb91CmL6hK/u2CFk+", "Paddle");
cc.Class({
extends: cc.Component,
properties: {
limitSize: 350
},
onLoad: function() {
var e = this;
this.node.parent.on("touchmove", function(t) {
var n = t.getDelta(), i = cc.v2(e.node.x + n.x, e.node.y);
i.x < -e.limitSize || i.x > e.limitSize || (e.node.position = i);
});
},
init: function() {
this.node.x = 0;
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "Mathf", "EventCode", "EventEmitter", "EventHelper", "Ball", "Block", "Bricks", "Level", "Paddle", "GameController", "LevelController", "MainController", "MenuController" ]);