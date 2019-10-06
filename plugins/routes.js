import Vue from 'vue';

export default ({app}) => {
    const localePath = path => {
        return `/${app.store.state.i18n.locale}${path}`;
    };

    const routes = {
        home() {
            return localePath('/');
        },
        movies() {
            return localePath('/movies');
        },
        movie(movie) {
            return localePath(`/movies/${movie.id}/${movie.slug}`);
        },
        scenes() {
            return localePath('/videos');
        },
        scene(scene) {
            return localePath(`/videos/${scene.id}/${scene.slug}`);
        },
        directors() {
            return localePath('/directors');
        },
        director(director) {
            return localePath(`/directors/${director.id}/${director.slug}`);
        },
        performers() {
            return localePath('/pornstars');
        },
        performer(performer) {
            return localePath(`/pornstars/${performer.id}/${performer.slug}`);
        },
        episodesByTag(tagId) {
            return localePath(`/browse?includedTagIds=${tagId}`);
        },
        tags() {
            return localePath('/categories');
        },
        login() {
            return localePath('/login');
        },
        signup() {
            return localePath('/signup');
        },
        forgotPassword() {
            return localePath('/forgot-password');
        },
        about() {
            return localePath('/about');
        },
        privacy() {
            return localePath('/privacy');
        },
        compliance() {
            return localePath('/compliance');
        },
        terms() {
            return localePath('/terms');
        },
        support() {
            return localePath('/support');
        },
        mobileSearch() {
            return localePath('/mobile-search');
        },
        purchase() {
            return localePath('/purchase');
        },
        browse() {
            return localePath('/browse');
        },
        settings() {
            return localePath('/settings');
        },
        faq() {
            return localePath('/support/faq');
        },
        contact() {
            return localePath('/support/contact');
        },
        billing() {
            return localePath('/support/billing');
        },
        sitemap() {
            return localePath('/support/sitemap');
        },
        history(contentType) {
            return localePath(`/history/${contentType}`);
        },
        favorites(contentType) {
            return localePath(`/favorites/${contentType}`);
        },
        playlists() {
            return localePath('/playlists');
        },
        playlist(id) {
            return localePath(`/playlists/${id}`);
        },
        purchases() {
            return localePath('/purchases');
        },
    };

    Vue.prototype.$routes = routes;
}
