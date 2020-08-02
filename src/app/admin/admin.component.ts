import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  categories:any
  selectedCid:any
  photo:any
  showMsgAP: boolean = false;
  showMsgAC: boolean = false;
  showFailMsgAC : boolean = false;
  showFailMsgAP : boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
      this.getCategories();
  }

  getCategories(){
    this.api.getCategories().subscribe((resp: any) => {
      this.categories = resp;
      console.log(this.categories)
    },
    (err) => {
      console.log(err)
    });
  }

  onACSubmit(data:any){
      this.showMsgAC=false;
      this.showFailMsgAC=false;
      console.log(data.cname);
      this.api.addCategory(data.cname).subscribe((resp: any) => {
        this.showMsgAC=true;
      },
      (err) => {
        this.showFailMsgAC=true;
      }
      );
  }

 
  fileProgress(event) {
    console.log("uploading.....")
    this.photo = event.target.files;
  }

  onAPSubmit(data:any){
    console.log(data.pname);
    console.log(this.selectedCid);
    console.log(data.pdescription);
    console.log(this.photo[0]);
    this.showMsgAP= false;
    this.showFailMsgAP=false;

    this.api.addProduct(data.pname,this.selectedCid,data.pdescription,this.photo[0]).subscribe((resp: any) => {
      this.showMsgAP= true;
    },
    (err) => {
      this.showFailMsgAP=true;
    });

}

deleteCategory(index:number){
  alert(index);
}

}
