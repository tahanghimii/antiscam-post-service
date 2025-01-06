module.exports = {
  mongodb: {
    url: "mongodb://localhost:27017",
    databaseName: "blog-system",

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",


  useFileHash: false,


  moduleSystem: 'esm',
};
