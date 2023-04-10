migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1a7j5c32us1efrt")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1a7j5c32us1efrt")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
