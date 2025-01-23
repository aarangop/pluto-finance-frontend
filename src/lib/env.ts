export function isAmplifyEnvironment() {
  console.log("Running on amplify?");
  const isOnCloud = process.env.AWS_APP_ID ? true : false;
  console.log(isOnCloud);
  return process.env.AWS_APP_ID;
}

export async function getSecret(secretName: string): Promise<string | null> {
  if (isAmplifyEnvironment()) {
    console.log("Trying to fetch secret from AWS Secret Manager");
  }

  return process.env[secretName] || null;
}

export async function getEnvVar(name: string): Promise<string | null> {
  return process.env[name] || null;
}
