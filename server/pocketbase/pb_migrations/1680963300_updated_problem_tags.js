migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j5xrnmnqad6x4x8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vztfuoji",
    "name": "problem_id",
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
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kv74mjz7",
    "name": "tag_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "yc4i1zvozctqade",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j5xrnmnqad6x4x8")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kv74mjz7",
    "name": "field1",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "yc4i1zvozctqade",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
