import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogsService } from '../../frontend/service/blogs.service';

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css']
})
export class WriteBlogComponent implements OnInit, OnDestroy {

  apiUrl = environment.apiUrl;
  imageUrl = this.apiUrl + 'images/blogs/';

  @ViewChild('tagInput') tagInputRef!: ElementRef;
  @ViewChild('extraFormInputs') extraFormInputs: ElementRef;

  tagValue: Observable<number>;

  html!: '';

  blogImage!: File;

  previewImage!: string;

  blogPostForm!: FormGroup;

  tagForm = this._fb.group({
    category: ['', [Validators.required]],
    tags: []
  });
  blogCategories!: any[];
  currentBlogId = '';

  formTitle = 'WRITE A BLOG';
  featuredImageError = '';

  showError = false;
  showErrorMessage = '';

  updateBlog = false;
  updateBlogImage = '';

  tagInputReference = '';

  fileSizeLimit = 1200000;

  constructor(
    private _fb: FormBuilder,
    private blogService: BlogsService,
    private router: Router,
    private route: ActivatedRoute,
    public modalService: NgbModal,
    private ngxLoader: NgxSpinnerService
  ) { }

  onFileChange(event: any) {
    // console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      console.log(file.type.match('image.*'));

      if (file.type.match('image.*')) {
        if (file.size > this.fileSizeLimit) {
          alert('please upload file less than or equals 1 MB only.')
        } else {
          // console.log(file.size);
          this.blogImage = file;
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.previewImage = e.target.result;
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      } else {
        alert('Only images upload here.')
      }
    }
  }

  ngOnInit(): void {
    this.updateBlogImage = '';
    if (this.route.snapshot.params._id) {
      const _id = this.route.snapshot.params._id;
      this.getBlogData(_id);
      this.currentBlogId = _id;
      this.updateBlog = true;
    } else {
      this.updateBlog = false;
    }
    this.blogService.allCategories.subscribe((categories: any[]) => {
      this.blogCategories = categories
    })
    this.constructPostForm();
    // this.tagValue = this.tagForm.controls.tag.valueChanges;
  }

  constructPostForm() {
    this.blogPostForm = this._fb.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]]
    })
  }

  async getBlogData(ID: string) {
    (await this.blogService.getBlogByUser(ID)).subscribe((blogdata: any) => {
      this.formTitle = 'UPDATE BLOG';
      console.log(blogdata)
      const data = blogdata.blog;
      if (data) {
        this.currentBlogId = data._id;
        this.blogPostForm.controls.title.patchValue(data.title)
        this.blogPostForm.controls.content.patchValue(data.content)
        this.tagForm.controls.category.patchValue(data.category._id)
        // console.log(data.category[0]._id)
        if (data.tag && data.tag.length > 0) {
          this.tagForm.controls.tags.patchValue(data.tag);
        }
        if (data.files) {
          this.updateBlogImage = data.files;
        }
      }
    })
    // console.log(this.currentBlogId);
  }

  closeError() {
    this.showError = false;
    this.showErrorMessage = '';
  }

  ngOnDestroy(): void {
    this.html = '';

    this.currentBlogId = '';

    this.featuredImageError = '';

    this.showError = false;
    this.showErrorMessage = '';

    this.updateBlog = false;
    this.updateBlogImage = '';

    this.tagInputReference = '';
  }

  tagsInputChange(event: any) {
    console.log(this.blogPostForm.value)
    console.log(this.tagForm.value)
  }

  openExtraForm(templateRef) {
    this.modalService.open(templateRef, { size: 'xl', backdrop: 'static', windowClass: 'extraWriteBlogInputsModal', centered: true, backdropClass: 'extraWriteBlogInputsModalBackdrop' });
  }

  formNextOption() {
    // console.log(this.blogPostForm.value);
    // check title and content for validation before continue
    if (!this.blogPostForm.controls.title.value) {
      this.blogPostForm.controls.title.markAsTouched({ onlySelf: true });
      return;
    }
    if (!this.blogPostForm.controls.content.value) {
      this.blogPostForm.controls.content.markAsTouched({ onlySelf: true });
      return;
    }
    // if title and content is valid -> open modal for choosing category and tags
    this.openExtraForm(this.extraFormInputs);
  }

  async onFormSubmit(status) {
    // console.log(this.blogPostForm.value);
    // this.openExtraForm(this.extraFormInputs);
    // return;
    if (!this.blogPostForm.controls.title.value) {
      this.blogPostForm.controls.title.markAsTouched({ onlySelf: true });
      return;
    }
    if (!this.blogPostForm.controls.content.value) {
      this.blogPostForm.controls.content.markAsTouched({ onlySelf: true });
      return;
    }
    this.ngxLoader.show();
    const isComplete = status;
    if (!this.blogPostForm.valid) {
      if (isComplete) {
        if (!this.blogImage) {
          this.featuredImageError = 'Please select an image before continue';
        }
      }
      this.blogService.validateForm(this.blogPostForm)
      window.scrollTo(0, 0);
      this.ngxLoader.hide();
    } else {

      if (this.currentBlogId != '') {
        const newFormData = new FormData();

        if (this.blogImage) {
          newFormData.append("file", this.blogImage);
        }

        newFormData.append("title", this.blogPostForm.controls.title.value);
        newFormData.append("content", this.blogPostForm.controls.content.value);
        newFormData.append("category", this.tagForm.controls.category.value);
        var myTags = [];
        this.tagForm.controls.tags.value.forEach((thisTag, index) => {
          newFormData.append("tag", thisTag);
          // console.log(index);
          // myTags.push(thisTag);
        });
        // newFormData.append("tag", JSON.stringify(myTags));
        // newFormData.append("isComplete", isComplete);
        // console.log(this.tagForm.controls.tags.value);
        // console.log(newFormData.getAll('tag'));
        // return;

        const _id = this.route.snapshot.params._id;

        (await this.blogService.updateBlog(newFormData, _id)).subscribe(async (data: any) => {
          console.log(data);

          if (data.success) {
            this.router.navigate(['/p/dashboard/blogs']).then(() => {
              this.ngxLoader.hide();
              location.reload()
            })
          } else {
            this.ngxLoader.hide();
            this.showError = true;
            this.showErrorMessage = 'There is some error updating your blog, please try again after a bit.'
          }
        })
      } else {
        if (isComplete) {
          if (!this.blogImage) {
            this.featuredImageError = 'Please select an image before continue';
            window.scrollTo(0, 0);
            return;
          } else {
            this.featuredImageError = '';
            console.log(this.blogImage);
          }
        }
        const newFormData = new FormData();
        if (this.blogImage) {
          newFormData.append("file", this.blogImage);
        }

        newFormData.append("title", this.blogPostForm.controls.title.value);
        newFormData.append("content", this.blogPostForm.controls.content.value);
        newFormData.append("category", this.tagForm.controls.category.value);
        var myTags = [];
        this.tagForm.controls.tags.value.forEach((thisTag, index) => {
          newFormData.append("tag", thisTag);
          // console.log(index);
          // myTags.push(thisTag);
        });
        // newFormData.append("tag", JSON.stringify(myTags));
        newFormData.append("isComplete", isComplete);

        (await this.blogService.addBlog(newFormData)).subscribe(async (data: any) => {
          console.log(data)
          const blogId = data.blog._id;
          console.log(blogId);

          if (data.success) {
            this.router.navigate(['/p/dashboard/blogs']).then(() => {
              this.ngxLoader.hide();
              location.reload()
            })
          } else {
            this.ngxLoader.hide();
            this.showError = true;
            this.showErrorMessage = 'There is some error adding your blog, please try again after a bit.'
          }
        })
      }
    }
  }

}
