import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

// Checkable abstract class is itself an extension of SfdxCommand
import Checkable from '../../util/Checkable';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('force-check', 'apex');

export default class Apex extends Checkable {

  public static description: string = messages.getMessage('commandDescription');

  public async runCheck(): Promise<AnyJson>{
    console.log('running'); 
    return { key: 'val' };
  }  

}
