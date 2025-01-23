import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

export function isAmplifyEnvironment() {
  console.log("Running on amplify?");
  const isOnCloud = process.env.AWS_APP_ID ? true : false;
  console.log(isOnCloud);
  return process.env.AWS_APP_ID;
}

export async function getSecret(secretName: string): Promise<string | null> {
  if (isAmplifyEnvironment()) {
    console.log("Trying to fetch secret from AWS Secret Manager");
    const client = new SecretsManagerClient();
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
      })
    );
    console.log(response);
    // {
    //   '$metadata': {
    //     httpStatusCode: 200,
    //     requestId: '584eb612-f8b0-48c9-855e-6d246461b604',
    //     extendedRequestId: undefined,
    //     cfId: undefined,
    //     attempts: 1,
    //     totalRetryDelay: 0
    //   },
    //   ARN: 'arn:aws:secretsmanager:us-east-1:xxxxxxxxxxxx:secret:binary-secret-3873048-xxxxxx',
    //   CreatedDate: 2023-08-08T19:29:51.294Z,
    //   Name: 'binary-secret-3873048',
    //   SecretBinary: Uint8Array(11) [
    //      98, 105, 110, 97, 114,
    //     121,  32, 100, 97, 116,
    //      97
    //   ],
    //   VersionId: '712083f4-0d26-415e-8044-16735142cd6a',
    //   VersionStages: [ 'AWSCURRENT' ]
    // }

    if (response.SecretString) {
      return response.SecretString;
    }
    return null;
  }

  return process.env[secretName] || null;
}

export async function getEnvVar(name: string): Promise<string | null> {
  console.log(`Trying to fetch env var ${name}`);
  const varFound = process.env[name] || null;
  console.log(`Var found: ${varFound ? true : false}`);
  return process.env[name] || null;
}
