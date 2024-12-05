local itemNames
ESX = exports.es_extended:getSharedObject()

ESX.RegisterServerCallback('itemlist:getItems', function(source, cb)
    if not itemNames then
        itemNames = {}
        for item, data in pairs(exports.ox_inventory:Items()) do
            itemNames[item] = data.label
        end
    end
    cb(itemNames)
end)
