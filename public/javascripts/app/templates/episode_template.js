var EpisodeTemplate = _.template(
    '<a href="<%= enclosureUrl %>"><%= title %></a> ' +
    '<small><%= published.format("MM/DD/YYYY") %></small>'
);
