

export class User {
    static generateId() {
        const aNumbers = new Uint32Array(1);
        window.crypto?.getRandomValues(aNumbers);
        return ('000000' + aNumbers[0]).slice(-6);
    }
    uid: string;
    constructor(
        public name: string,
        public email: string,
        public phone: string,
        public address: string,
        public subject: string,
        public description: string
    ) {
        this.uid = User.generateId();
    }
}
