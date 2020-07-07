import { Injectable } from "@angular/core";
import { BehaviorSubject, from, fromEventPattern } from "rxjs";
import { of } from "rxjs";
import { Observable } from "rxjs";

import { Log } from "../models/log";

@Injectable({
  providedIn: "root"
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null
  });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {
    //     id: "1",
    //     text: "Generated Components",
    //     date: new Date("01/17/2020 12:54:23")
    //   },
    //   {
    //     id: "2",
    //     text: "Added UI Dependencies",
    //     date: new Date("01/18/2020 00:54:23")
    //   },
    //   {
    //     id: "3",
    //     text: "Added logs component",
    //     date: new Date("01/17/2020 17:54:23")
    //   }
    // ];
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem("logs") === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem("logs"));
    }
    return of(
      this.logs.sort((a, b) => {
        return (b.date = a.date);
      })
    );
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    //Add to Local Storage
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }
  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    //Add to Local Storage
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }
  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    //Add to Local Storage
    localStorage.setItem("logs", JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
