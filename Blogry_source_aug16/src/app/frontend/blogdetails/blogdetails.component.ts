import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Post } from 'src/app/classes/post';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
import { BlogsService } from '../service/blogs.service';

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.css']
})
export class BlogdetailsComponent implements OnInit, OnDestroy {
  @ViewChild('myPopUp') myPopUp: ElementRef<HTMLElement>;
  @ViewChild('mainPopup') mainPopup: ElementRef<HTMLElement>;
  @ViewChild('popupOverlay') popupOverlay: ElementRef<HTMLElement>;
  @ViewChild('popupContent') popupContent: ElementRef<HTMLElement>;
  @ViewChild('body') body: ElementRef;


  @HostListener('window:click', ['$event'])
  onMessage(event) {
    if (event.target == this.elementRef.nativeElement.querySelector('.popup-overlay')) {
      this.closeAdPopup();
    }
  }

  // @Input() commentform: FormGroup;
  apiUrl = environment.apiUrl;
  imageUrl = this.apiUrl + 'images/blogs/';

  userImageUrl = this.apiUrl + 'images/auth/';

  toastShow = false;
  toastMessage = '';

  currentId: any;
  currentPost!: Post;
  commentId = '';
  advertisements: any;

  adParams = {
    advertisement_id: '',
    blog_id: ''
  };

  currentUserLiked = false;
  currentUserSaved = false;
  defaultBlogImage = '../../../assets/img/defaults/default_post.png'
  defaultUserImage = '../../../assets/img/defaults/defaultAvatar.png'
  currentUrl = window.location;

  // httpOptionsAuthorized: any;

  currentLiked = false;
  currentLikedBehave = new BehaviorSubject<boolean>(false);
  currentSaved = false;
  currentSavedBehave = new BehaviorSubject<boolean>(false);

  currentLoggedUserFullname = '';

  // currentBlogPostId = this.route.snapshot.params.postid;

  // commentform = this._fb.group({
  //   content: ['', Validators.required],
  //   parent_id: []
  // })
  recentPosts: Post[];
  currentPostSubscription: Subscription;

  constructor(
    config: NgbModalConfig,
    public auth: AuthService,
    private http: HttpClient,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private blogService: BlogsService,
    private elementRef: ElementRef,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    public globalService: GlobalService,
    public ngxLoader: NgxSpinnerService
  ) {
    this.route.params.subscribe((data: any) => {
      console.log(data);
      console.log(data.postid)
      this.currentId = data.postid
      this.getCurrentPostData(data.postid);
    })
  }
  ngOnDestroy(): void {
    this.currentPostSubscription.unsubscribe();
  }
  ngAfterViewInit() {
    // this.elementRef.nativeElement.querySelector('#myPopUp')
    // .addEventListener('click', this.onClick.bind(this));
    // setTimeout(() => {
    //   this.openAdPopup();
    // }, 5000);
  }

  onClick(event: any) {
    console.log(event);
  }

  openAdPopup(content?) {
    this.popupContent.nativeElement.innerHTML = content;
    setTimeout(() => {
      this.myPopUp.nativeElement.style.display = 'flex';
    }, 500);
    // this.body.nativeElement.style.overflow = 'hidden';
    // this.myPopUp.nativeElement.style.animation = 'slide-in 1s ease; animation-fill-mode: forwards';
    // this.mainPopup.nativeElement.style.animation = 'slide-in 1s ease; animation-fill-mode: forwards';
  }

  closeAdPopup() {
    this.mainPopup.nativeElement.style.cssText = 'animation:slide-out 1s ease; animation-fill-mode: forwards;';
    setTimeout(() => {
      this.myPopUp.nativeElement.style.display = 'none';
      // this.body.nativeElement.style.overflow = 'auto';
    }, 500);
  }

  get getCurentLikeStatus() {
    return this.currentLikedBehave.asObservable();
  }
  get getCurentSaveStatus() {
    return this.currentSavedBehave.asObservable();
  }

  async getCurrentPostData(postid: string) {
    this.currentLiked = false;
    this.currentLikedBehave.next(false);
    this.currentSaved = false;
    this.currentSavedBehave.next(false);
    this.currentPostSubscription = (await this.blogService.getPostByID(postid)).subscribe((postData: any) => {
      console.log(postData);
      const currentPost: Post = postData.blog;
      const currentPostComments = postData.blog.comment;
      console.log(currentPostComments)
      this.currentPost = currentPost;
      if (currentPostComments !== undefined && currentPostComments.length > 0) {
        this.currentPost.comment = currentPostComments;
      } else {
        this.currentPost.comment = [];
      }
      this.advertisements = postData.advertisement;
      // console.log(this.advertisements);
      this.getRecentBlogs()
      this.auth.userProfile.subscribe((user) => {
        this.currentLoggedUserFullname = user.name;
        var currentlikeByUser = postData.blog.like_count.filter((like) => like.user_id == user._id);
        // console.log('like by users')
        // console.log(currentlikeByUser)
        if (currentlikeByUser.length > 0) {
          this.currentLikedBehave.next(true);
        }
        var currentSaveByUser = postData.blog.save_count.filter((save) => save.user_id == user._id);
        // console.log('saves by users')
        // console.log(currentSaveByUser)
        if (currentSaveByUser.length > 0) {
          this.currentSavedBehave.next(true);
        }
        // this.currentLikedBehave.next(
        //   postData.like_count.some(like => like.user_id == this.auth.userProfileData._id)
        // )
        // this.currentSavedBehave.next(
        //   postData.save_count.some(save => save.user_id == this.auth.userProfileData._id)
        // )
        this.getCurentLikeStatus.subscribe((status) => {
          this.currentLiked = status;
        })
        this.getCurentSaveStatus.subscribe((status) => {
          this.currentSaved = status;
        })
      })
    })
  }
  async commentSubmit(comment: any) {
    this.ngxLoader.show();
    // console.log(comment);
    // return;

    const data = {
      "content": comment,
      "user_fulllname": this.currentLoggedUserFullname
    };
    console.log(data);
    (await this.blogService.addComment(data, this.currentId)).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        const comment = data.comment;
        // if (this.currentPost && this.currentPost.comment && this.currentPost.comment.length > 0) {
        //   this.currentPost.comment = [];
        //   this.currentPost.comment.push(comment);
        // } else {
        this.currentPost.comment.unshift(comment);
        // }
        document.getElementById('currentComment').innerHTML = '';
      } else {
        alert('there is an error, please try again after some time')
      }
      // this.modalService.dismissAll();
    })
    this.ngxLoader.hide();
  }

  toggleLike(){
    this.getCurentLikeStatus.subscribe((status)=>{
      if(status){
        this.currentLikedBehave.next(false);
      } else {
        this.currentLikedBehave.next(true);
      }
    })
  }
  toggleSave(){
    this.getCurentSaveStatus.subscribe((status)=>{
      if(status){
        this.currentSavedBehave.next(false);
      } else {
        this.currentSavedBehave.next(true);
      }
    })
  }

  savePost() {
    this.toggleSave();
    const likeData = {
      "save": 1
    }
    this.http.put(`${this.apiUrl}api/save/${this.currentId}`, likeData).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.getCurrentPostData(this.currentId);
      }
    })
  }
  likePost() {
    this.toggleLike();
    if (this.auth.loginStatus) {
      const likeData = {
        "like": 1
      }
      this.http.put(`${this.apiUrl}api/like/${this.currentId}`, likeData).subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.getCurrentPostData(this.currentId);
        }
      })
    } else {
      this.globalService.toggle.next(true);
    }
  }
  saveRemove() {
    this.toggleSave();
    const likeData = {
      "save": 0
    }
    this.http.put(`${this.apiUrl}api/save/${this.currentId}`, likeData).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.getCurrentPostData(this.currentId);
      }
    })
  }
  likeRemove() {
    this.toggleLike();
    const likeData = {
      "like": 0
    }
    this.http.put(`${this.apiUrl}api/like/${this.currentId}`, likeData).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.getCurrentPostData(this.currentId);
      }
    })
  }

  openComments(modalId: any, commentId?: string) {
    // this.commentId = commentId;
    this.modalService.open(modalId, { centered: true, size: 'lg', backdrop: 'static' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openModal(content, modalSize?: string) {
    const size = modalSize ? modalSize : 'md'
    this.modalService.open(content, { centered: true, size: size })
  }

  ngOnInit(): void {
  }
  async getRecentBlogs() {
    console.log('related posts started');
    (await this.blogService.getHomePopularBlogs(10)).subscribe((data) => {
      console.log(data)
      this.recentPosts = data;
    })
  }
  // sharings
  facebookShare() {
    console.log('click facebook')
    window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href),
      'facebook-share-dialog');
    this.shareCount(this.currentId)
  }
  twitterShare() {
    console.log('click twitter')
    window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(location.href),
      'twitter-share-dialog');
    this.shareCount(this.currentId)
  }
  whatsAppShare() {
    console.log('click whatsapp')
    window.open('https://wa.me/?text=' + encodeURIComponent(location.href),
      'twitter-share-dialog');
    this.shareCount(this.currentId)
  }
  linkedinShare() {
    console.log('click linkedin')
    window.open('https://www.linkedin.com/shareArticle?url=' + encodeURIComponent(location.href),
      'twitter-share-dialog');
    this.shareCount(this.currentId)
  }
  copyLink() {
    console.log('click copy')
    const currenturl = encodeURIComponent(location.href);
    // document.execCommand('copy');
    navigator.clipboard.writeText(currenturl).then().catch(e => console.error(e));
    this.toastMessage = 'Successfully copied link ..';
    this.toastShow = true;
    this.modalService.dismissAll();
  }
  mailMe(title) {
    console.log('click mail')
    var mail = document.createElement("a");
    mail.href = "mailto:?subject=" + title + "&body=" + encodeURIComponent(location.href);
    mail.target = "_blank";
    mail.click();
    this.shareCount(this.currentId)
    this.modalService.dismissAll();
  }
  shareCount(blogId) {
    this.blogService.shareIncrease(blogId).subscribe((res: any) => {
      console.log(res)
      if (res.success) {
        if (this.currentPost.share_count) {
          this.currentPost.share_count += 1
        } else {
          this.currentPost.share_count = 1
        }
      }
    })
  }
  adOnclick(ad_id, blog_id) {
    console.log(ad_id, blog_id);
    this.adParams.advertisement_id = ad_id;
    this.adParams.blog_id = blog_id;
    const clickedAds = this.advertisements.filter(item => item._id == ad_id);
    console.log(clickedAds);
    const ad = clickedAds[0];
    this.http.post(`${this.apiUrl}api/advertisement/click`, this.adParams).subscribe((response: any) => {
      if (response.success == true) {
        var urlToSend = '';
        if (ad.advertisement_type) {
          // of blog true
          urlToSend = '/blog/';
          urlToSend += ad.blog;
          this.router.navigate([urlToSend]);
        } else {
          urlToSend = ad.url;
          this.goToUrl(urlToSend);
        }
      } else {
        location.reload();
      }
    })
  }
  goToUrl(url: string): void {
    this.document.location.href = url;
  }
}
