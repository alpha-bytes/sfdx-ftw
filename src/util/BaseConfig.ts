import { SfdxCommand } from "@salesforce/command";
import { ConfigFile } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";
import { SfdxError } from "@salesforce/core";

class ChecksConfig extends ConfigFile<any> { 
    public static getFileName(){
        return './.forcechecks/config.json';
    }
}

export enum VALID_CONFIG { defaultremotecheck }

export abstract class BaseConfig extends SfdxCommand{

    // always require a project
    protected static requiresProject = true; 

    protected static validateKey(key: string){
        if(!(key in VALID_CONFIG))
            throw new SfdxError(`Key ${key} is not valid for this command.`);

    }

    protected async setCheckConfig(key: string, value: string): Promise<void> {
        const myConfig: ChecksConfig = await this.getChecksConfigFile();
         myConfig.set(key, value);
         await myConfig.write();
    }

    protected async getCheckConfig(key: string): Promise<AnyJson> {
        const myConfig: ChecksConfig = await this.getChecksConfigFile(); 
        return myConfig.get(key); 
    }

    private async getChecksConfigFile(){
        return await ChecksConfig.create({
            isGlobal: false
        });
    }
}