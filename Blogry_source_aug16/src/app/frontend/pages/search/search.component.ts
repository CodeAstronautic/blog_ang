import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/classes/post';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  httpOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  };

  apiUrl = environment.apiUrl;

  showLoadMoreButton = true;

  keyword = '';
  page:number = 0;
  limit:number = 10;
  noKeyworMessage = "Your search didn't match, please search again.";
  totalResultsCount = 0;
  totalResults: Post[];

  constructor(private router: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    // console.log(this.router.snapshot.params.keyword, this.router.snapshot.params.page, this.router.snapshot.params.limit);
    if (this.router.snapshot.params.page) {
      const page = parseInt(this.router.snapshot.params.page);
      this.page = page;
    }
    if (this.router.snapshot.params.limit) {
      const limit = parseInt(this.router.snapshot.params.limit);
      this.limit = limit;
    }
    if (this.router.snapshot.params.keyword) {
      const keyword = this.router.snapshot.params.keyword;
      this.keyword = keyword;
      const postData = {
        "keyword": keyword,
        "skip": this.page,
        "limit": this.limit
      };
      console.log(postData);
      this.http.post(`${this.apiUrl}api/search`, postData).subscribe((searchBlogs: any) => {
        this.totalResults = searchBlogs.data;
        console.log(searchBlogs.data);
        if (searchBlogs.data.length != this.limit) {
          this.showLoadMoreButton = false;
        } else {
          this.showLoadMoreButton = true;
        }
      })
    }
  }
  loadMore() {
    // if (this.router.snapshot.params.page) {
    //   const page = this.router.snapshot.params.page;
    //   this.page = page;
    // }
    // if (this.router.snapshot.params.limit) {
    //   const limit = this.router.snapshot.params.limit;
    //   this.limit = limit;
    // }
    const oldPage = this.page;
    const nextPage:number = (oldPage + 1);
    const postData = {
      "keyword": this.keyword,
      "skip": nextPage,
      "limit": this.limit
    };
    console.log(postData);
    this.http.post(`${this.apiUrl}api/search`, postData).subscribe((searchBlogs: any) => {
      this.totalResults.push(...searchBlogs.data);
      console.log(searchBlogs);
      if (searchBlogs.data.length != this.limit) {
        this.showLoadMoreButton = false;
      } else {
        this.showLoadMoreButton = true;
      }
    })
  }

}
