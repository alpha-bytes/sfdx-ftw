import { Messages } from '@salesforce/core';

// Checkable abstract class is itself an extension of SfdxCommand
import { Checkable, CheckableResult } from '../../util/Checkable';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('force-check', 'apex');

export default class Apex extends Checkable {

  public static description: string = messages.getMessage('commandDescription');

  // TODO ApexExecutionOverlayAction (Tooling API)
  // TODO ApexExecutionOverlyResult (Tooling API)

  public async runCheck(): Promise<CheckableResult>{

    // get named check
    const check = this.flags.checker; 

    const mock: CheckableResult = {
      passed: true
    }; 
    return mock;
  }

}
