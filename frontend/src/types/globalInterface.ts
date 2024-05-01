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