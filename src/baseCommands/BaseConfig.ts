import { ConfigFile, Messages } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";
import { SfdxError } from "@salesforce/core";
import { URL } from "url";
import * as ws from '../services/workspace';
import { BaseCommand } from "./BaseCommand";

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-ftw', 'config');

enum VALID_KEY { defaultremote }

// config defaults
const CONFIG_DIR = '.sfdx-ftw'; 
const CONFIG_FNAME = '.ftwconfig.json';

const CONFIG_OPTS: ConfigFile.Options = {
        filename: CONFIG_FNAME,
        isGlobal: false, 
        filePath: CONFIG_DIR,
        throwOnNotFound: false, 
        isState: true, 
        // contents: { // TODO NOT WORKING
        //     "defaultlocalcheck": "123"
        // }
};

const SUITES_DIR = `./${(CONFIG_OPTS.isState ? '.sfdx' : '')}/${CONFIG_DIR}/suites`;

export abstract class BaseConfig extends BaseCommand{

    // messages
    public static description = messages.getMessage('baseCommandDescription');

    private static validateKey(key: string): void{
        if(!(key in VALID_KEY))
            throw new SfdxError(`Key ${key} is not valid for this command.`);

    }

    private static async getConfigFile(): Promise<ConfigFile<any>>{
        try{ 
            return await ConfigFile.create(CONFIG_OPTS);   
        } catch(err){
            let e = err as SfdxError; 
            throw e; 
        }
    }

    public static async getFtwConfig(key: string): Promise<AnyJson> {
        // validate key
        BaseConfig.validateKey(key);

        const myConfig: ConfigFile<any> = await BaseConfig.getConfigFile(); 
        return myConfig.get(key); 
    }

    public static getSuitesDir(): string {
        return SUITES_DIR; 
    }

    protected async setFtwConfig(key: string, value: string): Promise<boolean> {
        // validate the key and value
        BaseConfig.validateKey(key); 
        // get config file and create if it doesn't exist yet
        const myConfig = await BaseConfig.getConfigFile();
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

    protected async initConfigFile(): Promise<void> {
        // insert config file
        const configFile = await BaseConfig.getConfigFile(); 
        await configFile.write(); 
        // add suites directory
        ws.mkdir(`./.sfdx/${CONFIG_DIR}/suites`); // TODO throws error
    }

    private async validateValue(key: string, value: string): Promise<void>{
        // get key as enum
        const keyEnum = VALID_KEY[key]; 
        
        switch(keyEnum){
            // must be a valid url
            case VALID_KEY.defaultremote:
                try{
                    new URL(value); 
                } catch(err){
                    throw new SfdxError(`${value} does not resolve to a valid URL`); 
                }
                break; 
        }
        
    }

    async ftwCommand(): Promise<AnyJson>{
        return await this.configCmd(); 
    }

    protected async abstract configCmd(): Promise<AnyJson>;     
}