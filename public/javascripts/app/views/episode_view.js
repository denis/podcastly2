var EpisodeView = Backbone.View.extend({
    tagName: 'li',
    className: 'episode',
    template: EpisodeTemplate,

    initialize: function () {
        this.model.bind('change', this.render, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));

        return this;
    }
});
