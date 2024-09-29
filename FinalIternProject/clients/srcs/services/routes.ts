export const routes = {
    user: {
        me: '/auth/user/me'
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
        }
      
    }
}