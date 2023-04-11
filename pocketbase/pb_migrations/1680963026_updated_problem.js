migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1a7j5c32us1efrt")

  // remove
  collection.schema.removeField("egs9wyhr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vknggnna",
    "name": "statement",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1a7j5c32us1efrt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "egs9wyhr",
    "name": "statement",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("vknggnna")

  return dao.saveCollection(collection)
})
