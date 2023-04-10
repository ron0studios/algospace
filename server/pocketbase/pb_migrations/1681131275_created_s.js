migrate((db) => {
  const collection = new Collection({
    "id": "cl2gckeq2xyldpt",
    "created": "2023-04-10 12:54:35.395Z",
    "updated": "2023-04-10 12:54:35.395Z",
    "name": "s",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ffwhbuit",
        "name": "field",
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
  const collection = dao.findCollectionByNameOrId("cl2gckeq2xyldpt");

  return dao.deleteCollection(collection);
})
