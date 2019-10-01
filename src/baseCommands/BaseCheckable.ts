import { BaseConfig } from './BaseConfig';
import { BaseCommand } from "./BaseCommand";
import { AssertionSuite, AssertionSuiteRt } from '../assertion/assertions';
import * as ws from '../services/workspace';
import { SfdxError, Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { FlagsConfig, flags } from '@salesforce/command';
import { URL } from 'url';

const SUITES_DIR = BaseConfig.getSuitesDir();

// load messages
Messages.importMessagesDirectory(__dirname);

export abstract class BaseCheckable extends BaseCommand{

    /**
     * Every checkable command must include the suiteName to check
     */
    static flagsConfig: FlagsConfig = {
        suite: flags.string(
            { 
                char: 's', 
                description: 'The assertion suite'
            }),
        remote: flags.url(
            { 
                char: 'r', 
                description: 'URL from which to retrieve the assertion suite. When provided, overrides any value passed to --suite flag'
            })
    };

    protected static messages: Messages = Messages.loadMessages('sfdx-ftw', 'checkable');
 
    /**
     * AssertionSuite that will be initialized for any subclass members by BaseCheckable.
     */
    protected suite: AssertionSuite; 

    private validateSuite(local: boolean, remoteUrl?: URL){

        // the resulting file
        let contents; 
        
        if(local){
            const steLoc = `${SUITES_DIR}/${this.flags.suite}`;

            // ensure folder exists
            if(!ws.dirExists(steLoc))
                throw new SfdxError(`Suite directory ${steLoc} not found in this project`); 
            
            // ensure file exists
            const steFile = `${steLoc}/suite.json`;
            if(!ws.fileExists(steFile))
                throw new SfdxError(`suite.json file not found in directory ${steLoc}.`); 

            // read the contents of the file
            contents = JSON.parse(ws.readFile(steFile));
        } else {
            // TODO get from remote
        }

        // ensure file is properly-formatted type
        try{
            this.suite = AssertionSuiteRt.check(contents);
        } catch(err){
            throw new SfdxError(`suite.json improperly formatted at key "${err.key}": ${err.message}`);
        }

        // lastly, if adding from remote, add folder and suite.json
        
    }

    async ftwCommand(): Promise<AnyJson>{
        // assert that either of the flags was provided
        if(!this.flags.suite && !this.flags.remote) 
            throw new SfdxError('A value for either --suite or --remote is required.');

        // validate suite
        this.validateSuite(this.flags.remote ? false : true, this.flags.remote); 
        return await this.checkableCmd(); 
    }

    protected abstract async checkableCmd(): Promise<AnyJson>;
    
}