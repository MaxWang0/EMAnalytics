# Meteor (Node.js) server with Web App

This project contains the central server that handles the TCP requests (from devices) and HTTP request (from mobile app and web app) with REST API architecture. This project also contains a client web app in AngularJs.

<!-- toc -->

* [Installation and setup](#installation-and-setup)
* [How to use](#how-to-use)
  * [Generating files](#generating-files)
  * [Removing default code](#removing-default-code)
  * [Available profiles (cofeescript and es6)](#available-profiles-cofeescript-and-es6)
  * [Deployments](#deployments)
  * [SEO and other concerns](#seo-and-other-concerns)
  * [Adding allow rules for external URLs](#adding-allow-rules-for-external-urls)
* [Structure](#structure)
  * [Packages used](#packages-used)
  * [Folder structure](#folder-structure)
* [Other Awesome Boilerplates](#other-awesome-boilerplates)
* [License](#license)

<!-- toc stop -->

The boilerplate looks like following: [boilerplate.meteor.com](http://boilerplate.meteor.com). Have a look at [starthacking](http://starthacking.meteor.com/) for a project created with this boilerplate.

## Installation and setup
### Install Meteor
```bash
curl https://install.meteor.com/ | sh
```

This will install the [Meteor framework](https://www.meteor.com). The current Metoer version used in this project is 1.2.1

## How to use
```sh
# Run Meteor server
cd nodejs-server
meteor

# View Database
meteor mongo

# View list of all commands supported by meteor
meteor help
```
For complete list of all Meteor commands and documentation, please visit this page: [http://docs.meteor.com/#/full/meteorupdate](http://docs.meteor.com/#/full/meteorupdate)

### Generating files

With orion-cli you can scaffold files based on your configuration that you've got.

```sh
orion generate routes
```

You can create models, views, change profiles and reset the project with the console tool (see below).


### Removing default code


### Available profiles (coffeescript and es6)

* default (Plain Vanilla Javascript)
* coffee (coffeescript, Unfancy JavaScript)
* es6 (traceur, Traceur is a JavaScript.next-to-JavaScript-of-today compiler)

You can change your profile like that
```sh
orion set-profile
```

There will be a prompt, where you can enter __coffee__ or any other profile that you have specified. Also use the ```reset``` command to start off with blank files according to your profile.

### Deployments

It is highly recommended to use [Meteor Up](https://github.com/arunoda/meteor-up) for easy deployments.
Have a look at the repository for more information.

### SEO and other concerns

> Meteor cannot do SEO

This statement is only partially true, since there is a package called [ms-seo](https://github.com/DerMambo/ms-seo), which
has a lot of neat little tricks to help web crawlers notice your app the way you want them to. This boilerplate also adds constants under
__client/lib/constants.js__ for the app. Change SEO settings inside the routes like that.

```javascript
Router.route('/about', function () {
  this.render('about');
  // Using the app constants
  SEO.set({ title: 'About -' + Meteor.App.NAME, og: {...} });
});
```

### Adding allow rules for external URLs

The [browser-policy](https://atmospherejs.com/meteor/browser-policy) adds rules to deny all operations from external URLs.
This helps dealing with clickjacking and other XSS methods used to attack the client. To whitelist a url, add following to
__server/config/security.js__

```javascript
BrowserPolicy.content.allowOriginForAll(YOUR_URL);
```

Other security enforcing packages like [audit-argument-checks](https://docs.meteor.com/#/full/auditargumentchecks) and
[matteodem:easy-security](https://github.com/matteodem/meteor-easy-security) have also been added.

## Structure

### Folder structure

``` sh
client/ 				# Client folder (AngularJS)
    css/                # CSS files
    fonts/              # Configuration files (on the client)
	lib/                # Library files that get executed first
    js/                 # Javascript files on Meteor.startup()
        controllers/    # AngularJS Controllers
        services/       # AngularJS Services
    partials/           # HTML View file
models/  				# Model files, for each Meteor.Collection(*)
private/                # Private files
public/                 # Public files
server/					# Server folder
    fixtures/           # Meteor.Collection fixtures defined
    lib/                # Server side library folder
    publications/       # Collection publications(*)
    startup/            # On server startup
    routes/             # All routes(*)
tests/                  # Test folders
```

### How Meteor loads the files?
* All files in __server__ folder will be loaded in the server only. This folder should contains all files that is accessible to the server but not accessible to the client.
* All files in __client__ folder will be loaded in the client only. This folder should contains all files for the front-end webpages.
* All files in other folders will be loaded by both client and server.
* Some more rules:
  * All files in the __lib__ folder will be loaded first (in both server and client).
  * Files in subdirectories are loaded before the parent directories.
  * Within a directory, files are loaded in alphabetical order by filename.
  * All files that match __main.*__ will be loaded last.

### Packages used (Meteor packages)

* Meteor Core
* meteor-platform
* Routing
* [iron:router](https://github.com/EventedMind/iron-router)
* [zimme:iron-router-active](https://github.com/zimme/meteor-iron-router-active)
* Collections
* [aldeed:collection2](https://github.com/aldeed/meteor-collection2)
* [dburles:collection-helpers](https://github.com/dburles/meteor-collection-helpers)
* Accounts
* [accounts-password](https://github.com/meteor/meteor/tree/devel/packages/accounts-password)
* [useraccounts:semantic-ui](https://github.com/meteor-useraccounts/semantic-ui)
* UI and UX
* [fastclick](https://github.com/meteor/meteor/tree/devel/packages/fastclick)
* [meteorhacks:fast-render](https://github.com/meteorhacks/fast-render)
* [natestrauser:animate-css](https://github.com/nate-strauser/meteor-animate-css/)
* [semantic:ui](https://github.com/Semantic-Org/Semantic-UI-Meteor/)
* Security
* [browser-policy](https://github.com/meteor/meteor/tree/devel/packages/browser-policy)
* [audit-argument-checks](https://github.com/meteor/meteor/tree/devel/packages/audit-argument-checks)
* [matteodem:easy-security](https://github.com/matteodem/meteor-easy-security)
* SEO
* [manuelschoebel:ms-seo](https://github.com/DerMambo/ms-seo)
* Development
* [less](https://github.com/meteor/meteor/tree/devel/packages/less)
* [jquery](https://github.com/meteor/meteor/tree/devel/packages/jquery)
* [underscore](https://github.com/meteor/meteor/tree/devel/packages/underscore)
* [raix:handlebar-helpers](https://github.com/raix/Meteor-handlebar-helpers)

## License
This boilerplate has an MIT License, see the LICENSE.txt for more information.
