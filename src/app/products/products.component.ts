import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import {ActivatedRoute} from '@angular/router';

declare var $: any;


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:any
  productsRows=[]
  pdescription:string
  cid:string


  constructor(
    public api: ApiService,private route:ActivatedRoute) { }

  ngOnInit() {

    this.cid = this.route.snapshot.paramMap.get('cid')
  
    this.route.params.subscribe(params => {

      this.productsRows=[]
      this.cid = params['cid']
      this.getProducts()
    });

   


    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    
    // Initialize popover component
    $(function () {
      $('[data-toggle="popover"]').popover()
    })
  }

  getProducts(): void {
    this.api.getProductsUsingCid(this.cid).subscribe((resp: any) => {
      this.products = resp;
      console.log(this.products);

      this.products.forEach((product, index) => {
        if(index % 4 == 0) {
            let row = [];
            row.push(product);
            this.productsRows.push(row);
        } else {
            this.productsRows[this.productsRows.length - 1].push(product);
        }
    });



    });
  }

  openModal(pdescription:string){
    this.pdescription = pdescription

  }

}
