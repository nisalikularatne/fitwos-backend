const {RtcTokenBuilder, RtcRole} = require('agora-access-token')
const {UUIDGenerator} = require('../../helpers');
exports.generateToken =async ({channelName, role}) => {
    const appID = process.env.APP_ID
    const appCertificate = process.env.PRIMARY_CERTIFICATE;
    const agoraRole = role === 'publisher' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
    const uid = await UUIDGenerator();
    const expirationTimeInSeconds = 3600

    const currentTimestamp = Math.floor(Date.now() / 1000)

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

// IMPORTANT! Build token with either the uid or with the users account. Comment out the option you do not want to use below.

// Build token with uid
    return {
        uid: uid,
        token: RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, agoraRole, privilegeExpiredTs)
    };
}