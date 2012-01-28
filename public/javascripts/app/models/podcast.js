var Podcast = Backbone.Model.extend({
    url: function () {
        return 'http://jsonpify.heroku.com?resource=http://www.google.com/reader/api/0/stream/contents/feed/' +
               this.get('url') + '?n=10&callback=?'
    },

    parse: function (response) {
        return {
            title: response.title,
            episodes: new Episodes(_(response.items).reject(function (item) {
                return !item.enclosure;
            }).map(function (item) {
                return {
                    title: item.title,
                    published: moment(item.published * 1000),
                    enclosureUrl: item.enclosure[0].href
                };
            }))
        };
    }
});
