const {RtcTokenBuilder, RtcRole} = require('agora-access-token')
const {convertUUID4toUint32} = require('../../helpers/index');
exports.generateToken =async ({channelName,user, role}) => {
    const appID = process.env.APP_ID
    const appCertificate = process.env.PRIMARY_CERTIFICATE;
    const agoraRole = role === 'publisher' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
    const uidValue =convertUUID4toUint32(user);
    const expirationTimeInSeconds = 3600

    const currentTimestamp = Math.floor(Date.now() / 1000)

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

// IMPORTANT! Build token with either the uid or with the users account. Comment out the option you do not want to use below.

// Build token with uid
    let token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName,uidValue, agoraRole, privilegeExpiredTs)
    console.log('check output values',uidValue);
    console.log('details of generate token',token)
    console.log('channel name',channelName);
    return {
        uid: uidValue,
        token
    };
}
