import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { FirebaseService } from '../service/firebase-service.service';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css'],
})


export class AddPeopleComponent implements OnInit {
  emp: any= {};
  title: string ;
  id : string;
    constructor(private firebaseService: FirebaseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.title = 'Add Employee Info';
      if(this.id){
          this.title = 'Edit Employee Info';
          this.getDataByKey(this.id);
      }
  }
  addPeople(data: NgForm){
    if(this.id){
      this.firebaseService.editData(this.id,data.value).then(this.goToHome);
      }else{
      this.firebaseService.addData(data.value).then(this.goToHome);
      }
  }
  getDataByKey(id){
    this.firebaseService.getDataByID(id).subscribe((data)=>{this.emp = data;
    });
  }
  Cancel() {
  this.router.navigate([`/`]);
  }

  goToHome=()=>{
  this.router.navigate(['/']);
  }
}
