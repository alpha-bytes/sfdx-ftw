import { AnyJson } from "@salesforce/ts-types";
import BaseCheckable from "../../baseCommands/BaseCheckable";

export default class Begin extends BaseCheckable{

    public static description = Begin.messages.getMessage('beginCommandDescription');

    async checkableCmd(): Promise<AnyJson>{


        return null; 
    }
}