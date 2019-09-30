import { SfdxCommand } from "@salesforce/command";

export default class FTW extends SfdxCommand{

    run(): Promise<any>{
        // placeholder
        this.ux.prompt('Enter a suite name to begin').then(res => {
            console.log('sounds good'); 
        });

        return null;
    }
}