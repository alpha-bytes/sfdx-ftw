import { AnyJson } from "@salesforce/ts-types";
import { VarargsConfig } from "@salesforce/command/lib/sfdxCommand";
import { SfdxError } from "@salesforce/core";
import { URL } from "url";

// base class
import { BaseConfig, VALID_CONFIG } from "../../../util/BaseConfig";

export default class ConfigSet extends BaseConfig{

    protected static varargs: VarargsConfig = {
        required: true, 
        validator: (key: string, value: string): void => {
            // validate key in enum
            BaseConfig.validateKey(key); 
            // key-specific validations
            const keyAsEnum = VALID_CONFIG[key];
            switch(keyAsEnum){
                case VALID_CONFIG.defaultremotecheck: // defaultremotecheck - ensure valid url
                    try{
                        new URL(value); 
                    } catch(err){
                        throw new SfdxError(`Value ${value} does not resolve to a valid URL.`);
                    }
                    break;       
            }
        }
    }

    run(): Promise<AnyJson>{
        
        // accept only the first vararg passed in
        const theArg = Object.entries(this.varargs)[0]; 
        this.setCheckConfig(theArg[0].toString(), theArg[1].toString());

        return null;
    }
}