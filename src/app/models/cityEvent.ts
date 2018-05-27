import { StringLike, forEach } from "@firebase/util";

export class CityEvent {

    $key: string;
    address: string;
    article:string;
    date: string;
    dateEnd: string;
    images: Array<string>;
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
            if(source.images == null){
                this.images = [];
            }
            else{
                this.images = Object.values(source.images);
            }
            this.isImportant = source.isImportant;
            this.lat = source.lat;
            this.lng = source.lng;
            this.name = source.name;
            this.subtype = source.subtype;
            this.time = source.time;
            this.timeEnd = source.timeEnd;
            this.type = source.type;
        }
        else{
            this.lat = 52.424195;
            this.lng = 31.014671;
        }
    }
}
