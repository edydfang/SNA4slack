// api for data retriving:
var https = require('https');
var debug = require('debug')('slack-diagram:api');

function digest_group(original) {
    var oriobj = JSON.parse(original);
    var newobj = {};
    debug(oriobj.team.length);
    if(oriobj.team.length != 1) {
        newobj.status = 'invalid';
    } else {
        newobj.status = 'valid';
        var team = oriobj.team[0];
        newobj.id = team.team_id;
        newobj.domain = team.domain;
        newobj.name = team.name;
    }
    return JSON.stringify(newobj);
}

function digest_channels(original) {
    var newobj = {};
    try {
        var oriobj = JSON.parse(original);
        debug('#channels: ' + oriobj.channels.length);
        if(oriobj.channels.length < 1) {
            newobj.status = 'invalid';
        } else {
            newobj.status = 'valid';
            newobj.channels = [];
            for(var i=0; i<oriobj.channels.length; i++) {
                var channel = oriobj.channels[i];
                var c = {};
                c.id = channel.channel_id;
                c.name = channel.name;
                c.purpose = channel.purpose.value;
                c.num_members = channel.num_members;
                newobj.channels.push(c)
            }
        }
    } catch(e) {
        newobj.status = 'invalid';
    }
    return JSON.stringify(newobj);
}

function digest_messages(original, size, offset) {
    var newobj = {};
    newobj.size = size;
    newobj.offset = offset;
    try {
        var oriobj = JSON.parse(original);
        // debug('#channels: ' + oriobj.channels.length);
        if(oriobj.messages.length < 1) {
            newobj.status = 'invalid';
        } else {
            newobj.status = 'valid';
            newobj.messages = [];
            newobj.total = oriobj.total;
            for(var i=0; i<oriobj.messages.length; i++) {
                var message = oriobj.messages[i];
                if(message.type != 'message') {
                    continue;
                }
                var m = {};
                m.text = message.text;
                m.user = message.user;
                m.time = message.ts;
                newobj.messages.push(m);
            }
            newobj.related = {};
            for(var id in oriobj.related.users) {
                var user = oriobj.related.users[id];
                var u = {};
                u.name = user.name;
                u.color = user.color;
                u.firstname = user.profile.first_name;
                u.lastname = user.profile.last_name;
                u.realname = user.profile.real_name;
                newobj.related[id] = u;
            }
        }
    } catch(e) {
        newobj.status = 'invalid';
    }
    return JSON.stringify(newobj);
}

var get_group_info = async (ctx, next) => {
    var options = {
        hostname: 'api.slackarchive.io',
        path: '/v1/team',
        headers: {'referer': 'https://' + ctx.query.domain + '.slackarchive.io/'}
    };

    var callback = function(response) {
        var result = ''
        response.on('data', function (chunk) {
            result += chunk;
            // debug('got new chunk of size ' + chunk.length)
        });
        response.on('end', function () {
            ctx.response.body = digest_group(result);
            console.log(digest_group(result));
        })
    }

    var req = https.request(options, callback);
    req.on('error', (e) => {
        debug(e);
    });
    req.end();
};

module.exports = {
    'GET /group': get_group_info
};