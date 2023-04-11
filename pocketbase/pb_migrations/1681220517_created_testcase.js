migrate((db) => {
  const collection = new Collection({
    "id": "rpk9je46sgoudbu",
    "created": "2023-04-11 13:41:57.840Z",
    "updated": "2023-04-11 13:41:57.840Z",
    "name": "testcase",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "aqyyobp4",
        "name": "input",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "2ixd4iwy",
        "name": "output",
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
  const collection = dao.findCollectionByNameOrId("rpk9je46sgoudbu");

  return dao.deleteCollection(collection);
})
