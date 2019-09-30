import { BaseConfig } from '../../../util/BaseConfig'; 
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

// get messages
const messages = Messages.loadMessages('sfdx-ftw', 'config'); 

export default class extends BaseConfig{

    static description = messages.getMessage('initCommandDescription'); 

    async ftwCommand(): Promise<AnyJson>{

        try{
            await this.initConfigFile(); 
        } catch(err){
            throw err; 
        }

        return null; 
    }

}