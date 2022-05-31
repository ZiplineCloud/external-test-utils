"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kinesisClient = void 0;
const client_kinesis_1 = require("@aws-sdk/client-kinesis");
exports.kinesisClient = new client_kinesis_1.KinesisClient({
    region: "ap-southeast-2",
});
