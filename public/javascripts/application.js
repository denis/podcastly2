(function ($) {
    var Podcast = Backbone.Model.extend({
        url: function () {
            return 'http://jsonpify.heroku.com?resource=http://www.google.com/reader/api/0/stream/contents/feed/' + this.get('url') + '?n=5&callback=?'
        },

        parse: function (response) {
            return {
                title: response.title,
                episodes: new Episodes(response.items.map(function (item) {
                    return {
                        title: item.title,
                        published: moment(item.published * 1000)
                    };
                }))
            };
        }
    });

    var Podcasts = Backbone.Collection.extend({
        url: '/podcasts.json',
        model: Podcast,

        initialize: function () {
            this.bind('reset', function () {
                this.each(function (podcast) {
                    podcast.fetch();
                });
            });
        },
    });

    window.Episode = Backbone.Model.extend({
    });

    window.Episodes = Backbone.Collection.extend({
        model: Episode
    });

    var PodcastView = Backbone.View.extend({
        tagName: 'li',
        className: 'podcast',

        initialize: function () {
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
        },

        render: function () {
            var episodeListView = new EpisodeListView({ collection: this.model.get('episodes') || new Episodes() });

            $(this.el).html(this.model.get('title') || this.model.get('url'));
            $(this.el).append(episodeListView.render().el);

            return this;
        }
    });

    var PodcastListView = Backbone.View.extend({
        tagName: 'ul',
        id: 'podcasts',

        initialize: function () {
            _.bindAll(this, 'render');
            this.collection.bind('reset', this.render);
        },

        render: function () {
            $podcasts = $(this.el).html('');

            this.collection.each(function (podcast) {
                var view = new PodcastView({ model: podcast });
                $podcasts.append(view.render().el);
            });

            return this;
        }
    });

    var EpisodeView = Backbone.View.extend({
        tagName: 'li',
        className: 'episode',

        initialize: function () {
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
        },

        render: function () {
            $(this.el).html(this.model.get('title')).append(' <small>' + this.model.get('published').format("MM/DD/YYYY") + '</small>');

            return this;
        }
    });

    var EpisodeListView = Backbone.View.extend({
        tagName: 'ul',
        className: 'episodes',

        initialize: function () {
            _.bindAll(this, 'render');
            this.collection.bind('reset', this.render);
        },

        render: function () {
            $episodes = $(this.el).html('');

            this.collection.each(function (episode) {
                var view = new EpisodeView({ model: episode });
                $episodes.append(view.render().el);
            });

            return this;
        }
    });

    var Podcastly = Backbone.Router.extend({
        routes: {
            '': 'home'
        },

        initialize: function () {
            this.podcastListView = new PodcastListView({
                collection: window.podcasts
            });
        },

        home: function () {
            $('#container').empty().append(this.podcastListView.render().el);
        }
    });

    $(function () {
        window.podcasts = new Podcasts();
        window.App = new Podcastly();
        Backbone.history.start();
        window.podcasts.fetch();
    });
})(jQuery);
