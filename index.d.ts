declare module 'vatom-spaces-plugins' {
    
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
        selectedColour: string
        /** Color of this plugin's control button when unselected (if in use) */
        unselectedColour: string
        /** Color of this plugin's control button when inactive (if in use) */
        inactiveColour: string

        /** Handles interaction with the main app */
        app: AppComponent
        /** Handles interaction with the audio system */
        audio: Audio
        /** Handles the registering and invoking of hooks, which are overridable global events. */
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

        /** Called on plugin load */
        onLoad(): void

        /** Called on plugin unload */
        onUnload(): void

        /** Called when the settings for this plugin have changed */
        onSettingsUpdated(): void

        /** Called on all instances when you call `this.messages.send()`. 
         * @param {object} msg message sent to all instances
         * @param {string} fromID ID of message sender
         */
        onMessage(msg, fromID): void

        /** Called on all instances when you call `this.messages.request()`. The first instance with a truthy return value is used as the response. 
         * @param {object} msg message sent to all instances
         * @param {string} fromID ID of message sender
         */
        onRequest(msg, fromID): void

        /**
         * Called when the user's position moves from the given co-ordinates
         * @param {number} x x co-ordinate 
         * @param {number} y y co-ordinate 
         * @param {number} z z co-ordinate 
         */
        onUserMoved(x, y, z): void

        /** Called when the user's profile data is updated */
        onCurrentUserUpdated(): void

        /**
         * Gets plugin configuration field
         * @param {string} id ID of field
         * @returns {any} value of configuration field attached to given name
         */
        getField(id): any

        /**
         * Sets plugin configuration field (only admins can successfully do this)
         * @param {string} id ID of field
         * @param {any} value Value to set field to
         */
        setField(id, value): void

        /**
         * Gets the component field for a given object.
         * @param {object} object Object to get the component field for.
         * @param {string} componentID Identifier of the component to get the field for.
         * @param {string} name Name of the field.
         * @returns {string} Component field for the given object.
         */
        getComponentField(object, componentID, name): string
    }

    /** Handles interaction with the main app */
    class AppComponent {

        /**
        * Returns details about the plugin if it's loaded, or else returns null
        * @param {string} pluginID ID of plugin you are fetching details for
        */
        getPluginDetails(pluginID): object

        /**
         * Request full input event capture. While capture is active, all keyboard and pointer events will be sent
         * to your callback.
         *
         * When capturing ends, you will receive one last message with `type` equal to `"input-capture-ended"`.
         *
         * All events contain the standard PointerEvent or KeyboardEvent fields, but with these extra fields as well:
         * - `windowWidth` : Current size of the window
         * - `windowHeight` : Current size of the window
         * - `objectID` : The objectID specified when the request started.
         * - `point` : A Vector3 containing the world coordinates of the hit point. Only if objectID was set.
         * - `uv` : A Vector2 containing the UV coordinates of the hit point. Only if objectID was set. This is useful for interacting with 2D content on a 3D plane.
         *
         * @param {string} objectID Optional object to capture input for. If specified, will try to extract world coordinates and UV coordinates for each pointer event.
         * @param {function} callback The callback to send events to.
         */
        requestInputCapture(objectID, callback): void

        /** Stop the current input capture, if any. */
        stopInputCapture(): void

    }

    /** Handles interaction with the audio system */
    class Audio {
        
        /**
         * Preload a sound effect so it can be played immediately.
         * @param {string} url The sound URL
         */
        preload(url): void

        /** Plays audio in the space. Should only be used for small audio files.
        * @param {string} url URL to the sound file.
        * @param {object} options Sound options.
        * @param {number} options.radius Radius of the sound.
        * @param {number} options.x Position in the x axis.
        * @param {number} options.y Position in the y axis.
        * @param {number} options.height Height to play the audio at.
        * @param {number} options.volume Volume that the sound should play at. Value should be between 0 and 1. Default is 1, which indicates full volume.
        * @returns {Promise<string>} Identifier of the audio source that is being played, or `null` if something went wrong.
        */
        play(url, options): Promise<string>

        /**
         * Stops playing an audio source with the matching identifier.
         * @param {string} id Identifier of the audio source to stop.
         */
        stop(id): void

    }

    /** Handles the registering and invoking of hooks, which are overridable global events. */
    class HooksComponent {

        /** Array of all registered hooks */
        registeredHooks: Array<any>

        /** 
         * Register a hook 
         * 
         * @param {string} name The name of the hook.
         * @param {function} callback The function to be called. If this function returns a truthy value, the hook is interrupted.
         */
        addHandler(name, callback): void

        /** 
         * Remove a hook 
         * 
         * @param {string} name The name of the hook.
         * @param {function} callback The function to be called.
         */
        removeHandler(name, callback): void

         /**
         * Trigger a hook. If any handler returns a truthy value, hook processing will stop and that value will be returned.
         * 
         * @param {string} name Name of the hook
         * @param {any} data Any data to be passed to the handlers.
         * @returns {Promise<any>} The response from the first handler with a truthy value, or else false.
         */
        trigger(name, data): Promise<any>

        /**
         * Trigger a hook and return all truthy responses.
         * 
         * @param {string} name Name of the hook
         * @param {any} data Any data to be passed to the handlers.
         * @returns {Promise<any[]>} All truthy responses.
         */
        triggerAll(name, data): Promise<any[]>

    }

    /** Handles interaction with the menu system */
    class Menus {

        /** List of registered menu items */
        items: Array<any>

        /** List of active popup windows */
        popups: Array<any>

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
         * Send a message to all instances of your plugin. The message will be received in the onMessage function.
         * 
         * @param {object} msg The message to send.
         * @param {bool} isGlobal If true, will send to everyone on the entire server instead of just everyone within rendering range.
         * @param {string} targetUserID If specified, sends a message to a specific user, independent of where that user is.
         * @param {string} objectID If specified, attaches given objectID with the sent payload
         * @param {string} componentID If specified, attaches given componentID with the sent payload
         */
        send(msg, isGlobal, targetUserID, objectID, componentID): void

        /**
         * Send a message to all instances of the plugin, and then wait for the first response.
         * 
         * @param {object} msg The message to send.
         * @param {bool} isGlobal If true, will send to everyone on the entire server instead of just everyone within rendering range.
         * @param {string} targetUserID If specified, sends a message to a specific user, independent of where that user is.
         * @param {string} objectID If specified, attaches given objectID with the sent payload
         * @param {string} componentID If specified, attaches given componentID with the sent payload
         * @returns {Promise<*>} The response.
         */
        request(msg, isGlobal, targetUserID, objectID, componentID): Promise<any>
        
    }

    /** Handles the creation and manipulation of objects in the space */
    class Objects {

        /** Last object ID */
        lastID: number

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

         /** Get animations of an object as a JSON string 
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

        /** Last texture ID */
        lastID: number

        /** Stored textures */
        stored: {}

        /** 
         * Create a new texture. Returns an OffscreenCanvas which can be drawn to. The OffscreenCanvas has an `id` property which can be used as the `url` of an object.
         * 
         * @param {object} options Texture options
         * @param {number} options.width Width of the texture. Should be a power of 2.
         * @param {number} options.height Height of the texture. Should be a power of 2.
         * @returns {string} A texture ID
         */
        create(options): string

        /** Update or commit texture changes 
         * @param {string} id Identifier of the texture you want to update 
         */
        update(id): void

        /**
         * Remove a texture
         * @param {string} id Identifier of the texture you want to remove
         */
        remove(id): void
    }

    /** Handles the management of the user's position and appearance */
    class User {

        /** List of registered avatars */
        registeredAvatars: Array<any>

        /** @returns Position of the current user */
        getPosition(): object

        /**
         * Sets the position of the current user.
         * @param {number} x Position in the x direction.
         * @param {number} y Position in the y direction.
         * @param {number} z Position in the z direction.
         * @param {boolean} instant `true` to move instantly to the given position, `false` to glide to the given position. Default is `false`.
         * @param {boolean} keepFollow `true` to keep following the user you are currently following (if any), `false` to disconnect the follow. Default is `true`.
         */
        setPosition(x, y, z, instant, keepFollow): void

        /**
         * Get current user rotation.
         * @param {boolean} deg `true` to return rotation in degrees, `false` to return in radians. Default is `false`.
         * @returns {number} Rotation in radians (or degrees if `deg === true`).
         */
        getRotation(deg): number

        /**
         * Sets current user rotation.
         * @param {number} r Rotation to set the user to.
         * @param {boolean} deg `true` to indicate that the given rotation is in degrees, `false` to indicate that it is in radians. Default is `false`.
         */
        setRotation(r, deg): void

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

        /** @returns {boolean} `true` if your user is following another user or object, `false` otherwise */
        getFollow(): boolean

        /**
         * Set the current user to follow the user or object matching the given identifier.
         * @param {string} id Identifier of the user or object to follow.
         */
        setFollow(id): void

        /** Release your user from following a user or an object */
        releaseFollow(): void

        /**
         * Get single user property.
         * @param {string} userID The user's ID. Leave blank for the current user.
         * @param {string} propertyName The name of the property to fetch. Prefix it with 'space:' to store for this space only.
         * @returns {any} Property value, or `null` if something went wrong.
         */
        getProperty(userID , propertyName): any

         /**
         * Get user properties specific to this plugin.
         * @param {string} userID Identifier of the user to get properties from. Leave blank for the current user.
         * @returns {any} Properties for the given user, or `null` if something went wrong.
         */
        getProperties(userID): object

        /** Set user properties specific to this plugin 
         * @param {object} props Properties you wish to set
        */
        setProperties(props): void

        /** `true` if the current user is an admin in this space, `false` otherwise */
        isAdmin(): boolean

        /** Register a new avatar 
         * 
         * Fields include:
         * - `avatar.id`: identifier of avatar (Mandatory)
         * - `avatar.name`: name of avatar (Mandatory)
         * - `avatar.type`: type of avatar (Mandatory)
         * - `avatar.modelURL`: 3D model of avatar (Mandatory)
         * - `avatar.properties`: object containing all avatar properties (Optional)
         * 
         * @param {object} avatar Avatar information used to register new avatar
        */
        registerAvatar(avatar): void

        /** Remove a registered avatar 
         * @param {string} id Identifier of avatar you wish to remove
        */
        unregisterAvatar(id): void

        /** Get current user's avatar data, or null if using the default avatar. */
        getAvatarData(): any

        /** Asks the user to immediately switch to the specified avatar data. Returns false if the user denied the change request.
         * @param {object} avatar Avatar object you wish to set new data for
         */
        setAvatarData(avatar): void

        /**
         * Override the avatar's current animation. Note that for all animation names, don't include the skeleton name. For example if you
         * want to play a walk animation, specify `"walk"` and not `"humanoid.walk"`. The animation prefix will be automatically added based
         * on which type of avatar the current user is using.
         * @param {object} options An object describing how to override the animations. Specify `null` to cancel any current animations.
         * @param {string} options.animation_start Optional. Name of the animation to play before the main animation, without the skeleton name.
         * @param {string} options.animation Name of the animation to play, without the skeleton name.
         * @param {string} options.animation_end Optional. Name of the animation to play when ending the override, without the skeleton name.
         * @param {number} options.loop Optional. Amount of times to play the animation for. Default = 1. Specify `true` to loop forever.
         * @param {object} options.fixed_movement Optional. If specified, will lock the avatar into moving at this fixed speed per second. Object must contain an `x`, `y`, and `z` field. The user won't be able to move their avatar while the animation is running. Specify `{ x: 0, y: 0, z: 0 }` to lock the avatar in place.
         * @param {boolean} options.cancel_mode Optional. Can be `"smooth"` (default) to wait for the animation cycle to complete, `"immediate"` to cancel the animation immediately when the user moves, or `"none"` to not allow the user to cancel movement.
         * @param {boolean} options.merge Optional. If true, will merge the animation with the default animations for walk, run, etc.
         * @returns {Promise<boolean>} Returns a promise for when the animation ends. True if the animation ended normally, or false if it was interrupted.
         */
        overrideAvatarAnimation(options): Promise<boolean>

         /** Gets location of specified user
         * @param {string} id Identifier of user you wish to get location of
         * @returns {object} Location of a user that matches the given identifier 
         */
        getUserLocation(id): object

        /**
         * Get nearby users list with positions.
         * @param {number} maxDistance Maximum distance away to search for users.
         * @returns {object[]} List of users that were found.
         */
        getNearbyUsers(maxDistance)

        /** Fetch user's identities of a certain type 
         * @param {string} type type of avatar to fetch identities for
         * @returns {string[]} List of avatar identities who have the same specified type
        */
        getIdentities(type): Array<string>

        /** Query to the Allowl API, returns the response.
         * @param {object} query Query payload you are passing to the Allowl API
         * @returns {object} Response from the Allowl API based on passed query
         */
        queryAllowlPermission(query): object

        /** Show a shut down screen for user 
         * @param {string} message Message you wish to display on the shut down screen
         * @param {string} title Title you wish to display on the shut down screen
         * @param {string} buttonText Text of the button shown on the shut down screen. Default is "Try again"
         * @param {function} buttonAction Action you wish the shut down screen button to take when clicked. Default is `e => location.reload()` which refreshes the page.
         */
        showShutDownScreen(message, title, buttonText, buttonAction): void

        /** Shows the selection screen for a user avatar */
        showAvatarSelectPopup(): void

        /** Send a generic analytics event 
         * @param {string} name Name of the event
         * @param {any} value Value associated with given name
        */
        sendAnalytics(name, value): void

    }

    /** Handles interaction with the world */
    class World {
        
        /** @returns {string} Full world ID */
        getID(): string

        /** @returns {string} World instance ID */
        getInstanceID(): string

        /** @returns {string} Unique session ID for the current session */
        getSessionID(): string

        /** @returns {Promise<string>} Name of the space the user is currently in */
        getSpaceName(): Promise<string>

         /**
         * Perform a raycast and return the MapItem IDs of the hit object(s).
         *
         * @param {object} options An optional list of options for the raycast.
         * @param {Vector2} screenPosition If specified, an X and Y value from 0 to 1 determining the coordinate on the screen. Use `{x: 0.5, y: 0.5}` to pick from the center of the screen.
         * @param {Vector3} worldPosition If specified, the start of the ray in 3D space.
         * @param {Vector3} worldDirection The direction of the ray. Ignored if using `screenPosition`.
         * @param {number} length The length of the ray. Default = infinity.
         * @param {boolean} collision If true, only hit collision enabled items.
         * @returns {object[]} Each returned object contains a `id` (MapItem ID string), `point` (Vector3), `faceNormal` (Vector3), `faceNormalAdjusted` (Vector3), `distance` (number), `wallProps` (object)
         */
        raycast(options): Array<object>


    }

    /** Handles interaction with the storage system */
    class StorageComponent {
        
        /** Put a file into storage and return the URL to the item 
         * @param {string} bucket Storage bucket to put item in. Options: `space`, `server`, `user`.
         * @param {string} path Path of where in the bucket you wish to store the item
         * @param {string} url url of item you are storing
         * @returns {Promise<string>} Storage URL of the item you just stored. null if process failed.
        */
        put(bucket, path, url): Promise<string>

        /** Get URL of a file in storage 
         * @param bucket Storage bucket which item belongs to
         * @param path Path of item inside storage
         * @returns {Promise<string>} Storage URL of the item found. null if nothing is found.
        */
        getURL(bucket, path): Promise<string>
    }

     /** Represents a plugin component that is attached to an object. */
     class BaseComponent {

        /** Reference to plugin */
        plugin: any

        /** ID of this component */
        componentID: string

        /** ID of the object this component is associated with */
        objectID: string

        /** The map item that this component is attached to. */
        mapItem: any

        /** Current object fields */
        fields: object

        /** Called when the object is loaded */
        onLoad(): void

        /** Called when the object is removed or component is uninstalled */
        onUnload(): void

        /** Called when the object's fields changed 
          * @param newFields updated fields
         */
        onObjectUpdated(newFields): void

        /**
         * Called when the user clicks on the object.
         * @param {object} event An object describing the event
         * @param {THREE.Vector3} event.position The x, y and z coordinates of the click hit point in world space
         * @param {THREE.Vector2} event.uv The X and Y values on the UV that was hit. This can be used to calculate where on a plane or shape the click happened, eg `x = uv.x * screenWidth`
         */
        onClick(event): void

        /**
         * Gets component configuration field
         * @param {string} id ID of field
         * @returns {any} value of configuration field attached to given name
         */
        getField(id): any

        /**
         * Sets component configuration field (only admins can successfully do this)
         * @param {string} id ID of field
         * @param {any} value Value to set field to
         */
        setField(id, value): void

        /**
         * Sets multiple fields at once (only admins can successfully do this)
         * @param {object} fields Fields to set
         */
        setFields(fields): void

        /** Send a message to all instances of this component on other devices.
         * @param {object} msg The message to send.
         * @param {boolean} isGlobal If true, will send to everyone on the server instead of just everyone within rendering range.
         * @param {string} targetUserID If specified, sends a message to a specific user, independent of where that user is.
         */
        sendMessage(msg, isGlobal, targetUserID): void

        /**
         * Send a message to all instances of this component, The first truthy response from onRequest(msg) will be returned.
         * 
         * @param {object} msg The message to send.
         * @param {bool} isGlobal If true, will send to everyone on the entire server instead of just everyone within rendering range.
         * @param {string} targetUserID If specified, sends a message to a specific user, independent of where that user is.
         * @returns {Promise<*>} The response.
         */
        sendRequest(msg, isGlobal, targetUserID): Promise<any>

    }

    export = { BasePlugin, BaseComponent }

}
