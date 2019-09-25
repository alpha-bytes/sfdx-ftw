import { SfdxProject } from '@salesforce/core';

export async function getBaseDir(): Promise<string>{
    return await SfdxProject.resolveProjectPath(); 
}