import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Message} from "../model/message";
import {Department} from "../model/department";

@Component({
  selector: 'app-message-parent',
  templateUrl: './message-parent.component.html',
  styleUrls: ['./message-parent.component.css']
})
export class MessageParentComponent implements OnInit {

  form!: FormGroup;
  messageSend!:Message;

  constructor(private formBuild: FormBuilder) {
    this.form = this.formBuild.group({
      'name':new FormControl(null, [Validators.required]),
      'message':new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  sendChild():void{
    let mes = <Message>{};
    mes.name = this.form.controls['name'].value;
    mes.message = this.form.controls['message'].value;
    this.messageSend = mes;
  }

  acceptChild($event:any):void{
    console.log($event);
    this.form.controls["name"].setValue($event.name);
    this.form.controls["message"].setValue($event.message);
  }
}
