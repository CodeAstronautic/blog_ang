import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { BlogsService } from '../../frontend/service/blogs.service';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  myBlogs: any[];
  myAllBlogs: any[];

  showListType = 'all';

  apiUrl = environment.apiUrl;
  defaultPostImage = '../../../../assets/img/defaults/default_thumb.png';

  constructor(private auth: AuthService, public blogService: BlogsService,
    private ngxLoader: NgxSpinnerService) {
  }

  changeBlogStatus(blogId, status) {
    this.ngxLoader.show();
    let isCompleted = true;
    if (status == true) {
      isCompleted = false;
      this.ngxLoader.hide();
    }
    this.blogService.changeBlogStatus(blogId, isCompleted).subscribe(async (response: any) => {
      console.log(response);
      if (response.success) {
        const index = this.myBlogs.findIndex(x => x._id === blogId);
        const index2 = this.myAllBlogs.findIndex(x => x._id === blogId);
        this.myAllBlogs[index2].isComplete = isCompleted;
        this.myBlogs[index].isComplete = isCompleted;
        if (this.showListType == 'all') {
          this.getMyBlogs();
        }
        if (this.showListType == 'published') {
          this.getPublishedBlogs();
        }
        if (this.showListType == 'draft') {
          this.getDraftBlogs();
        }
        // setTimeout(() => {
        //   this.getMyBlogs();          
        // }, 500);
        // setTimeout(() => {
        //   this.ngxLoader.hide();
        // }, 1000);
      }
    })
  }

  ngOnInit(): void {
    this.getMyBlogs();
  }

  getPublishedBlogs() {
    this.ngxLoader.show();
    if (this.myBlogs.length > 0) {
      const publishedBlogs = this.myAllBlogs.filter((post: any) => {
        return post.isComplete === true;
      })
      this.myBlogs = publishedBlogs;
      this.showListType = 'published';
      // this.auth.userProfile.asObservable().subscribe(data => {
      //   const publishedBlogs = data.blogs.filter((post: any) => {
      //     return post.isComplete === true;
      //   })
      //   this.myBlogs = publishedBlogs;
      // })
    }
    this.ngxLoader.hide();
  }

  getDraftBlogs() {
    this.ngxLoader.show();
    if (this.myBlogs.length > 0) {
      const draftBlogs = this.myAllBlogs.filter((post: any) => {
        return post.isComplete === false;
      })
      this.myBlogs = draftBlogs;
      this.showListType = 'draft';
      // this.auth.userProfile.asObservable().subscribe(data => {
      //   const draftBlogs = data.blogs.filter((post: any) => {
      //     return post.isComplete === false;
      //   })
      //   this.myBlogs = draftBlogs;
      // })
    }
    this.ngxLoader.hide();
  }

  getMyBlogs() {
    this.ngxLoader.show();
    this.auth.userProfile.asObservable().subscribe(data => {
      console.log('my blog');
      console.log(data.blogs);
      this.myBlogs = data.blogs;
      this.myAllBlogs = data.blogs;
      this.showListType = 'all';
      setTimeout(() => {
        this.ngxLoader.hide();
      }, 2000);
    })
  }

  deleteMyBlog(blogId) {
    if (confirm("Are you sure to delete, this step is irreversible")) {
      this.ngxLoader.show();
      this.blogService.deleteBlogById(blogId).subscribe((response: any) => {
        if (response.success) {
          const index = this.myBlogs.findIndex(x => x._id === blogId);
          this.myBlogs.splice(index, 1);
          const index2 = this.myAllBlogs.findIndex(x => x._id === blogId);
          this.myAllBlogs.splice(index2, 1);
        } else {
          alert('There has been some error deleting your blog, please contact administration.')
        }
        this.ngxLoader.hide();
      });
      this.ngxLoader.hide();
    }
  }

}
