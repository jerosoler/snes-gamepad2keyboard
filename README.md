# snes-gamepad2keyboard

SNES USB gamepad emulate keyboard keys with 0 delay.

Platforms like Stadia don't allow other controllers. But they allow keyboard so we can emulate the controller as if it were a keyboard.

It can also be used outside of a gaming platform.

# Product emulate
Test in https://gamepad-tester.com/
- usb gamepad (Vendor: 0810 Product: e501)

![](https://github.com/jerosoler/snes-gamepad2keyboard/raw/master/docs/snesusb.jpg)

# Installation

```
git clone https://github.com/jerosoler/snes-gamepad2keyboard.git
```

Run with `sudo`
```
cd  snes-gamepad2keyboard
npm install
sudo node index.js
```

## Default keyboard emulate keys

Gamepad | Keyboard
---|---
a | space
b | c
x | z
y | x
l | l
r | r
select | escape
start | enter
up | up
down | down
left | left
right | right

## Edit keys
Modify index.js `const keys`

# Test SO
- Linux

# License
MIT License
