import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supportblog } from '../classes/Supportblog';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  supportBlogs = new BehaviorSubject<Supportblog[]>(null);
  fetchedBlogs = false;

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // gettingSupportBlogs() {
  //   this.http.get<Supportblog[]>(`${this.apiUrl}api/admin/supported-blog/0/50`).subscribe((response: any) => {
  //     console.log(response);
  //     if (response.length > 0) {
  //       this.supportBlogs = response;
  //       this.fetchedBlogs = true;
  //     } else {
  //       this.fetchedBlogs = false;
  //     }
  //   })
  // }

  getSingleBlogById(blogId: string) {
    this.http.get<Supportblog[]>(`${this.apiUrl}api/admin/supported-blog/0/50`).subscribe((response: any) => {
      console.log(response);
      if (response.length > 0) {
        const findBlogsById = response.filter((post) => { return post._id == blogId });
        if (findBlogsById.length > 0) {
          return findBlogsById[0];
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
  }

}
