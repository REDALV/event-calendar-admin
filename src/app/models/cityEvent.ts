import { StringLike } from "@firebase/util";

export class CityEvent {

    $key: string;
    address: string;
    article:string;
    date: string;
    dateEnd: string;
    images: string[];
    isImportant: boolean;
    lat: number;
    lng: number;
    name: string;
    subtype: number;
    time: string;
    timeEnd: string;
    type: number;

    constructor(source:any) {
        if(source){
            this.$key = source.$key;
            this.address = source.address;
            this.article = source.article;
            this.date = source.date;
            this.dateEnd = source.dateEnd;
            this.images = source.images;
            this.isImportant = source.isImportant;
            this.lat = source.lat;
            this.lng = source.lng;
            this.name = source.name;
            this.subtype = source.subtype;
            this.time = source.time;
            this.timeEnd = source.timeEnd;
            this.type = source.type;
        }
     }
}
