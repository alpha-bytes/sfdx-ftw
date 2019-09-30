import { Messages } from '@salesforce/core';

// BaseCommand abstract class is itself an extension of SfdxCommand
import { BaseCommand } from '../../util/BaseCommand';
import { AnyJson } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-ftw', 'apex');

export default class Apex extends BaseCommand {

  public static description = messages.getMessage('commandDescription');

  // TODO ApexExecutionOverlayAction (Tooling API)
  // TODO ApexExecutionOverlyResult (Tooling API)

  public async ftwCommand(): Promise<AnyJson>{

    return null;
  }

}
