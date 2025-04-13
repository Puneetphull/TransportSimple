import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TripFlowService } from '../common/trip-flow.service';
import { Trip } from '../common/interface';
@Component({
  selector: 'ts-trip-detail',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.scss'
})
export class TripDetailComponent {
  constructor(private tripService: TripFlowService) { }

  tripDetail: Trip = {
    origin: '',
    destination: '',
    originAbberivation: '',
    destinationAbberivation: '',
    showArrow: false,
    showLine: false,
    level: 0,
    filled:false,
    abbrevation:'',
    showCurve:false
  }


  onChangeHandler(event: any, type: 'origin' | 'destination') {
    let { value } = event.target;
    if (type === 'origin') {
      this.tripDetail = { ...this.tripDetail, origin: value };
    }
    else if (type === 'destination') {
      this.tripDetail = { ...this.tripDetail, destination: value }
    }
  }

  addRoute() {
    if (this.tripService.tripValidaiton(this.tripDetail)) {
      this.tripService.setTrip(this.tripDetail);
      this.resetFields()
    }
  }

  resetFields() {
    this.tripDetail = {
      origin: '',
      destination: '',
      originAbberivation: '',
      destinationAbberivation: '',
      showArrow: false,
      showLine: false,
      level: 0,
      filled:false,
      abbrevation:'',
      showCurve:false
    }
  }

}
