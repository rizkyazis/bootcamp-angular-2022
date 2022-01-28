import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-list-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  detm!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  form!: FormGroup;

  constructor(private formBuild: FormBuilder, private ps: ProductService) {
    this.form = this.formBuild.group({
      'name': new FormControl(null,),
      'description': new FormControl(null,)
    })
  }

  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      ajax: (dataTableParameters: any, callback) => {
        dataTableParameters.extraParam = {};
        dataTableParameters.extraParam['name'] = this.form.controls['name'].value;
        that.ps.list(dataTableParameters).subscribe(resp => {
          callback({
            recordsTotal: resp.RecordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: resp.data,
            draw: resp.draw
          });
        });
      },
      searching: false,
      serverSide: true,
      processing: true,
      columns: [{
        title: "ID",
        data: "id",
        orderable: false
      },
        {
          title: "Name",
          data: "name"
        },
        {
          title: "Description",
          data: "description"
        },
        {
          title: "Price",
          data: "price",
          render: $.fn.dataTable.render.number(',', '.', 0)
        }]
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  find() {
    this.detm.dtInstance.then((dint: DataTables.Api) => {
      dint.draw();
    })
  }

}
