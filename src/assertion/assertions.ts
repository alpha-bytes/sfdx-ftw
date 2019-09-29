// TODO use runtypes to validate assertionsuites, assertions (with generics?)
// move this to utils?
import * as rt from 'runtypes';

export interface AssertionSuite{
    /**
     * A list of the dependent files, in SF metadata format, that must exist locally - and that will be 
     * deployed to the target org - in order for assumptions to perform their validations. 
     */
    dependencies: string[]; 
    /**
     * The author of the assertion suite. 
     */
    author?: string; 
    /**
     * URL to the source for the assertion suite. 
     */
    location?: string; 
    /**
     * An array of assertion file locations. Must resolve either to a file on the local filesystem, 
     * relative to the project root, or or a file on the web. If using a file hosted remotely, ensure 
     * that access to the resource is not restricted (e.g. github repo is public, or http location does 
     * not require authentication).
     */
    assertionLocations: string[]; 
}

export interface AsyncAssertion extends Assertion{
    /**
     * (Optional) Method to allow assertion to intercept a 
     * @param result The result of the asynchronous validation that was unsuccessful. 
     */
    handleFailure?(result: any): void | string; 
}

export interface Assertion{
    /**
     * The logic that the assertion will attempt to validate (displayed to the user via stdout). 
     */
    description: string;
}
