import { flags, SfdxCommand, FlagsConfig } from "@salesforce/command";
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('force-check', 'Checkable');

export default abstract class Checkable extends SfdxCommand{
    
  // require a username and a default devhub for all checks
  public static requiresDevhubUsername: boolean = true; 
  public static requiresUsername: boolean = true; 
  public static requiresProject: boolean = true;

  // all Checkable instances must include a named checker
  protected static flagsConfig: FlagsConfig = {
    checker: flags.string({ char: 'c', description: messages.getMessage('checkerFlagDescription')})
  };

  run(): Promise<AnyJson>{
    return this.runCheck();
  }

  abstract runCheck(): Promise<AnyJson>;

}