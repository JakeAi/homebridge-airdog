import { AccessoryConfig, AccessoryPlugin, API, HAP, Logging } from 'homebridge';
import { FanState, PowerState, SendPm, SwitchState } from './common';
import { Characteristic, Service } from 'hap-nodejs';
import { MQTT } from './mqtt';

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
let hap: HAP;


export = (homebridge: API) => {
  HapService = homebridge.hap.Service;
  HapCharacteristic = homebridge.hap.Characteristic;
  hap = homebridge.hap;

  homebridge.registerAccessory('homebridge-airdog', 'AirDog', X5);
};

class X5 implements AccessoryPlugin {
  public deviceNo: string = 'C8:93:46:31:8F:8A';
  public language: string = 'en';
  public openId: string = '4CA90DA0';
  public order: string = 'getAll';
  public paramCode: number = 0;
  public productId: string = '92AD88F0';
  public pm: string = null;
  public fanState: FanState = FanState.LOW;
  public powerState: PowerState = PowerState.OFF;
  public sleepState: SwitchState = SwitchState.OFF;
  public autoState: SwitchState = SwitchState.OFF;
  public childState: SwitchState = SwitchState.OFF;

  private mqtt = new MQTT('mqtt://47.89.244.17');

  private readonly name: string;
  private switchOn = false;

  private readonly switchService: Service;
  private readonly informationService: Service;

  constructor(
    private logger: Logging, private  config: AccessoryConfig, private  api: API,
  ) {
    this.deviceNo = config.macAddress;
    this.logger = logger;
    this.name = config.name;

    this.switchService = new hap.Service.AirPurifier(this.name);
    let airQualitySensorService = new hap.Service.AirQualitySensor('Air Quality');
    airQualitySensorService
      .getCharacteristic(Characteristic.PM2_5Density)
      .on('get', this.getPM25.bind(this));


    this.informationService = new hap.Service.AccessoryInformation()
      .setCharacteristic(hap.Characteristic.Manufacturer, 'Custom Manufacturer')
      .setCharacteristic(hap.Characteristic.Model, 'Custom Model');

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

    this.mqtt.register<SendPm>('purifier/server/app/sendPm/C8:93:46:31:8F:8A')
      .subscribe((message) => {
        this.pm = message.message.pm;
      });
  }

  /*
   * This method is optional to implement. It is called when HomeKit ask to identify the accessory.
   * Typical this only ever happens at the pairing process.
   */
  identify(): void {
    this.logger('Identify!');
  }

  /*
   * This method is called directly after creation of this instance.
   * It should return all services which should be added to the accessory.
   */
  getServices(): Service[] {
    return [
      this.informationService,
      this.switchService,
    ];
  }

}
