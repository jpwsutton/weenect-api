export interface TrackerInfo {
    id: string
    name: string
    type: string
    firmware: string
    imei: number
    battery: number
    online: boolean
    latitude: number
    longitude: number
  }

export interface Position {
    battery: number
    cellid: string
    cid: number
    //confidence: null
    date_server: Date
    date_tracker: Date
    direction: number
    //geofence_name: null
    gsm: number
    id: string
    //lac: number
    //last_message: null
    latitude: number
    longitude: number
    mcc: number
    mnc: number
    original_battery: number
    pdop: number
    radius: number
    satellites: number
    speed: number
    type: string
    valid_signal: boolean
}


export interface History {
    distance: number,
    distance_metric: string,
    max_speed: number,
    mean_speed: number,
    metric_system: string,
    min_speed: number,
    positions: Position[]
}