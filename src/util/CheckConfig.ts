import { SfdxCommand } from "@salesforce/command";
import { Config } from '@salesforce/core/lib/config/config';
import { AnyJson } from "@salesforce/ts-types";


const STORE = new Config();

export abstract class CheckConfig extends SfdxCommand{

    // always require a project
    protected static requiresProject = true; 
    
    // allowable keys
    protected static allowedKeys = ['defaultremotecheck'];

    protected setCheckConfig(key: string, value: string): void {
        STORE.set(key, value);
    }

    protected getCheckConfig(key: string): AnyJson {
        return this.configAggregator.getPropertyValue(key); 
    }
}