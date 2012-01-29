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
