/**
 * Created by yujie on 10/26/2015.
 */
(function() {
  'use strict';
  var connectingStatusListeners = [];

  define([ 'app', 'strophe' ], function(smc) {
    return smc.service('XMPPService', [
        '$rootScope',
        function($rootScope) {
          var me = this;

          Strophe.log = function(level, msg) {
            if (level == Strophe.LogLevel.FATAL
                || level == Strophe.LogLevel.ERROR) {
              if (window.console)
                console.error(msg);
              // xmpp.showErrorMessage();
            }
          };

          me.addConnectingStatusListener = function(listener, scope) {
            connectingStatusListeners.push([listener, scope]);
          };
          me.removeConnectingStatusListener = function(listener, scope) {
            for (var i = 0; i < connectingStatusListeners.length; i++) {
              if(connectingStatusListeners[i][0] === listener && connectingStatusListeners[i][1] === scope) {
                connectingStatusListeners.splice(i,1);
                break;
              }
            }
          };
          me.broadcastConnectingStatus = function() {
            for (var i = 0; i < connectingStatusListeners.length; i++) {
              try{
                connectingStatusListeners[i][0](connectingStatusListeners[i][1], me.connectionStatus);
              }catch(e) {
                if(window.console) console.error('broadcastConnectingStatus fail:'+e.stack);
              }
            }
          };
          
          me.init = function(domain, boshUrl, pluginUrl, maxParticipants) {
            me.domainName = 'jyu131';// domain;
            me.BOSH_SERVICE = 'https://localhost:7443/http-bind/';// boshUrl;
            me.PLUGIN_SERVICE = 'http://localhost:9090/plugins/';// pluginUrl;
            me.MAX_PARTICIPANT_NUMBER = maxParticipants <= 0 ? 9999999
                : maxParticipants;
          };

          me.connect = function(userName, password, lwssoKey) {
            var localJID = Strophe.escapeNode(userName);
            me.JID = localJID;
            me.connection = new Strophe.Connection(me.BOSH_SERVICE);
            me.connection.connect(localJID + '@' + me.domainName, password,
                me.onConnect);
          };

          me.onConnect = function(status) {
            me.connectionStatus = status;
            if (status == Strophe.Status.CONNECTING) {
              if (window.console)
                console.error('connecting');
              // xmpp.handleConnecting();
            } else if (status == Strophe.Status.CONNFAIL) {
              if (window.console)
                console.error('CONNFAIL');
              // xmpp.handleConnectFailed();
            } else if (status == Strophe.Status.DISCONNECTING) {
              if (window.console)
                console.error('DISCONNECTING');
              // xmpp.handleDisconnecting();
            } else if (status == Strophe.Status.DISCONNECTED) {
              if (window.console)
                console.error('DISCONNECTED');
              // xmpp.handleDisconnected();
            } else if (status == Strophe.Status.CONNECTED) {
              if (window.console)
                console.error('CONNECTED');
              me.handleConnected();
            } else if (status == Strophe.Status.AUTHFAIL) {
              if (window.console)
                console.error('AUTHFAIL');
              // xmpp.handleAuthFailed();
            }
            me.broadcastConnectingStatus(status);
          };

          me.getConnectionStatus = function() {
            return me.connectionStatus;
          };
          
          me.handleConnected = function() {
            // Strophe is connected
            // connection.addHandler(xmpp.onPresenceHandler, null, 'presence');
            me.connection.addHandler(me.onMessageHandler, null, 'message');
            var presence = $pres().c('show').t('chat').up().c("priority").t(
                "100").up().c('status').t('online aa');
            me.connection.send(presence);

            // test subscribe to pub
            // firstly, try to subscribe to the pub
            // if failed, then create and configure the pub, and then broadcast
            // message to the pub
            // if success, directly broadcast message to the pub
            // note:after first time subscribe, it always send the last message
            // to me
            var pubName = 'test5';
            // me.subscribeToPub(pubName);//, me.broadcastToPub.bind(this,
            // pubName, 'hello', XMPP.JID)
            me.getSubscriptions(function(subs) {
              var found = false;
              for (var i = 0; i < subs.length; i++) {
                if (subs[i] == pubName) {
                  found = true;
                  break;
                }
              }
              // I have never subscribed to this pub, now subscribe to it
              if (!found) {
                me.subscribeToPub(pubName);
              }
            });
          };
          me.broadcastToPub = function(pubName, msg, who) {
            var subiq = $iq({
              to : 'pubsub.' + me.domainName,
              type : 'set'
            }).c('pubsub', {
              xmlns : 'http://jabber.org/protocol/pubsub'
            }).c('publish', {
              node : pubName
            }).c('item').c('x', {
              xmlns : 'jabber:x:data',
              type : 'result'
            }).c('field', {
              'var' : 'msg'
            }).c('value').t(msg).up().up().c('field', {
              'var' : 'fromwho'
            }).c('value').t(who);
            me.connection.sendIQ(subiq, function(ret) {
              alert('send msg to pub successfully');
            }, function(ret) {
              alert('send msg to pub failed');
            });
          };
          me.subscribeToPub = function(pubName, callback) {
            // after connected, subscribe firstly, if failed, then create the
            // pub
            var subiq = $iq({
              to : 'pubsub.' + me.domainName,
              type : 'set'
            }).c('pubsub', {
              xmlns : 'http://jabber.org/protocol/pubsub'
            }).c('subscribe', {
              node : pubName,
              jid : me.JID + '@' + me.domainName
            });
            me.connection.sendIQ(subiq, function(ret) {
              alert('subscribe successfully');
              if (callback) {
                callback();
              }
            }, function(ret) {
              // if can't subscribe, then create the pub
              me.createPub(pubName, callback);
            });
          };
          me.createPub = function(pubName, callback) {
            var createiq = $iq({
              to : 'pubsub.' + me.domainName,
              type : 'set'
            }).c('pubsub', {
              xmlns : 'http://jabber.org/protocol/pubsub'
            }).c('create', {
              node : pubName
            });
            me.connection.sendIQ(createiq, function(ret) {
              // after create pub, configure it
              me.configPub(pubName, callback);
            }, function(ret) {
              alert('create pub failed');
            });
          };
          me.configPub = function(pubName, callback) {
            var requestConfigiq = $iq({
              to : 'pubsub.' + me.domainName,
              type : 'get'
            }).c('pubsub', {
              xmlns : 'http://jabber.org/protocol/pubsub#owner'
            }).c('configure', {
              node : pubName
            });
            me.connection.sendIQ(requestConfigiq, function(ret) {
              var configiq = $iq({
                to : 'pubsub.' + me.domainName,
                type : 'set'
              }).c('pubsub', {
                xmlns : 'http://jabber.org/protocol/pubsub#owner'
              }).c('configure', {
                node : pubName
              }).c('x', {
                xmlns : 'jabber:x:data',
                type : 'submit'
              }).c('field', {
                'var' : 'FORM_TYPE'
              }).c('value').t('http://jabber.org/protocol/pubsub#node_config')
                  .up().up().c('field', {
                    'var' : 'pubsub#deliver_payloads'
                  }).c('value').t('1').up().up().c('field', {
                    'var' : 'pubsub#persist_items'
                  }).c('value').t('true').up().up().c('field', {
                    'var' : 'pubsub#max_items'
                  }).c('value').t('30').up().up().c('field', {
                    'var' : 'pubsub#publish_model'
                  }).c('value').t('open').up().up().c('field', {
                    'var' : 'pubsub#access_model'
                  }).c('value').t('open').up().up().c('field', {
                    'var' : 'pubsub#send_last_published_item'
                  }).c('value').t('never');
              me.connection.sendIQ(configiq, function(ret) {
                alert('configured successfully');
                if (callback) {
                  callback();
                }
              }, function(ret) {
                alert('configured failed');
              });
            }, function(ret) {
              alert('request configure failed');
            });
          };
          me.getSubscriptions = function(callback) {
            var getiq = $iq({
              to : 'pubsub.' + me.domainName,
              type : 'get'
            }).c('pubsub', {
              xmlns : 'http://jabber.org/protocol/pubsub'
            }).c('subscriptions');
            me.connection.sendIQ(getiq, function(ret) {
              var subNodes = ret.getElementsByTagName('subscription');
              var subs = [];
              for (var i = 0; i < subNodes.length; i++) {
                subs.push(subNodes[i].getAttribute('node'));
              }
              if (callback) {
                callback(subs);
              }
            }, function(ret) {
              alert('getSubscriptions failed');
            });
          };
          me.onMessageHandler = function(msg) {
            if (msg.getAttribute('from').startsWith('pubsub')) {
              //it's pubsub message
              var ret = '';
              var fields = msg.getElementsByTagName('field');
              for (var i = 0; i < fields.length; i++) {
                var key = fields[i].getAttribute('var');
                var value = fields[i].firstChild.firstChild.nodeValue;
                ret += key + ':' + value + ';';
              }
              console.error('receiver:' + ret);
            } else {
              //other kind of messages
              console.error('receiver others:' + ret);
            }
            return true;
          };

        } ]);
  });
})(this);
