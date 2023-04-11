migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1a7j5c32us1efrt");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "1a7j5c32us1efrt",
    "created": "2023-04-08 14:05:44.238Z",
    "updated": "2023-04-11 13:42:43.135Z",
    "name": "problem",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tdgmfmvm",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "vknggnna",
        "name": "statement",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wqf5sv7w",
        "name": "difficulty",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": "^(?:EASY|MEDIUM|HARD|INSANE|UNKNOWN)$"
        }
      },
      {
        "system": false,
        "id": "jmfp0phr",
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
        "id": "kwt6n1tc",
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
        "id": "sg8gezrn",
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
        "id": "k3wq2ym7",
        "name": "testcases",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
