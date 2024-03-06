import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GarageService } from './garage.service';
import { debounceTime, fromEvent, tap } from 'rxjs';
import { Area, GarageItem } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  garages: GarageItem[] = [];
  areas: Area[] = [];
  selectedArea = ``;
  selectedCity = ``;
  @ViewChild(`cityInput`, { static: true }) cityInput?: ElementRef;
  constructor(private garageService: GarageService) {}
  getSelectedGarages() {
    this.getGarages(this.selectedArea, this.selectedCity);
  }
  getGarages(area: string, city: string) {
    this.garageService.getGarages(area, city).pipe(
      tap((items) => {
        this.garages = items.Data?.GaragesList ?? [];
      })
    ).subscribe();
  }
  ngOnInit(): void {
    this.getGarages(``, ``);
    this.garageService.getAreas().pipe(
      tap((areas) => {
        console.log(areas);
        this.areas = areas.Data;
      })
    ).subscribe();
    
  }
  ngAfterViewInit(): void {
    fromEvent(this.cityInput?.nativeElement, `input`).pipe(
      debounceTime(500),
      tap((event: any) => {
        this.selectedCity = event.target.value;
        this.getSelectedGarages();
      })
    ).subscribe();
  }
  selectionChanged(event: any) {
    if (event?.target?.value != null) {
      this.selectedArea = event.target.value;
      this.getSelectedGarages();
    }
  }
}
