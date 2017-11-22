"use strict"
document.addEventListener('DOMContentLoaded', function () {
    var mainUser;
    $.get('http://localhost:3000/api/messages?domain=kubernetes&size=100&channel=C09R23FHP&offset=0', function(data) {
        var cyobj = {
            container: document.getElementById('cy'),
            elements: [],
            style: [
                {
                    selector: 'node',
                    style: {
                        shape: 'rectangle',
                        'background-color': 'skyblue',
                        'label': 'data(name)',
                        'background-opacity': 0.8,
                        'background-image': 'data(image)',
                        'background-fit': 'contain',
                        'background-clip': 'none'
                    }
                }]
        };
        for (var i = 0; i < data.users.length; i++) {
            var id = data.users[i];
            var user = data.related[id];
            cyobj.elements.push({
                data: {
                    id: id,
                    name: user.name,
                    image: 'http://localhost:3000/api/image?' + user.avatar
                }
            });
        }
        for (var i = 0; i < data.users.length; i++) {
            var id = data.users[i];
            for (var j = i + 1; j < data.users.length; j++) {
                if (Math.random() > 0.05) continue;
                var jid = data.users[j];
                cyobj.elements.push({
                    data: {
                        id: id + '_' + jid,
                        source: id,
                        target: jid
                    }
                });
            }
        }
        var cy = window.cy = cytoscape(cyobj);
        // cy.animate({
        //     pan: { x: 1000, y: 1000 }
        // }, {
        //     duration: 300
        // });
    }, 'json');
})