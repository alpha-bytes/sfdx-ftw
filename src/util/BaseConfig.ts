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
        const myConfig = await ChecksConfig.create({
            isGlobal: false
         });
         myConfig.set(key, value);
         await myConfig.write();
    }

    protected getCheckConfig(key: string): AnyJson {
        return this.configAggregator.getPropertyValue(key); 
    }
}