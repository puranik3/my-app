Template.homeIndex.helpers({
    featuredProducts: function() {
        var featuredProductSkus = [
            'illudium-q36',
            'johnny-liftoff',
            'moon-races'
        ];
        
        // return products.filter(function( product ) {
        //     return featuredProductSkus.indexOf( product.sku ) !== -1;
        // });

        return Products.find(
            {
                sku: {
                    $in: featuredProductSkus
                }
            },
            {
                fields : {
                    inventory: false,
                    cost: false
                }
            }
        );
    }
});