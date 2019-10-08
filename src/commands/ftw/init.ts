import { AnyJson } from "@salesforce/ts-types";
import { BaseCheckable } from "../../baseCommands/BaseCheckable";
import * as download from 'download-git-repo';
import * as ws from '../../services/workspace'; 
import { BaseConfig, VALID_KEY } from '../../baseCommands/BaseConfig'; 
import { SfdxError } from "@salesforce/core";

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
        } else {
            // otherwise, check for the directory locally, first
            if(!ws.dirExists(targetDir)){
                // finally, check the default remote, if it exists
                const defaultRemote = await BaseConfig.getConfig(VALID_KEY.defaultremote); 
                if(defaultRemote){
                    await gitDownload(`${defaultRemote}/${this.flags.suite}`, targetDir); 
                }
            }
        }

        // finally, if dir still does not exist, throw exception
        if(!ws.dirExists(targetDir))
            throw new SfdxError(`Directory could not be resolved: ${targetDir}`); 

        // otherwise, load the exported module
        const modulePath = `${this.project.getPath()}/${targetDir}`;
        const theSuite = require(modulePath);

        // ensure module conforms to abstract AssertionClass definition and, if not, rm
        
        this.ux.log(`Suite ${this.flags.suite} successfully initialized.`);

        return null; 
    }
}