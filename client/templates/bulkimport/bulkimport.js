Template.bulkimport.helpers({
  message: "Test bulk uploader",
  description: "Testing uploads."
});

Template.bulkimport.onCreated( function() {
  this.subscribe('ProductImport');
});



function uploadHandler(event) {

  let shopId = ReactionCore.getShopId();
  let userId = Meteor.userId();
  let files = event.target.files.files;
  // Match each image file up to a product.
  // If a product is found, add appropriate metadata to image file
  // Performs a bulk insert instead of firing off one query at a time.
  var found = 0;
  var notFound = 0;
  for (var i = 0; i < files.length; i++) {
    var parts = files[i].name.split('.');
    var product;
    if (parts[0]) {
      console.log('part0 found');
      product = Products.findOne(
        { 'variants.sku': parts[0] },
        { variants: { $elemMatch: { 'sku': parts[0] } } }
      );
      console.log("product? " + product);
    }
    if (product) {
      let fileObj,
          variant_id;
      variant_id = product.variants[0]._id;
      fileObj = new FS.File(files[i]);
      fileObj.metadata = {
        ownerId: userId,
        productId: product._id,
        variantId: variant_id,
        shopId: shopId,
        priority: Number(parts[1]) || 0
      };
      ReactionCore.Collections.Media.insert(fileObj);
      console.log("Found " + fileObj.metadata.priority);
      found++;
      console.log(found + ":" + fileObj.metadata.variantId);
    } else {
      notFound++;
      console.log("Not Found " + parts[0]);
      console.log(notFound);
    }


  }
}

Template.bulkimport.events({
  'submit form#form-import-images': function(event) {
    event.preventDefault();
    uploadHandler(event);
  },

  'submit #product-upload-form': function(event) {
    event.preventDefault();
    console.log(event);
    Meteor.call("productUpload", function(error, response){
      if (error)
        console.log(error);
      else
        console.log(response);
    });
  },

  'submit #find-image-form': function(event) {
    event.preventDefault();
    console.log(event.target.variantId.value);
    let variantId = event.target.variantId.value;
    console.log(variantId);
    defaultImage = ReactionCore.Collections.Media.findOne({
        "metadata.variantId": variantId,
        "metadata.priority": 0
      });
    console.log(defaultImage);
      defaultImage2 = ReactionCore.Collections.Media.find({
        "metadata.variantId": variantId
      });
    console.log(defaultImage2);
  },

  'submit #clear-images-form': function(event) {
    event.preventDefault();
    console.log(event);
    Meteor.call("clearImages", function(error, response){
      if (error)
        console.log(error);
      else
        console.log(response);
    });
  },

  'submit #clear-all-form': function(event) {
    event.preventDefault();
    console.log(event);
    Meteor.call("clearAll", function(error, response){
      if (error)
        console.log(error);
      else
        console.log(response);
    });
  },

});
