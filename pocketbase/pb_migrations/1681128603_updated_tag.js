migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yc4i1zvozctqade")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yc4i1zvozctqade")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
