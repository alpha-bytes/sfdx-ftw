import { BaseConfig } from "../../../baseCommands/BaseConfig";
import { AnyJson } from "@salesforce/ts-types";
import { SfdxResult } from "@salesforce/command";

export default class ConfigGet extends BaseConfig{

    // accept one argument - the configured key
    public static args = [{name: 'configKey'}];

    // configure output result
    public static result: SfdxResult = {
        tableColumnData:{
            columns: [
                { key: 'key', label: 'Key' },
                { key: 'value', label: 'Value' }
            ]
        }, 
        display() {
            const theData = this.data;
            this.ux.table([theData], this.tableColumnData);
        }
    }

    async configCmd(): Promise<AnyJson>{

        // if more than one varArgs passed, only return the first
        const theKey = this.args.configKey;
        const theVal = await BaseConfig.getFtwConfig(theKey);

        return JSON.parse(JSON.stringify({ key: theKey, value: theVal}));
    }
}