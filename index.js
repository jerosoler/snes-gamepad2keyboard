const HID = require('node-hid');
const events = require('events');
const EventEmitter = new events.EventEmitter();

const robot = require("robotjs");
robot.setKeyboardDelay(0);

const keys = {
  a: "space",
  b: "c",
  x: "z",
  y: "x",
  l: "l",
  r: "r",
  select: "escape",
  start: "enter",
  up: "up",
  down: "down",
  left: "left",
  right: "right"
}

const buttons = {
  a: false,
  b: false,
  x: false,
  y: false,
  l: false,
  r: false,
  select: false,
  start: false,
  up: false,
  down: false,
  left: false,
  right: false
};

const buttons_last = JSON.parse(JSON.stringify(buttons));

const product = {
  vendorId: 2064,
  productId: 58625
}

const values = {
  a: { data: 5, values: [47,63,111,127,175,191,239,255] },
  b: { data: 5, values: [79,95,111,127,207,223,239,255] },
  x: { data: 5, values: [31,63,95,127,159,191,223,255] },
  y: { data: 5, values: [143,159,175,191,207,223,239,255] },
  l: { data: 6, values: [1,3,17,19,33,35,49,51] },
  r: { data: 6, values: [2,3,18,19,34,35,50,51] },
  select: { data: 6, values: [16,17,18,19,48,49,50,51] },
  start: { data: 6, values: [32,33,34,35,48,49,50,51] },
  up: { data: 4, values: [0] },
  down: { data: 4, values: [255] },
  left: { data: 3, values: [0] },
  right: { data: 3, values: [255] }
}

var devices = HID.devices();
var deviceInfo = devices.find( function(d) {
  return d.vendorId === product.vendorId &&  d.productId === product.productId;
});

if(deviceInfo) {
console.log("Controller found! Play");
const hid = new HID.HID(deviceInfo.path);

hid.on("data", function(data) {

    // 3 LEFT && RIGHT
    // 4 UP && DOWN
    // 5 Y && X && A && B
    // 6 Start && Select && L && R
    
    for (const [key, value] of Object.entries(values)) {
      if(value.values.indexOf(data[value.data]) !== -1) {
        buttons[key] = true;
      } else {
        buttons[key] = false;
      }
    }

    for (const [key] of Object.entries(values)) {
      if(buttons[key] !== buttons_last[key] ) {
        if(buttons[key]) {
          EventEmitter.emit(key, "down");
        } else {
          EventEmitter.emit(key, "up");
        }
        buttons_last[key] = buttons[key];
      }
    }
  });

  for (const [key, value] of Object.entries(keys)) {
    EventEmitter.on(key , function(state) {
      robot.keyToggle(value, state);
    });
  }
} else {
  console.log("Controller Not Found! 404!");
  console.log("List of devices");
  console.log(HID.devices());
}
