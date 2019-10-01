import * as rt from 'runtypes'; 

export const AssertionSuiteRt = rt.Record({ // REQUIRED props
    /**
     * A list of the dependent files, in SF metadata format, that must exist locally - and that will be 
     * deployed to the target org - in order for assumptions to perform their validations. 
     */
    dependencies: rt.Array(rt.String)
}).And(rt.Partial({ // OPTIONAL props
    /**
     * The author of the assertion suite. 
     */
    author: rt.String, 
    /**
     * URL to the source for the assertion suite. 
     */
    location: rt.String,
    /**
     * An array of remote Assertions that will be retrieved at runtime, but will not be persisted
     * locally. Values must be properly formatted URLs. 
     */ 
    remoteAssertions: rt.Array(rt.String)
}));

export type AssertionSuite = rt.Static<typeof AssertionSuiteRt>;

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
