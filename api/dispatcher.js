import axios from 'axios';

const CHANNEL_ID = 'evilangel';

export default {

    newestScenes(limit) {
        return axios.get(`/scenes?channelId=${CHANNEL_ID}&_fields=id,title,slug,performers(id,slug,name),directors(id,slug,name),liveDateStart,isInWatchLater,images,primaryImage&sort=newest&limit=${limit}`);
    },
    topRatedScenes(limit) {
        return axios.get(`/scenes?channelId=${CHANNEL_ID}&_fields=id,title,slug,performers(id,slug,name),directors(id,slug,name),liveDateStart,isInWatchLater,images,primaryImage&sort=top-rated&limit=${limit}`);
    },
    scene(id) {
        return axios.get(`/scenes/${id}?channelId=${CHANNEL_ID}&_fields=id,title,images,primaryImage,synopsis,metaTitle,metaDescription,performers(id,name,slug),directors(id,slug,name),upvotes,downvotes,liveDateStart,movies(id,title,slug),isInWatchLater,runtime,liveDateStart,contentTags,isBts,quality,picturesCount,btsScenes(id,slug,runtime),video,trailer,btsScenes,gallery,slug,btsScenes(id,title,slug,images,runtime)`);
    },

    movies(limit) {
        return axios.get(`/movies?channelId=${CHANNEL_ID}&_fields=id,title,slug&limit=${limit}`);
    },
    movie(id) {
        return axios.get(`/movies/${id}?channelId=${CHANNEL_ID}&_fields=id,title,upvotes,downvotes,performers(id,slug,name,images),directors(id,slug,name),slug,runtime,releaseDate,synopsis,commentCount`);
    },

    /**
     * History
     */
    historyScenes(id, limit) {
        return axios.get('/scenes?channelId=blackmailed&_fields=id,title,slug,performers(id,slug,name),directors(id,slug,name),liveDateStart,isInWatchLater,images,primaryImage&sort=newest&limit=' + limit);
    },
    historyMovies(id, limit) {
        return axios.get('/movies?channelId=blackmailed&_fields=id,title,slug&limit=' + limit);
    },

    /**
     * Favorite
     */
    favoriteScenes(id, limit) {
        return axios.get('/scenes?channelId=blackmailed&_fields=id,title,slug,performers(id,slug,name),directors(id,slug,name),liveDateStart,isInWatchLater,images,primaryImage&sort=newest&limit=' + limit);
    },
    favoriteMovies(id, limit) {
        return axios.get('/movies?channelId=blackmailed&_fields=id,title,slug&limit=' + limit);
    },
    favoritePerformers(id, limit) {
        return axios.get('/performers?channelId=blackmailed&_fields=id,name,images,upvotes,slug&sort=name,asc&limit=' + limit);
    },

    /**
     * Playlists
     */

    playlist(playlistId, limit) {

    },

    /**
     * Performers
     */

    performers(limit, query = '') {
        let url = `/performers?channelId=${CHANNEL_ID}&_fields=id,name,images,upvotes,slug&sort=name,asc&limit=${limit}`;

        if (query) {
            url += `&query=${query}`;
        }
        return axios.get(url);
    },

    performer(id, fields = 'id,name,upvotes,downvotes,images,bio,sceneCount,commentCount,contentTags') {
        return axios.get(`/performers/${id}?channelId=${CHANNEL_ID}&_fields=${fields}`);
    },

    performerScenes(id, limit) {
        let url = `/scenes?channelId=${CHANNEL_ID}&_fields=id,title,images,directors(id,slug,name),performers(id,slug,name),liveDateStart,slug&sort=newest&performerId=${id}`;
        if (limit) {
            url += `&limit=${limit}`;
        }

        return axios.get(url);
    },

    performerMovies(performerId) {
        return axios.get(`/movies?channelId=${CHANNEL_ID}&_fields=id,title,slug&performerId=${performerId}`);
    },

    /**
     * Users
     */
    getCurrentUser() {
        return axios.get('/users/current');
    },
    login(data) {
        return axios.post('/users/login', data);
    },
    signup(data) {
        return axios.post('/users', data);
    },
    forgotPassword(email) {
        return axios.post('/users/forgot-password', {email});
    },
    updateAccount(user, email, name) {
        return axios.put(`/users/${user.id}`, {email, name});
    },
    changePassword(user, data) {
        return axios.put(`/users/${user.id}/password`, data);
    },
    resetPassword(token, password) {
        return axios.post('/users/reset-password', {token, password});
    },
    confirmEmail(token) {
        return axios.post('users/confirm-email', {token});
    },

    /**
     * Directors
     */

    directors(limit, fields = 'id,name,upvotes,slug') {
        let url = `/directors?channelId=${CHANNEL_ID}&_fields=${fields}&sort=name,asc`;

        if (limit) {
            url += `&limit=${limit}`;
        }

        return axios.get(url);
    },

    director(id) {
        return axios.get(`/directors/${id}?channelId=${CHANNEL_ID}&_fields=id,name,slug,upvotes,downvotes,commentCount,contentTags,sceneCount`);
    },

    directorScenes(directorId, limit) {
        let url = `/scenes?channelId=${CHANNEL_ID}&_fields=id,title,images,rating,liveDateStart,isInWatchLater,slug,primaryImage&sort=newest&limit=6&directorId=${directorId}`;

        if (limit) {
            url += `&limit=${limit}`;
        }

        return axios.get(url);
    },

    directorMovies(directorId) {
        return axios.get(`/movies?channelId=${CHANNEL_ID}&_fields=id,title,slug&directorId=${directorId}`);
    },

    /**
     * Comments
     */
    getComments(contentType, contentId, limit) {
        return axios.get(getCommentUrl(contentType, contentId, `?_fields=createdAt,user,comment,id,childComments(id,comment,user,createdAt)&limit=${limit}`));
    },
    addComment(contentType, contentId, commentData) {
        return axios.post(getCommentUrl(contentType, contentId, '?_fields=createdAt,user,comment,id,childComments(id,comment,user,createdAt,parentCommentId)'), commentData);
    },
    deleteComment(commentId) {
        return axios.delete(`/comments/${commentId}`);
    },

    /**
     * Tags
     */
    tagList() {
        return axios.get(`/content-tags?channelId=${CHANNEL_ID}&_fields=id,name,images,slug,relatedContentTags&limit=200`);
    },
    tagScenes(tagId, limit) {
        return axios.get(`/scenes?channelId=${CHANNEL_ID}&_fields=id,title,slug,images,performers(id,slug,name),rating,isInWatchLater,liveDateStart,primaryImage&sort=newest&contentTagId=${tagId}&limit=${limit}`);
    },

    /**
     * Membership
     */
    redeemPurchaseToken(contentType, contentId) {
        return axios.post('/membership/purchase-tokens/redeem', {contentType, contentId});
    },
    getProducts(withFree = false) {
        let url = '/membership/products';
        if (withFree) {
            url += '?withFreeAccess=true';
        }

        return axios.get(url);
    },
    getPurchaseFormUrl(productId) {
        return axios.get(`/membership/purchase-form?productId=${productId}`);
    },

    /**
     * Ratings
     */
    getMyVote(contentType, contentId) {
        return axios.get(getMyRatingUrl(contentType, contentId));
    },
    vote(contentType, contentId, vote) {
        return axios.post(getMyRatingUrl(contentType, contentId), {vote: vote});
    },

    /**
     * Misc
     */
    paginate(url, page, perPage) {
        page = page ? Number(page) : 1;
        const offset = (page - 1) * perPage;
        url += `&limit=${perPage}&offset=${offset}`;

        return axios.get(url);
    },
};



function getCommentUrl(contentType, contentId, parameters) {
    const resource = contentType === 'Scene' ? 'scenes' : 'performers';

    return `/${resource}/${contentId}/comments${parameters}`;
}

function getMyRatingUrl(contentType, contentId) {
    const resource = contentType === 'Scene' ? 'scenes' : 'performers';

    return `/${resource}/${contentId}/my-rating`;
}

