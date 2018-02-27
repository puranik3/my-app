# Meteor

## Introduction
- Server-side
- Client-side - SPA
- JS everywhere
- Communication: DDP over web sockets
- Data everywhere
    - Mini Mongo on DB
    - Latency Compensation
        - Data available on client
        - Changes are first made on client-side.
        - Then DDP synchronizes client and server DB
        - Then server publishes data to all subscribed clients
- Reactive
    - Changes are visible in real-time
    - Example: Updates in GMail as mail arrives, similarly Facebook and Twitter pages update themselves
- Atmosphere - packages repository
- Only Mongo DB supported out-of-the-box

## Agenda 1: Prototyping
- Generating the site, initial format
- Routing
- Adding a homepage and working with data
- Creating a product page

__Task List__
1. Installing Meteor, creatng and structuring the project, and the meteor CLI
    1. Create the default project, and run it
    2. Understand the project structure
    3. Remove the default files in client/ folder and create a set of new folders - public/ and lib/
    4. Create settings.json and settings.development.json

__Aside__:
/lib: access everywhere (client/server)
/server: only server
/client: only client
    /templates
    /stylesheets
    /scripts
    /compatibility (this is used for third-party scripts, expecially those that create a global variable - putting such scripts inside scripts/ folder will not make the script available)
    /app: layout files
/public: images and other assets - CSS files are handled by Meteor separately

__Note__:
    1. What code you put where is important
    2. Name of the file is important as it decides load order - example, anything with lib is executed first, followed by server, followed by client. Inside those directories, files are loaded in alphabetical order (when full path is considered).
    3. Create a file layout.html, copy the Bootstrap starter template into it, and run Meteor - it throws an error. Remove the doctype and html tags and try again - it will work. Check the page source rendered in the browser - it includes the complete HTML and many script includes.

2. Adding Bootstrap
Add the package twbs:bootstrap (meteor add twbs:bootstrap) and add a title tag with title within head tag. Note from page source in browser that every tag within head is there but the content of the body is removed (it is added back via JS).

Add CSS within stylesheets/app.css
body {
    margin-top: 50px;
}
.starter-template {
    padding: 40px 15px;
    text-align: center;
}
Note that the CSS gets applied automatically

3. Move the app/ folder to within templates/app. It should not make a difference. Also create a _partials/ folder right within templates

Move the nav code using to a _partials/nav.html page. Include it.

4. Adding routing
Add iron router (meteor add iron:router). Then add lib/router.js. Setup routing like below.
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
})
and then wrap the layout.html file in a <template name="layout"></template>

We will get nested head and body tags within the body. Since layout has become a template, we now need to remove the head and body in it. Remove it. The title goes off - add it back by creating a templates/main.html and having a head tag with title within.

5. Adding 404 page
Add an app/404.html and app/404.css pages. You can use https://bootsnipp.com/snippets/featured/simple-404-not-found-page.

6. Adding loading page
Add an app/loading.html. You could use Bootsnipp but we shall instead use pcel:loading meteor package. Add a app/loading.js with template lifecycle methods, and also the template CSS within app.css (or separate file, say stylesheets/loading.css)

7. Adding routing outlet and associating data with template
Now add {{ > yield }} within the layout.html container, a templates/home/index.html with template with name 'homeIndex' - add a simple <h1>{{message}}</h1>. Add the following code to router.js
Router.route( '/', {
    name: 'homeIndex',
    data: function() {
        return {
            message: 'Welcome to Rocket Shop'
        };
    }
});
Note: The {{ > yield }} is like a router-outlet in Angular

8. Adding about and contact pages and updating the navbar
Add /about, /contact routes that load 'homeAbout' and 'homeContact' templates. Add the templates within templates/home too. Update the nav to contain href={{pathFor 'homeIndex'}} etc. Also update the project name in the navbar

9. Injecting content into head tag
We can have multiple templates with head tag - the head tag contents are concatenated. Adding meta tag - add a client/meta.html with meta tags (say charset="utf-8" and name="description" content="The Rocket shop app...")

10. Creating home page
Create a home page using supplied files homepage.html and homepage.css, product-tile.css. Also fix layout.html by removing .container

11. Fetching products from data source (in-memory)
Add products and user data into a lib/collections folder (so that it is accessible in both front and back end). On the products collection file itself define a featured function that selected any 3 featured products. Add an templates/app/home/index.js. In this we define Template.homeIndex.helpers({}) and set a featured property in object passed - it will be a function that returns Products.featured(). Finally we loop through products using {{ #each featured }} {{ /each }}

12. Adding third-party scripts
Add the third-party scripts to the compatibility/ folder.

13. Creating UI helpers (aka filter in Angular)
Register a UI helper in client/templates/main.js to format money  using
UI.registerHelper( 'name_of_helper', function( value ) {
    return accounting.formatMoney( value );
});

14. Passing data from parent page to partials
Move the product tile markup to _partials/product_tile.html (naming it productTile) and include it in the home page (index.html). Pass the context using 'this'

16. Adding a product detail page
Add a product detail page route. Set the data for it.
Router.route( '/products/:sku', {
    name: 'productsShow',
    data: function() {
        return Products.findOne({
            sku: this.params.sku
        });
    }
});

Add findOne method to Products collection.
Products.findOne = function( args ) {
    let sku = args.sku;
    return _.find( Products, function( product ) {
        return product.sku === sku; 
    });
};

Add templates/products/show.html and cope markup of detail page to it. Bind data to it.

Set the product details page link in home page.

17. Adding a Mardown helper and use of unescaped HTML contet using {{{}}}
Add showdown script to compatibility/. Add helper
UI.registerHelper( 'markdown', function( value ) {
    let converter = new showdown.Converter();
    return converter.makeHtml( value );
});
When binding use {{{}}} (interprets tags)

18. Setting up authentication
Add the folllowing packages
- ian:accounts-ui-bootstrap-3
- accounts-password

Also install native bcrypt module for efficiency
meteor npm install --save bcrypt

- Connecting to Mongo DB via RoboMongo (Robo3T)

Configure accounts to take a username too. In client/config/accounts.js write
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

OAuth authentcation (third-party identity providers)
Add these packages
- accounts-github
- accounts-google

For help in configuring these providers for OAuth install
- google-config-ui
- github-config-ui

Follow the steps in the UI to configure GitHub and Google as OAuth providers

19. Authorization
In console, type
Meteor.user() - the current user
Meteor.users - a Mongo collection
Meteor.users.find().fetch() - read the records in the Mongo collection
Try doing a DB query
Meteor.users.update(
    {
        _id: "...",
    },
    {
        $set: {
            'profile.name': 'New profile name'
        }
    }
);
However the roles property is locked-down by Meteor. This query will run in the backend BUT NOT front end.
Meteor.users.update(
    {
        _id: "...",
    },
    {
        $set: {
            roles: 'Administrator'
        }
    }
);
Add package
- alanning:roles

Add a nav item Admin inside {{ #if isInRole 'Administrator' }} {{ /if }} block

20. Adding a Products collection
In lib/collection/products.js
```
Products = new Mongo.Collection( 'Products' );

Products.featured = function() {
    var featuredSkus = [
        'illudium-q36',
        'johnny-liftoff',
        'mars-mobile'
    ];
    return Products.find({
        sku: {
            $in: featuredSkus
        }
    });
    
};
```

In server/seed.js
Define product seed data array. Upload it after checking if there are no products.
```
if( Products.find().count() === 0 ) {
    _.forEach(productsSeed, function( product ) {
        Products.insert( product );
        console.log( product.name + ' inserted into the database' );
    });
}
```

21. Restricting fields in result of find() - do this for featured products
Pass 2nd argument - { 
    "fields" : {
        "inventory": false,
        "cost": false
    }
}
- This restricts on fetch
- But anyone can update by id from console
    - Products.update(
        "B5WhrBGdeXgvWenk6",
        {
            $set: {
                price: 0
            }
        }
    )

22. Allow all CRUD operations on Products for Admin - rest can only fetch
- .allow() and .deny() of collection restrict access to collection methods based on conditions
- Create isAdmin method in lib/permissions.js. This uses the current user (Meteor.user()) along with Roles.isUserInRole( user, array_of_roles ) to test admin
- Seed user data after checking if no Meteor.users exist
    var id = Accounts.createUser({
        username:
        email:
        password:
        profile: {
            name: 'Big Admin'
        },
        roles: []
    })
    Roles.addUsersToRoles( id, [ 'Administrator' ] )
- Products.allow({
    update: function( userid, product ) {
        return isAdmin();
    },
    insert: - ditto -,
    remove: - ditto -
})

Now only admin can execute this...
Products.update( "B5WhrBGdeXgvWenk6", { $set: { price: 2321}} );

23. We can remove DB writes or all collections (except those explicity allowed) by removing insecure
```meteor remove insecure```
Again only admin can execute this...
Products.update( "B5WhrBGdeXgvWenk6", { $set: { price: 2321}} );

24. Adding Vendors

25. Adding Namespace code to every file

26. Add a Carts collections. Define a function Carts.getCart( userKey ). This checks if user has a cart and returns. Else, it creates a new cart and returns it
```
{
    userKey: userKey,
    created_at: new Date,
    notes: [],
    items: [],
    itemCount: 0,
    total: 0
};
```
Next add lib/shopping_cart.js
