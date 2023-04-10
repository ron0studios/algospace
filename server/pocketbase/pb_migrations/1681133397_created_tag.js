migrate((db) => {
  const collection = new Collection({
    "id": "9f8j5ian9i9hq61",
    "created": "2023-04-10 13:29:57.073Z",
    "updated": "2023-04-10 13:29:57.073Z",
    "name": "tag",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yrkntnm7",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("9f8j5ian9i9hq61");

  return dao.deleteCollection(collection);
})
