import { SfdxCommand } from "@salesforce/command";
import { ConfigFile, Messages } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";
import { SfdxError } from "@salesforce/core";
import { URL } from "url";
import * as ws from '../util/Workspace';

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-ftw', 'config');
const CONFIG_DIR = './.sfdx-ftw'; 
const CONFIG_FNAME = '.ftwconfig.json'; 

const CONFIG_OPTS: ConfigFile.Options = {
        filename: CONFIG_FNAME,
        isGlobal: false, 
        filePath: CONFIG_DIR,
        throwOnNotFound: false
};

export enum VALID_KEY { defaultremotecheck, defaultlocalcheck }

export abstract class BaseConfig extends SfdxCommand{

    // messages
    public static description = messages.getMessage('commandDescription');

    // always require a project
    protected static requiresProject = true; 

    private validateKey(key: string): void{
        if(!(key in VALID_KEY))
            throw new SfdxError(`Key ${key} is not valid for this command.`);

    }

    protected async getCheckConfig(key: string): Promise<AnyJson> {
        // validate key
        this.validateKey(key);

        const myConfig: ConfigFile<any> = await this.getChecksConfigFile(); 
        return myConfig.get(key); 
    }

    protected async setCheckConfig(key: string, value: string): Promise<boolean> {
        // validate the key and value
        this.validateKey(key); 
        // get config file and create if it doesn't exist yet
        const myConfig = await this.getChecksConfigFile();
        if(!(await myConfig.exists()))
            await myConfig.write();
        
        try{
            await this.validateValue(key, value);
        } catch(err){
            throw err;
        }

        myConfig.set(key, value);
        await myConfig.write();

        return true; 
    }

    private async getChecksConfigFile(): Promise<ConfigFile<any>>{
        try{ 
            return await ConfigFile.create(CONFIG_OPTS);   
        } catch(err){
            let e = err as SfdxError; 
            throw e; 
        }
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
                const dir = `${CONFIG_DIR}/${value}`;
                const dirExists = ws.fileExists(dir);
                if(!dirExists){
                    let res = await this.ux.prompt(`Director ${dir} does not exist - create now? (y/n)`); 
                    if(res === 'y' || res === 'Y')
                        return ws.mkdir(dir); 

                    process.exit(1);
                    throw new SfdxError(`Directory does not exist on this machine: ${dir}`);
                }
        }
        
    }
}