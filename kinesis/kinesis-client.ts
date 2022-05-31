import { KinesisClient } from "@aws-sdk/client-kinesis"


export const kinesisClient = new KinesisClient({
    region: "ap-southeast-2",
})
