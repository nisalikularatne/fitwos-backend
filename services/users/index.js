require('dotenv').config({path: '../../.env'});
const jwt = require('jsonwebtoken');
const User = require('../../models/user')
const axios = require('axios');
// const config = require('@fitwos/fitwos-application/config');
exports.getUser = async ({headers}) => {
    let user;
    let userInfo = await axios.get('https://kong.fitwos.club/auth/realms/fitwos/protocol/openid-connect/userinfo', {
        headers: {
            Authorization: headers.authorization //the token is a variable which holds the token
        }
    })
    if (userInfo.data) {
        user = await User.query().where('user_uuid', userInfo.data.sub).first();
        if (!user) {
            const {given_name, family_name, sub, email, email_verified, name, preferred_name} = userInfo.data;
            user = await User.query().insert({
                given_name, family_name, user_uuid: sub, email, email_verified, name, preferred_name
            })
        }
    }
    return user;
};
exports.edit = async ({headers, id, firstName, lastName, email, emailVerified}) => {
    console.log('show headers', headers);
    let initialuser = await User.query().findOne({user_uuid: id}).throwIfNotFound();
    console.log('show inistial user', initialuser.given_name);
    let firstname = firstName || initialuser.given_name;
    let lastname = lastName || initialuser.family_name;
    let emaiL = email || initialuser.email;
    let emailverified = emailVerified || initialuser.email_verified;
    let userInfo = await axios.post('https://kong.fitwos.club/auth/realms/fitwos/account/', {
        firstName: firstname,
        lastName: lastname,
        email: emaiL,
        emailVerified: emailverified
    }, {
        headers: {
            Authorization: headers.authorization //the token is a variable which holds the token
        }
    })
    console.log('show userInfo',userInfo);
    if (!userInfo.data) {
        return initialuser.$query().patchAndFetch({given_name:firstname,family_name:lastname,email:emaiL,email_verified:emailVerified});
    }

};
exports.saveImage = async (image_url, id) => {
    const updatedObject = await User.query().findOne({user_uuid: id}).throwIfNotFound();
    return updatedObject.$query().patchAndFetch({image_url});
}

exports.get = async (id, myId) => {
    return User.query().findOne({user_uuid: id}).select(
        ['users.*',
            User.relatedQuery('followers').count().as('totalFollowers'),
            User.relatedQuery('following').count().as('totalFollowing'),
            User.relatedQuery('rooms').count().as('totalWorkouts'),
            User.relatedQuery("followers").findOne({ user_uuid: myId }).count('user_uuid').as("isFollowing"),
            User.relatedQuery('invited_rooms').count().as('invited_rooms')
            // TODO:: Add isFollowing by user boolean
        ]).throwIfNotFound();
}
exports.follow = async ({followUsers, id}) => {
    let userObject = await User.query().findOne({user_uuid: id});
    await userObject.$relatedQuery('following').unrelate().whereIn('id', followUsers).withGraphFetched('[followers,following]');
    await userObject.$relatedQuery('following').relate(followUsers).withGraphFetched('[followers,following]');
    return userObject.$query().withGraphFetched('[followers,following]')
}
exports.unfollow = async ({unfollowUsers, id}) => {
    let userObject = await User.query().findOne({user_uuid: id});
    // await userObject.$relatedQuery('following').relate(followUsers);
    await userObject.$relatedQuery('following').unrelate().whereIn('id', unfollowUsers).withGraphFetched('[followers,following]');
    return userObject.$query().withGraphFetched('[followers,following]');
}
// exports.login = async (identity = {}) => {
//     let user = await User.query().where('name', identity.name).first();
//     const token = jwt.sign({
//         user_name: user.name,
//         user_id: user.id
//     }, config.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 });
//     return { token: token };
// };

exports.getFollowers = async (object) => {
    let {page, page_size, query, sort, order, id} = object;
    let userObject = await User.query().findOne({user_uuid: id});
    return userObject.$relatedQuery('followers').modify(builder => {
        query && builder.where('name', 'like', `%${query}%`);
        builder && builder.page(Number(page) - 1, page_size);
        builder.orderBy(sort, order);
    });

}
exports.getFollowing = async (object) => {
    let {page, page_size, query, sort, order, id} = object;
    let userObject = await User.query().findOne({user_uuid: id});
    return userObject.$relatedQuery('following').modify(builder => {
        query && builder.where('name', 'like', `%${query}%`);
        builder && builder.page(Number(page) - 1, page_size);
        builder.orderBy(sort, order);
    });

}
exports.invitedRooms = async (id)=>{
    const user = await User.query().findOne({user_uuid: id}).throwIfNotFound();
    return user.$relatedQuery('invited_rooms');
}

exports.getSuggestion = async (object) => {
    //TODO::Suggest more users?
    return this.getFollowing(object);
}

exports.getNotifications = async (id)=>{
    const user = await User.query().findOne({user_uuid: id}).throwIfNotFound();
    return user.$relatedQuery('notifications');
}
