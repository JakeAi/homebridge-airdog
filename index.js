"use strict";
const common_1 = require("./common");
const hap_nodejs_1 = require("hap-nodejs");
const mqtt_1 = require("./mqtt");
// const client: MqttClient = mqtt.connect('mqtt://47.89.244.17');
// client.on('connect', (d: Packet) => {
//
//   client.on('message', (topic: string, message: Buffer) => {
//
//     console.log({ topic, message: JSON.parse(message.toString()) });
//   });
//   client.on('packetreceive', (d: Packet) => console.log({ d }));
//   client.on('packetsend', (d: Packet) => console.log({ d }));
//
//   client.subscribe(['purifier/server/app/sendPm/C8:93:46:31:8F:8A', 'purifier/server/app/dvcOfflineReply/C8:93:46:31:8F:8A']);
//
//   client.publish('purifier/app/switch/1058', JSON.stringify({
//     deviceNo: 'C8:93:46:31:8F:8A',
//     language: 'en',
//     openId: '4CA90DA0',
//     order: 'sendChildrenLock',
//     paramCode: '00',
//     productId: '92AD88F0',
//   }));
//   client.publish('purifier/app/changeSpeed/1058', JSON.stringify({
//     deviceNo: 'C8:93:46:31:8F:8A',
//     language: 'en',
//     openId: '4CA90DA0',
//     order: 'sendSpeed',
//     paramCode: '01',
//     smartCode: '00',
//     productId: '92AD88F0',
//   }));
//   client.publish('purifier/app/allDeviceInfo/1058', JSON.stringify({
//     deviceNo: 'C8:93:46:31:8F:8A',
//     language: 'en',
//     openId: '4CA90DA0',
//     order: 'getAll',
//     paramCode: 0,
//     productId: '92AD88F0',
//   }));
//   console.log({ d });
// });
let HapService, HapCharacteristic;
let hap;
class X5 {
    constructor(logger, config, api) {
        this.logger = logger;
        this.config = config;
        this.api = api;
        this.deviceNo = 'C8:93:46:31:8F:8A';
        this.language = 'en';
        this.openId = '4CA90DA0';
        this.order = 'getAll';
        this.paramCode = 0;
        this.productId = '92AD88F0';
        this.pm = null;
        this.fanState = common_1.FanState.LOW;
        this.powerState = common_1.PowerState.OFF;
        this.sleepState = common_1.SwitchState.OFF;
        this.autoState = common_1.SwitchState.OFF;
        this.childState = common_1.SwitchState.OFF;
        this.mqtt = new mqtt_1.MQTT('mqtt://47.89.244.17');
        this.switchOn = false;
        this.deviceNo = config.macAddress;
        this.logger = logger;
        this.name = config.name;
        // this.switchService = new hap.Service.AirPurifier(this.name);
        this.airQualitySensorService = new hap.Service.AirQualitySensor('Air Quality');
        this.airQualitySensorService
            .getCharacteristic(hap_nodejs_1.Characteristic.PM2_5Density)
            .on('get', this.getPM25.bind(this));
        this.informationService = new hap.Service.AccessoryInformation()
            .setCharacteristic(hap_nodejs_1.Characteristic.Manufacturer, 'Silicon Valley Air Experts')
            .setCharacteristic(hap_nodejs_1.Characteristic.Model, 'AirDog X5')
            .setCharacteristic(hap_nodejs_1.Characteristic.SerialNumber, 'X5');
        logger.info('Switch finished initializing!');
        this.setupListeners();
    }
    getPM25(callback) {
        this.logger.debug('getPM25: %s', this.pm);
        callback(null, this.pm);
    }
    setupListeners() {
        // this.mqtt.register('purifier/server/app/sendPm/C8:93:46:31:8F:8A');
        // this.mqtt.register('purifier/server/app/dvcOfflineReply/C8:93:46:31:8F:8A');
        this.mqtt.register('purifier/server/app/sendPm/C8:93:46:31:8F:8A')
            .subscribe((message) => {
            this.pm = message.message.pm;
        });
    }
    /*
     * This method is optional to implement. It is called when HomeKit ask to identify the accessory.
     * Typical this only ever happens at the pairing process.
     */
    identify() {
        this.logger('Identify!');
    }
    /*
     * This method is called directly after creation of this instance.
     * It should return all services which should be added to the accessory.
     */
    getServices() {
        return [
            this.informationService,
            this.airQualitySensorService,
        ];
    }
}
module.exports = (homebridge) => {
    HapService = homebridge.hap.Service;
    HapCharacteristic = homebridge.hap.Characteristic;
    hap = homebridge.hap;
    homebridge.registerAccessory('homebridge-airdog', 'Airdog', X5);
};
//# sourceMappingURL=index.js.map