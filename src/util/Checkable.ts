import { flags, SfdxCommand, FlagsConfig } from "@salesforce/command";
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-ftw', 'Checkable');

/**
 * Represents the result of a Checkable validation.
 */
export interface CheckableResult{
  passed: boolean; 
}

export abstract class Checkable extends SfdxCommand{
    
  // require a project and username, support devhub for all Checkables
  public static supportsDevhubUsername = true; 
  public static requiresProject = true; 
  public static requiresUsername = true;

  // all Checkable instances must include a named checker and a config file
  protected static flagsConfig: FlagsConfig = {
    checker: flags.string({ char: 'c', description: messages.getMessage('checkerFlagDescription'), required: true }), 
    remotecheck: flags.url({ char: 'r', description: messages.getMessage('remoteFlagDescription') })
  };

  public async run(): Promise<AnyJson>{

    try{
      let result = await this.runCheck(); 
      return JSON.parse(JSON.stringify(result));
    } catch(err){
      throw new SfdxError(err.message);
    }
  }

  /**
   * Abstract method for concrete class implementation.
   */
  abstract runCheck(): Promise<CheckableResult>;

}