import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'src/app/classes/post';

@Component({
  selector: 'app-dindex',
  templateUrl: './dindex.component.html',
  styleUrls: ['./dindex.component.css']
})

export class DindexComponent implements OnInit {

  //Material table columns
  displayedColumns: string[] = ['files', 'title'];
  //Table Data Source
  dataSource: MatTableDataSource<any>;
  //Dynamic Data Variable
  data: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  apiUrl = environment.apiUrl;
  selected: { startDate: Moment, endDate: Moment };
  calendarButtonText = 'Select dates';
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [
      moment()
        .subtract(1, 'month')
        .startOf('month'),
      moment()
        .subtract(1, 'month')
        .endOf('month')
    ],
    'Last 3 Month': [
      moment()
        .subtract(3, 'month')
        .startOf('month'),
      moment()
        .subtract(1, 'month')
        .endOf('month')
    ]
  };

  savedBlogCount = 0;
  likedBlogCount = 0;
  commentsCount = 0;
  blogCount = 0;

  myBlogsTable: any[];

  currentChartTitle = 'This week';
  secondChartTitle = 'This Month';

  // total data's
  totalEarnings = 0;
  totalLikes = 0;
  totalSaves = 0;

  // CURRENT POST DATA

  // currentPostData = {
  //   category: { name: '' },
  //   content: '',
  //   createdAt: '',
  //   earning: 0,
  //   files: '',
  //   isComplete: true,
  //   like_count: [{}],
  //   save_count: [{}],
  //   share_count: 0,
  //   slug: '',
  //   tag: [''],
  //   title: '',
  //   updatedAt: '',
  //   user_id: '',
  //   view_count: [{}]
  // }
  currentPostData: Post;

  constructor(private http: HttpClient, private auth: AuthService) { }

  type = 'bar';
  options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [{
        ticks: {
          max: 20,
          min: 0
        }
      }]
    }
  };

  barchart: any;

  gettingChartData() {
    // this.http.get('http://localhost/chartjs.php').subscribe(data => {
    // this.barchart = this.chartDataArray;
    // this.data = {
    //   labels: this.months, //months
    //   datasets: [{
    //     label: "Revenue",
    //     data: this.sales,
    //     backgroundColor: "#ef7047",
    //   }, {
    //     label: "Income",
    //     data: this.sales2,
    //     backgroundColor: "#f1bd4b",
    //   }]
    // };
    // this.data = {
    //   labels: this.chartDataArray[0], //months
    //   datasets: [{
    //     label: "Angular 11",
    //     data: this.chartDataArray[1][0],
    //     backgroundColor: "#f38b4a",
    //   }, {
    //     label: "Angular 12",
    //     data: this.chartDataArray[1][1],
    //     backgroundColor: "#6970d5",
    //   }]
    // };


    // });
  }

  ngOnInit(): void {
    this.auth.userProfile.asObservable().subscribe((data: any) => {
      if (data.blogs) {
        console.log(data.blogs);
        console.log(data.blogs.length);
        this.blogCount = data.blogs.length;
        this.myBlogsTable = data.blogs;
        this.data = data.blogs;

        //Data Table Data Source and pagination with dynamic data
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;

        data.blogs.forEach((blog: Post) => {
          this.totalEarnings += blog.earning;
          this.totalLikes += blog.like_count.length;
          this.totalSaves += blog.save_count.length;
        });

      }
    })
    // this.gettingChartData();

    // this.http.get(`${this.apiUrl}api/user/saved_blog`).subscribe((data: any) => {
    //   console.log(data.length);
    //   this.savedBlogCount = data.length;
    // })
    // this.http.get(`${this.apiUrl}api/user/liked_blog`).subscribe((data: any) => {
    //   console.log(data.length);
    //   this.likedBlogCount = data.length;
    // })
    // this.http.get(`${this.apiUrl}api/user/commented_blog`).subscribe((data: any) => {
    //   console.log(data.length);
    //   this.commentsCount = data.length;
    // })
  }

  getPostImage(postImage?) {
    if (postImage) {
      return this.apiUrl + 'images/blogs/' + postImage
    } else {
      return '../../../assets/img/defaults/default_thumb.png';
    }
  }

  showDataToSidebar(blogPost: Post) {
    console.log(blogPost);
    this.currentPostData = blogPost;
  }

}
