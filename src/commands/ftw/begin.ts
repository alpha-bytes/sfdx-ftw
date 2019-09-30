import { BaseCommand } from "../../util/BaseCommand";
import { VarargsConfig } from "@salesforce/command/lib/sfdxCommand";
import { AnyJson } from "@salesforce/ts-types";
import { BaseConfig } from '../../util/BaseConfig';

export default class Begin extends BaseCommand{

    public static args = [{name: 'suiteName'}];

    // require named validation suite
    protected static varargs: VarargsConfig = {
        required: true
    }; 

    async ftwCommand(): Promise<AnyJson>{
        

        return null; 
    }
}