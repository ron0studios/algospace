migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1a7j5c32us1efrt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lwfnda2x",
    "name": "tag",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "yc4i1zvozctqade",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1a7j5c32us1efrt")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lwfnda2x",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "yc4i1zvozctqade",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
