import * as core from '@actions/core';

async function run() {
  try {
    const version = core.getInput('version');
    console.log(`Version: ${version}`)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
