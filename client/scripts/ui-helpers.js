UI.registerHelper( 'money', function( value ) {
    return accounting.formatMoney( value, { symbol: "INR" } );
});