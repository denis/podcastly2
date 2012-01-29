var EpisodesView = Backbone.View.extend({
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
