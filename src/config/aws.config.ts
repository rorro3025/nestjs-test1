import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient,marshallOptions,unmarshallOptions } from '@aws-sdk/lib-dynamodb'

const config: DynamoDBClientConfig = {
    region: 'us-east-1'
}

const marshallOptions:marshallOptions = {
    convertEmptyValues: false,
    removeUndefinedValues: false,
    convertClassInstanceToMap: true ,
}

const unmarshallOptions = {
    wrapNumbers: false,
}

const translateConfig = {
    marshallOptions,
    unmarshallOptions
}
const dynamoClient = new DynamoDBClient(config)
export const ddbDocumentClient = DynamoDBDocumentClient.from(dynamoClient, translateConfig)
