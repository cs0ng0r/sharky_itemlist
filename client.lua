local isNuiOpen = false
ESX = exports.es_extended:getSharedObject()

RegisterNetEvent('itemlist:openUI')
AddEventHandler('itemlist:openUI', function()
    if not isNuiOpen and IsPlayerAdmin() then
        OpenItemList()
    end
end)

function IsPlayerAdmin()
    return ADMINGROUPS[ESX.GetPlayerData().group] == true
end

function OpenItemList()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = "open",
    })
    isNuiOpen = true
end

RegisterNUICallback('getItems', function(_, cb)
    ESX.TriggerServerCallback('itemlist:getItems', function(data)
        cb(data)
    end)
end)

RegisterNUICallback('giveItem', function(data, cb)
    ESX.TriggerServerCallback('itemlist:giveItem', function(result)
        cb(result)
    end, data)
end)

RegisterNUICallback('close', function()
    SetNuiFocus(false, false)
    isNuiOpen = false
end)
