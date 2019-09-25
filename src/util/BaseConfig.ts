import { SfdxCommand } from "@salesforce/command";
import { ConfigFile } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";
import { SfdxError } from "@salesforce/core";
import { URL } from "url";
import * as fs from 'fs';
import * as ws from '../util/Workspace'; 

class ChecksConfig extends ConfigFile<any> { 
    public static getFileName(){
        return './.forcechecks/config.json';
    }
}

export enum VALID_KEY { defaultremotecheck, defaultlocalcheck }

export abstract class BaseConfig extends SfdxCommand{

    // always require a project
    protected static requiresProject = true; 

    private validateKey(key: string): void{
        if(!(key in VALID_KEY))
            throw new SfdxError(`Key ${key} is not valid for this command.`);

    }

    protected async getCheckConfig(key: string): Promise<AnyJson> {
        // validate key
        this.validateKey(key);

        const myConfig: ChecksConfig = await this.getChecksConfigFile(); 
        return myConfig.get(key); 
    }

    protected async setCheckConfig(key: string, value: string): Promise<boolean> {
        // validate the key and value
        this.validateKey(key); 
        try{
            await this.validateValue(key, value);
        } catch(err){
            throw err;
        }

        const myConfig: ChecksConfig = await this.getChecksConfigFile();
        myConfig.set(key, value);
        await myConfig.write();

        return true; 
    }

    private async getChecksConfigFile(){
        return await ChecksConfig.create({
            isGlobal: false
        });
    }

    private async validateValue(key: string, value: string): Promise<void>{
        // get key as enum
        const keyEnum = VALID_KEY[key]; 
        
        switch(keyEnum){
            // must be a valid url
            case VALID_KEY.defaultremotecheck:
                try{
                    new URL(value); 
                } catch(err){
                    throw new SfdxError(`${value} does not resolve to a valid URL`); 
                }
                break; 

            // must be a valid directory
            case VALID_KEY.defaultlocalcheck:
                const baseDir = await ws.getBaseDir(); 
                const concatDir = `${baseDir}/${value}`; 
                const dirExists = fs.existsSync(concatDir);
                if(!dirExists){
                    throw new SfdxError(`Directory does not exist on this machine: ${concatDir}`);
                }
        }
        
    }
}