import { VarargsConfig, SfdxCommand } from "@salesforce/command/lib/sfdxCommand";
import { CheckConfig } from "../../../util/CheckConfig";
import { AnyJson } from "@salesforce/ts-types";
import { OutputArgs } from "@oclif/parser";

export default class ConfigGet extends CheckConfig{

    public static args = [{name: 'configKey'}];

    run(): Promise<AnyJson>{
        // if more than one varArgs passed, only return the first
        const theKey = this.args.configKey;
        const theVal = this.getCheckConfig(theKey);
        return JSON.parse(JSON.stringify(theVal));
    }
}