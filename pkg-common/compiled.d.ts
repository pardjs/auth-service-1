import * as $protobuf from "protobufjs";
/** Namespace userService. */
export namespace userService {

    /** Represents a UserService */
    class UserService extends $protobuf.rpc.Service {

        /**
         * Constructs a new UserService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new UserService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): UserService;

        /**
         * Calls canAccess.
         * @param request CanAccessRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and UserResponse
         */
        public canAccess(request: userService.ICanAccessRequest, callback: userService.UserService.canAccessCallback): void;

        /**
         * Calls canAccess.
         * @param request CanAccessRequest message or plain object
         * @returns Promise
         */
        public canAccess(request: userService.ICanAccessRequest): Promise<userService.UserResponse>;
    }

    namespace UserService {

        /**
         * Callback as used by {@link userService.UserService#canAccess}.
         * @param error Error, if any
         * @param [response] UserResponse
         */
        type canAccessCallback = (error: (Error|null), response?: userService.UserResponse) => void;
    }

    /** Properties of a CanAccessRequest. */
    interface ICanAccessRequest {

        /** CanAccessRequest token */
        token?: (string|null);

        /** CanAccessRequest authPointName */
        authPointName?: (string|null);
    }

    /** Represents a CanAccessRequest. */
    class CanAccessRequest implements ICanAccessRequest {

        /**
         * Constructs a new CanAccessRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: userService.ICanAccessRequest);

        /** CanAccessRequest token. */
        public token: string;

        /** CanAccessRequest authPointName. */
        public authPointName: string;

        /**
         * Creates a new CanAccessRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CanAccessRequest instance
         */
        public static create(properties?: userService.ICanAccessRequest): userService.CanAccessRequest;

        /**
         * Encodes the specified CanAccessRequest message. Does not implicitly {@link userService.CanAccessRequest.verify|verify} messages.
         * @param message CanAccessRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userService.ICanAccessRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CanAccessRequest message, length delimited. Does not implicitly {@link userService.CanAccessRequest.verify|verify} messages.
         * @param message CanAccessRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userService.ICanAccessRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CanAccessRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CanAccessRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userService.CanAccessRequest;

        /**
         * Decodes a CanAccessRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CanAccessRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userService.CanAccessRequest;

        /**
         * Verifies a CanAccessRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CanAccessRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CanAccessRequest
         */
        public static fromObject(object: { [k: string]: any }): userService.CanAccessRequest;

        /**
         * Creates a plain object from a CanAccessRequest message. Also converts values to other types if specified.
         * @param message CanAccessRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userService.CanAccessRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CanAccessRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserResponse. */
    interface IUserResponse {

        /** UserResponse id */
        id?: (number|null);

        /** UserResponse username */
        username?: (string|null);

        /** UserResponse name */
        name?: (string|null);

        /** UserResponse roles */
        roles?: (userService.IRoleResponse[]|null);

        /** UserResponse createdAt */
        createdAt?: (string|null);

        /** UserResponse updatedAt */
        updatedAt?: (string|null);
    }

    /** Represents a UserResponse. */
    class UserResponse implements IUserResponse {

        /**
         * Constructs a new UserResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: userService.IUserResponse);

        /** UserResponse id. */
        public id: number;

        /** UserResponse username. */
        public username: string;

        /** UserResponse name. */
        public name: string;

        /** UserResponse roles. */
        public roles: userService.IRoleResponse[];

        /** UserResponse createdAt. */
        public createdAt: string;

        /** UserResponse updatedAt. */
        public updatedAt: string;

        /**
         * Creates a new UserResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserResponse instance
         */
        public static create(properties?: userService.IUserResponse): userService.UserResponse;

        /**
         * Encodes the specified UserResponse message. Does not implicitly {@link userService.UserResponse.verify|verify} messages.
         * @param message UserResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userService.IUserResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserResponse message, length delimited. Does not implicitly {@link userService.UserResponse.verify|verify} messages.
         * @param message UserResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userService.IUserResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userService.UserResponse;

        /**
         * Decodes a UserResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userService.UserResponse;

        /**
         * Verifies a UserResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserResponse
         */
        public static fromObject(object: { [k: string]: any }): userService.UserResponse;

        /**
         * Creates a plain object from a UserResponse message. Also converts values to other types if specified.
         * @param message UserResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userService.UserResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoleResponse. */
    interface IRoleResponse {

        /** RoleResponse id */
        id?: (number|null);

        /** RoleResponse name */
        name?: (string|null);
    }

    /** Represents a RoleResponse. */
    class RoleResponse implements IRoleResponse {

        /**
         * Constructs a new RoleResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: userService.IRoleResponse);

        /** RoleResponse id. */
        public id: number;

        /** RoleResponse name. */
        public name: string;

        /**
         * Creates a new RoleResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoleResponse instance
         */
        public static create(properties?: userService.IRoleResponse): userService.RoleResponse;

        /**
         * Encodes the specified RoleResponse message. Does not implicitly {@link userService.RoleResponse.verify|verify} messages.
         * @param message RoleResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: userService.IRoleResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoleResponse message, length delimited. Does not implicitly {@link userService.RoleResponse.verify|verify} messages.
         * @param message RoleResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: userService.IRoleResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoleResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoleResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): userService.RoleResponse;

        /**
         * Decodes a RoleResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoleResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): userService.RoleResponse;

        /**
         * Verifies a RoleResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoleResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoleResponse
         */
        public static fromObject(object: { [k: string]: any }): userService.RoleResponse;

        /**
         * Creates a plain object from a RoleResponse message. Also converts values to other types if specified.
         * @param message RoleResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: userService.RoleResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoleResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
