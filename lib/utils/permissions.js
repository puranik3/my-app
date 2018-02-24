isAdmin = function() {
    return Roles.userIsInRole( Meteor.userId(), 'admin' );
};