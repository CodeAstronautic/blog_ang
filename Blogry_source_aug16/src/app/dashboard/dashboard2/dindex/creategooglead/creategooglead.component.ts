import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/classes/category';
import { City } from 'src/app/classes/city';
import { Country } from 'src/app/classes/country';
import { GoogleAds } from 'src/app/classes/googleAds';
import { State } from 'src/app/classes/State';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BlogsService } from 'src/app/frontend/service/blogs.service';
import { AuthService } from 'src/app/services/auth.service';
import { values } from 'lodash';
import { Router } from '@angular/router';


@Component({
  selector: 'app-creategooglead',
  templateUrl: './creategooglead.component.html',
  styleUrls: ['./creategooglead.component.css']
})
export class CreategoogleadComponent implements OnInit {

  apiUrl = environment.apiUrl;

  googleAdForm: FormGroup;
  myBlogList: any[];
  categoryList: Category[];

  selectedImage2;
  selectedImage2Preview;
  selectedImage3;
  selectedImage3Preview;
  totalCalculatedAmount = 0;

  // countries: Country[] = '../../../../json_data/countries.json';
  // states: State[] = '../../../../json_data/states.json';
  // cities:City[] = '../../../../json_data/cities.json';
  countries: Country[];
  states: State[];
  cities: City[]

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private blogService: BlogsService,
    private auth: AuthService,
    private route: Router
  ) { }

  generateForm(ad?: GoogleAds) {
    this.googleAdForm = this._fb.group({
      campaignName: [ad ? ad.campaignName : '', [Validators.required]],
      blog: [ad ? ad.blog : '', [Validators.required]],
      heading1: [ad ? ad.heading1 : '', [Validators.required]],
      heading2: [ad ? ad.heading2 : '', [Validators.required]],
      heading3: [ad ? ad.heading3 : '', [Validators.required]],
      image1: [ad ? ad.image1 : ''],
      image2: [ad ? ad.image2 : ''],
      image3: [ad ? ad.image3 : ''],
      description1: [ad ? ad.description1 : '', [Validators.required]],
      description2: [ad ? ad.description2 : '', [Validators.required]],
      description3: [ad ? ad.description3 : '', [Validators.required]],
      tags: [ad ? ad.tags : ''],
      category: [ad ? ad.category : '', [Validators.required]],
      amount_per_day: [ad ? ad.amount_per_day : '', [Validators.required, Validators.max(2100), Validators.min(129)]],
      days: [ad ? ad.days : '', [Validators.required]],
      total_amount: [ad ? ad.total_amount : '', [Validators.required]],
      street1: [ad ? ad.street1 : '', [Validators.required]],
      street2: [ad ? ad.street2 : ''],
      country: [ad ? ad.country : '', [Validators.required]],
      state: [ad ? ad.state : '', [Validators.required]],
      city: [ad ? ad.city : '', [Validators.required]],
      pincode: [ad ? ad.pincode : '', [Validators.required]],
      advertise_nearby: [ad ? ad.advertise_nearby : ''],
      nearby: [ad ? ad.nearby : ''],
    })
  }

  ngOnInit(): void {
    // setTimeout(() => {
    this.auth.userProfile.subscribe(data => {
      console.log(data.blogs);
      console.log('my published blog');
      if (data.blogs) {
        const publishedBlogs = data.blogs.filter((post: any) => {
          return post.isComplete == true;
        })
        console.log(publishedBlogs);
        this.myBlogList = publishedBlogs;
      }
    })
    // }, 500);
    this.http.get("assets/json_data/countries.json").subscribe((data: Country[]) => {
      console.log(data);
      this.countries = data;
    })
    // this.http.get("assets/json_data/states.json").subscribe((data: State[]) => {
    //   console.log(data);
    //   this.states = data;
    // })
    this.blogService.all_categories2.subscribe((categories) => {
      // console.log('get categories list')
      this.categoryList = categories;
    })
    this.generateForm();
    this.googleAdForm.controls.blog.valueChanges.subscribe((value) => {
      console.log(value)
      if (value) {
        const selectedPost = this.myBlogList.filter((post: any) => {
          return post._id == value;
        })
        this.googleAdForm.controls.heading1.patchValue(selectedPost[0].title);
        // this.googleAdForm.controls.description1.patchValue(selectedPost[0].content);
        this.googleAdForm.controls.image1.patchValue(selectedPost[0].files);
        this.googleAdForm.controls.tags.patchValue(selectedPost[0].tag);
        const selectedCat = this.categoryList.filter((cat: Category) => {
          return cat.name == selectedPost[0].category;
        })
        if (selectedPost[0].tag.length > 0) {
          this.googleAdForm.controls.tags.patchValue(selectedPost[0].tag)
        }
        if (selectedCat.length > 0) {
          this.googleAdForm.controls.category.patchValue(selectedCat[0]._id);
        }
      }
    })
    this.googleAdForm.controls.amount_per_day.valueChanges.subscribe((value) => {
      if (value && this.googleAdForm.controls.days.value) {
        console.log(value)
        const total = value * this.googleAdForm.controls.days.value;
        this.totalCalculatedAmount = total;
        this.googleAdForm.controls.total_amount.patchValue(total)
      }
    })
    this.googleAdForm.controls.days.valueChanges.subscribe((value) => {
      if (value && this.googleAdForm.controls.amount_per_day.value) {
        console.log(value)
        const total = value * this.googleAdForm.controls.amount_per_day.value;
        this.totalCalculatedAmount = total;
        this.googleAdForm.controls.total_amount.patchValue(total)
      }
    })
    this.googleAdForm.controls.country.valueChanges.subscribe((value) => {
      this.states = [];
      if (value) {
        this.onChangeCountry(value);
      }
    })
    this.googleAdForm.controls.state.valueChanges.subscribe((value) => {
      this.cities = [];
      if (value) {
        this.onChangeState(value);
      }
    })
  }

  onChangeBlog(blog_id) { }

  onChangeCountry(country_id) {
    //get states list
    this.http.get("assets/json_data/states.json").subscribe((data: State[]) => {
      if (data) {
        const states = data.filter((state: State) => {
          return state.country_id == country_id;
        })
        console.log(states);
        this.states = states;
      }
    })
  }
  onChangeState(state_id) {
    //get states list
    this.http.get("assets/json_data/cities.json").subscribe((data: City[]) => {
      if (data) {
        const cities = data.filter((city: City) => {
          return city.state_id == state_id;
        })
        console.log(cities);
        this.cities = cities;
      }
    })
  }

  onFileChange2(event: any) {
    // console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.selectedImage2 = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage2Preview = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  removeFile2() {
    this.selectedImage2 = '';
    this.selectedImage2Preview = '';
    this.googleAdForm.controls.image2.patchValue('');
  }

  onFileChange3(event: any) {
    // console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.selectedImage3 = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage3Preview = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  removeFile3() {
    this.selectedImage3 = '';
    this.selectedImage3Preview = '';
    this.googleAdForm.controls.image3.patchValue('');
  }

  formSubmit() {
    console.log(this.googleAdForm.value)
    // return;
    // if (!this.googleAdForm.invalid) {

      let form;

      const googleForm = this.googleAdForm.value;

      const formData = new FormData;

      if(this.selectedImage2 || this.selectedImage3) {
        Object.keys(googleForm).forEach(function (key) {
          formData.append(key, googleForm[key])
        });
        formData.delete('tags')
        formData.delete('image2')
        formData.delete('image3')
        if (this.selectedImage2) {
          formData.append('image2', this.selectedImage2)
        }
        if (this.selectedImage3) {
          formData.append('image3', this.selectedImage3)
        }
        this.googleAdForm.controls.tags.value.forEach(thisTag => {
          formData.append("tags", thisTag);
        });
        form = formData;
      } else {
        form = this.googleAdForm.value;
      }
      // return
      this.http.post(`${this.apiUrl}api/google_advertisement`, form).subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.route.navigate(['/p/dashboard/google-ads']);
        } else {
          alert(response.msg);
          // alert('There is some error happened, please try again later.');
        }
      })
    // } else {
    //   alert('please fill all fields.')
    // }
  }
}
