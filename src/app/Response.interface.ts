import {ResponseOptions} from '@angular/http';

export interface response extends Body {
    constructor(responseOptions: ResponseOptions)
    type: ResponseType
    ok: boolean
    url: string
    status: number
    statusText: string | null
    bytesLoaded: number
    totalBytes: number
    headers: Headers | null
    toString(): string
  }