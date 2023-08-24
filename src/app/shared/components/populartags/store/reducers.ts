import { createFeature, createReducer, on } from '@ngrx/store';
import { PopularTagsStateInterface } from '../types/popular-tags-state.interface';
import { popularTagActions } from './actions';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const popularTagFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initialState,
    on(popularTagActions.getPopularTags, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(popularTagActions.getPopularTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.popularTags,
    })),
    on(popularTagActions.getPopularTagsFailure, (state) => ({
      ...state,
      isLoading: false,
    }))
  ),
});

export const {
  name: popularTagsFeatureKey,
  reducer: popularTagReducer,
  selectIsLoading,
  selectError,
  selectData: setlectPopularsTagsData,
} = popularTagFeature;
