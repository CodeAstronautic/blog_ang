import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/classes/post';
import { Supportblog } from 'src/app/classes/Supportblog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blogview',
  templateUrl: './blogview.component.html',
  styleUrls: ['./blogview.component.css']
})
export class BlogviewComponent implements OnInit {
  apiUrl = environment.apiUrl;
  currentId: any;
  currentPost!: Post;
  currentUrl = window.location;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((data: any) => {
      console.log(data);
      console.log(data.postid)
      this.currentId = data.postid
      this.getCurrentPostData(data.postid);
    })
  }

  ngOnInit(): void {
  }

  async getCurrentPostData(postid: string) {
    this.http.get<Supportblog[]>(`${this.apiUrl}api/admin/supported-blog/0/50`).subscribe((response: any) => {
      if (response.length > 0) {
        const findBlogsById = response.filter((post) => { return post._id == postid });
        if (findBlogsById.length > 0) {
          this.currentPost = findBlogsById[0].blog
          console.log(this.currentPost);
        } else {
          this.currentPost = null;
          this.currentId = null;
          this.router.navigate(['/support']);
        }
      } else {
        this.currentPost = null;
        this.currentId = null;
        this.router.navigate(['/support']);
      }
    });
  }

}
