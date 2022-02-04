export class Pokemon {
    name: string = '';
    id: number = 0;
    url: string = '';
    imgUrl: string = '';

    constructor(name: string, id: number, url: string, imgUrl: string) {
        this.name = name;
        this.id = id;
        this.url = url;
        this.imgUrl = imgUrl;
    }
}