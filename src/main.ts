import * as core from '@actions/core';
import * as fs from 'fs';

async function run() {
  try {
    const version = core.getInput('version');

    fs.readdirSync('./build').forEach(file => {
      console.log(file);
    });
















    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
