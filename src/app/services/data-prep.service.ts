import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
 
@Injectable()

export class DataPrepService {

    constructor(private http: Http) { 
        // static data COULD be listed here in a future update
    }
}