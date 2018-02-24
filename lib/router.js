Router.configure({
    layoutTemplate: "layoutShow",
    loadingTemplate: "loading",
    notFoundTemplate: "notFound"
});

Router.route( '/', {
    name: 'homeIndex',
    data: function() {
        return {
            title: 'Product Catalog'
        };
    }
});

Router.route( '/about', {
    name: 'about',
    data: {
        title: 'About'
    }
});

Router.route( '/contact', {
    name: 'contact',
    data: {
        title: 'Contact'
    }
});