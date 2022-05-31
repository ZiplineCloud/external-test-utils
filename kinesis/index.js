"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kinesis_client_1 = require("./kinesis-client");
const fs_1 = __importDefault(require("fs"));
const client_kinesis_1 = require("@aws-sdk/client-kinesis");
const s = __importStar(require("superstruct"));
const KinesisTrigger = s.object({
    payload: s.object(),
    customContext: s.object()
});
const KinesisRecord = s.object({
    Data: KinesisTrigger,
    PartitionKey: s.string()
});
function putRecord(record, stream) {
    console.log(record);
    const c = kinesis_client_1.kinesisClient;
    const kinesisPayload = new client_kinesis_1.PutRecordsCommand({
        Records: [{
                Data: Buffer.from(JSON.stringify(record.Data)),
                PartitionKey: record.PartitionKey
            }],
        StreamName: stream
    });
    kinesis_client_1.kinesisClient.send(kinesisPayload)
        .then((f) => { console.log(`Sent to kinesis ${JSON.stringify(f)}`); })
        .catch(e => console.error(`Kinesis error ${JSON.stringify(e)}`));
}
const main = () => {
    if (process.argv.length !== 4) {
        console.log("Usage: node index.js \"stream-name\" payload-file");
    }
    const stream = process.argv[2];
    const payloadFile = process.argv[3];
    console.log(stream);
    console.log(payloadFile);
    const payload = JSON.parse(fs_1.default.readFileSync(payloadFile, "utf-8"));
    s.assert(payload, KinesisRecord);
    putRecord(payload, stream);
};
main();
