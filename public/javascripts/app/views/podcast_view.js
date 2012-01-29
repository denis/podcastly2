var PodcastView = Backbone.View.extend({
    tagName: 'li',
    className: 'podcast',

    initialize: function () {
        this.model.bind('change', this.render, this);
    },

    render: function () {
        $(this.el).html(this.model.get('title') || this.model.get('url'));

        return this;
    },

    events: {
        'click': 'showEpisodes'
    },

    showEpisodes: function() {
        App.episodesView.collection.reset(this.model.get('episodes').models);

        // TODO: refactor me.
        // I think it's wrong. I should not rely on element classes from the other views.
        $(this.el).parent().find('.podcast').removeClass('selected').end().end().addClass('selected');
    }
});
