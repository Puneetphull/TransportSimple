import { Injectable } from '@angular/core';
import { Trip } from './interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripFlowService {

  private tripDetail: BehaviorSubject<Trip[]> = new BehaviorSubject<Trip[]>([]);

  constructor() { }

  setTrip(detail: Trip) {
    let previousValue: Trip[] = this.tripDetail.value;
    detail = { ...detail, originAbberivation: detail.origin.slice(0, 3).toUpperCase(), destinationAbberivation: detail.destination.slice(0, 3).toUpperCase(), abbrevation: `${detail.origin.slice(0, 3).toUpperCase()} - ${detail.destination.slice(0, 3).toUpperCase()}` };
    if (!previousValue.length) {
      detail = { ...detail, showLine: false, level: 1, filled: true }
      const updatedValue = [...previousValue, detail];
      this.tripDetail.next(updatedValue);
      console.log(updatedValue)
    }
    else {
      if (previousValue.length > 0) {
        let prev = previousValue[previousValue.length - 1];
        if (prev.destination.toUpperCase() === detail.origin.toUpperCase()) {
          detail = { ...detail, showArrow: false, showLine: true, level: 1, filled: true, showCurveDown: prev.level === 2 ? true : false, isContinue: true };
          const updatedValue = [...previousValue, detail];
          this.tripDetail.next(updatedValue);
        }
        else if (prev.destination.toUpperCase() === detail.destination.toUpperCase() && prev.origin.toUpperCase() !== detail.origin.toUpperCase()) {
          detail = { ...detail, showArrow: true, showLine: true, level: 1, filled: false, showCurveDown: prev.level === 2 ? true : false, isContinue: false };
          const updatedValue = [...previousValue, detail];
          this.tripDetail.next(updatedValue);
        }
        else if (prev.destination.toUpperCase() === detail.destination.toUpperCase() && prev.origin.toUpperCase() === detail.origin.toUpperCase()) {
          detail = { ...detail, showArrow: false, showLine: true, level: prev.level, filled: false };
          const updatedValue = [...previousValue, detail];
          this.tripDetail.next(updatedValue);
        }
        else {
          detail = { ...detail, showArrow: false, showLine: false, level: 2, showCurve: true, showCurveDown: false }
          const updatedValue = [...previousValue, detail];
          this.tripDetail.next(updatedValue);
        }
      }
    }
  }

  // isConsecutive(trips: Trip[]): boolean {
  //   let isCurve = false;
  //   let currentTrip: Trip = trips[trips.length - 1];
  //   for (let i = trips.length - 2; i > 0; i--) {
  //     let prev = trips[i];
  //     if (currentTrip.origin.toUpperCase() === prev.origin.toUpperCase() && currentTrip.destination.toUpperCase() == prev.destination.toUpperCase() && !prev.isContinue) {
  //       isCurve = true;
  //       break;
  //     }
  //     if(prev.or)
  //   }
  //   return isCurve
  // }

  getTripDetial(): Observable<Trip[]> {
    return this.tripDetail.asObservable();
  }

  tripValidaiton(tripDetail: Trip): boolean {
    if (!tripDetail.origin && !tripDetail.origin.trim() && !tripDetail.origin.trim().length) {
      alert("please enter valid start point")
      return false
    }
    else if (!tripDetail.destination && !tripDetail.destination.trim() && !tripDetail.destination.trim().length) {
      alert("please enter valid end point")
      return false
    }
    else if (tripDetail.origin.length < 3) {
      alert("start point length must be greater then 3")
      return false
    }
    else if (tripDetail.destination.length < 3) {
      alert("end point length must be greater then 3")
      return false
    }
    else {
      return true
    }
  }
}
