const AWS = require('aws-sdk');
require('dotenv');
const tk = require('timekeeper');
const moment = require('moment');
const _ = require('lodash');
const {format} = require('date-fns')
const {ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION} = process.env;
AWS.config.update({ //  global-upload (IAM user)
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: AWS_REGION,
});
const  S3 = {
    getSignedUrl(bucket, key, cacheFriendly) {
            const s3 = new AWS.S3()
            let url;
            if (cacheFriendly) {
                url = tk.withFreeze(moment().subtract(1, 'month').endOf('month').toDate(), () => {
                    const predatedUrl = s3.getSignedUrl('getObject', {
                        Bucket: bucket,
                        Key: key,
                        Expires: 31 * 24 * 60 * 60,
                        ResponseContentDisposition: 'inline',
                    });

                    return predatedUrl;
                });
                // if (process.env.env === 'production' && process.env.AWS_CLOUD_FRONT_DOMAIN) {
                //   const regex = RegExp(`${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com`);
                //   url = url.replace(regex, process.env.AWS_CLOUD_FRONT_DOMAIN);
                // }
            } else {
                url = s3.getSignedUrl('getObject', {
                    Bucket: bucket,
                    Key: key,
                    Expires: 30 * 24 * 60 * 60,
                    ResponseContentDisposition: 'inline',
                });
            }
            return url;

    },
    async upload(file, bucket, path, subPath, options = {isPublic: false}) {
        const {filename} = file;
        const {isPublic} = options;
        const name = _.lowerCase(_.head(filename.split('.')));
        const ext = _.lowerCase(_.last(filename.split('.')));
        const now = new Date();
        let contentType;
        let key = `${path}/${format(now, 'yyyy/MM/dd/hhmmss')}-${name}.${ext}`;

        if (_.size(subPath) > 0) {
            key = `${path}/${subPath}/${format(now, 'yyyy/MM/dd/hhmmss')}-${name}.${ext}`;
        }
        if (ext === 'pdf') {
            contentType = `application/pdf`;
        } else {
            const type = file.file.split(';')[0].split('/')[1];
            contentType = `image/${type}`;
        }

        const acl = (isPublic) ? 'public-read' : 'private';
        const base64 = file.file.replace(/^data:image\/[a-z]+;base64,/, "");
        const params = {params: {Bucket: bucket, Key: key, ContentType: contentType, ACL: acl, Body: new Buffer(base64, 'base64')}};

        const s3 = new AWS.S3(params);


        await s3.upload(params.params).promise()
        const url = this.getSignedUrl(bucket, key);

        return {bucket, key, filename: `${name}.${ext}`, contentType, url};

    },
};
module.exports = {S3};