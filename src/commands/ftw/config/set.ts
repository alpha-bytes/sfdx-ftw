import { AnyJson } from "@salesforce/ts-types";
import { VarargsConfig } from "@salesforce/command/lib/sfdxCommand";
import { BaseConfig } from "../../../util/BaseConfig";

export default class ConfigSet extends BaseConfig{

    protected static varargs: VarargsConfig = {
        required: true
    }

    async ftwCommand(): Promise<AnyJson>{

        // accept only the first vararg passed in
        const theArg = Object.entries(this.varargs)[0]; 
        const theKey = theArg[0].toString(); 
        const theVal = theArg[1].toString(); 

        const result = await this.setFtwConfig(theKey, theVal);
        // TODO figure out why not logging
        if(result)
            return `${theVal} successfully set for config key ${theKey}`;
    }
}