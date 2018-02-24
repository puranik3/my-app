// disallow everyone except admin from performing DB updates for products
Products.allow({
    insert: function( user, product ) {
        return isAdmin();
    },
    update: function( user, product ) {
        return isAdmin();
    },
    remove: function( user, product ) {
        return isAdmin();
    }
});