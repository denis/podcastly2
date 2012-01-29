var PodcastView = Backbone.View.extend({
    tagName: 'li',
    className: 'podcast',
    events: {
        'click': 'select'
    },

    initialize: function () {
        this.model.bind('change', this.render, this);
    },

    render: function () {
        $(this.el).html(this.model.get('title') || this.model.get('url'));

        return this;
    },

    select: function() {
        // Don't allow to select not loaded podcast
        if (this.model.get('episodes')) {
            App.episodesView.collection.reset(this.model.get('episodes').models);
            this.collection.trigger('select', this.model);
        }
    }
});
