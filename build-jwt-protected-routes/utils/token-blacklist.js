const blacklist = new Set()

export function blacklistToken(token){
   return blacklist.add(token)
}

export function isBlacklisted(token){
return blacklist.has(token)
}