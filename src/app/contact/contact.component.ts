import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;



  ngOnInit() {
    
   const mapProperties = {
    center: new google.maps.LatLng(35.2271, -80.8431),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);

    
  }

}
