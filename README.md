# Push The Button

## Required Hardware

- Arduino AT Mega
- Adafruit NeoPixels
- Arcade Buttons

## Required software

- Node.js >=8
- NPM >= 5

## Getting started

- Connect the Arduino to the appropriate pins on a the LED breadboard

```
npm install
npm start
```

## Run tests

```sh
npm test
# or
npm run test:watch
```

Also you can lint the files with:

```sh
npm run lint
```

## Emulate hardware

To use an emulated hardware use the following command and visit `http://localhost:4000`:

```sh
npm emulate # -- --skipSetup
```

## Skip setup

Currently included for dev purpose to skip setup for a 4x4 Pixel Board.

```sh
npm start -- --skipSetup
```

## Architecture

- Firmata with support for NeoPixel is running on the Arduino MEGA
- NodeJS Johnny Five app connects via serial to the firmata on the arduino
- NodeJS Johnny Five app has full control over the arduino

## Hardware layout

Schema has been created with [fritzing][1], the source file is available at `schema.fzz` and `schema.svg`

## Testing Button
- Pin 51, 53 are configured as input with PULL UP resistors to get clear states for pushed button
- The NeoPixel LEDs must be connected to digital PWM PIN 2 - 13 ( currently 13 ) otherwise it is not working
- The arcade buttons can be attachted to digital PIN 2 - 53

[1]: http://fritzing.org/home/
