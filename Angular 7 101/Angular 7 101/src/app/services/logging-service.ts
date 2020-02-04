import { Injectable } from "@angular/core";

@Injectable()
export class LoggingService {
    log(msg: any) {
        console.log(new Date() + ": "
          + JSON.stringify(msg));
      }
}