UI.registerHelper( 'money', function( value ) {
    return accounting.formatMoney( value, { symbol: "INR" } );
});

UI.registerHelper( 'showdown', function( value ) {
    var converter = new showdown.Converter();
    var html = converter.makeHtml( value );

    return html;
});