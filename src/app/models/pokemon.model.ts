export class Pokemon {
    name: string = '';
    id: number = 0;
    url: string = '';

    constructor(name: string, id: number, url: string) {
        this.name = name;
        this.id = id;
        this.url = url;
    }
}