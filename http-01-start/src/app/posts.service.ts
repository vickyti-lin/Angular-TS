import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';

import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content};
    this.http  // 下方posts 自定義名稱 .json是firebase傳送request需求必要的
    .post<{ name: string }>('https://ng-complete-guide-26216.firebaseio.com/posts.json',
    postData,
    {
      observe: 'response'
    }
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    }
    );
  }
  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty'); // 在searchParams 插入()內容
    searchParams = searchParams.append('custom', 'key');
    return this.http
    .get<Post>('https://ng-complete-guide-26216.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        // params: new HttpParams().set('print', 'pretty')
        params: searchParams,
        responseType: 'json'
      }
    )
    .pipe(
      map(responseData => {
        const postArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key});
            // console.log(key); // -M9Mj8GaixOtkPCa0SOi
          }
        }
        return postArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }
  deletePosts() {
    return this.http.delete('https://ng-complete-guide-26216.firebaseio.com/posts.json',
      {
        observe: 'events'
      }
    ).pipe(
      tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Sent) {
          console.log(event.type);
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      }
    ));
  }
}
