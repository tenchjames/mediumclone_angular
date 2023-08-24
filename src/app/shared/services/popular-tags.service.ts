import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PopularTagType } from '../types/popular-tag.type';
import { environment } from 'src/environments/environment';
import { PopularTagsResponse } from '../components/populartags/types/popular-tags-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags';
    return this.http
      .get<PopularTagsResponse>(url)
      .pipe(map((response) => response.tags));
  }
}
