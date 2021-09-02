import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Faq } from '../classes/Faq';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportService } from '../services/support.service';
import { BlogsService } from '../frontend/service/blogs.service';
import { Supportblog } from '../classes/Supportblog';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  apiUrl = environment.apiUrl;

  allFaqs: Faq[] = [];
  allBlogs: Supportblog[] = [];

  supportForm: FormGroup;

  isMessageSubmittedSuccesfully = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private supportServ: SupportService,
    public blogService: BlogsService
  ) { }

  ngOnInit(): void {
    this.isMessageSubmittedSuccesfully = false;
    this.createForm();
    this.getAllBlogs();
    this.getAllFaqs();
    console.log(this.supportServ.getSingleBlogById("610dabc99a01ed5b4dfc65e2"));
  }

  createForm() {
    this.supportForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  getAllFaqs() {
    this.http.get<Faq[]>(`${this.apiUrl}api/faq`).subscribe((faqs) => {
      console.log(faqs);
      this.allFaqs = faqs;
    })
  }

  async getAllBlogs() {
    this.http.get<Supportblog[]>(`${this.apiUrl}api/admin/supported-blog/0/50`).subscribe((response: any) => {
      console.log(response);
      if (response.length > 0) {
        this.allBlogs = response;
      } else {
        this.allBlogs = [];
      }
    });
    // if (this.supportServ.fetchedBlogs) {
    // this.supportServ.gettingSupportBlogs();
    // await this.supportServ.supportBlogs.asObservable().subscribe((blogs: Supportblog[]) => {
    //   console.log(blogs);
    //   this.allBlogs = blogs;
    // });
    // } else {
    //   this.supportServ.gettingSupportBlogs();
    // }
  }

  supportFormSubmit() {
    console.log(this.supportForm.value);
    if (this.supportForm.valid) {
      this.http.post(`${this.apiUrl}api/ticket`, this.supportForm.value).subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.isMessageSubmittedSuccesfully = true;
        } else {
          this.isMessageSubmittedSuccesfully = true;
        }
      })
    } else {
      alert('There is some error occurs, please try again after some time.');
    }
  }

  getPostImage(postImage?) {
    if (postImage) {
      return this.apiUrl + 'images/blogs/' + postImage
    } else {
      return '../../../../assets/img/defaults/default_thumb.png';
    }
  }
}
