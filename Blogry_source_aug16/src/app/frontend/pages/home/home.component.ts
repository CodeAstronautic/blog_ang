import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/classes/post';
import { AuthService } from 'src/app/services/auth.service';
// import { LoadscriptsService } from 'src/app/services/loadscripts.service';
import { environment } from 'src/environments/environment';
import { BlogsService } from '../../service/blogs.service';
import { Category } from 'src/app/classes/category';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterContentInit {

  all_categories: Category[] = [];
  selectedCategoriesList: any[] = [];
  user_categories: any[] = [];

  colorCodes = [
    '#8B0000',
    '#A52A2A',
    '#B22222',
    '#DC143C',
    '#FF0000',
    '#FF6347',
    '#FF7F50',
    '#CD5C5C',
    '#F08080',
    '#E9967A',
    '#FA8072',
    '#FFA07A',
    '#FF4500',
    '#FF8C00',
    '#FFA500',
    '#FFD700',
    '#B8860B',
    '#DAA520',
    '#EEE8AA',
    '#BDB76B',
    '#F0E68C',
    '#808000',
    '#FFFF00',
    '#9ACD32',
    '#556B2F',
    '#6B8E23',
    '#7CFC00',
    '#7FFF00',
    '#ADFF2F',
    '#006400',
    '#008000',
    '#228B22',
    '#00FF00',
    '#32CD32',
    '#90EE90',
    '#98FB98',
    '#8FBC8F',
    '#00FA9A',
    '#00FF7F',
    '#2E8B57',
    '#66CDAA',
    '#3CB371',
    '#20B2AA',
    '#2F4F4F',
    '#008080',
    '#008B8B',
    '#00FFFF',
    '#00FFFF',
    '#E0FFFF',
    '#00CED1',
    '#40E0D0',
    '#48D1CC',
    '#AFEEEE',
    '#7FFFD4',
    '#B0E0E6',
    '#5F9EA0',
    '#4682B4',
    '#6495ED',
    '#00BFFF',
    '#1E90FF',
    '#ADD8E6',
    '#87CEEB',
    '#87CEFA',
    '#191970',
    '#000080',
    '#00008B',
    '#0000CD',
    '#0000FF',
    '#4169E1',
    '#8A2BE2',
    '#4B0082',
    '#483D8B',
    '#6A5ACD',
    '#7B68EE',
    '#9370DB',
    '#8B008B',
    '#9400D3',
    '#9932CC',
    '#BA55D3',
    '#800080',
    '#D8BFD8',
    '#DDA0DD',
    '#EE82EE',
    '#FF00FF',
    '#DA70D6',
    '#C71585',
    '#DB7093',
    '#FF1493',
    '#FF69B4',
    '#FFB6C1',
    '#FFC0CB',
    '#FAEBD7',
    '#F5F5DC',
    '#FFE4C4',
    '#FFEBCD',
    '#F5DEB3',
    '#FFF8DC',
    '#FFFACD',
    '#FAFAD2',
    '#FFFFE0',
    '#8B4513',
    '#A0522D',
    '#D2691E',
    '#CD853F',
    '#F4A460',
    '#DEB887',
    '#D2B48C',
    '#BC8F8F',
    '#FFE4B5',
    '#FFDEAD',
    '#FFDAB9',
    '#FFE4E1',
    '#FFF0F5',
    '#FAF0E6',
    '#FDF5E6',
    '#FFEFD5',
    '#FFF5EE',
    '#F5FFFA',
    '#708090',
    '#778899',
    '#B0C4DE',
    '#E6E6FA',
    '#FFFAF0',
    '#F0F8FF',
    '#F8F8FF',
    '#F0FFF0',
    '#FFFFF0',
    '#F0FFFF',
    '#FFFAFA',
    '#000000',
    '#696969',
    '#808080',
    '#A9A9A9',
    '#C0C0C0',
    '#D3D3D3',
    '#DCDCDC',
    '#F5F5F5',
    '#FFFFFF',
  ];
  getRandomDifferent(arr: any[], last = undefined) {
    if (arr.length === 0) {
      return;
    } else if (arr.length === 1) {
      return arr[0];
    } else {
      let num = 0;
      do {
        num = Math.floor(Math.random() * arr.length);
      } while (arr[num] === last);
      return arr[num];
    }
  }

  apiUrl = environment.apiUrl;

  imageUrl = this.apiUrl + 'images/blogs/';

  homePosts!: Post[];

  showBanner = true;

  totalBlogsNow = 0;

  defaultBlogImage = '../../'

  recentBlogs: Post[] = [];
  suggestedCategories: Category[] = [];
  popularBlogs: Post[] = [];
  suggestedBlogs: Post[] = [];
  allBlogs: Post[] = [];
  allBlogsCurrentLength = 0;
  noMoreLoad = true;

  constructor(
    public blogService: BlogsService,
    public auth: AuthService,
    // private loadScript: LoadscriptsService,
    private scroller: ViewportScroller,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.allBlogs = [];
    this.allBlogsCurrentLength = 0;
    this.noMoreLoad = true;
    // setTimeout(() => {
    // this.showBanner = true;
    // this.loadScript.loadScript('/assets/js/slick.min.js', 'slickslider');
    // this.loadScript.loadScript('/assets/js/home_slider.js', 'home_slider');
    // }, 5000);
    this.auth.behavioralLoginStatus.subscribe((status) => {
      if (status != 'false') {
        this.showBanner = false;
        this.getRecentBlogs()
        this.getSuggestedCategories()
        this.getPopularBlogs()
        this.getSuggestedBlogs()
      }
    })
    this.getAllBlogs();
    this.auth.userProfile.subscribe((userdata: any) => {
      console.log(userdata);
      this.user_categories = userdata.selected_category;
      if (userdata && userdata.selected_category && userdata.selected_category.length > 0) {
        this.user_categories.forEach((cat) => {
          this.selectedCategoriesList.push(cat)
        })
        // this.selectedCategoriesList.push(userdata.selected_category);
      }
    })
    this.blogService.allCategories.subscribe(categories => {
      console.log(categories)
      this.all_categories = categories;
    })
  }

  ngOnDestroy(): void {
    this.allBlogs = [];
    this.allBlogsCurrentLength = 0;
    this.noMoreLoad = true;
    // this.loadScript.revomeScriptById('slickslider');
    // this.loadScript.revomeScriptById('home_slider');
    // this.showBanner = false;
  }

  // after Login Only
  async getRecentBlogs() {
    this.http.get<Post[]>(`${this.apiUrl}api/home/recent_blogs/0/9`).subscribe((blogs) => {
      console.log(blogs);
      this.recentBlogs = blogs;
    })
  }
  async getSuggestedCategories() {
    this.http.get<Category[]>(`${this.apiUrl}api/category_suggestion/0/9`).subscribe((cats) => {
      console.log(cats);
      this.suggestedCategories = cats;
    })
  }
  async getPopularBlogs() {
    this.http.get<Post[]>(`${this.apiUrl}api/blog/popular/0/9`).subscribe((blogs) => {
      console.log(blogs);
      this.popularBlogs = blogs;
    })
  }
  async getSuggestedBlogs() {
    console.log('started selected blogs')
    this.http.get<Post[]>(`${this.apiUrl}api/blog/blogBySelectedCategory/0/9`).subscribe((blogs) => {
      console.log('response from selected blogs')
      console.log(blogs);
      this.suggestedBlogs = blogs;
    })
  }
  // bot loggin without login
  async getAllBlogs() {
    if (this.noMoreLoad) {
      console.log(this.allBlogsCurrentLength);
      const limit = 9;

      // get pageNumbers
      const pageNumber = Math.ceil(this.allBlogsCurrentLength / limit);
      console.log('page number ' + pageNumber);

      this.http.get<Post[]>(`${this.apiUrl}api/blog/${pageNumber}/${limit}`).subscribe((blogs) => {
        console.log(blogs);
        const nowLength = blogs.length;
        const fullLength = this.allBlogsCurrentLength + nowLength;
        this.allBlogsCurrentLength = fullLength;
        this.allBlogs.push(...blogs);
        if (blogs.length < limit) {
          this.noMoreLoad = false;
        }
      })
    }
  }

  getPostImage(postImage?) {
    if (postImage) {
      return this.apiUrl + 'images/blogs/' + postImage
    } else {
      return '../../../../assets/img/defaults/default_thumb.png';
    }
  }

  scrollDown() {
    this.scroller.scrollToAnchor("allPosts");
  }

  ngAfterContentInit() {
  }

  onScrollDown(ev: any) {
    console.log("scrolled down!!", ev);

    this.getAllBlogs();
  }

  selectCategory(index: number, catId: string) {
    // console.log(index, catId);
    if (this.selectedCategoriesList.includes(catId, 0)) {
      // this.selectedCategoriesList.
      var index = this.selectedCategoriesList.indexOf(catId);
      this.selectedCategoriesList.splice(index, 1);
    } else {
      this.selectedCategoriesList.push(catId);
    }
    console.log(this.selectedCategoriesList)
  }

  ifSelected(categoryName: string) {
    if (this.selectedCategoriesList.includes(categoryName, 0)) {
      return true
    }
    return false
  }
  userHaveCategory(categoryName: string) {
    if (this.user_categories.includes(categoryName, 0)) {
      return true
    }
    return false
  }
}
