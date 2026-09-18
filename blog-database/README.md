# MongoDB database scripts

The Docker Compose file creates the MongoDB container as `blog-mongodb` and
publishes it on `localhost:27020`. The scripts in this directory use the
MongoDB shell inside that container, so MongoDB Compass is not required for
initialization.

Start the environment from `blog-environment`:

```powershell
docker compose up -d mongodb
```

Then, from the repository root, run:

```powershell
.\blog-database\run-mongodb.ps1
```

Or double-click/run the Windows command wrapper:

```powershell
.\blog-database\run-mongodb.cmd
```

The default database is `blog_database`. To use another database or container:

```powershell
.\blog-database\run-mongodb.ps1 -Database blog_database -Container blog-mongodb
```

Scripts execute in filename order:

1. `init/*.js` creates each collection and its indexes.
2. `data/*.js` upserts data for each entity and preserves String-ID relationships.

The seed scripts use deterministic `_id` values and `replaceOne(..., { upsert:
true })`, so rerunning the command updates the demo documents instead of
creating duplicates.
