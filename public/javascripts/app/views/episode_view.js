var EpisodeView = Backbone.View.extend({
    tagName: 'li',
    className: 'episode',
    template: EpisodeTemplate,

    initialize: function () {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));

        return this;
    }
});
