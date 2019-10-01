import { SfdxCommand } from "@salesforce/command";
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from "@salesforce/ts-types";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

export abstract class BaseCommand extends SfdxCommand{
    
  // require a project and username, support devhub for all BaseCommands
  public static supportsDevhubUsername = true; 
  public static requiresProject = true; 
  public static requiresUsername = true;

  public async run(): Promise<AnyJson>{

    try{
      let result = await this.ftwCommand(); 
      return result; 
    } catch(err){
      throw new SfdxError(err.message);
    }
  }

  /**
   * Abstract method for concrete class implementation.
   */
  abstract ftwCommand(): Promise<AnyJson>;

}