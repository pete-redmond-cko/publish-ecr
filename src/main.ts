import * as core from '@actions/core';
import { execSync } from 'child_process';
const DOCKER_FILE='Dockerfile'


async function run() {
  
  try {
    const AWS_ACCESS_KEY_ID = core.getInput('aws-access-key-id', { required: true });
    const AWS_SECRET_ACCESS_KEY = core.getInput('aws-secret-access-key', { required: true });
    const APP_NAME =  core.getInput('image', { required: true })
    const APP_VERSION = core.getInput('app-version', {required: true });
    const ECR_PATH = core.getInput('ecr-path', {required: true });
    
    const awsLoginCommand = '$(aws ecr get-login --region=eu-west-1 --no-include-email)';

    let dockerBuildCommand = `docker build --build-arg version=${APP_VERSION}`;
    dockerBuildCommand = `${dockerBuildCommand} -t ${APP_NAME} -t ${APP_NAME}:${APP_VERSION}`;
    dockerBuildCommand = `${dockerBuildCommand} -t ${ECR_PATH}/${APP_NAME}:${APP_VERSION} -t ${ECR_PATH}/${APP_NAME}:latest -f ${DOCKER_FILE} .`;
    
    const dockerPushCommand = `docker push ${ECR_PATH}/${APP_NAME}`;
    const publishCommand = `${awsLoginCommand} && ${dockerBuildCommand} && ${dockerPushCommand}`;

    runCmd(publishCommand);

    function runCmd(cmd) {
      return execSync(cmd, {
          shell: '/bin/bash',
          encoding: 'utf-8',
          env: {
              ...process.env,
              AWS_ACCESS_KEY_ID,
              AWS_SECRET_ACCESS_KEY,
          },
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
