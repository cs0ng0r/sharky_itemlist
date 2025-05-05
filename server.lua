local itemNames
ESX = exports.es_extended:getSharedObject()


local function devPrint(message)
    if DEBUG then
        print(string.format(message))
    end
end

ESX.RegisterServerCallback('itemlist:getItems', function(source, cb)
    if not itemNames then
        itemNames = {}
        for item, data in pairs(exports.ox_inventory:Items()) do
            itemNames[item] = data.label
        end
    end
    cb(itemNames)
end)

ESX.RegisterServerCallback('itemlist:giveItem', function(source, cb, data)
    local targetPlayer = ESX.GetPlayerFromId(data.targetId)
    local isAdmin = IsPlayerAdmin(source)

    if not isAdmin then
        cb({ success = false, message = "Nincs jogosultságod ehhez a művelethez!" })
        return
    end

    if not targetPlayer then
        cb({ success = false, message = "A megadott játékos nem található!" })
        return
    end

    local success = targetPlayer.addInventoryItem(data.itemName, data.amount)

    if success then
        devPrint(string.format("[itemlist] %s (ID: %s) adott %s db %s itemet %s (ID: %s) játékosnak",
            GetPlayerName(source), source, data.amount, data.itemName, GetPlayerName(data.targetId), data.targetId))
        cb({ success = true, message = "Item sikeresen leaddolva!" })
    else
        cb({ success = false, message = "Hiba történt az item addolása közben!" })
    end
end)

function IsPlayerAdmin(playerId)
    local xPlayer = ESX.GetPlayerFromId(playerId)

    if xPlayer then
        local playerGroup = xPlayer.getGroup()
        return ADMINGROUPS[playerGroup] == true
    end

    return false
end

RegisterCommand('openItems', function(source, args, rawCommand)
    if IsPlayerAdmin(source) then
        TriggerClientEvent('itemlist:openUI', source)
    else
        devPrint(string.format("[itemlist] %s (ID: %s) próbálta megnyitni az item listát, de nincs jogosultsága!",
            GetPlayerName(source), source))
    end
end, false)
