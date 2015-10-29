# Bulk Import - Reaction Package

Bulk import images, tags and products. Still in development.

* package.js declares the [package](http://docs.meteor.com/#writingpackages) to the [Meteor](https://github.com/meteor/meteor) server.
* server/register.coffee declares the package to the [Reaction](https://github.com/ongoworks/reaction) system.
* common/routing.coffee declares url routing for the package using [iron-router](https://github.com/EventedMind/iron-router)
* index.html is the "hello world" html template.

Clone to reaction/packages 

	cd reaction/packages
	git clone https://github.com/reactioncommerce/reaction-bulkimport.git
	
Add development package to local meteor server:	

	cd reaction
	meteor add reactioncommerce:reaction-bulkimport
	
