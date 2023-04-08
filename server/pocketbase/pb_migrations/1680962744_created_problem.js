migrate((db) => {
  const collection = new Collection({
    "id": "1a7j5c32us1efrt",
    "created": "2023-04-08 14:05:44.238Z",
    "updated": "2023-04-08 14:05:44.238Z",
    "name": "problem",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "egs9wyhr",
        "name": "statement",
        "type": "editor",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "tdgmfmvm",
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
  const collection = dao.findCollectionByNameOrId("1a7j5c32us1efrt");

  return dao.deleteCollection(collection);
})
