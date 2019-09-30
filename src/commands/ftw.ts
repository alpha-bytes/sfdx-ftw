import { BaseCommand } from "../util/BaseCommand";
import { AnyJson } from "@salesforce/ts-types";

export default class FTW extends BaseCommand{

    ftwCommand(): Promise<AnyJson>{
        // placeholder
        this.ux.prompt('Enter a suite name to begin').then(res => {
            console.log('sounds good'); 
        });

        return null;
    }
}