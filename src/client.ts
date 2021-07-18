import fetch from 'node-fetch';
import { TrackerInfo } from './types';
// Import types...


export class WeenectClient {
    private authToken: string |null = null;
    private authTokenValidUntil : Date | null = null;

    private readonly baseURL = 'https://apiv4.weenect.com/v4';

    constructor(
        public readonly username: string,
         public readonly password: string
    ){
        //Should now be initialised
    }

    public getTrackers = async(): Promise<TrackerInfo[]> => {
        const token = await this.login()
        const res = await fetch(`${this.baseURL}/mytracker`, {
            headers: {
                authorization: `JWT ${token}`,
            },
        })

        const result = await res.json()

        const { items } = result

        return items.map(({name, id, position, type, imei, firmware}) => ({
            name, 
            // id: position[0].id,
            id: `${id}`,
            battery: position[0].battery,
            online: (typeof position[0].type === 'string' && position[0].type.toLocaleLowerCase().indexOf('off') === -1),
            type,
            imei,
            latitude: position[0].latitude,
            longitude: position[0].longitude,
            firmware,
        })) as TrackerInfo[]
    }

    public getTrackerHistory = async (id: string, system: string, start: Date, end: Date): Promise<History> => {

        const token = await this.login();
        //https://apiv4.weenect.com/v4/mytracker/135076/activity/v2?metric_system=miles&start=2021-07-17T13:57:43.773Z&end=2021-07-18T13:57:43.773Z
        const res = await fetch(`${this.baseURL}/mytracker/${id}/activity/v2?metric_system=${system}&start=${start.toISOString()}&end=${end.toISOString()}`, {
            headers: {
                authorization: `JWT ${token}`,
            },
        })

        const result = await res.json();

        return result as History

    };



      

    async login(){
        const now = new Date().getTime()
        const {authToken, authTokenValidUntil} = this

        // Check if we need a new token
        if (
            !authToken ||
            !authTokenValidUntil ||
            authTokenValidUntil.getTime() < now
        ) {
            const { username, password } = this
            const res = await fetch(`${this.baseURL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, password
                }),
            })

            const result = await res.json()

            const { access_token: token, expires_in} = result
            this.authToken = token as string
            const validUntil = new Date()
            validUntil.setSeconds(validUntil.getSeconds() + expires_in)
            this.authTokenValidUntil = validUntil
            //this.log.debug(
            //    `Got new access toke (valid until: ${this.authTokenValidUntil.toLocaleString()})`
            //)
            return this.authToken
        }
        return authToken
    }



    

}