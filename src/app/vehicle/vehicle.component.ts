import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { Vehicle } from './vehicle';
import { VehicleService } from './vehicle.service';
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {
  vehicles: Vehicle[] = [];
  brands: { [brand: string]: number } = {};

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles() {
    this.vehicleService.getVehicles().pipe(
      tap(vehicles => this.vehicles = vehicles),
      map(vehicles => vehicles.map(vehicle => vehicle.marca)),
      map(brands => brands.reduce((summary:any, brand:any) => ({
        ...summary,
        [brand]: (summary[brand] || 0) + 1
      }), {}))
    ).subscribe(brands => this.brands = brands);
  }


}
