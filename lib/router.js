Router.configure({
    layoutTemplate: "layoutShow",
    loadingTemplate: "loading",
    notFoundTemplate: "notFound"
});

Router.route( '/', {
    name: 'product'
});