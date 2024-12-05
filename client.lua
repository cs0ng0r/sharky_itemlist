local isNuiOpen = false
ESX = exports.es_extended:getSharedObject()


RegisterCommand('openItems', function()
    if not isNuiOpen then
        SetNuiFocus(true, true)
        SendNUIMessage({ action = "open" })
        isNuiOpen = true
    end
end, false)

RegisterNUICallback('getItems', function(_, cb)
    ESX.TriggerServerCallback('itemlist:getItems', function(data)
        cb(data)
    end)
end)

RegisterNUICallback('close', function()
    SetNuiFocus(false, false)
    isNuiOpen = false
end)
