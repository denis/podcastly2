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
