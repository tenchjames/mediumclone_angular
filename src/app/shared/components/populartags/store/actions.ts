import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PopularTagType } from 'src/app/shared/types/popular-tag.type';

export const popularTagActions = createActionGroup({
  source: 'Popular Tags',
  events: {
    'Get popular tags': emptyProps(),
    'Get popular tags success': props<{ popularTags: PopularTagType[] }>(),
    'Get popular tags failure': emptyProps(),
  },
});
