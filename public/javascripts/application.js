(function ($) {
    var Podcast = Backbone.Model.extend({
        url: function () {
            return 'http://jsonpify.heroku.com?resource=http://www.google.com/reader/api/0/stream/contents/feed/' + this.get('url') + '?n=5&callback=?'
        },

        parse: function (response) {
            return {
                title: response.title
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
        }
    });

    var PodcastsView = Backbone.View.extend({
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

    var Podcastly = Backbone.Router.extend({
        routes: {
            '': 'home'
        },

        initialize: function () {
            this.podcastsView = new PodcastsView({
                collection: window.podcasts
            });
        },

        home: function () {
            $('#container').empty().append(this.podcastsView.render().el);
        }
    });

    $(function () {
        window.podcasts = new Podcasts();
        window.App = new Podcastly();
        Backbone.history.start();
        window.podcasts.fetch();
    });
})(jQuery);
