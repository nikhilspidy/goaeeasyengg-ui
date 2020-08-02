import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';

declare var $: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle: string = 'Goa Easy Engg Solutions';
  categories:any

  constructor(public api: ApiService) { }

  ngOnInit() {


   $(document).ready(function() {
    $('li.active').removeClass('active');
    $('a[href="' + location.pathname + '"]').closest('li').addClass('active'); 
  });

   this.getCategories()
  }

  getCategories(): void {
    this.api.getCategories().subscribe((resp: any) => {
      this.categories = resp;
      console.log(this.categories);
    });
  }

}
