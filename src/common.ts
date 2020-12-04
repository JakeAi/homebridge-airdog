export enum PowerState {
  OFF = '00',
  ON = '01'
}

export enum SwitchState {
  OFF,
  ON
}

export enum FanState {
  AUTO = '0A',
  SLEEP = '0B',
  LOW = '01',
  MED = '02',
  HIGH = '03',
  MAX = '04',
}



export interface SendPm {
  productId: string
  contentData: string
  children: string
  openId: string
  topic: string
  deviceNo: string
  power: string
  pm: string
  speed: string
}

export interface SendPower {
  deviceNo: string
  language: string
  openId: string
  order: string
  paramCode: number
  smartCode: number
  productId: string
}

export interface AllDeviceInfo {
  deviceNo: string
  language: string
  openId: string
  order: string
  paramCode: number
  productId: string
}

export interface SendCommand {
  deviceNo: string
  language: string
  openId: string
  order: string
  paramCode: number
  smartCode: number
  productId: string
}

export enum Commands {
  'sendPower'='sendPower',
  'changeSpeed'='changeSpeed',
  'getAll' = 'getAll',
  'sendChildrenLock' = 'sendChildrenLock'
}

let topics = [
  'purifier/server/app/sendPm/C8:93:46:31:8F:8A',
  'purifier/app/switch/9426896433',
  'purifier/app/changeSpeed/1058',
];
