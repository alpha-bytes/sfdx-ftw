import { BaseCheckable } from '../../baseCommands/BaseCheckable'; 
import { AnyJson } from '@salesforce/ts-types';
import { AssertionSuite } from 'sfdx-ftw-assertions';
import { SfdxError } from '@salesforce/core';

export default class Check extends BaseCheckable{

    public static description = BaseCheckable.messages.getMessage('checkCommandDescription'); 

    checkableCmd(): Promise<AnyJson>{
        
        // get the suite
        let suite: AssertionSuite; 
        try{
            suite = this.load(this.flags.suite); 
        } catch(err){
            throw new SfdxError(`Assertion suite could not be loaded: ${err.message}`);
        }

        // get list of assertions
        let promises = []; 
        // TODO move user-defined assertions inside this repo, out of sfdx-ftw-assertions (avoid tight coupling)
        suite.getAssertions().forEach(assertion => {
            if(AssertionSuite.isSimpleAssertion(assertion)){
                console.log('yeah');
            }
        })
        

        return null; 
    }

}