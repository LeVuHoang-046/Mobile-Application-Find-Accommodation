export const routes = {
    user: {
        me: '/auth/user/me',
        role: '/auth/users/role',
    },
    api: {
        boardinghouse: '/api/boarding-house',
        boardingHouse : {
            infor: '/api/boarding-house/info',
            rooms: '/api/boarding-house/rooms',
            facilities: (roomId?: number) => `/api/boarding-house/rooms/${roomId}/facilities`,
            interiors: (roomId?: number) => `/api/boarding-house/rooms/${roomId}/interiors`,
            images: (roomId?: number) => `api/boarding-house/rooms/${roomId}/images`
        },
        filter:{
            facilities: '/api/filter/facilities',
            interiors: '/api/filter/interiors',
            cities: '/api/filter/cities',
            districts: (cities?: number) => `/api/filter/districts/${cities}`,
            wards: (districts?: number) => `/api/filter/wards/${districts}`,
        },
        bookings: '/api/bookings',
      
    }
}