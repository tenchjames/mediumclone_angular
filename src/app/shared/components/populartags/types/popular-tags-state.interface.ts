import { PopularTagType } from 'src/app/shared/types/popular-tag.type';

export interface PopularTagsStateInterface {
  isLoading: boolean;
  error: string | null;
  data: PopularTagType[] | null;
}
