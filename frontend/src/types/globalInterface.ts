export type Params = {
    id:string | undefined,
}

export type ErrorRes = {
    data:{
        message:string
    }
}

export type SuccessResponse = {
    message:string
}

export interface DeleteCancel extends Params {
    userId:string
}