/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.userService = (function() {

    /**
     * Namespace userService.
     * @exports userService
     * @namespace
     */
    var userService = {};

    userService.UserService = (function() {

        /**
         * Constructs a new UserService service.
         * @memberof userService
         * @classdesc Represents a UserService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function UserService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (UserService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = UserService;

        /**
         * Creates new UserService service using the specified rpc implementation.
         * @function create
         * @memberof userService.UserService
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {UserService} RPC service. Useful where requests and/or responses are streamed.
         */
        UserService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link userService.UserService#canAccess}.
         * @memberof userService.UserService
         * @typedef canAccessCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {userService.UserResponse} [response] UserResponse
         */

        /**
         * Calls canAccess.
         * @function canAccess
         * @memberof userService.UserService
         * @instance
         * @param {userService.ICanAccessRequest} request CanAccessRequest message or plain object
         * @param {userService.UserService.canAccessCallback} callback Node-style callback called with the error, if any, and UserResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(UserService.prototype.canAccess = function canAccess(request, callback) {
            return this.rpcCall(canAccess, $root.userService.CanAccessRequest, $root.userService.UserResponse, request, callback);
        }, "name", { value: "canAccess" });

        /**
         * Calls canAccess.
         * @function canAccess
         * @memberof userService.UserService
         * @instance
         * @param {userService.ICanAccessRequest} request CanAccessRequest message or plain object
         * @returns {Promise<userService.UserResponse>} Promise
         * @variation 2
         */

        return UserService;
    })();

    userService.CanAccessRequest = (function() {

        /**
         * Properties of a CanAccessRequest.
         * @memberof userService
         * @interface ICanAccessRequest
         * @property {string|null} [token] CanAccessRequest token
         * @property {string|null} [authPointName] CanAccessRequest authPointName
         */

        /**
         * Constructs a new CanAccessRequest.
         * @memberof userService
         * @classdesc Represents a CanAccessRequest.
         * @implements ICanAccessRequest
         * @constructor
         * @param {userService.ICanAccessRequest=} [properties] Properties to set
         */
        function CanAccessRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CanAccessRequest token.
         * @member {string} token
         * @memberof userService.CanAccessRequest
         * @instance
         */
        CanAccessRequest.prototype.token = "";

        /**
         * CanAccessRequest authPointName.
         * @member {string} authPointName
         * @memberof userService.CanAccessRequest
         * @instance
         */
        CanAccessRequest.prototype.authPointName = "";

        /**
         * Creates a new CanAccessRequest instance using the specified properties.
         * @function create
         * @memberof userService.CanAccessRequest
         * @static
         * @param {userService.ICanAccessRequest=} [properties] Properties to set
         * @returns {userService.CanAccessRequest} CanAccessRequest instance
         */
        CanAccessRequest.create = function create(properties) {
            return new CanAccessRequest(properties);
        };

        /**
         * Encodes the specified CanAccessRequest message. Does not implicitly {@link userService.CanAccessRequest.verify|verify} messages.
         * @function encode
         * @memberof userService.CanAccessRequest
         * @static
         * @param {userService.ICanAccessRequest} message CanAccessRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CanAccessRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.token != null && message.hasOwnProperty("token"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
            if (message.authPointName != null && message.hasOwnProperty("authPointName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.authPointName);
            return writer;
        };

        /**
         * Encodes the specified CanAccessRequest message, length delimited. Does not implicitly {@link userService.CanAccessRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userService.CanAccessRequest
         * @static
         * @param {userService.ICanAccessRequest} message CanAccessRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CanAccessRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CanAccessRequest message from the specified reader or buffer.
         * @function decode
         * @memberof userService.CanAccessRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userService.CanAccessRequest} CanAccessRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CanAccessRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.userService.CanAccessRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.token = reader.string();
                    break;
                case 2:
                    message.authPointName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CanAccessRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof userService.CanAccessRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userService.CanAccessRequest} CanAccessRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CanAccessRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CanAccessRequest message.
         * @function verify
         * @memberof userService.CanAccessRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CanAccessRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            if (message.authPointName != null && message.hasOwnProperty("authPointName"))
                if (!$util.isString(message.authPointName))
                    return "authPointName: string expected";
            return null;
        };

        /**
         * Creates a CanAccessRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof userService.CanAccessRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userService.CanAccessRequest} CanAccessRequest
         */
        CanAccessRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.userService.CanAccessRequest)
                return object;
            var message = new $root.userService.CanAccessRequest();
            if (object.token != null)
                message.token = String(object.token);
            if (object.authPointName != null)
                message.authPointName = String(object.authPointName);
            return message;
        };

        /**
         * Creates a plain object from a CanAccessRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userService.CanAccessRequest
         * @static
         * @param {userService.CanAccessRequest} message CanAccessRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CanAccessRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.token = "";
                object.authPointName = "";
            }
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.authPointName != null && message.hasOwnProperty("authPointName"))
                object.authPointName = message.authPointName;
            return object;
        };

        /**
         * Converts this CanAccessRequest to JSON.
         * @function toJSON
         * @memberof userService.CanAccessRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CanAccessRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CanAccessRequest;
    })();

    userService.UserResponse = (function() {

        /**
         * Properties of a UserResponse.
         * @memberof userService
         * @interface IUserResponse
         * @property {number|null} [id] UserResponse id
         * @property {string|null} [username] UserResponse username
         * @property {string|null} [name] UserResponse name
         * @property {Array.<userService.IRoleResponse>|null} [roles] UserResponse roles
         * @property {string|null} [createdAt] UserResponse createdAt
         * @property {string|null} [updatedAt] UserResponse updatedAt
         */

        /**
         * Constructs a new UserResponse.
         * @memberof userService
         * @classdesc Represents a UserResponse.
         * @implements IUserResponse
         * @constructor
         * @param {userService.IUserResponse=} [properties] Properties to set
         */
        function UserResponse(properties) {
            this.roles = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserResponse id.
         * @member {number} id
         * @memberof userService.UserResponse
         * @instance
         */
        UserResponse.prototype.id = 0;

        /**
         * UserResponse username.
         * @member {string} username
         * @memberof userService.UserResponse
         * @instance
         */
        UserResponse.prototype.username = "";

        /**
         * UserResponse name.
         * @member {string} name
         * @memberof userService.UserResponse
         * @instance
         */
        UserResponse.prototype.name = "";

        /**
         * UserResponse roles.
         * @member {Array.<userService.IRoleResponse>} roles
         * @memberof userService.UserResponse
         * @instance
         */
        UserResponse.prototype.roles = $util.emptyArray;

        /**
         * UserResponse createdAt.
         * @member {string} createdAt
         * @memberof userService.UserResponse
         * @instance
         */
        UserResponse.prototype.createdAt = "";

        /**
         * UserResponse updatedAt.
         * @member {string} updatedAt
         * @memberof userService.UserResponse
         * @instance
         */
        UserResponse.prototype.updatedAt = "";

        /**
         * Creates a new UserResponse instance using the specified properties.
         * @function create
         * @memberof userService.UserResponse
         * @static
         * @param {userService.IUserResponse=} [properties] Properties to set
         * @returns {userService.UserResponse} UserResponse instance
         */
        UserResponse.create = function create(properties) {
            return new UserResponse(properties);
        };

        /**
         * Encodes the specified UserResponse message. Does not implicitly {@link userService.UserResponse.verify|verify} messages.
         * @function encode
         * @memberof userService.UserResponse
         * @static
         * @param {userService.IUserResponse} message UserResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.username != null && message.hasOwnProperty("username"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            if (message.roles != null && message.roles.length)
                for (var i = 0; i < message.roles.length; ++i)
                    $root.userService.RoleResponse.encode(message.roles[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.createdAt);
            if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.updatedAt);
            return writer;
        };

        /**
         * Encodes the specified UserResponse message, length delimited. Does not implicitly {@link userService.UserResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userService.UserResponse
         * @static
         * @param {userService.IUserResponse} message UserResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserResponse message from the specified reader or buffer.
         * @function decode
         * @memberof userService.UserResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userService.UserResponse} UserResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.userService.UserResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.username = reader.string();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    if (!(message.roles && message.roles.length))
                        message.roles = [];
                    message.roles.push($root.userService.RoleResponse.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.createdAt = reader.string();
                    break;
                case 6:
                    message.updatedAt = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof userService.UserResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userService.UserResponse} UserResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserResponse message.
         * @function verify
         * @memberof userService.UserResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.roles != null && message.hasOwnProperty("roles")) {
                if (!Array.isArray(message.roles))
                    return "roles: array expected";
                for (var i = 0; i < message.roles.length; ++i) {
                    var error = $root.userService.RoleResponse.verify(message.roles[i]);
                    if (error)
                        return "roles." + error;
                }
            }
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                if (!$util.isString(message.createdAt))
                    return "createdAt: string expected";
            if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
                if (!$util.isString(message.updatedAt))
                    return "updatedAt: string expected";
            return null;
        };

        /**
         * Creates a UserResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof userService.UserResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userService.UserResponse} UserResponse
         */
        UserResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.userService.UserResponse)
                return object;
            var message = new $root.userService.UserResponse();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.username != null)
                message.username = String(object.username);
            if (object.name != null)
                message.name = String(object.name);
            if (object.roles) {
                if (!Array.isArray(object.roles))
                    throw TypeError(".userService.UserResponse.roles: array expected");
                message.roles = [];
                for (var i = 0; i < object.roles.length; ++i) {
                    if (typeof object.roles[i] !== "object")
                        throw TypeError(".userService.UserResponse.roles: object expected");
                    message.roles[i] = $root.userService.RoleResponse.fromObject(object.roles[i]);
                }
            }
            if (object.createdAt != null)
                message.createdAt = String(object.createdAt);
            if (object.updatedAt != null)
                message.updatedAt = String(object.updatedAt);
            return message;
        };

        /**
         * Creates a plain object from a UserResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userService.UserResponse
         * @static
         * @param {userService.UserResponse} message UserResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.roles = [];
            if (options.defaults) {
                object.id = 0;
                object.username = "";
                object.name = "";
                object.createdAt = "";
                object.updatedAt = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.roles && message.roles.length) {
                object.roles = [];
                for (var j = 0; j < message.roles.length; ++j)
                    object.roles[j] = $root.userService.RoleResponse.toObject(message.roles[j], options);
            }
            if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                object.createdAt = message.createdAt;
            if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
                object.updatedAt = message.updatedAt;
            return object;
        };

        /**
         * Converts this UserResponse to JSON.
         * @function toJSON
         * @memberof userService.UserResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserResponse;
    })();

    userService.RoleResponse = (function() {

        /**
         * Properties of a RoleResponse.
         * @memberof userService
         * @interface IRoleResponse
         * @property {number|null} [id] RoleResponse id
         * @property {string|null} [name] RoleResponse name
         */

        /**
         * Constructs a new RoleResponse.
         * @memberof userService
         * @classdesc Represents a RoleResponse.
         * @implements IRoleResponse
         * @constructor
         * @param {userService.IRoleResponse=} [properties] Properties to set
         */
        function RoleResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoleResponse id.
         * @member {number} id
         * @memberof userService.RoleResponse
         * @instance
         */
        RoleResponse.prototype.id = 0;

        /**
         * RoleResponse name.
         * @member {string} name
         * @memberof userService.RoleResponse
         * @instance
         */
        RoleResponse.prototype.name = "";

        /**
         * Creates a new RoleResponse instance using the specified properties.
         * @function create
         * @memberof userService.RoleResponse
         * @static
         * @param {userService.IRoleResponse=} [properties] Properties to set
         * @returns {userService.RoleResponse} RoleResponse instance
         */
        RoleResponse.create = function create(properties) {
            return new RoleResponse(properties);
        };

        /**
         * Encodes the specified RoleResponse message. Does not implicitly {@link userService.RoleResponse.verify|verify} messages.
         * @function encode
         * @memberof userService.RoleResponse
         * @static
         * @param {userService.IRoleResponse} message RoleResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoleResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified RoleResponse message, length delimited. Does not implicitly {@link userService.RoleResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof userService.RoleResponse
         * @static
         * @param {userService.IRoleResponse} message RoleResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoleResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoleResponse message from the specified reader or buffer.
         * @function decode
         * @memberof userService.RoleResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {userService.RoleResponse} RoleResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoleResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.userService.RoleResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoleResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof userService.RoleResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {userService.RoleResponse} RoleResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoleResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoleResponse message.
         * @function verify
         * @memberof userService.RoleResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoleResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a RoleResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof userService.RoleResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {userService.RoleResponse} RoleResponse
         */
        RoleResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.userService.RoleResponse)
                return object;
            var message = new $root.userService.RoleResponse();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a RoleResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof userService.RoleResponse
         * @static
         * @param {userService.RoleResponse} message RoleResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoleResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.name = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this RoleResponse to JSON.
         * @function toJSON
         * @memberof userService.RoleResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoleResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RoleResponse;
    })();

    return userService;
})();

module.exports = $root;
