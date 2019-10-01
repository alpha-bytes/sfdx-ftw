import { BaseConfig } from './BaseConfig';
import { BaseCommand } from "./BaseCommand";
import { AssertionSuite } from '../assertion/assertions'; 
// TODO import * as rt from 'runtypes';
import * as ws from '../services/workspace'; 
import { SfdxError, Messages } from '@salesforce/command/node_modules/@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

const SUITES_DIR = BaseConfig.getSuitesDir(); 
const messages = Messages.loadMessages('sfdx-ftw', 'baseCheckable'); 

export default abstract class BaseCheckable extends BaseCommand{

    /**
     * Every checkable command must include the suiteName to check
     */
    public static args = [{name: 'suiteName'}];

    /**
     * Messages instance for subclass members.
     */
    protected static messages: Messages = messages; 
    /**
     * AssertionSuite that will be initialized for any subclass members by BaseCheckable.
     */
    protected suite: AssertionSuite; 

    private validateSuite(suiteName: string){
        // ensure file exists
        if(!ws.fileExists(`${SUITES_DIR}/${suiteName}`)){
            let err = new SfdxError(`Assertion suite ${suiteName} not found in ${SUITES_DIR}`); 
            err.actions = ['Ensure file exists and ends has a ".json" file extension.']; 
            throw err; 
        }
        
    }

    async ftwCommand(): Promise<AnyJson>{
        // validate suite
        this.validateSuite(this.args.suiteName); 
        return await this.checkableCmd(); 
    }

    protected abstract async checkableCmd(): Promise<AnyJson>;
    
}