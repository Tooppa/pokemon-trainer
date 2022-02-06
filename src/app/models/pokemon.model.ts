import { PokemonDetails } from "./pokemon-details.model";

export class Pokemon {
    name: string = '';
    id: number = 0;
    url: string = '';
    imgUrl: string = '';
    details?: PokemonDetails;

    constructor(name: string, id: number, url: string, imgUrl: string) {
        this.name = name;
        this.id = id;
        this.url = url;
        this.imgUrl = imgUrl;
    }

    public setDetails(details: PokemonDetails): void {
        this.details = details;
    }
}