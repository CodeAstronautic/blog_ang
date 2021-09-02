import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  //Material table columns
  displayedColumns: string[] = ['order_id', 'payment_id', 'createdAt'];
  //Table Data Source
  dataSource: MatTableDataSource<any>;
  //Dynamic Data Variable
  data: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  apiUrl = environment.apiUrl;

  myTransactions: any[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTransactionsList();
  }

  getTransactionsList = () => {
    this.http.get(`${this.apiUrl}api/transection`).subscribe((reponse: any) => {
      console.log(reponse);
      if (reponse.success) {
        // this.myTransactions = reponse.transection;
        this.data = reponse.transection;

        //Data Table Data Source and pagination with dynamic data
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        console.log(this.data);
      }
    })
  }

}
