# push-push-push-game

## Required Hardwarde

- Arduino AT Mega
- Arduino Ethernet Shield
- Adafruit NeoPixels

## Step by step

- Connect the Arduino to the appropriate pins on a the LED breadboard
- Connect your machine to the Arduino Ethernet shield
- Power up the Arduino 
- Perform steps for Local Development Environment if necessary
- In Network Settings, configure "Thunderbolt Ethernet" to
  - Manual
  - IP-Address: 192.168.1.199
  - Subnet-Mask: 255.255.255.0

## Local Development Environment
- Atom Editor
- platformIO
- platformIO Python module
- Python

```
# Given atom is installed
# Given you are connected to the Arduino
apm install platformio-ide
pip install -U platformio
atom arduino/
cd arduino/

# Install platformio depdencies as per blue Atom Notification
# Restart Atom as per the green Atom Notification
# No platformio Account required

platformio update 
# GUI Equivalent:
# PlatformIO => Initialize or Update PlatformIO Project
# Selected board: Arduino Mega or Meta 2560 ATmega2560 (Mega 2560)
# Click "Process"

platformio run
# GUI Equivalent:
# PlatformIO => Build

platformio run --target upload 
# PlatformIO => Upload

platformio pio device monitor --port /dev/usbmodem1421
# GUI Equivalent
# PlatformIO => Serial Monitor
# Generic CDC at /dev/usbmodem1421
```