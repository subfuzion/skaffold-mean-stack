// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const fs = require("fs");
const process = require("process");
const yaml = require("js-yaml");


let defaultConfig = {
  "version": "0.0.0"
};

let configPath = "config.yaml";
let config;


function errorExit(...args) {
  console.log("ERROR:", ...args);
  process.exit(1);
}

function info(...args) {
  console.log("INFO:", ...args);
}

function warn(...args) {
  console.log("WARN:", ...args);
}

/**
 * @param {YAMLException} e
 */
function yamlParseWarning(e) {
  warn(e.message);
}

function loadConfig() {
  let contents;

  try {
    info(`Loading configuration: ${configPath}`);
    contents = fs.readFileSync(configPath).toString();
  } catch (e) {
    info(`No configuration found, generating default configuration`);
    config = defaultConfig;
    writeConfig();
    return config;
  }

  try {
    config = yaml.load(contents);
    console.log(config);
  } catch (e) {
    return errorExit(e.message);
  }
}

function writeConfig() {
  try {
    const doc = yaml.dump(config);
    fs.writeFileSync(configPath, doc);
    info(`Saved configuration: ${configPath}`);
  } catch (e) {
    return errorExit(e.message);
  }
}

function main() {
  loadConfig();
  console.log(config);
}


main();
