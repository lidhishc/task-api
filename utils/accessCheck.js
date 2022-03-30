const sendFailedResponse = require('./errorHandler')

const roleChecker = (req, res, next) => {
    /**
     *
     * Role Id specs
     *
     *   1 -> admin
     *   2 -> client
     */
    const allowedRoleIds = [1, 2]
    try {
        let roleId = req.headers['roleid']
        if (!roleId) {
            sendFailedResponse(res, 'Role id is not provided')
            return
        } else if (!allowedRoleIds.includes(Number(roleId))) {
            sendFailedResponse(res, 'Invalid Role')
            return
        }
        next()
    } catch (error) {
        sendFailedResponse(res, error)
    }
}

const isAdminCheck = (req, res, next) => {
    try {
        let roleId = req.headers['roleid']
        if (Number(roleId) !== 1) {
            sendFailedResponse(res, 'No access', 401)
            return
        }
        next()
    } catch (error) {
        sendFailedResponse(res, error)
    }
}

module.exports = { roleChecker, isAdminCheck }
