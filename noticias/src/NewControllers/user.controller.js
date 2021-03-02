
import config from './config.controllers';

export default class UserController {
    constructor() {
        this.url = config.serverURL;
    }

    async Consulta() {
        const consulta = await fetch(`${this.url}/user`);
        const result = await consulta.json()
        console.log(result);
    }

}