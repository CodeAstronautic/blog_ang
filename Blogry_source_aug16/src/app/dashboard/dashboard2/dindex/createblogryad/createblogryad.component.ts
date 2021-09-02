import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/classes/category';
import { BlogsService } from 'src/app/frontend/service/blogs.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-createblogryad',
  templateUrl: './createblogryad.component.html',
  styleUrls: ['./createblogryad.component.css']
})
export class CreateblogryadComponent implements OnInit {

  apiUrl = environment.apiUrl;


  blogryAdForm: FormGroup;
  showForm = false;
  myBlogList: any[];
  categoryList: Category[];
  selectedImage;

  totalAmount = 0;

  expression = '^/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi';
  // regex = new RegExp(this.expression);

  constructor(
    public _fb: FormBuilder,
    public auth: AuthService,
    private blogService: BlogsService,
    private http: HttpClient,
    private route: Router
  ) {
  }

  createAdForm(ad?) {
    this.blogryAdForm = this._fb.group({
      advertisement_type: [ad ? ad.advertisement_type : '', [Validators.required]],
      campaignName: [ad ? ad.campaignName : '', [Validators.required]],
      title: [ad ? ad.title : '', [Validators.required]],
      image: [ad ? ad.image : ''],
      blog: [ad ? ad.blog : ''],
      url: [ad ? ad.url : '', Validators.pattern(this.expression)],
      tags: [ad ? ad.tags : Array],
      category: [ad ? ad.category : ''],
      amount: [ad ? ad.amount : '', [Validators.required]],
      total_amount: [ad ? ad.amount : '', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.blogService.all_categories2.subscribe((categories) => {
      // console.log('get categories list')
      this.categoryList = categories;
    })
    this.createAdForm();
    this.blogryAdForm.controls.advertisement_type.valueChanges.subscribe((value) => {
      if (value) {
        if (value === '1') {
          this.showForm = false;
          this.blogryAdForm.controls.url.clearValidators();
          this.blogryAdForm.controls.url.updateValueAndValidity()
          this.blogryAdForm.controls.blog.setValidators([Validators.required])
          this.blogryAdForm.controls.blog.patchValue('');
          this.auth.userProfile.asObservable().subscribe(data => {
            console.log(data.blogs);
            console.log('my published blog');
            const publishedBlogs = data.blogs.filter((post: any) => {
              return post.isComplete == true;
            })
            console.log(publishedBlogs);
            this.myBlogList = publishedBlogs;
            this.blogryAdForm.controls.blog.valueChanges.subscribe((value) => {
              console.log(value)
              if (value) {
                const selectedPost = this.myBlogList.filter((post: any) => {
                  return post._id == value;
                })
                this.blogryAdForm.controls.title.patchValue(selectedPost[0].title);
                this.blogryAdForm.controls.tags.patchValue(selectedPost[0].tag);
                this.blogryAdForm.controls.image.patchValue(selectedPost[0].files);
                this.blogryAdForm.controls.category.patchValue(selectedPost[0].category);
                // const selectedCat = this.categoryList.filter((cat: Category) => {
                //   return cat.name == selectedPost[0].category;
                // })
                // if (selectedCat.length > 0) {
                //   this.blogryAdForm.controls.category.patchValue(selectedCat[0]._id);
                // }
              }
            })
          })
        } else {
          this.blogryAdForm.controls.blog.clearValidators();
          this.blogryAdForm.controls.blog.updateValueAndValidity();
          this.blogryAdForm.controls.url.setValidators([Validators.required]);
          this.blogryAdForm.controls.blog.patchValue('');
          this.blogryAdForm.controls.title.patchValue('');
          this.blogryAdForm.controls.tags.patchValue([]);
          this.blogryAdForm.controls.image.patchValue('');
          this.blogryAdForm.controls.category.patchValue('');
          this.showForm = true;
        }
      } else {
        this.blogryAdForm.reset();
        this.showForm = false;
      }
    })
    this.blogryAdForm.controls.amount.valueChanges.subscribe(value => {
      this.totalAmount = value+((value / 100) * 10)
      this.blogryAdForm.controls.total_amount.patchValue(this.totalAmount);
    })

  }

  onFileChange(event: any) {
    // console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.selectedImage = file;
      // const reader = new FileReader();
      // reader.onload = (e: any) => {
      //   this.previewImage = e.target.result;
      // };
      // reader.readAsDataURL(event.target.files[0]);
    }
  }

  formSubmit() {
    if(this.blogryAdForm.invalid) {
      alert('please fill all fields.')
    }
    console.log(this.blogryAdForm.value)
    // return;
    if (!this.blogryAdForm.invalid) {
      let form;
      if (this.blogryAdForm.controls.advertisement_type.value == '0') {
        const formData = new FormData;
        formData.append('advertisement_type', this.blogryAdForm.controls.advertisement_type.value)
        formData.append('amount', this.blogryAdForm.controls.amount.value)
        formData.append('campaignName', this.blogryAdForm.controls.campaignName.value)
        formData.append('category', this.blogryAdForm.controls.category.value)
        formData.append('image', this.selectedImage)
        formData.append('title', this.blogryAdForm.controls.title.value)
        formData.append('url', this.blogryAdForm.controls.url.value)
        formData.append('total_amount', this.blogryAdForm.controls.total_amount.value)

        form = formData;
      } else {
        form = this.blogryAdForm.value;
      }
      this.http.post(`${this.apiUrl}api/advertisement`, form).subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.route.navigate(['/p/dashboard/blogry-ads']);
        }
      })
    } else {
      alert('please fill all fields.')
    }
  }

}
