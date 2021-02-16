import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from '../user.service';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-archcorp',
  templateUrl: './archcorp.component.html',
  styleUrls: ['./archcorp.component.css']
})
export class ArchcorpComponent implements OnInit {
  public authority: string;
  public noOfApprovals: Number;
  public reqDocuments: string;
  public actDocuments: any;
  public client: any;
  public archCorpLists: any;
  public authToken: any;
  public editFlag: any;
  public archCorpId: any;
  public search: any;
  constructor(public userService: UserService, public toastr: ToastrManager,
    public router: Router) { }

  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.getAllLists();
  }

  public deleteList = (data) =>{
    debugger;
    this.userService.deleteArchCorpList(data, this.authToken).subscribe(
  (apiResponse) => {
      if(apiResponse.status == 200){
        this.toastr.successToastr('Deleted Successfully!!');
     this.getAllLists();
      }
      else{
        this.toastr.errorToastr(apiResponse.message);
      }
  },
  (err) => {
   this.toastr.errorToastr("some error in deleting!");
  }
    )
  }

  public getAllLists = () => {
    this.userService.getAllRecords().subscribe(
      (apiResponse)=>{
        debugger;
           if(apiResponse.status == 200){
               this.archCorpLists = apiResponse['data'];
               console.log(this.archCorpLists);
           }
           else{
            //this.toastr.warningToastr(apiResponse.message);
           }
      },
      (err)=>{
        this.toastr.warningToastr("Some issue in fetching lists");
      }
    )
      }

      public createRecord = () => {
        if(!this.authority){
          this.toastr.warningToastr("Enter Authority properly!!!");
        }
        else if(!this.noOfApprovals){
          this.toastr.warningToastr("Enter NoOfApprovals properly!!!");
        } 
        else if(!this.reqDocuments){
          this.toastr.warningToastr("Enter ReqDocuments properly!!!");
        } 
        else if(!this.actDocuments){
          this.toastr.warningToastr("Enter ActDocuments properly!!!");
        } 
        else if(!this.client){
          this.toastr.warningToastr("Enter Client properly!!!");
        } 
        else{
               let data = {
                authority: this.authority,
                noOfApprovals: this.noOfApprovals,
                 reqDocuments: this.reqDocuments,
                 actDocuments: this.actDocuments,
                 client: this.client,
                 archCorpId: null
               }
               $('.modal').removeClass('in');
      $('.modal').attr("aria-hidden", "true");
      $('.modal').css("display", "none");
      $('.modal-backdrop').remove();
      $('body').removeClass('modal-open');
      if(this.editFlag !== 1){
               this.userService.createArchCorpList(data).subscribe(
                 (apiResponse) =>{
                   console.log(apiResponse);
                                 if(apiResponse.status == 200){
                                   this.toastr.successToastr("Record created Successfully!!");
                                    this.getAllLists();
                                   
                                 }
                                 else{
                                   this.toastr.warningToastr(apiResponse.message);
                                 }
                 },
                 (err) =>{
                    this.toastr.errorToastr("Signup NOt success");
                 }
               )
                }
                else if(this.editFlag == 1){
                  this.userService.editArchCorpList(data, this.archCorpId).subscribe(
                    (apiResponse) =>{
                      console.log(apiResponse);
                                    if(apiResponse.status == 200){
                                      this.toastr.successToastr("Record Edited Successfully!!");
                                       this.getAllLists();
                                      
                                    }
                                    else{
                                      this.toastr.warningToastr(apiResponse.message);
                                    }
                    },
                    (err) =>{
                       this.toastr.errorToastr("Signup NOt success");
                    }
                  )
                }
      }
      }

      public logout:any = () => {
        this.router.navigate(['/']);
      }

      public editValues: any = (archCorp) => {
         this.authority = archCorp.authority
        this.noOfApprovals = archCorp.noOfApprovals
        this.reqDocuments = archCorp.documentRequirements
        this.actDocuments = archCorp.actualDocumentRequirements
        this.client = archCorp.fromClient
        this.editFlag = 1
        this.archCorpId = archCorp.archCorpId
      }

      public filterValues = (data) => {
        debugger;
        let temp: any = {};
        if(data != ""){
         temp = {
          [data] : this.search
        }
      }
        this.userService.getAllRecords(temp).subscribe(
          (apiResponse)=>{
            debugger;
               if(apiResponse.status == 200){
                   this.archCorpLists = apiResponse['data'];
                   console.log(this.archCorpLists);
               }
               else{
                //this.toastr.warningToastr(apiResponse.message);
               }
          },
          (err)=>{
            this.toastr.warningToastr("Some issue in fetching lists");
          }
        )
      }
}
