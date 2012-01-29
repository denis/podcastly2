(function ($) {
    var Podcastly = Backbone.Router.extend({
        routes: {
            '': 'home'
        },

        initialize: function () {
            this.podcastsView = new PodcastsView({
                collection: window.podcasts
            }),

            this.episodesView = new EpisodesView({
                collection: new Episodes()
            });
        },

        home: function () {
            $('#container').empty()
                .append(this.podcastsView.render().el)
                .append(this.episodesView.render().el);
        }
    });

    $(function () {
        window.podcasts = new Podcasts();
        window.App = new Podcastly();
        Backbone.history.start();
        window.podcasts.fetch();
    });
})(jQuery);
