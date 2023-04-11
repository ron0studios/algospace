migrate((db) => {
  const collection = new Collection({
    "id": "1pl2q29dlibn54h",
    "created": "2023-04-11 13:47:18.803Z",
    "updated": "2023-04-11 13:47:18.803Z",
    "name": "problem",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xvcoxden",
        "name": "difficulty",
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
        "id": "5gswhdmi",
        "name": "title",
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
        "id": "mqhsnboy",
        "name": "statement",
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
        "id": "og219j1o",
        "name": "contest",
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
        "id": "igolwft8",
        "name": "tag",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "9f8j5ian9i9hq61",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "q78ytgox",
        "name": "creator",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "xq4xgapp",
        "name": "testcase",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("1pl2q29dlibn54h");

  return dao.deleteCollection(collection);
})
