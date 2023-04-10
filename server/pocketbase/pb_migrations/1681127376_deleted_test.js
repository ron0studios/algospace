migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("c8u2tiiplzd1s1g");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "c8u2tiiplzd1s1g",
    "created": "2023-04-10 11:49:11.650Z",
    "updated": "2023-04-10 11:49:11.650Z",
    "name": "test",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7b9oak1j",
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
    "options": {
      "query": "SELECT id, title FROM tag;"
    }
  });

  return Dao(db).saveCollection(collection);
})
