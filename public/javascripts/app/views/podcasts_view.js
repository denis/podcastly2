var PodcastsView = Backbone.View.extend({
    tagName: 'ul',
    id: 'podcasts',

    initialize: function () {
        this.collection.bind('reset', this.render, this);
        this.collection.bind('select', this.selectPodcast, this);
    },

    render: function () {
        var $podcasts = this.$el.html('');
        var collection = this.collection;

        this.collection.each(function (podcast) {
            var view = new PodcastView({
                model: podcast,
                collection: collection
            });

            $podcasts.append(view.render().el);
        });

        return this;
    },

    selectPodcast: function (podcast) {
        var currentPodcastIndex = this.collection.indexOf(podcast);

        this.$('.podcast').each(function (index, el) {
            $(el).toggleClass('current', index == currentPodcastIndex);
        });
    }
});
