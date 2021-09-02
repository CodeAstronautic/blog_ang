import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { catchError, publish } from 'rxjs/operators';
import { Category } from 'src/app/classes/category';
import { Post } from 'src/app/classes/post';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorHandlerService, HandleError } from 'src/app/services/http-error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private apiUrl = `${environment.apiUrl}`;
  // private handleError: HandleError;
  // httpOptions = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accepts': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Authorization': 'false'
  //   }
  // };

  public all_categories2 = new BehaviorSubject<Category[]>([]);
  public all_categories: Category[] = [];

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService,
    private auth: AuthService
  ) {
    // this.handleError = this.httpErrorHandler.createHandleError('BlogsService')
    console.log('Blog service loaded')
    // this.getHomeRecentBlogs(10);
  }

  getCategories() {
    this.http.get<Category[]>(`${this.apiUrl}api/category`).subscribe(
      categories => {
        console.log(categories)
        this.all_categories = categories;
        this.all_categories2.next(categories);
      },
      err => {
        console.log(err)
        console.log(err.status)
        console.log(err.statusText)
      }
    )
  }

  changeBlogStatus(blogId: string, status: boolean) {
    console.log(blogId, status);
    const payload = {
      isComplete: status
    }
    return this.http.put(`${this.apiUrl}api/blog/${blogId}`, payload);
  }
  deleteBlogById(blogId: string) {
    return this.http.delete(`${this.apiUrl}api/blog/${blogId}`);
  }

  // getHomeRecentBlogs(length: number) {
  //   return this.http.get<Post[]>(`${this.apiUrl}api/home/recent_blogs/0/` + length)
  // }


  getHomeTodayDealsBlogs(length: number) {
    return this.http.get<Post[]>(`${this.apiUrl}api/home/recent_blogs/0/` + length)
  }

  getHomePopularBlogs(length: number) {
    return this.http.get<Post[]>(`${this.apiUrl}api/blog/popular/0/` + length)
  }

  getHomeBlogsByPopularCategories(length: number) {
    return this.http.get<Post[]>(`${this.apiUrl}api/blog/popular_category/0/` + length)
  }

  get allCategories() {
    return this.all_categories2.asObservable();
  }

  async getPostByID(_id: string) {
    return this.http.get<Post>(`${this.apiUrl}api/blog/${_id}`);
  }

  async addBlog(payload: any) {
    return this.http.post(`${this.apiUrl}api/blog`, payload);
  }

  async addComment(payload: any, blogId: string) {
    return this.http.put(`${this.apiUrl}api/comment/${blogId}`, payload);
  }

  async blogFeaturedImageUpload(payload: any, blog_id: string) {
    return this.http.put(`${this.apiUrl}api/blog/file/${blog_id}`, payload);
  }

  async updateBlog(payload: any, id: string) {
    return this.http.put(`${this.apiUrl}api/blog/${id}`, payload);
  }

  async getBlogByUser(id: string) {
    return this.http.get(`${this.apiUrl}api/blog/${id}`);
  }
  async getUserPublishedBlogsOnly() {
    return this.http.get<any[]>(`${this.apiUrl}api/user/my_blogs`).subscribe((blogs: any[]) => {
      const publishedBlogs = blogs.filter((blog)=>{
        blog.isComplete == true;
      })
      return publishedBlogs;
    })
  }

  async getMyBlogs() {
    return this.http.get<any[]>(`${this.apiUrl}api/user/my_blogs`);
  }

  async getMySavedBlogs() {
    return this.http.get(`${this.apiUrl}api/user/saved_blog`)
  }

  validateForm(formGroup: FormGroup) {
    //{1}
    Object.keys(formGroup.controls).forEach((field) => {
      //{2}
      const control = formGroup.get(field); //{3}
      if (control instanceof FormControl) {
        //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        //{5}
        this.validateForm(control); //{6}
      }
    });
  }

  stripHtml(html: string) {
    var div = document.createElement("DIV");

    div.innerHTML = html;

    let cleanText = div.innerText;

    div = null; // prevent mem leaks
    // console.log(cleanText)

    return cleanText;
  }

  shareIncrease(blogId: string) {
    return this.http.put(`${this.apiUrl}api/share/${blogId}`, {});
  }

  readingTime(htmlData: string) {
    const text = htmlData;
    const wpm = 300;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
  }

}
