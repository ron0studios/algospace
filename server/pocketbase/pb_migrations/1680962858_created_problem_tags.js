migrate((db) => {
  const collection = new Collection({
    "id": "j5xrnmnqad6x4x8",
    "created": "2023-04-08 14:07:38.120Z",
    "updated": "2023-04-08 14:07:38.120Z",
    "name": "problem_tags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vztfuoji",
        "name": "field",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "1a7j5c32us1efrt",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("j5xrnmnqad6x4x8");

  return dao.deleteCollection(collection);
})
