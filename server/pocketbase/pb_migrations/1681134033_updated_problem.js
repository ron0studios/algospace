migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1a7j5c32us1efrt")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1a7j5c32us1efrt")

  // remove
  collection.schema.removeField("sg8gezrn")

  return dao.saveCollection(collection)
})
