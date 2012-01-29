(function ($) {
    var Podcastly = Backbone.Router.extend({
        routes: {
            '': 'home'
        },

        initialize: function () {
            this.podcastListView = new PodcastListView({
                collection: window.podcasts
            }),

            this.episodeListView = new EpisodeListView({
                collection: new Episodes()
            });
        },

        home: function () {
            $('#container').empty()
                .append(this.podcastListView.render().el)
                .append(this.episodeListView.render().el);
        }
    });

    $(function () {
        window.podcasts = new Podcasts();
        window.App = new Podcastly();
        Backbone.history.start();
        window.podcasts.fetch();
    });
})(jQuery);
