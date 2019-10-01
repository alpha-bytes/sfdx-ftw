import { AnyJson } from "@salesforce/ts-types";
import { BaseCheckable } from "../../baseCommands/BaseCheckable";
import { BaseConfig } from "../../baseCommands/BaseConfig";

export default class Begin extends BaseCheckable{

    public static description = BaseCheckable.messages.getMessage('beginCommandDescription');

    async checkableCmd(): Promise<AnyJson>{

        const projectDir = this.project.getPath(); 

        // TODO loop through all files and assert types
        const assertion = require(`${projectDir}/.sfdx/.sfdx-ftw/suites/mySuite/assertions/assertion1.js`); 

        return null; 
    }
}