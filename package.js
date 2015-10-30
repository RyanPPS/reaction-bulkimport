Package.describe({
  summary: "Reaction Bulk Import - Bulk import image files and run import scripts.",
  name: "reaction-bulkimport",
  version: "0.0.1",
  git: "https://github.com/RyanPPS/reaction-bulkimport.git"
});

Package.on_use(function (api) {
  api.versionsFrom("METEOR@1.2");

  // meteor base packages
  api.use("standard-minifiers");
  api.use("mobile-experience");
  api.use("meteor-base");
  api.use("mongo");
  api.use("blaze-html-templates");
  api.use("session");
  api.use("jquery");
  api.use("tracker");
  api.use("logging");
  api.use("reload");
  api.use("random");
  api.use("ejson");
  api.use("spacebars");
  api.use("check");
  api.use("ecmascript");
  api.use("less");

  api.use("cfs:standard-packages@0.5.9");
  api.use("cfs:storage-adapter@0.2.2");
  api.use("cfs:graphicsmagick@0.0.18");
  api.use("cfs:gridfs@0.0.33");
  api.use("cfs:filesystem@0.1.2");
  api.use("cfs:ui@0.1.3");
  //api.use("raix:ui-dropped-event");

  api.use("reactioncommerce:core@0.9.4");

  api.addFiles([
    "server/register.js",
    "server/methods/import.js",
    "server/methods/product_import.js",
  ], ["server"]); // register as a reaction package

  api.addFiles("common/routing.js", ["client", "server"]); // common routing

  api.addFiles([
    "client/templates/bulkimport/bulkimport.html",
    "client/templates/bulkimport/bulkimport.js",
    "client/templates/bulkimport/bulkimport.less",

    "client/templates/dashboard/widget/widget.html",
    "client/templates/dashboard/widget/widget.js",
    "client/templates/dashboard/widget/widget.less"
  ], ["client"]);

  api.addAssets("private/data/products.json", "server");
  api.addAssets("private/data/productsSample.json", "server");
});
