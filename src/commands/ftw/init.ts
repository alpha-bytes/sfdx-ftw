import { AnyJson } from "@salesforce/ts-types";
import { BaseCheckable } from "../../baseCommands/BaseCheckable";
import * as download from 'download-git-repo';

/**
 * Wraps download as the library is not typed. 
 */
function gitDownload(repo: string, targetPath: string, opts?: object): Promise<void>{
    return new Promise<void>((res, rej) => {
        download(repo, targetPath, opts, (err) => {
            if(err){
                rej(err); 
            } else{
                res(err); 
            }
        })
    });
}

export default class Init extends BaseCheckable{

    public static description = BaseCheckable.messages.getMessage('initCommandDescription');

    async checkableCmd(): Promise<AnyJson>{

        const targetDir = `${this.suitesDir}/${this.flags.suite}`;

        // if remote is passed explicitly, download it
        if (this.flags.remote){
            await gitDownload(`${this.flags.remote}/${this.flags.suite}`, targetDir); 
        }

        return null; 
    }
}