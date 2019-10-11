import { BaseConfig } from './BaseConfig';
import { BaseCommand } from "./BaseCommand";
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { FlagsConfig, flags } from '@salesforce/command';
import { AssertionSuite } from 'sfdx-ftw-assertions';

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
 
    protected suitesDir = BaseConfig.getSuitesDir();

    async ftwCommand(): Promise<AnyJson>{ 
        return await this.checkableCmd(); 
    }

    protected load(suite: string): AssertionSuite{

        // otherwise, load the exported module
        const modulePath = `${this.project.getPath()}/${this.suitesDir}/${suite}`;
        const theSuite = require(modulePath);

        // TODO ensure module conforms to abstract AssertionClass definition and, if not, throw error

        return theSuite as AssertionSuite; 
    }

    protected abstract async checkableCmd(): Promise<AnyJson>;
    
}