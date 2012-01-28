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
