Meteor.methods({

/*
 productUpload needs to do the following:
    1) Receive a file from the client.
    2) Store that file in some folder
        a) optionally store it in a collection.
    3) Assets.getText the file
    4) Probably some validation and cleaning with Schema
    5) Load each product in the file in the database.
*/
  productUpload: function() {
    let json = EJSON.parse(Assets.getText("private/data/products.json"));
    for (let item of json) {
      item._id = Random.id();
      let tempHashtags = [];
      for(let hashtag of item.hashtags) {
        tempHashtags.push(createTag(hashtag));
      }
      item.hashtags = [];
      for(let hashtag in tempHashtags) {
        item.hashtags.push(tempHashtags.pop());
      }
      for(let variant of item.variants) {
        variant._id = Random.id();
        item.hashtags.push(createTag(variant.sku));
      }
      ReactionCore.Collections.Products.insert(item);
    }
  },

  /*
  createTag: make a tag for a specific product.
      1) receive a product.variant
      2) use either the sku, barcode, or _id.
          a) Try sku if exist, then barcode, else _id
          a) all these should be unique values.
      3) return tag._id
  */
  tagUpload: function(value) {
    return createTag(value);
  },

  clearImages: function() {
    ReactionCore.Collections.Media.remove({});
  },

  clearAll: function() {
    ReactionCore.Collections.Media.remove({});
    ReactionCore.Collections.Products.remove({});
    ReactionCore.Collections.Tags.remove({});
  }


});

function createTag(value) {
    let tag;
    slug = value.toLowerCase().split(' ').join('-');
    tag = ReactionCore.Collections.Tags.findOne({slug : slug});
    if(!tag) {
      if (value == "Val-Pak") {
        tag = {
          "slug": slug,
          "name": value,
          "isTopLevel": true,
          "_id": Random.id(),
          "createdAt": new Date(),
          "updatedAt": new Date()
        }
      } else {
        tag = {
          "slug": slug,
          "name": value,
          "isTopLevel": false,
          "_id": Random.id(),
          "createdAt": new Date(),
          "updatedAt": new Date()
        }
      }
      ReactionCore.Collections.Tags.insert(tag);
    }
    return tag._id;

}




