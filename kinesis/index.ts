import { kinesisClient } from "./kinesis-client"
import fs from "fs"
import { PutRecordsCommand, PutRecordsRequestEntry } from "@aws-sdk/client-kinesis"
import * as s from "superstruct"
import { Describe } from "superstruct"


type KinesisTrigger = {
    payload: any
    customContext: any
}

const KinesisTrigger: Describe<KinesisTrigger> = s.object({
    payload: s.object(),
    customContext: s.object()
})

type KinesisRecord = {
    Data: KinesisTrigger
    PartitionKey: string
}

const KinesisRecord: Describe<KinesisRecord> = s.object({
    Data: KinesisTrigger,
    PartitionKey: s.string()
})

function putRecord(record: KinesisRecord, stream: string) {
    console.log(record)
    const c = kinesisClient
    const kinesisPayload: PutRecordsCommand = new PutRecordsCommand({
        Records: [{
            Data: Buffer.from(JSON.stringify(record.Data)),
            PartitionKey: record.PartitionKey
        }],
        StreamName: stream
    })

    kinesisClient.send(kinesisPayload)
        .then((f) => { console.log(`Sent to kinesis ${JSON.stringify(f)}`) })
        .catch(e => console.error(`Kinesis error ${JSON.stringify(e)}`))
}

const main = () => {
    if (process.argv.length !== 4) {
        console.log("Usage: node index.js \"stream-name\" payload-file")
    }

    const stream = process.argv[2]
    const payloadFile = process.argv[3]

    console.log(stream)
    console.log(payloadFile)

    const payload: KinesisRecord = JSON.parse(fs.readFileSync(payloadFile, "utf-8"))

    s.assert(payload, KinesisRecord)
    putRecord(payload, stream)

}

main()
