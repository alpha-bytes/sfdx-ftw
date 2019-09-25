import { BaseConfig } from "../../../util/BaseConfig";
import { AnyJson } from "@salesforce/ts-types";
import { SfdxResult } from "@salesforce/command";

export default class ConfigGet extends BaseConfig{

    // accept one argument - the configured key
    public static args = [{name: 'configKey'}];

    // configure output result
    public static result: SfdxResult = {
        tableColumnData:{
            columns: [
                { key: 'value', label: 'Value' }
            ]
        }, 
        display() {
            const theData = { value: this.data };
            this.ux.table([theData], this.tableColumnData);
        }
    }

    run(): Promise<AnyJson>{

        // if more than one varArgs passed, only return the first
        const theKey = this.args.configKey;
        const theVal = this.getCheckConfig(theKey);

        return JSON.parse(JSON.stringify(theVal));
    }
}