import { apiSlice } from './apiSlice';

export const publicApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSharedAnnouncements: builder.query({
      query: () => '/api/announcements',
      providesTags: ['Announcement'],
    }),
    getSharedCarousels: builder.query({
      query: () => '/api/carousel',
      providesTags: ['Carousel'],
    }),
    getSharedAchievements: builder.query({
      query: () => '/api/achievements',
      providesTags: ['Achievement'],
    }),
  }),
});

export const {
  useGetSharedAnnouncementsQuery,
  useGetSharedCarouselsQuery,
  useGetSharedAchievementsQuery,
} = publicApiSlice;
