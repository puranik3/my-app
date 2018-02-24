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

Router.route( '/products/:sku', {
    name: 'productDetails',
    data: function() {
        var productSku = this.params.sku;
        return Products.findOne( { sku: productSku } );
    }
});
