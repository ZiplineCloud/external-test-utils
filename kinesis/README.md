# Kinesis Test Tool


## Dependencies

- Yarn/NPM
- AWS CLI installed
- AWS credentials configured on your machine
  - The specified AWS profile, or the default profile, must have access to the Kinesis data stream you will be using

  
## Usage

Install the required packages

```sh
./external-test-utils/kinesis yarn install
```

Run the test tool with the following command

```sh
./external-test-utils/kinesis node index.js "my-favourite-test-stream" payload.json
```

The script takes two arguments: 
The first is the stream name which are using for testing (i.e `my-favourite-test-stream`).
The second is the json payload you want to put onto the stream (i.e `payload.json`).

There is an example payload in `payload.json`. The payload you provide must follow this basic structure. The fields in the `payload` field will be present on the `amazonKinesisTrigger_1` field in the workflow.  Anything in `customContext` will be injected into the context of the workflow.

If you wish to use a specific AWS profile (other than the `[default]` profile) you can pass them to the script using env vars.

eg. `AWS_PROFILE=Dev node index.js "my-favourite-test-stream" payload.json`