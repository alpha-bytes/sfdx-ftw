import { flags, SfdxCommand, FlagsConfig } from "@salesforce/command";
import { Messages, SfdxError, Connection } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('force-check', 'Checkable');

const CHECKS_DIR = '.forcechecks'; 
const filePathValidator = (val: string): boolean => {
  return (val.endsWith(CHECKS_DIR));
}

/**
 * Represents the result of a Checkable validation.
 */

export interface CheckableResult{
  passed: boolean; 
}

export abstract class Checkable extends SfdxCommand{
    
  // require a username and support devhub for all checks
  public static supportsDevhubUsername = true; 
  public static requiresUsername = true;

  // all Checkable instances must include a named checker and a config file
  protected static flagsConfig: FlagsConfig = {
    checker: flags.string({ char: 'c', description: messages.getMessage('checkerFlagDescription'), required: true }), 
    root: flags.directory({ char: 'r', description: messages.getMessage('rootFlagDescription'), validate: filePathValidator })
  };

  public async run(): Promise<AnyJson>{

    let conn = this.org.getConnection();
    console.log(conn.getUsername());

    try{
      let result = await this.runCheck(conn); 
      return JSON.parse(JSON.stringify(result));
    } catch(err){
      throw new SfdxError(err.message);
    }
  }

  /**
   * Abstract method for concrete class implementation.
   */
  abstract runCheck(connection: Connection): Promise<CheckableResult>;

}