"use strict"
document.addEventListener('DOMContentLoaded', function () {
    var mainUser;
    $.get('api/messages?domain=kubernetes&size=1000&channel=C09R23FHP&offset=0', function(data) {
        var cyobj = {
            container: document.getElementById('cy'),
            elements: [],
            style: [
                {
                    "selector": "core",
                    "style": {
                        "selection-box-color": "#AAD8FF",
                        "selection-box-border-color": "#8BB0D0",
                        "selection-box-opacity": "0.5"
                    }
                }, {
                    "selector": "node",
                    "style": {
                        shape: 'rectangle',
                        'background-color': 'skyblue',
                        'label': 'data(name)',
                        'background-opacity': 0.8,
                        'background-image': 'data(image)',
                        'background-fit': 'contain',
                        'background-clip': 'none',
                        // "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
                        // "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
                        "content": "data(name)",
                        "font-size": "12px",
                        "text-valign": "center",
                        "text-halign": "center",
                        "text-outline-color": "#555",
                        "text-outline-width": "2px",
                        "color": "#fff",
                        "overlay-padding": "6px",
                        "z-index": "10"
                    }
                }, {
                    "selector": "node[?attr]",
                    "style": {
                        "shape": "rectangle",
                        "background-color": "#aaa",
                        "text-outline-color": "#aaa",
                        "width": "16px",
                        "height": "16px",
                        "font-size": "6px",
                        "z-index": "1"
                    }
                }, {
                    "selector": "node[?query]",
                    "style": {
                        "background-clip": "none",
                        "background-fit": "contain"
                    }
                }, {
                    "selector": "node:selected",
                    "style": {
                        "border-width": "6px",
                        "border-color": "#AAD8FF",
                        "border-opacity": "0.5",
                        "background-color": "#77828C",
                        "text-outline-color": "#77828C"
                    }
                }, {
                    "selector": "edge",
                    "style": {
                        "curve-style": "haystack",
                        "haystack-radius": "0.5",
                        "opacity": "0.4",
                        "line-color": "#bbb",
                        "width": "mapData(weight, 0, 1, 1, 8)",
                        "overlay-padding": "3px"
                    }
                }, {
                    "selector": "node.unhighlighted",
                    "style": {
                        "opacity": "0.2"
                    }
                }, {
                    "selector": "edge.unhighlighted",
                    "style": {
                        "opacity": "0.05"
                    }
                }, {
                    "selector": ".highlighted",
                    "style": {
                        "z-index": "999999"
                    }
                }, {
                    "selector": "node.highlighted",
                    "style": {
                        "border-width": "6px",
                        "border-color": "#AAD8FF",
                        "border-opacity": "0.5",
                        "background-color": "#394855",
                        "text-outline-color": "#394855"
                    }
                }, {
                    "selector": "edge.filtered",
                    "style": {
                        "opacity": "0"
                    }
                }, {
                    "selector": "edge[group=\"coexp\"]",
                    "style": {
                        "line-color": "#d0b7d5"
                    }
                }, {
                    "selector": "edge[group=\"coloc\"]",
                    "style": {
                        "line-color": "#a0b3dc"
                    }
                }, {
                    "selector": "edge[group=\"gi\"]",
                    "style": {
                        "line-color": "#90e190"
                    }
                }, {
                    "selector": "edge[group=\"path\"]",
                    "style": {
                        "line-color": "#9bd8de"
                    }
                }, {
                    "selector": "edge[group=\"pi\"]",
                    "style": {
                        "line-color": "#eaa2a2"
                    }
                }, {
                    "selector": "edge[group=\"predict\"]",
                    "style": {
                        "line-color": "#f6c384"
                    }
                }, {
                    "selector": "edge[group=\"spd\"]",
                    "style": {
                        "line-color": "#dad4a2"
                    }
                }, {
                    "selector": "edge[group=\"spd_attr\"]",
                    "style": {
                        "line-color": "#D0D0D0"
                    }
                }, {
                    "selector": "edge[group=\"reg\"]",
                    "style": {
                        "line-color": "#D0D0D0"
                    }
                }, {
                    "selector": "edge[group=\"reg_attr\"]",
                    "style": {
                        "line-color": "#D0D0D0"
                    }
                }, {
                    "selector": "edge[group=\"user\"]",
                    "style": {
                        "line-color": "#f0ec86"
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
                    image: 'api/image?' + user.avatar
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

        var params = {
            name: 'cola',
            nodeSpacing: 5,
            edgeLengthVal: 45,
            animate: true,
            randomize: true,
            maxSimulationTime: 1500
        };

        function makeLayout( opts ){
            params.randomize = false;
            params.edgeLength = function(e){ return params.edgeLengthVal / e.data('weight'); };

            for( var i in opts ){
                params[i] = opts[i];
            }

            return cy.layout( params );
        }

        var layout = makeLayout();

        layout.run();
        // cy.animate({
        //     pan: { x: 1000, y: 1000 }
        // }, {
        //     duration: 300
        // });
    }, 'json');
})
