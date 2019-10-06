import api from 'api/dispatcher';
import {getSrcSet} from 'node_modules/ea-components/services/utils';
import Paginator from '../../../shared/services/paginator/paginator';

const LIFETIME = 3600 * 1000; // ms

export const state = () => ({
    scene: null,
    newestScenes: [],
    topRatedScenes: [],
    movies: [],
    movie: {},
    director: {},
    directors: [],
    directorScenes: [],
    performers: [],
    performer: {},
    performerScenes: [],
    tagList: {},
    historyScenes: [],
    historyMovies: [],
    favoriteScenes: [],
    favoriteMovies: [],
    favoritePerformers: [],
    playlist: {},
    purchaseProduct: null,
    cacheLastUpdated: {}
});

export const mutations = {
    SET_SCENE(store, data) {
        store.scene = data;
    },
    SET_NEWEST_SCENES(store, data) {
        store.newestScenes = data;
        store.cacheLastUpdated.newestScenes = new Date();
    },
    SET_TOP_RATED_SCENES(store, data) {
        store.topRatedScenes = data;
        store.cacheLastUpdated.topRatedScenes = new Date();
    },
    SET_MOVIES(store, data) {
        store.movies = data;
        store.cacheLastUpdated.movies = new Date();
    },
    SET_MOVIE(store, data) {
        store.movie = data;
    },
    SET_PERFORMERS(store, data) {
        store.performers = data;
        store.cacheLastUpdated.performers = new Date();
    },
    SET_DIRECTOR(store, data) {
        store.director = data;
    },
    SET_DIRECTORS(store, data) {
        store.directors = data;
        store.cacheLastUpdated.directors = new Date();
    },
    SET_DIRECTOR_SCENES(store, data) {
        store.directorScenes = data;
    },
    SET_PERFORMER(store, data) {
        store.performer = data;
    },
    SET_PERFORMER_SCENES(store, data) {
        store.performerScenes = data;
    },
    SET_TAG_LIST(store, data) {
        let tagList = {};

        data.forEach((tag) => {
            tagList[tag.id] = {
                id: tag.id,
                images: tag.images,
                name: tag.name,
                slug: tag.slug,
                scenes: [],
                relatedContentTags: tag.relatedContentTags,
            };
        });

        store.tagList = tagList;
    },
    SET_TAG_SCENES(store, data) {
        store.tagList[data.id].scenes = data.scenes;
    },
    SET_HISTORY_SCENES(store, data) {
        store.historyScenes = data;
    },
    SET_HISTORY_MOVIES(store, data) {
        store.historyMovies = data;
    },
    SET_FAVORITE_SCENES(store, data) {
        store.favoriteScenes = data;
    },
    SET_FAVORITE_MOVIES(store, data) {
        store.favoriteMovies = data;
    },
    SET_FAVORITE_PERFORMERS(store, data) {
        store.favoritePerformers = data;
    },
    SET_PLAYLIST(store, data) {
        store.playlist = data;
    },
    SET_PURCHASE_PRODUCT(store, data) {
        store.purchaseProduct = data;
    },
};

export const actions = {
    fetchNewestScenes({commit, state}) {
        const limit = 12;

        if (state.cacheLastUpdated.newestScenes && (new Date() - state.cacheLastUpdated.newestScenes) < LIFETIME) {
            return Promise.resolve();
        }

        return api.newestScenes(limit)
            .then(response => {
                commit('SET_NEWEST_SCENES', response.data.map(item => {
                    return prepareScene(item);
                }));
            });
    },
    fetchTopRatedScenes({commit, state}, limit) {
        if (state.cacheLastUpdated.topRatedScenes && (new Date() - state.cacheLastUpdated.topRatedScenes) < LIFETIME) {
            return Promise.resolve();
        }

        return api.topRatedScenes(limit)
            .then(response => {
                commit('SET_TOP_RATED_SCENES', response.data.map(scene => prepareScene(scene)));
            });
    },
    fetchScene({commit}, id) {
        return api.scene(id)
            .then(response => {
                const topTagsCount = 2;
                response.data.topTagIds = [];

                for (let i = 0; i < topTagsCount; i++) {
                    if (response.data.contentTags.length && response.data.contentTags[i]) {
                        response.data.topTagIds.push(response.data.contentTags[i].id);
                    }
                }

                commit('SET_SCENE', prepareScene(response.data));
            });
    },
    fetchMovies({commit, state}, limit) {
        if (state.cacheLastUpdated.movies && (new Date() - state.cacheLastUpdated.movies) < LIFETIME) {
            return Promise.resolve();
        }

        return api.movies(limit)
            .then(response => {
                commit('SET_MOVIES', response.data);
            });
    },
    fetchMovie({commit}, id) {
        return api.movie(id)
            .then(response => {
                commit('SET_MOVIE', response.data);
            });
    },
    fetchDirector({commit}, id) {
        return api.director(id)
            .then(response => {
                commit('SET_DIRECTOR', prepareDirector(response.data));
            });
    },
    fetchDirectors({commit, state}, params) {
        if (state.cacheLastUpdated.directors && (new Date() - state.cacheLastUpdated.directors) < LIFETIME) {
            return Promise.resolve();
        }

        return api.directors(params.limit, params.fields)
            .then(response => {
                commit('SET_DIRECTORS', response.data.map(directors => prepareDirector(directors)));
            });
    },
    fetchDirectorScenes({commit}, data) {
        return api.directorScenes(data.id, data.limit)
            .then(response => {
                commit('SET_DIRECTOR_SCENES', response.data.map(scene => prepareScene(scene)));
            });
    },
    fetchDirectorMovies({commit}, data) {
        return api.directorMovies(data)
            .then(response => {
                commit('SET_MOVIES', response.data);
            });
    },
    fetchPerformers({commit, state}, limit) {
        if (state.cacheLastUpdated.performers && (new Date() - state.cacheLastUpdated.performers) < LIFETIME) {
            return Promise.resolve();
        }

        return api.performers(limit)
            .then(response => {
                commit('SET_PERFORMERS', response.data.map(performer => preparePerformer(performer)));
            });
    },
    fetchPerformer({commit}, id) {
        return api.performer(id)
            .then(response => {
                commit('SET_PERFORMER', preparePerformer(response.data));
            });
    },
    fetchPerformerScenes({commit}, data) {
        return api.performerScenes(data.id, data.limit)
            .then(response => {
                commit('SET_PERFORMER_SCENES', response.data.map(scene => prepareScene(scene)));
            });
    },
    fetchPerformerMovies({commit}, data) {
        return api.performerMovies(data)
            .then(response => {
                commit('SET_MOVIES', response.data);
            });
    },
    fetchTagList({commit, state}) {
        if (state.tagList && Object.keys(state.tagList).length) {
            return Promise.resolve();
        }

        return api.tagList()
            .then(response => {
                commit('SET_TAG_LIST', response.data);
            });
    },
    fetchTagScenes({commit, state}, tag) {
        if (state.tagList[tag.id].scenes.length) {
            return Promise.resolve();
        }

        return api.tagScenes(tag.id, tag.limit)
            .then(response => {
                let data = {
                    id: tag.id,
                    scenes: response.data.map(scene => prepareScene(scene)),
                };
                commit('SET_TAG_SCENES', data);
            });
    },
    fetchHistoryScenes({commit}, data) {
        return api.historyScenes(data.id, data.limit)
            .then(response => {
                commit('SET_HISTORY_SCENES', response.data.map(item => {
                    return prepareScene(item);
                }));
            });
    },
    fetchHistoryMovies({commit}, data) {
        return api.historyMovies(data.id, data.limit)
            .then(response => {
                commit('SET_HISTORY_MOVIES', response.data);
            });
    },
    fetchFavoriteScenes({commit}, data) {
        return api.favoriteScenes(data.id, data.limit)
            .then(response => {
                commit('SET_FAVORITE_SCENES', response.data.map(item => {
                    return prepareScene(item);
                }));
            });
    },
    fetchFavoriteMovies({commit}, data) {
        return api.favoriteMovies(data.id, data.limit)
            .then(response => {
                commit('SET_FAVORITE_MOVIES', response.data);
            });
    },
    fetchFavoritePerformers({commit}, data) {
        return api.favoritePerformers(data.id, data.limit)
            .then(response => {
                commit('SET_FAVORITE_PERFORMERS', response.data.map(item => {
                    return preparePerformer(item);
                }));
            });
    },
    getPaginator({commit}, {url, page, perPage, entity}) {

        page = page ? Number(page) : 1;

        return api.paginate(url, page, perPage)
            .then(response => {
                response.data.map(item => {
                    if (entity === 'scene') {
                        return prepareScene(item);
                    } else if (entity === 'performer') {
                        return preparePerformer(item);
                    } else if (entity === 'director') {
                        return prepareDirector(item);
                    } else {
                        return item;
                    }
                });

                return new Paginator(response.data, response.headers['x-total-count'], page, perPage);
            });
    },
    fetchPlaylist({commit}, data) {
        return api.playlist(data.id, data.limit)
            .then(response => {
                commit('SET_PLAYLIST', response.data.map(scene => prepareScene(scene)));
            });
    },
    setPurchaseProduct({commit}, product) {
        commit('SET_PURCHASE_PRODUCT', product);

        return Promise.resolve();
    },
};


function prepareScene(scene) {
    scene.srcSet = getSrcSet(scene);

    return scene;
}


function preparePerformer(performer) {
    performer.srcSet = getSrcSet(performer);
    performer.contentType = 'Performer';

    return performer;
}


function prepareDirector(director) {
    director.srcSet = getSrcSet(director);
    director.contentType = 'Director';

    return director;
}

