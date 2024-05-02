import {ScanCommandInput,ScanCommand, PutCommandInput, PutCommand} from '@aws-sdk/lib-dynamodb'
import { ddbDocumentClient } from "src/config/aws.config";

interface SuccessScan<E> {
    success: true
    data: E 
}

interface FailedScan {
    success: false
    message: string
}

type ScanResponse<E> = SuccessScan<E> | FailedScan 

export const execScan = async <T>(params: ScanCommandInput):Promise<ScanResponse<T[]>> =>{
    console.log(params)
    try {
        const response = await ddbDocumentClient.send(new ScanCommand(params))
        return {
            success: true,
            data: response.Items as T[]
        }

    }catch(e){
        console.log(e)
        const {message} = e as Error
        return {
            success: false,
            message
        }
    }
}

export const execSaveItem = async <T>(params: PutCommandInput):Promise<ScanResponse<T>> =>{
    try {
        await ddbDocumentClient.send(new PutCommand(params))
        return {
            success: true,
            data: params.Item as T
        }
    }catch(e){
        console.log(e)
        const {message} = e as Error
        return {
            success: false,
            message
        }
    }
}
