migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("yc4i1zvozctqade");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "yc4i1zvozctqade",
    "created": "2023-04-08 14:07:57.234Z",
    "updated": "2023-04-10 12:10:03.092Z",
    "name": "tag",
    "type": "base",
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
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
