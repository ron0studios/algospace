migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1a7j5c32us1efrt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k3wq2ym7",
    "name": "testcases",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1a7j5c32us1efrt")

  // remove
  collection.schema.removeField("k3wq2ym7")

  return dao.saveCollection(collection)
})
