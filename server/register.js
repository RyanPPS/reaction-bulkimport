ReactionCore.registerPackage({
  label: "Bulk Import",
  name: "reaction-bulkimport", // usually same as meteor package
  autoEnable: false, // auto-enable in dashboard
  settings: { // private package settings config (blackbox)
    someSecret: "xxxx"
  },
  registry: [
    // all options except route and template
    // are used to describe the
    // dashboard "app card".
    {
      provides: "dashboard",
      label: "BulkImport",
      description: "BulkImport Example",
      icon: "fa fa-upload", // glyphicon/fa
      cycle: "2", // Core, Stable, Testing (currently testing)
      container: "dashboard" // group this with settings
    },
    {
      label: "Hello World Settings",
      route: "dashboard/bulkimport",
      provides: "settings",
      container: "bulkimport",
      template: "bulkimport"
    },
    // configures settings link for app card
    // use "group" to link to dashboard card
    {
      route: "bulkimport",
      provides: "settings",
      container: "dashboard"
    }
  ],
  // array of permission objects
  permissions: [
    {
      label: "BulkImport",
      permission: "BulkImport",
      group: "Shop Settings"
    }
  ]
});
