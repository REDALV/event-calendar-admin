import { StringLike } from "@firebase/util";

export class UserModel {
    $key: string;
    login: String;
    isActive: boolean;

    constructor(source:any){
        if(source != null){
            this.$key = source.$key;
            this.login = source.email;
            this.isActive = source.isActive;
        }
        else{
            this.login = "";
            this.isActive = false;
        }
    }
}
