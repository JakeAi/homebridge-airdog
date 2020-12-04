export enum PowerState {
  OFF,
  ON
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

export enum Commands {
  'getAll' = 'getAll',
  'sendChildrenLock' = 'sendChildrenLock'
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
