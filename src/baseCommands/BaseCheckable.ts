import { BaseConfig } from './BaseConfig';
import { BaseCommand } from "./BaseCommand";
import { AssertionSuite } from '../assertion/assertions';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { FlagsConfig, flags } from '@salesforce/command';

// load messages
Messages.importMessagesDirectory(__dirname);

export abstract class BaseCheckable extends BaseCommand{

    /**
     * Every checkable command must include the name of the suite to check
     */
    public static flagsConfig: FlagsConfig = {
        suite: flags.string(
            { 
                char: 's', 
                description: 'Name of the assertion suite.', 
                required: true
            }), 
        remote: flags.string(
            { 
                char: 'r', 
                description: 'Remote repo. Overrides "defaultremote" repo from config file.' 
            })
    };

    protected static messages: Messages = Messages.loadMessages('sfdx-ftw', 'checkable');
 
    /**
     * AssertionSuite that will be initialized for any subclass members by BaseCheckable.
     */
    protected suite: AssertionSuite;
    protected suitesDir = BaseConfig.getSuitesDir();

    async ftwCommand(): Promise<AnyJson>{ 
            
        return await this.checkableCmd(); 
    }

    protected abstract async checkableCmd(): Promise<AnyJson>;
    
}