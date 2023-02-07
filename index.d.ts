declare module 'vatom-spaces-plugins' {

    /** Details about a plugin */
    interface PluginDetails {
        id: string,
        name: string,
        description: string,
        business_id: string,
        version: number
    }

    /** Event that contains information from an input capture */
    interface InputCaptureEvent {
        /** Width of the current window. */
        windowWidth: number,
        /** Height of the current window. */
        windowHeight: number,
        /** Identifier of the object given when the request started. */
        objectID: string,
        /** World co-ordinates of the hit point (only if an object identifier was given). */
        point?: { x: number, y: number, z: number },
        /** UV co-ordinates of the hit point (only if an object identifier was given). Useful for interacting with 2D content on a 3D plane. */
        uv?: { x: number, y: number }
    }

    /** Options relating to playback of audio */
    interface AudioOptions {
        /** Position in the x axis. */
        x: number,
        /** Position in the y axis. */
        height: number,
        /** Position in the z axis. */
        y: number,
        /** Radius around the position in which to play the sound. */
        radius: number,
        /** Volume at which to play the sound. Value should be between 0 and 1. Default is 1, which indicates full volume. */
        volume: number
    }

    /** Used for registering hooks that propagate client-side */
    interface Hook {
        /** Name of the hook. */
        name: string,
        /** Function to execute when the hook is triggered. */
        callback: HookCallback
    }

    /** Options used when creating a texture */
    interface TextureOptions {
        /** Width of the texture. Should be a power of 2. */
        width: number,
        /** Height of the texture. Should be a power of 2. */
        height: number
    }

    /** Represents a map item that can be found in the space */
    interface MapItem {
        /** Identifier of this item. */
        id: string,
        /** `true` if this item is an avatar, `false` otherwise. */
        isAvatar: boolean,
        /** Properties for this item. */
        properties: { id: string, type: string, x: number, height: number, y: number, locked: boolean, targetable: boolean, collide: boolean },
        /**
         * Updates the properties of this object.
         * @param props Properties that should be updated.
         * @param save `true` to save this change to the database (only allowed by admins), `false` to keep the object client-side. Default is `false`.
         * @param merge `true` to set the given properties as the item properties, overriding any properties not given. `false` to combine the given properties with the existing properties. Default is `false`.
         */
        updateProperties: (props: {}, save: boolean = false, merge: boolean = false) => Promise<void>,
        /**
         * Called when this item has been clicked.
         * @param emit `true` to notify any `"click"` event listeners, `false` otherwise. Default is `true`
         * @param raycastHit Hit from the raycast. Default is `null`.
         */
        onClick: (emit: boolean = true, raycastHit: RaycastHit = null) => void
    }

    /** Represents a map item that is used by avatars */
    interface AvatarMapItem extends MapItem {
        /** Name of the user. */
        displayName: string,
        /** Color of the user. */
        color: string,
        /** Volume of the user, in dB. */
        volume: number,
        /** `true` if the user is muted, `false` otherwise. */
        muted: boolean,
        /** `true` if the user is speaking, `false` otherwise. */
        isSpeaking: boolean,
        /** `true` if this is the primary item for the user. */
        isPrimary: boolean
    }

    /** Data related to registering a new avatar */
    interface AvatarData {
        /** Identifier for the avatar. */
        id: string,
        /** Name of the avatar. */
        name: string,
        /** Type of the avatar. */
        type: string,
        /** URL to the avatar model. */
        modelURL?: string,
        /** Properties for the avatar. */
        properties?: {}
    }

    /** Data related to a single user */
    interface UserData {
        /** Identifier for this user. */
        id: string,
        /** Name of this user. */
        name: string,
        /** Database identifier for this user. */
        userID: string,
        /** Role for this user. */
        role?: string
    }

    /** Options for the animation overriding */
    interface AnimationOverrideOptions {
        /** Name of the animation to play, without the skeleton name. */
        animation: string,
        /** Name of the animation to play before the main animation, without the skeleton name. */
        animation_start?: string,
        /** Name of the animation to play when ending the override, without the skeleton name. */
        animation_end?: string,
        /** Amount of times to play the animation for, or `true` to loop forever. Default is 1. */
        loop?: number | boolean,
        /** Locks the avatar into moving at this fixed speed per second (user won't be able to move their avatar while the animation is running). Specify `{ x: 0, y: 0, z: 0 }` to lock the avatar in place. */
        fixed_movement?: { x: number, y: number, z: number },
        /** Can be `"smooth"` (default) to wait for the animation cycle to complete, `"immediate"` to cancel the animation immediately when the user moves, or `"none"` to not allow the user to cancel movement. */
        cancel_mode?: "smooth" | "immediate" | "none",
        /** `true` to merge the animation with the default animations for walk, run etc. */
        merge?: boolean
    }

    /** Represents a hit from a raycast */
    interface RaycastHit {
        mapItem: MapItem,
        distance: number,
        point?: { x: number, y: number, z: number },
    }

    /** Options relating to performing a raycast */
    interface RaycastOptions {
        /** Point, with values between 0 and 1, determing the co-ordinate on the screen. Use `{ x: 0.5, y: 0.5 }` to pick from the center of the screen. */
        screenPosition: { x: number, y: number },
        /** Start of the ray in 3D space. */
        worldPosition: { x: number, y: number, z: number },
        /** Direction of the ray. Ignored if `screenPosition` is given. */
        worldDirection: { x: number, y: number, z: number },
        /** Length of the ray. Default is infinity. */
        length: number,
        /** `true` to only hit items with `collide === true` set, `false` to hit all items. */
        collision: boolean
    }

    /** Event that contains information from a component being clicked */
    interface ComponentClickEvent {
        /** Point at which the click hit, in world space. */
        position: { x: number, y: number, z: number },
        /** Position on the UV that was hit. Can be used to calculate where on a shape the click happened (e.g.: `let x = uv.x * screenWidth`) */
        uv: { x: number, y: number }
    }

    /** Callback function for an input capture event */
    type InputCaptureCallback = (event: InputCaptureEvent) => void

    /** Callback function for a hook */
    type HookCallback = (data: any) => any

    /** Type of bucket to use when interfacing with storage */
    type BucketType = "space" | "server" | "user"

    /** Base plugin class. All plugins should extend this class. */
    class BasePlugin {

        /** Identifier for this plugin */
        id: string
        /** Name of this plugin */
        name: string
        /** Description of this plugin */
        description: string
        /** Identifier of the business that this plugin belongs to */
        business_id: string
        /** Current version of this plugin */
        version: number

        /** React component for the settings panel of this plugin */
        settingsPanel: any

        /** Color of this plugin's control button when selected (if in use) */
        selectedColour: '#2DCA8C'
        /** Color of this plugin's control button when unselected (if in use) */
        unselectedColour: '#AAAAAA'
        /** Color of this plugin's control button when inactive (if in use) */
        inactiveColour: '#FA5252'

        /** Handles interaction with the main app */
        app: AppComponent
        /** Handles interaction with the audio system */
        audio: Audio
        /** Handles the registering and invoking of hooks, which are overridable global events */
        hooks: HooksComponent
        /** Handles interaction with the menu system */
        menus: Menus
        /** Handles communication between different instances of the plugin */
        messages: Messages
        /** Handles the creation and manipulation of objects in the space */
        objects: Objects
        /** Handles the manual creation of textures */
        texture: Textures
        /** Handles the management of the user's position and appearance */
        user: User
        /** Handles interaction with the world */
        world: World
        /** Handles interaction with the storage system */
        storage: StorageComponent

        /** Called when the plugin is loaded */
        onLoad(): void

        /** Called when the plugin is unloaded (usually from uninstalling the plugin) */
        onUnload(): void

        /** Called when the settings for this plugin have changed */
        onSettingsUpdated(): void

        /**
         * Called when this plugin has received a message originating from this same plugin.
         * @param msg Message that has been received.
         * @param fromID Identifier of the user who sent the message.
         */
        onMessage(msg: any, fromID: string): void

        /**
         * Called when this plugin has received a request. The first instance
         * with a truthy return value is used as the response.
         * @param msg Message that has been requested.
         * @param fromID Identifier of the user who sent the message.
         */
        onRequest(msg: any, fromID: string): void

        /**
         * Called when the current user has moved.
         * @param x Position of the user in the `x` axis.
         * @param y Position of the user in the `y` axis.
         * @param z Position of the user in the `z` axis.
         */
        onUserMoved(x: number, y: number, z: number): void

        /** Called when the current user's profile data has changed */
        onCurrentUserUpdated(): void

        /**
         * Gets the value from the given field.
         * @param id Identifier of the field to get the value from.
         */
        getField(id: string): any

        /**
         * Sets the value of the given field, which only admins can do.
         * @param id Identifier of the field to set.
         * @param value Value to set the field to.
         */
        setField(id: string, value: any): void

        /**
         * Gets the component field for a given object.
         * @param objectID Identifier of the object to get the component field for.
         * @param componentID Identifier of the component to get the field for.
         * @param name Name of the field.
         * @returns Value of the component field.
         */
        getComponentField(objectID: string, componentID: string, name: string): any

    }

    /** Handles interaction with the main app */
    class AppComponent {

        /**
         * Requests the platform to use this plugin in a trusted environment.
         * @returns `true` if this plugin is allowed to be used in a trusted environment, `false` otherwise.
         */
        requestTrustedSwitch(): boolean

        /**
         * Gets details about the plugin if it has been loaded, otherwise it returns `null`.
         * @param id Identifier of the plugin to get details for.
         */
        getPluginDetails(id: string): PluginDetails

        /**
         * Checks if the given object has its input captured by a plugin.
         * @param id Identifier of the object that should be checked.
         * @returns `true` if this object has its input captured, `false` otherwise.
         */
        hasInputCapture(id: string): boolean

        /**
         * Request full input event capture. While capture is active, all keyboard and pointer events will be sent
         * to the given callback.
         *
         * When capturing ends, one last message will be sent, equivalent to:
         * ```js
         * this.messages.send({ type: "input-capture-ended" })
         * ```
         * @param id Identifier of the object to capture input for.
         * @param callback Function to execute when receiving an event.
         */
        requestInputCapture(id: string, callback: InputCaptureCallback): void

        /** Stops the current input capture, if any. */
        stopInputCapture(): void

    }

    /** Handles interaction with the audio system */
    class Audio {

        /**
         * Preloads a sound, so that the call to `play()` does not have to wait.
         * @param url URL to the sound effect.
         */
        preload(url: string): void

        /**
         * Plays audio in the space. Should only be used for small audio files.
         * @param url URL to the sound file.
         * @param options Options relating to the playback.
         * @returns Identifier of the audio source that is being played, or `null` if something went wrong.
         */
        play(url: string, options: AudioOptions): Promise<string> | null

        /**
         * Stops playing an audio source with the matching identifier.
         * @param id Identifier of the audio source to stop.
         */
        stop(id: string): void

    }

    /** Handles the registering and invoking of hooks, which are overridable global events. */
    class HooksComponent {

        /** Array of all registered hooks */
        registeredHooks: Hook[]

        /**
         * Registers a hook event handler.
         * @param name Name of the hook.
         * @param callback Function to be called. If this function returns a truthy value, the hook is interrupted.
         */
        addHandler(name: string, callback: HookCallback): void

        /**
         * Removes a hook event handler.
         * @param name Name of the hook.
         * @param callback Function that was used for the hook.
         */
        removeHandler(name: string, callback: HookCallback): void

        /**
         * Triggers a hook that matches the given name. If any handler returns a
         * truthy value, hook processing will stop and that value will be returned.
         * @param name Name of the hook.
         * @param data Any data to be passed to the handlers.
         * @returns Response from the first handler with a truthy value, or else false.
         */
        trigger(name: string, data: any): Promise<any>

        /**
         * Triggers a hook and returns all truthy responses.
         * @param name Name of the hook.
         * @param data Any data to be passed to the handlers.
         * @returns All truthy responses.
         */
        triggerAll(name: string, data: any): Promise<any[]>

    }

    /** Handles interaction with the menu system */
    class Menus {

        /**
         * Registers a new menu item.
         *
         * Available `section` parameters are:
         * - `"controls"` : Displays the menu item in the bottom control bar. If a panel is specified, it will open in the accordion.
         * - `"usermenu"` : Displays the menu item as an action in the panel that appears when clicking on a user. Properties `currentUser` and `otherUsers` use this section.
         * - `"infopanel"` : Displays the panel permanently as a transparent overlay in the top-right. Good place for information such as tasks to complete, etc.
         * - `"overlay-top"` : Displays the panel permanently as a transparent overlay along the top of the app. This obstructs user controls, so it should only be used for short alerts before being removed.
         * - `"plugin-settings"` : Displays the panel when a user clicks the "Settings" button next to a plugin. Only one of this type should be registered per plugin. Only accessible to admin users.
         * - `"start-screen"` : Adds this panel as an option under File > Settings > Welcome Screen. The selected screen can be displayed instead of the normal start screen. Only accessible to admin users.
         * - `"file-menu"` : Displays the menu item under the File dropdown in the top admin menu bar. Only accessible to admin users.
         * - `"insert-object"` : Displays an item in the Insert menu.
         * - `"admin-panel"` : Displays the menu item in the container shown when clicking the "Admin" button in the bottom menu bar. Only accessible to admin users.
         * - `"bottom-accordion"` : Displays a panel that will permanently appear at the bottom of the accordion.
         *
         * @param {object} args Menu configuration
         * @param {string} args.id Identifier of the menu item.
         * @param {string} args.icon URL to the icon for the menu.
         * @param {string} args.text Text to display under the icon. Default is 'Text'.
         * @param {string} args.section Location of the menu item. Default is 'controls'.
         * @param {string} args.title Title of the icon.
         * @param {string} args.color Color that will be used for both the icon and the text.
         * @param {string} args.textColor Color that will be used for just the text. Defaults to `color` if not given.
         * @param {number} args.order Sorting order for this item. Default is 0.
         * @param {boolean} args.persistent `true` when the menu item should stay either on or off (e.g: mute/unmute or avatar video), `false` otherwise. Default is `false`.
         * @param {boolean} args.useRawIcon `true` to use the actual icon provided (instead of changing icon color), `false` to change icon color based on `color` field. Default is `false`.
         * @param {boolean} args.adminOnly `true` to hide the menu item from non-admins, `false` to show the menu item to non-admins. Default is `false`.
         * @param {boolean} args.currentUser If specified, and section == 'usermenu', the menu icon appears on the current user's menu bar
         * @param {boolean} args.otherUsers Default = "true". If false, and section == 'usermenu', the menu icon does not appear on other user's menu bar
         * @param {number} args.badgeCount Number to show as a notification badge on the menu item. Does not display a badge for values <= 0.
         * @param {Function} args.action If specified, this function will be called when the button is pressed.
         * @param {object} args.panel If specified, a panel will be displayed when this menu item is clicked.
         * @param {Component} args.panel.iframeURL The URL to display in the panel's iframe.
         * @param {Component} args.panel.component A React component to display. The component will receive these props: `plugin`, `onClose`
         * @param {boolean} args.panel.alwaysRender If true, the panel is always running and just made hidden when not opened.
         * @param {number} args.panel.width The width of the panel. Default = 320.
         * @param {number} args.panel.maxHeight Maximum height (in pixels) that the panel should be. Defaults to the height of the content inside.
         * @returns {string} Identifier for the menu item.
         */
        register(args): string

        /**
         * Updates the fields for the given menu item.
         * @param {string} id Identifier of the menu item to update.
         * @param {object} changes Changes to make to the menu item.
         */
        update(id, changes): void

        /**
         * Unregisters an existing menu item.
         * @param {string} id Identifier for the menu item to unregister.
         */
        unregister(id): void

        /** Display a popup UI. See register() for a description of the `args` parameters.
         * @param {object }args popup configuration
         * @param {string} args.title Title of popup
         * @param {object} args.panel Component that is being displayed
         * @param {string} args.panel.iframeURL URL of iframe shown in popup
         * @param {number} args.panel.width Width of panel
         * @param {number} args.panel.height Height of panel
         *
        */
        displayPopup(args): void

    }

    /** Handles communication between different instances of the plugin */
    class Messages {

        /**
         * Send a message to all instances of this plugin on other devices.
         * Message will be received in the `onMessage` method.
         * @param msg Message to send.
         * @param isGlobal `true` to send to everyone on the entire server, `false` to send to everyone within rendering range. Default is `false`.
         * @param targetUserID If given, it is the identifier of a user to send a message to (regardless of where that user is). Default is ''.
         * @param objectID If given, this object identifier will be attached to the sent payload. Default is ''.
         * @param componentID If given, this component identifier will be attached to the sent payload. Default is ''.
         */
        send(msg: any, isGlobal: boolean = false, targetUserID: string = '', objectID: string = '', componentID: string = ''): void

        /**
         * Send a message to all instances of this plugin on other devices, and
         * then wait for the first response.
         * @param msg Message to send.
         * @param isGlobal `true` to send to everyone on the entire server, `false` to send to everyone within rendering range. Default is `false`.
         * @param targetUserID If given, it is the identifier of a user to send a message to (regardless of where that user is). Default is ''.
         * @param objectID If given, this object identifier will be attached to the sent payload. Default is ''.
         * @param componentID If given, this component identifier will be attached to the sent payload. Default is ''.
         * @returns Response from the request.
         */
        request(msg: any, isGlobal: boolean = false, targetUserID: string = '', objectID: string = '', componentID: string = ''): Promise<any>

    }

    /** Handles the creation and manipulation of objects in the space */
    class Objects {

        /** All registered components for this plugin */
        components: Array<any>

        /** Active component instances */
        componentInstances: Array<any>

        /** Gets all objects */
        all(): Array<any>

        /**
         * Creates a new object. Will be created as a client-only object, unless
         * `clientOnly: false` is specified.
         * @param {object} options Options relating to the object to create.
         * @param {number} options.x X co-ordinate to place the object.
         * @param {number} options.height Y co-ordinate to place the object.
         * @param {number} options.y Z co-ordinate to place the object.
         * @param {boolean} options.clientOnly `true` to only create this object for yourself, `false` to create for everyone in the space. Default is `true`.
         * @param {object} options.position Position to place the object.
         * @param {number} options.position.x X co-ordinate to place the object.
         * @param {number} options.position.y Y co-ordinate to place the object.
         * @param {number} options.position.z Z co-ordinate to place the object.
         * @returns {string} Identifier of the object that has been created.
         */
        create(options): string

        /**
         * Creates a status item that appears above a user's avatar. Will always be
         * a client-only object.
         * @param {object} options Options relating to the status item.
         * @param {number} options.userID Identifier of the user you would like to create this item for. Default is your own user ID.
         * @param {number} options.order Order in which to display this status item.
         * @param {number} options.size Size of the status item.
         * @param {number} options.width Width of the status item.
         * @param {number} options.height Height of the status item.
         * @param {object} properties Properties of the status item to create.
         * @param {string} properties.id Identifier for this item.
         * @param {"text"|"image"} properties.type Type of item to show. Only supports text or image items.
         * @param {string} properties.url URL to an image to show.
         * @param {string} properties.text Text to show.
         * @param {string} properties.textColour Color of the text to show. Default is #FFFFFF.
         * @param {boolean} properties.textBold `true` to show the text as bold, `false` otherwise. Default is `false`.
         * @param {boolean} properties.textItalics `true` to show the text as italics, `false` otherwise. Default is `false`.
         * @returns {any} Identifier of the status item that has been created, or `null` if some issue occurred.
         */
        createStatusItem(options, properties): any

        /**
         * Creates a top status icon that appears above a user's avatar. Will always be
         * a client-only object.
         * @param {object} options Options relating to the top status icon.
         * @param {number} options.userID Identifier of the user you would like to create this item for. Default is your own user ID.
         * @param {number} options.order Order in which to display this top status icon.
         * @param {number} options.size Size of the top status icon.
         * @param {number} options.width Width of the top status icon.
         * @param {number} options.height Height of the top status icon.
         * @param {object} properties Properties of the top status icon to create.
         * @returns {any} Identifier of the top status icon that has been created, or `null` if some issue occurred.
         */
        createTopStatusIcon(options, properties): any

        /**
         * Updates an existing object.
         * @param {string} id Identifier of the object to update.
         * @param {object} options Properties of the object to update.
         * @param {number[]} options.position X, Y, Z containing the new position. Local only.
         * @param {number[]} options.quaternion X, Y, Z, W containing the new quaternion rotation. Local only.
         * @param {boolean} localOnly If true, only the local value of fields are changed. NOTE: If the remote object is updated, it will be overwritten again.
         */
        update(id, options, localOnly): void

        /**
         * Updates an existing status item.
         * @param {string} userID Identifier of the user to update the status item for.
         * @param {string} itemID Identifier of the status item to update.
         * @param {object} properties Properties of the object to update.
         * @param {string} properties.url URL to an image to show.
         * @param {string} properties.textValue Text to show.
         * @param {string} properties.textColour Color of the text to show. Default is #FFFFFF.
         * @param {boolean} properties.textBold `true` to show the text as bold, `false` otherwise. Default is `false`.
         * @param {boolean} properties.textItalics `true` to show the text as italics, `false` otherwise. Default is `false`.
         */
        updateStatusItem(userID, itemID, properties): void

        /**
         * Updates an existing top status icon.
         * @param {string} userID Identifier of the user to update the top status icon for.
         * @param {string} itemID Identifier of the top status icon to update.
         * @param {object} properties Properties of the object to update.
         */
        updateTopStatusIcon(userID, itemID, properties): void

        /**
         * Removes an object.
         * @param {string} id Identifier of the object to remove.
         * @param {object} options Options relating to the removal of the object.
         * @param {boolean} options.clientOnly `true` if we only want to remove this object for this user, `false` if we want to remove it from the server.
         */
        remove(id, options): void

        /**
         * Removes the status item that matches the given identifier.
         * @param {string} userID Identifier of the user to remove the status item from.
         * @param {string} itemID Identifier of the status item to remove.
         */
        removeStatusItem(userID, itemID): void

        /**
         * Removes the top status icon that matches the given identifier.
         * @param {string} userID Identifier of the user to remove the top status icon from.
         * @param {string} itemID Identifier of the top status icon to remove.
         */
        removeTopStatusIcon(userID, itemID): void

        /**
         * Animates an object.
         * @param {object} options Animation options.
         * @param {string} options.target Identifier of the object to animate.
         * @param {object} options.final Final properties of the object after the animation finishes.
         * @param {string} options.field Field to animate.
         * @param {any} options.value Final value to animate to.
         * @param {number} options.duration Number of milliseconds to show the animation for.
         * @param {number} options.delay Number of milliseconds to wait before starting the animation.
         * @param {boolean} options.save `true` to save the final state (after the animation completes) to the database, `false` otherwise.
         */
        animate(options): void

        /**
         * Converts from euler angles (in radians) to quaternion.
         * @param {object} euler Euler angles to convert.
         * @returns {object} Quaternion.
         */
        eulerToQuat(euler): object

        /**
         * Converts from quaternion angles to euler in radians.
         * @param {object} quat Quaternion angles to convert.
         * @returns {object} Euler angles.
         */
        quatToEuler(quat): object

        /** Get properties of an object
         * @param id Identifier of the object to get animations for
         * @returns {object} Properties of object associated with given identifier
        */
        get(id): object

        /**
         * Gets the rotation, as a quaternion, for the given object.
         * @param {string} id Identifier of the object to get the rotation for.
         * @returns {object} Rotation, as a quaternion, for the given object.
         */
        getRotationQuat(id): object

        /**
         * Gets the rotation, as Euler angles in radians, for the given object.
         * @param {string} id Identifier of the object to get the rotation for.
         * @returns {object} Rotation, as Euler angles in radians, for the given object.
         */
        getRotationEuler(id): object

        /** Gets all the current component instances that exist */
        getComponentInstances(): Array<any>

        /**
         * Fetch all objects within a radius.
         * @param {number} x X coord of the center of the circle
         * @param {number} y Y coord of the center of the circle
         * @param {number} radius Radius of the circle.
         * @returns {object[]} Array of objects.
         */
        fetchInRadius(x, y, radius): Array<object>

        /**
         * Get animations of an object as a JSON string
         * @param {string} id Identifier of the object to get animations for.
         * @returns {string} JSON string of all animations associated with this object
         */
        getAnimations(id): string

        /**
         * Register a component class so that it can be attached to objects.
         * @param {Class} Cls The component class.
         * @param {object} info Details about the component.
         * @param {string} info.id The component ID.
         * @param {string} info.name User readable name for this component.
         * @param {string} info.description Description of the component.
         * @param {string[]} info.only Types of objects that this component is allowed to attach to. Example: `['plane', 'circle']` to only allow this component to be attached to planes and circles.
         * @param {boolean} info.serverTick If enabled, the plugin will run onServerTick() on the backend every 30 seconds. Note that much functionality will be missing in that environment.
         * @param {array} info.settings An array describing the settings to show in the editor panel.
         */
        registerComponent(Cls, info): void

        /**
         * Moves an object to a position.
         * @param {object} taretPosition Position to move the object to.
         * @param {string} objectID Identifier of the object.
         * @param {string} speed Speed to move the object at.
         * @returns {boolean} `true` if succesful, `false` otherwise.
         */
        move(targetPosition, speed, objectID): boolean

        /**
         * Set your user to follow an object
         * @param {string} objectID ID of the object
         * @param {string} speed Speed to move the object at
         */
        toggleFollow(objectID): void

        /** Registers the specified animations with the system
         * @param {string} url URL of animations that you wish to register
         */
        registerAnimations(url): void

    }

    /** Handles the manual creation of textures */
    class Textures {

        /**
         * Creates a new texture. The `id` property of the OffscreenCanvas can be used as the `url` of an object.
         * @param options Options for the texture.
         * @returns Offscreen canvas element that can be drawn to.
         */
        create(options: TextureOptions): OffscreenCanvas

        /**
         * Updates the texture matching the given identifier.
         * @param id Identifier of the texture to update.
         */
        update(id: string): void

        /**
         * Removes a texture.
         * @param id Identifier of the texture to remove.
         */
        remove(id: string): void

    }

    /** Handles the management of the user's position and appearance */
    class User {

        /** @returns Position of the current user */
        getPosition(): { x: number, y: number, z: number }

        /**
         * Sets the position of the current user.
         * @param x Position in the x direction.
         * @param y Position in the y direction.
         * @param z Position in the z direction.
         * @param instant `true` to move instantly to the given position, `false` to glide to the given position. Default is `false`.
         * @param keepFollow `true` to keep following the user you are currently following (if any), `false` to disconnect the follow. Default is `true`.
         */
        setPosition(x: number, y: number, z: number, instant: boolean = false, keepFollow: boolean = true): void

        /**
         * Gets the current user rotation.
         * @param deg `true` to return rotation in degrees, `false` to return in radians. Default is `false`.
         * @returns Rotation in radians (or degrees if `deg === true`).
         */
        getRotation(deg: boolean = false): number

        /**
         * Sets the current user rotation.
         * @param r Rotation to set the user to.
         * @param deg `true` to indicate that the given rotation is in degrees, `false` to indicate that it is in radians. Default is `false`.
         */
        setRotation(r: number, deg: boolean = false): void

        /**
         * Gets the orientation of the current user.
         * @param deg `true` to return the orientation in degrees, `false` to return in radians. Default is `false`.
         * @returns Orientation of the current user.
         */
        getOrientation(deg: boolean = false): number

        /**
         * Sets the orientation of the current user.
         * @param o Orientation to set for the current user.
         * @param deg `true` to indicate that the given orientation is in degrees, `false` to indicate that it is in radians. Default is `false`.
         */
        setOrientation(o: number, deg: boolean = false): void

        /** Identifier of the current user */
        getID(): string

        /** Display name of the current user */
        getDisplayName(): string

        /** @returns `true` if your user is following another user or object, `false` otherwise */
        getFollow(): boolean

        /**
         * Set the current user to follow the user or object matching the given identifier.
         * @param id Identifier of the user or object to follow.
         */
        setFollow(id: string): void

        /** Release your user from following the currently followed user or object (if applicable). */
        releaseFollow(): void

        /**
         * Gets a property from a user specific to this plugin.
         * @param id Identifier of the user to get the property for. Leave blank for the current user.
         * @param propertyName Name of the property to fetch. Prefix it with 'space:' to get it for this space only.
         * @returns Property value, or `null` if something went wrong.
         */
        getProperty(id?: string, propertyName?: string): any

        /**
         * Gets user properties specific to this plugin.
         * @param id Identifier of the user to get properties from. Leave blank for the current user.
         * @returns Properties for the given user, or `null` if something went wrong.
         */
        getProperties(id?: string): {}

        /**
         * Sets user properties specific to this plugin.
         * @param props Properties to set.
         */
        setProperties(props: {}): void

        /** `true` if the current user is an admin in this space, `false` otherwise */
        isAdmin(): boolean

        /**
         * Registers a new avatar.
         * @param avatar Information about the avatar to register.
         */
        registerAvatar(avatar: AvatarData): void

        /**
         * Removes a registered avatar.
         * @param id Identifier of the avatar you wish to remove.
         */
        unregisterAvatar(id: string): void

        /** @returns Avatar data for the current user, or `null` if using the default avatar. */
        getAvatarData(): AvatarData | null

        /**
         * Asks the user to immediately switch to the specified avatar data.
         * Returns `false` if the user denied the change request.
         * @param avatar Avatar you wish to set new data for.
         */
        setAvatarData(avatar: AvatarData): void

        /**
         * Override the avatar's current animation. Note that for all animation
         * names, don't include the skeleton name. For example if you want to
         * play a walk animation, specify `"walk"` and not `"humanoid.walk"`.
         * The animation prefix will be automatically added based on which type
         * of avatar the current user is using.
         * @param options Options describing how to override the animations. Specify `null` to cancel any current animations.
         * @returns `true` if the animation ended normally, `false` if it was interrupted.
         */
        overrideAvatarAnimation(options?: AnimationOverrideOptions): Promise<boolean>

        /**
         * Gets the location of a user matching the given identifier.
         * @param id Identifier of user you wish to get location for.
         * @returns Location of a user that matches the given identifier, or `null` if no such user was found.
         */
        getUserLocation(id: string): { x: number, y: number, z: number } | null

        /**
         * Gets a list of nearby users.
         * @param maxDistance Maximum distance away, in metres, to search for users. If no value is specified, all users within rendering range will be returned.
         * @returns List of users that were found.
         */
        getNearbyUsers(maxDistance?: number): UserData[]

        /**
         * Show a shut down screen for user.
         * @param message Message you wish to display on the shut down screen.
         * @param title Title you wish to display on the shut down screen.
         * @param buttonText Text of the button shown on the shut down screen. Default is "Try again".
         * @param buttonAction Action you wish the shut down screen button to take when clicked. Default is `e => location.reload()`.
         */
        showShutDownScreen(message: string, title: string, buttonText?: string, buttonAction?: (evt) => void): void

        /** Shows the selection screen for a user avatar. */
        showAvatarSelectPopup(): void

        /**
         * Send a generic analytics event.
         * @param name Name of the event.
         * @param value Value associated with given name.
         */
        sendAnalytics(name: string, value: any): void

    }

    /** Handles interaction with the world */
    class World {

        /** @returns Identifier for this space. */
        getID(): string

        /** @returns Identifier for this space instance. */
        getInstanceID(): string

        /** @returns Unique session identifier for the current session. */
        getSessionID(): string

        /** @returns Name of the space the user is currently in. */
        getSpaceName(): Promise<string>

        /**
         * Performs a raycast and returns the hit object(s).
         * @param options Configurable options for the raycast.
         * @returns Object(s) that have been hit by the raycast.
         */
        raycast(options?: RaycastOptions): RaycastHit[]

    }

    /** Handles interaction with the storage system */
    class StorageComponent {

        /**
         * Puts a file into storage and returns the URL to the item.
         * @param bucket Storage bucket to put item in.
         * @param path Path of where in the bucket you wish to store the item.
         * @param url URL of the item you are storing.
         * @returns Storage URL of the item you just stored, or `null` something went wrong.
         */
        put(bucket: BucketType, path: string, url: string): Promise<string> | null

        /**
         * Gets the URL of a file in storage.
         * @param bucket Storage bucket which the item belongs to.
         * @param path Path of item inside storage.
         * @returns Storage URL of the item found, or `null` if nothing is found.
         */
        getURL(bucket: BucketType, path: string): Promise<string>

    }

    /** Represents a plugin component that is attached to an object. */
    class BaseComponent {

        /** Reference to the plugin */
        plugin: BasePlugin

        /** Identifier of this component */
        componentID: string

        /** Identifier of the object this component is associated with */
        objectID: string

        /** Map item that this component is attached to */
        mapItem: MapItem

        /** Current object fields */
        fields: {}

        /** Called when the object is loaded */
        onLoad(): void

        /** Called when the object is deleted or the component is uninstalled */
        onUnload(): void

        /**
         * Called when the fields have changed for this object.
         * @param newFields Updated fields.
         */
        onObjectUpdated(newFields: {}): void

        /**
         * Called when the user clicks on the object.
         * @param event Click event information for the object.
         */
        onClick(event: ComponentClickEvent): void

        /**
         * Gets a component configuration field.
         * @param id Identifier of the field to get the value for.
         * @returns Value of the field matching the given identifier.
         */
        getField(id: string): any

        /**
         * Sets a component configuration field (only admins can successfully do this)
         * @param id Identifier of the field to set.
         * @param value Value to set the field to.
         */
        setField(id: string, value: any): void

        /**
         * Sets multiple fields at once (only admins can successfully do this)
         * @param fields Fields to set.
         */
        setFields(fields: {}): void

        /**
         * Send a message to all instances of this component on other devices.
         * @param msg Message to send.
         * @param isGlobal `true` to send to everyone on the entire server, `false` to send to everyone within rendering range. Default is `false`.
         * @param targetUserID If given, it is the identifier of a user to send a message to (regardless of where that user is). Default is ''.
         */
        sendMessage(msg: any, isGlobal: boolean = false, targetUserID: string = ''): void

        /**
         * Send a message to all instances of this component on other devices. The first truthy response from the `onRequest(msg)` method will be returned.
         * @param msg Message to send.
         * @param isGlobal `true` to send to everyone on the entire server, `false` to send to everyone within rendering range. Default is `false`.
         * @param targetUserID If given, it is the identifier of a user to send a message to (regardless of where that user is). Default is ''.
         * @returns Response from the request.
         */
        sendRequest(msg: any, isGlobal: boolean = false, targetUserID: string = ''): Promise<any>

    }

    export = { BasePlugin, BaseComponent }

}
