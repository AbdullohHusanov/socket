const fs = require("fs");
const os = require("os");
const path = require("path");
import { Injectable } from '@nestjs/common';

const envFilePath = path.resolve(__dirname, "../../.env");

@Injectable()
export class EnvService{
    fs: any;
    os: any;
    path: any;
    readEnvVars = () => fs.readFileSync(envFilePath, "utf-8").split(os.EOL);

    constructor(){
        this.fs = fs;
        this.os = os;
        this.path = path;
    }

    getEnvValue(key){
        let matchedLine = this.readEnvVars().find((line) => line.split("=")[0] === key);
        return matchedLine !== undefined ? matchedLine.split("=")[1].replace("\"","").replace("\"","") : null;
    }

    setEnvValues(key, value){
        const envVars = this.readEnvVars();
        const targetLine = envVars.find((line) => line.split("=")[0] === key);
        if (targetLine !== undefined) {
          // update existing line
          const targetLineIndex = envVars.indexOf(targetLine);
          // replace the key/value with the new value
          envVars.splice(targetLineIndex, 1, `${key}="${value}"`);
        } else {
          // create new key value
          envVars.push(`${key}="${value}"`);
        }
        // write everything back to the file system
        fs.writeFileSync(envFilePath, envVars.join(os.EOL));
    }


}

// /**
//  * Updates value for existing key or creates a new key=value line
//  *
//  * This function is a modified version of https://stackoverflow.com/a/65001580/3153583
//  *
//  * @param {string} key Key to update/insert
//  * @param {string} value Value to update/insert
//  */
// const setEnvValue = (key, value) => {
//   const envVars = readEnvVars();
//   const targetLine = envVars.find((line) => line.split("=")[0] === key);
//   if (targetLine !== undefined) {
//     // update existing line
//     const targetLineIndex = envVars.indexOf(targetLine);
//     // replace the key/value with the new value
//     envVars.splice(targetLineIndex, 1, `${key}="${value}"`);
//   } else {
//     // create new key value
//     envVars.push(`${key}="${value}"`);
//   }
//   // write everything back to the file system
//   fs.writeFileSync(envFilePath, envVars.join(os.EOL));
// };