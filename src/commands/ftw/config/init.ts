import { BaseConfig } from '../../../baseCommands/BaseConfig'; 
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

// get messages
const messages = Messages.loadMessages('sfdx-ftw', 'config'); 

export default class extends BaseConfig{

    static description = messages.getMessage('initCommandDescription'); 

    async configCmd(): Promise<AnyJson>{

        try{
            await this.initConfigFile(); 
        } catch(err){
            throw err; 
        }

        return null; 
    }

}