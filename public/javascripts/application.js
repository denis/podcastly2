(function ($) {
    var Podcast = Backbone.Model.extend({
        url: function () {
            return 'http://jsonpify.heroku.com?resource=http://www.google.com/reader/api/0/stream/contents/feed/' + this.get('url') + '?n=10&callback=?'
        },

        parse: function (response) {
            return {
                title: response.title,
                episodes: new Episodes(_(response.items).reject(function (item) {
                    return !item.enclosure;
                }).map(function (item) {
                    return {
                        title: item.title,
                        published: moment(item.published * 1000),
                        enclosureUrl: item.enclosure[0].href
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
            $(this.el).html(this.model.get('title') || this.model.get('url'));

            return this;
        },

        events: {
            'click': 'showEpisodes'
        },

        showEpisodes: function() {
            App.episodeListView.collection.reset(this.model.get('episodes').models);

            // TODO: refactor me.
            // I think it's wrong. I should not rely on element classes from the other views.
            $(this.el).parent().find('.podcast').removeClass('selected').end().end().addClass('selected');
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
            this.template = _.template($('#episode-template').html());
        },

        render: function () {
            var renderedContent = this.template(this.model.toJSON());
            $(this.el).html(renderedContent);

            return this;
        }
    });

    var EpisodeListView = Backbone.View.extend({
        tagName: 'ul',
        id: 'episodes',

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

            $episodes.show();

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
