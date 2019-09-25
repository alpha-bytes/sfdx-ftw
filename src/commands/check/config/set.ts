import { AnyJson } from "@salesforce/ts-types";
import { VarargsConfig } from "@salesforce/command/lib/sfdxCommand";
import { SfdxError, SfdcUrl } from "@salesforce/core";
import { URL } from "url";

// base class
import { CheckConfig } from "../../../util/CheckConfig";

export default class ConfigSet extends CheckConfig{

    protected static varargs: VarargsConfig = {
        required: true, 
        validator: (name: string, value: string): void => {
            // ensure proper key
            if(!CheckConfig.allowedKeys.includes(name)){
                const errAction = `Available config keys are: ${CheckConfig.allowedKeys.join(', ')}`;
                throw new SfdxError(`Config key ${name} not allowed`, 'Invalid arg name', [errAction]);
            }
            // key-specific validations
            switch(name){
                case CheckConfig.allowedKeys[0]: // defaultremotecheck - ensure valid url
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
        //this.setCheckConfig(this.args);        
        return null;
    }
}