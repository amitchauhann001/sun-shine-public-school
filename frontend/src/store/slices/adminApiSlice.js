import { apiSlice } from './apiSlice';

/* 
  This slice handles all the POST/PUT/DELETE requests for the admin panel.
  Since we are using RTK Query, providing/invalidating tags ensures the 
  UI automatically reflects updates without manual state management.
*/

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ANNOUNCEMENTS
    getAdminAnnouncements: builder.query({
      query: () => '/api/announcements/admin',
      providesTags: ['Announcement'],
    }),
    createAnnouncement: builder.mutation({
      query: (data) => ({
        url: '/api/announcements',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Announcement'],
    }),
    deleteAnnouncement: builder.mutation({
      query: (id) => ({
        url: `/api/announcements/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Announcement'],
    }),
    // CAROUSEL
    getAdminCarousels: builder.query({
      query: () => '/api/carousel/admin',
      providesTags: ['Carousel'],
    }),
    createCarousel: builder.mutation({
      query: (data) => ({
        url: '/api/carousel',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Carousel'],
    }),
    deleteCarousel: builder.mutation({
      query: (id) => ({
        url: `/api/carousel/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Carousel'],
    }),

    // ACHIEVEMENTS
    createAchievement: builder.mutation({
      query: (data) => ({
        url: '/api/achievements',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Achievement'],
    }),
    deleteAchievement: builder.mutation({
      query: (id) => ({
        url: `/api/achievements/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Achievement'],
    }),
  }),
});

export const {
  useGetAdminAnnouncementsQuery,
  useCreateAnnouncementMutation,
  useDeleteAnnouncementMutation,
  useGetAdminCarouselsQuery,
  useCreateCarouselMutation,
  useDeleteCarouselMutation,
  useCreateAchievementMutation,
  useDeleteAchievementMutation,
} = adminApiSlice;
