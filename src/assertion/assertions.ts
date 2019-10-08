import * as rt from 'runtypes'; 

abstract class Assertion{
    /**
     * The logic that the assertion will attempt to validate (displayed to the user via stdout). 
     */
    abstract description: string;
    /**
     * Callback function to handle failed assertions. 
     * @param result The failure response. 
     */
    abstract failureCallback(result: string): Promise<void>; // TODO result as complex type
}

/**
 * Instances of this class represent the simplest type of assertion, which provide for a 
 * simple list of Apex Sytem.assert... family of statements. 
 */
export abstract class SimpleAssertion extends Assertion{ 
    /**
     * Implementing classes must provide a list of valid Apex System.assert... method variants. 
     * These statements will be run via anonymous Apex in the target org, with any failures being returned to the 
     * failureCallback() method. 
     */
    abstract apexAssertionStatements(): Promise<string[]>; 
}

/**
 * Abstract class which all assertion suites must extend. 
 */
export abstract class AssertionSuite{
    /**
     * The name of your assertion suite. 
     */
    abstract name: string; 
    /**
     * What type of tests your suite will perform. 
     */
    abstract description: string;  
    /**
     * Array of metadata dependencies that will be deployed prior to running assertions. 
     */
    abstract dependencies: string[];
    /**
     * The array of assertions to be run. Must be instances of a type that extends the abstract Assertion class.
     */
    abstract getAssertions<T extends Assertion>(): T[]; 
}
