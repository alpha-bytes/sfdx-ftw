import { SfdxProject } from '@salesforce/core';
import * as fs from 'fs'; 

const READ_OPTS = {
    encoding: 'utf-8' 
};

export async function getBaseDir(): Promise<string>{
    return await SfdxProject.resolveProjectPath(); 
}

export function dirExists(folderPath: string){
    return existsSync(folderPath); 
}

export function fileExists(filePath: string){
    return existsSync(filePath);
}

function existsSync(path: string){
    return fs.existsSync(path); 
}

export function readFile(path: string): string{
    if(!fileExists(path))
        throw new Error(`File not found for path ${path}`); 

    return fs.readFileSync(path, READ_OPTS); 
}

export function mkdir(dir: string){
    fs.mkdirSync(dir); 
}