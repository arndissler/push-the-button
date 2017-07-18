const express = require('express');
const { renderPixels } = require('./utils');
const app = express();
const server = app.listen(3000);
const io = require('socket.io')(server);

app.use('/static', express.static(`${__dirname}/public`));
app.use('/', renderPixels(16));

class Pin {
    constructor(opts = {}) {
        if (typeof opts === 'number') {
            this.id = opts;
            this.pin = opts;
            this.type = 'digital';
            this.mode = Pin.INPUT;
        } else {
            this.id = opts.pin || 0;
            this.pin = opts.pin || 0;
            this.type = opts.type || 'digital';
            this.mode = opts.mode || Pin.INPUT;
        }
    }
}

Pin.INPUT = 0;
Pin.OUTPUT = 1;
Pin.ANALOG = 2;
Pin.PWM = 3;
Pin.SERVO = 4;

class Board {
    constructor({ port = '/dev/tty.usbmodem****' } = {}) {
        this.socket = null;
        this.port = port;
        this.pins = Array(60).fill(null).reduce((pins, _, index) => {
            pins[index] = new Pin(index);
            return pins;
        }, {});
    }

    on(eventName, callback) {
        if (eventName === 'ready') {
            console.log('Board is ready ... listen on localhost:3000');
            callback();
        }

        if (eventName === 'error') {
            // ignore error case
        }
    }

    _update(pixels) {
        if (!this.socket) {
            io.on('connection', (socket) => {
                this.socket = socket;
                socket.emit('update', JSON.stringify(pixels));
            });
        } else {
            this.socket.emit('update', JSON.stringify(pixels));
        }
    }
}

const cbs = new Map();

io.on('connection', (socket) => {
    socket.on('click', (data) => {
        const cb = cbs.get(data.id);
        if (typeof cb === 'function') {
            cb();
        }
    });
});

class Button {
    constructor({ pin, isPulldown } = {}) {
        this.pin = parseInt(pin, 10) - 22;
        this.isPulldown = isPulldown;
    }

    on(eventName, callback) {
        if (eventName === 'down') {
            cbs.set(this.pin, callback);
        }
    }
}

module.exports = { Board, Button, Pin };
