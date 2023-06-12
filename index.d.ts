declare module 'vatom-spaces-plugins' {

    /** 2D vector */
    interface Vector2 {
        x: number,
        y: number
    }

    /** 3D vector */
    interface Vector3 {
        x: number,
        y: number,
        z: number
    }

    /** Quaternion */
    interface Quaternion {
        x: number,
        y: number,
        z: number,
        w: number,
    }

    /** Details about a plugin */
    interface PluginDetails {
        /** Identifier of the plugin */
        id: string,
        /** Name of the plugin */
        name: string,
        /** Description of the plugin */
        description: string,
        /** Identifier of the business that created the plugin */
        business_id: string,
        /** Version of the plugin */
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
        point?: Vector3,
        /** UV co-ordinates of the hit point (only if an object identifier was given). Useful for interacting with 2D content on a 3D plane. */
        uv?: Vector2
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

    /** Represents a panel that can be attached to a menu item. */
    interface MenuPanel {
        /** URL to display in this panel as an iframe. Cannot use in conjunction with `component`. */
        iframeURL?: string,
        /** A React component to display. The component will receive the following props: `plugin`, `onClose`. Cannot use in conjunction with `iframeURL`. */
        component?: any,
        /** Width of the panel. Default is 320 pixels. */
        width?: number,
        /** Maximum height (in pixels) that the panel should be. Defaults to the height of the content inside. */
        maxHeight?: number,
        /** When using the "plugin-settings" section, these are the settings used. */
        fields?: ComponentSettings[]
    }

    /** Represents a menu item that can be registered */
    interface MenuItem {
        /** Identifier of the menu item. */
        id: string,
        /** URL to the icon for the menu. */
        icon: string,
        /** Text to display under the icon. */
        text: string,
        /** Location of the menu item. */
        section: "controls" | "usermenu" | "infopanel" | "overlay-top" | "plugin-settings" | "start-screen" | "file-menu" | "insert-object" | "admin-panel",
        /** Title of the icon. */
        title: string,
        /** Color that will be used for both the icon and the text. */
        color: string,
        /** Color that will be used for just the text. Defaults to `color` if not given. */
        textColor?: string,
        /** Sorting order for this item, ranging from 0 (on the left) to infinity (on the right). Default is 0. */
        order?: number,
        /** `true` when the menu item should stay either on or off (e.g: mute/unmute or avatar video), `false` otherwise. Default is `false`. */
        persistent?: boolean,
        /** `true` to use the actual icon provided (instead of changing icon color), `false` to change icon color based on `color` field. Default is `false`. */
        useRawIcon?: boolean,
        /** `true` to hide the menu item from non-admins, `false` to show the menu item to non-admins. Default is `false`. */
        adminOnly?: boolean,
        /** If `true` and section == 'usermenu', the menu icon appears on the current user's options. Default is `false`. */
        currentUser?: boolean,
        /** If `false` and section == 'usermenu', the menu icon does not appear on other user's options. Default is `true`. */
        otherUsers?: boolean,
        /** Number to show as a notification badge on the menu item. Does not display a badge for values <= 0. */
        badgeCount?: number,
        /** Called when the menu button is pressed. */
        action?: (evt: { id: string, name: string, profileURL: string }) => void,
        /** Panel that will be displayed when this menu item is clicked. */
        panel: MenuPanel
    }

    /** Options for a promp popup */
    interface PromptOptions {
        /** Icon to show. */
        icon?: PopupIcon,
        /** Title of the prompt. Default is the name of the plugin. */
        title?: string,
        /** Text to display. */
        text?: string,
        /** Type of input to show. */
        inputType?: "text" | "textarea" | "email" | "password" | "number" | "tel" | "url",
        /** Initial value to display in the input. */
        initialValue?: string,
        /** Placeholder text to show when no value is specified. */
        placeholder?: string
    }

    /** Options for a Toast message */
    interface ToastOptions {
        /** Icon to display on the left of the message. */
        icon?: string,
        /** Text to display. */
        text?: string,
        /** Color of the text. */
        textColor?: string,
        /** Duration to show the message for. */
        duration?: number,
        /** `true` if the message should not automatically close, `false` otherwise. */
        isSticky?: boolean,
        /** Color of the action and cancel button text. */
        buttonColor?: string,
        /** Text to display on an action button to the right of the message. */
        buttonText?: string,
        /** Function to execute when the action button is clicked. */
        buttonAction?: () => {},
        /** Text to display on a cancel button to the right of the message. */
        buttonCancelText?: string,
        /** Function to execute when the cancel button is clicked. */
        buttonCancelAction?: () => {}
    }

    /** Item to show as a popup. */
    interface PopupItem {
        /** Title of the popup. */
        title: string,
        /** Panel that should be displayed. */
        panel: MenuPanel
    }

    /** Options relating to the user status bar */
    interface StatusOptions {
        /** Identifier of the user you would like to create this item for. Default is your own user ID. */
        userID: string,
        /** Order in which to display this top status icon. */
        order: number,
        /** Size of the top status icon. */
        size: number,
        /** Width of the top status icon. */
        width: number,
        /** Height of the top status icon. */
        height: number
    }

    /** Options relating to the animation of an object */
    interface AnimateOptions {
        /** Identifer of the object to animate. */
        target: string,
        /** Final properties of the object after the animation finishes. Cannot be used in conjunction with `field`. */
        final: MapItemProperties,
        /** Field to animate. Cannot be used in conjunction with `final`. */
        field: "position.x" | "position.y" | "position.z" | "scale" | "opacity",
        /** Final value to animate to. */
        value: any,
        /** Number of milliseconds to show the animation for. */
        duration: number,
        /** Number of milliseconds to wait before starting the animation. */
        delay: number,
        /** `true` to save the final state (after the animation completes) to the database, `false` otherwise. */
        save: boolean
    }

    /** Instance for a component */
    interface ComponentInstance {
        /** Reference to the plugin that registered this component. */
        plugin: BasePlugin
        /** Identifier of this component instance. */
        componentID: string,
        /** Identifier of the object that this component is attached to. */
        objectID: string,
        /** Properties for the object that this component is attached to. */
        fields: MapItemProperties
    }

    /** Settings for a component */
    interface ComponentSettings {
        /** Identifier of this setting. */
        id: string,
        /** Name of this setting. */
        name: string,
        /** Type of this setting. */
        type: ComponentSettingsType,
        /** Value of the setting. Do not specify if users should be able to change the value. */
        value: any,
        /** Description of what the setting does. */
        help: string,
        /** When the type is `"select"`, this represents the list of values in the dropdown. */
        values?: any[],
        /** When the type is `"select"`, `"color"`, `"checkbox"`, `"number"`, `"text"`, `"slider"` or `"textarea"`, this represents the default value to use when no value already exists. */
        default?: any,
        /** When the type is `"slider"`, this represents the minimum value. Default is 0. */
        min?: number,
        /** When the type is `"slider"`, this represents the maximum value. Default is 1. */
        max?: number,
        /** When the type is `"slider"`, `true` shows the value as a percentage (i.e. multiplies the value by 100), whereas `false` will show the raw value. Default is `false`. */
        percent?: boolean,
        /** When the type is `"slider"`, `true` fills the slider up to the current value (useful for volume slider), whereas `false` does not fill the slider. Default is `false`. */
        fill?: boolean,
        /** When the type is `"slider"`, `true` shows the current value, `false` otherwise. Default is `false`. */
        showValue?: boolean,
        /** When the type is `"slider"`, this represents the number of decimal places to use for the value. Default is 0. */
        precision?: number,
        /** When the type is `"vertical-space"`, this represents the height of the space (in pixels). Default is 5. */
        height?: number,
        /** When the type is `"two-stack"`, this represents the height between the two elements. Default is 5. */
        heightBetween?: number,
        /** When the type is `"two-stack"`, this represents the first element to show. */
        first?: ComponentSettings,
        /** When the type is `"two-stack"`, this represents the second element to show. */
        second?: ComponentSettings,
        /** When the type is `"button"`, this is called when the button is clicked. */
        onClick?: () => void,
        /** When the type is `"button"`, this is called when the button is clicked. It is an alias for `onClick`. */
        action?: () => void,
    }

    /** Information regarding a component */
    interface ComponentInfo {
        /** Identifier of this component. */
        id: string,
        /** Name of this component. */
        name: string,
        /** Description of this component. */
        description: string,
        /** Settings that can be changed by users. */
        settings: ComponentSettings[] | ((item: MapItemProperties) => ComponentSettings[]),
        /** List of item types that this component can be attached to. */
        only?: string[],
    }

    /** Options used when creating a texture */
    interface TextureOptions {
        /** Width of the texture. Should be a power of 2. */
        width: number,
        /** Height of the texture. Should be a power of 2. */
        height: number
    }

    /** Properties for a map item */
    interface MapItemProperties {
        /** Identifier of this item. */
        id: string,
        /** Type of this item. */
        type: string,
        /** Position in the x axis. */
        x: number,
        /** Position in the y axis. */
        height: number,
        /** Position in the z axis. */
        y: number,
        /** `true` if this item is not allowed to be edited, `false` otherwise. */
        locked: boolean,
        /** `true` if this item has a click interaction, `false` otherwise. */
        targetable: boolean,
        /** `true` if this item has collision enabled, `false` otherwise. */
        collide: boolean,
        /** `true` if this item only exists locally and not saved in the database, `false` if it exists in the database. */
        clientOnly: boolean
    }

    /** Represents a map item that can be found in the space */
    interface MapItem {
        /** Identifier of this item. */
        id: string,
        /** `true` if this item is an avatar, `false` otherwise. */
        isAvatar: boolean,
        /** Properties for this item. */
        properties: MapItemProperties,
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
        fixed_movement?: Vector3,
        /** Can be `"smooth"` (default) to wait for the animation cycle to complete, `"immediate"` to cancel the animation immediately when the user moves, or `"none"` to not allow the user to cancel movement. */
        cancel_mode?: "smooth" | "immediate" | "none",
        /** `true` to merge the animation with the default animations for walk, run etc. */
        merge?: boolean
    }

    /** Represents a hit from a raycast */
    interface RaycastHit {
        /** Item that has been hit. */
        mapItem: MapItem,
        /** Distance between the current user and the object that has been hit. */
        distance: number,
        /** Point of intersection (in world co-ordinates) */
        point?: Vector3
    }

    /** Options relating to performing a raycast */
    interface RaycastOptions {
        /** Point, with values between 0 and 1, determing the co-ordinate on the screen. Use `{ x: 0.5, y: 0.5 }` to pick from the center of the screen. */
        screenPosition: Vector2,
        /** Start of the ray in 3D space. */
        worldPosition: Vector3,
        /** Direction of the ray. Ignored if `screenPosition` is given. */
        worldDirection: Vector3,
        /** Length of the ray. Default is infinity. */
        length: number,
        /** `true` to only hit items with `collide === true` set, `false` to hit all items. */
        collision: boolean
    }

    /** Event that contains information from a component being clicked */
    interface ComponentClickEvent {
        /** Point at which the click hit, in world space. */
        position: Vector3,
        /** Position on the UV that was hit. Can be used to calculate where on a shape the click happened (e.g.: `let x = uv.x * screenWidth`) */
        uv: Vector2
    }

    /** Options relating to setting the view mode */
    interface ViewModeOptions {
        /** Configuration options for the given view mode. Available fields are dependent on the given view mode. */
        config: object,
        /** `true` to enable fullscreen mode, `false` to exit fullscreen mode. */
        fullscreen: boolean,
        /** `true` to request pointer lock (only supported in "first-person" view mode), `false` to exit pointer lock. */
        pointerLock: boolean,
    }

    /** Callback function for an input capture event */
    type InputCaptureCallback = (event: InputCaptureEvent) => void

    /** Callback function for a hook */
    type HookCallback = (data: any) => any

    /** Type of icon to use in a popup */
    type PopupIcon = "info" | "success" | "question" | "error" | "warning"

    /** Type of component setting */
    type ComponentSettingsType = "label" | "section" | "collapse-section" | "two-stack" | "vertical-space" | "select" | "select-item" | "file" | "color" | "checkbox" | "button" | "field-button" | "half-button" | "number" | "text" | "slider" | "bind-key" | "vector2" | "vector3" | "textarea"

    /** Type of view mode */
    type ViewMode = "swivel" | "advanced" | "first-person"

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

        /** Handles pathing */
        paths: {
            /**
             * Converts a relative path to an absolute path.
             * @param path Relative path to an image.
             * @returns Absolute path to the image.
             */
            absolute: (path: string) => string
        }

        /** Called when the plugin is loaded */
        onLoad(): void

        /** Called when the user has entered the space */
        onEnter(): void

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
        setField(id: string, value: any): Promise<void>

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
         * Gets details about the plugin if it has been loaded, otherwise it returns `null`.
         * @param id Identifier of the plugin to get details for.
         */
        getPluginDetails(id: string): Promise<PluginDetails>

        /**
         * Checks if the given object has its input captured by a plugin.
         * @param id Identifier of the object that should be checked.
         * @returns `true` if this object has its input captured, `false` otherwise.
         */
        hasInputCapture(id: string): Promise<boolean>

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
        requestInputCapture(id: string, callback: InputCaptureCallback): Promise<void>

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
        play(url: string, options: AudioOptions): Promise<string | null>

        /**
         * Stops playing an audio source with the matching identifier.
         * @param id Identifier of the audio source to stop.
         */
        stop(id: string): void

    }

    /** Handles the registering and invoking of hooks, which are overridable global events. */
    class HooksComponent {

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
         * Displays a message in a popup.
         * @param text Text to display.
         * @param title Title of the message. Default is the name of the plugin.
         * @param icon Icon to show. Default is "info".
         */
        alert(text: string, title: string, icon: PopupIcon): Promise<void>

        /**
         * Asks the user for text input.
         * @param options Prompt options.
         * @returns Text that the user entered, or `null` if the user cancelled.
         */
        prompt(options: PromptOptions): Promise<string | null>

        /**
         * Displays a Toast message near the bottom of the screen.
         * @param options Toast options.
         * @returns Identifier of the Toast message.
         */
        toast(options: ToastOptions): Promise<string>

        /**
         * Closes the Toast message that matches the given identifier.
         * @param id Identifier of the Toast message to close.
         */
        closeToast(id: string): void

        /**
         * Displays a popup.
         * @param options Popup configuration options.
         * @returns Identifier of the popup.
         */
        displayPopup(options: PopupItem): Promise<string>

        /**
         * Closes the popup that matches the given identifier.
         * @param id Identifier of the popup to close.
         */
        closePopup(id: string): void

        /**
         * Registers a new menu item.
         * @param options Menu options.
         * @returns Identifier for the menu item.
         */
        register(options: MenuItem): Promise<string>

        /**
         * Updates the fields for the given menu item.
         * @param id Identifier of the menu item to update.
         * @param changes Changes to make to the menu item.
         */
        update(id: string, changes: MenuItem): void

        /**
         * Unregisters an existing menu item.
         * @param id Identifier for the menu item to unregister.
         */
        unregister(id: string): void

        /**
         * Sends a message to any open iframe panels. A panel can listen for these
         * messages by using the `"onmessage"` window event.
         * @param data Data to pass on.
         */
        postMessage(data: any): void

        /** Returns focus to the space. */
        returnFocus(): void

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

        /**
         * Creates a new object. Will be created as a client-only object, unless
         * `clientOnly: false` is specified in the options.
         * @param options Options relating to the object to create.
         * @returns Identifier of the object that has been created.
         */
        create(options: MapItemProperties): Promise<string>

        /**
         * Creates a status item that appears above a user's avatar. Will always be
         * a client-only object.
         * @param options Options relating to the status item.
         * @param properties Properties of the status item to create.
         * @returns Identifier of the status item that has been created, or `null` if some issue occurred.
         */
        createStatusItem(options: StatusOptions, properties: MapItemProperties): Promise<string | null>

        /**
         * Creates a top status icon that appears above a user's avatar. Will always be
         * a client-only object.
         * @param options Options relating to the top status icon.
         * @param properties Properties of the top status icon to create.
         * @returns Identifier of the top status icon that has been created, or `null` if some issue occurred.
         */
        createTopStatusIcon(options: StatusOptions, properties: MapItemProperties): Promise<string | null>

        /**
         * Updates an existing object.
         * @param id Identifier of the object to update.
         * @param options Properties of the object to update.
         * @param localOnly `true` to only update the local values of fields. NOTE: If the remote object is updated, it will be overwritten again.
         */
        update(id: string, options: MapItemProperties, localOnly: boolean = false): Promise<void>

        /**
         * Updates an existing status item.
         * @param userID Identifier of the user to update the status item for.
         * @param itemID Identifier of the status item to update.
         * @param properties Properties of the object to update.
         */
        updateStatusItem(userID: string, itemID: string, properties: MapItemProperties): void

        /**
         * Updates an existing top status icon.
         * @param userID Identifier of the user to update the top status icon for.
         * @param itemID Identifier of the top status icon to update.
         * @param properties Properties of the object to update.
         */
        updateTopStatusIcon(userID: string, itemID: string, properties: MapItemProperties): void

        /**
         * Removes an object.
         * @param id Identifier of the object to remove.
         * @param options Options relating to the removal of the object.
         * @param options.clientOnly `true` if we only want to remove this object for this user, `false` if we want to remove it from the server. Default is `false`.
         */
        remove(id: string, options: { clientOnly: boolean = false }): void

        /**
         * Removes the status item that matches the given identifier.
         * @param userID Identifier of the user to remove the status item from.
         * @param itemID Identifier of the status item to remove.
         */
        removeStatusItem(userID: string, itemID: string): void

        /**
         * Removes the top status icon that matches the given identifier.
         * @param userID Identifier of the user to remove the top status icon from.
         * @param itemID Identifier of the top status icon to remove.
         */
        removeTopStatusIcon(userID: string, itemID: string): void

        /**
         * Animates an object.
         * @param options Options relating to the animation of the object.
         */
        animate(options: AnimateOptions): Promise<void>

        /**
         * Converts from euler angles (in radians) to quaternion.
         * @param euler Euler angles to convert.
         * @returns Quaternion.
         */
        eulerToQuat(euler: Vector3): Promise<Quaternion>

        /**
         * Converts from quaternion angles to euler in radians.
         * @param quat Quaternion angles to convert.
         * @returns Euler angles.
         */
        quatToEuler(quat: Quaternion): Promise<Vector3>

        /**
         * Gets the properties of an object.
         * @param id Identifier of the object to get the properties for.
         * @returns Properties of the object matching the given identifier.
         */
        get(id: string): Promise<MapItemProperties>

        /**
         * Gets the rotation, as a quaternion, for the given object.
         * @param id Identifier of the object to get the rotation for.
         * @returns Rotation, as a quaternion, for the given object.
         */
        getRotationQuat(id: string): Promise<Quaternion>

        /**
         * Gets the rotation, as Euler angles in radians, for the given object.
         * @param id Identifier of the object to get the rotation for.
         * @returns Rotation, as Euler angles in radians, for the given object.
         */
        getRotationEuler(id: string): Promise<Vector3>

        /** @returns All the currently registered component instances. */
        getComponentInstances(): ComponentInstance[]

        /**
         * Fetches all the objects within a radius.
         * @param x Position in the x axis.
         * @param y Position in the y axis.
         * @param radius Radius around the given X and Y co-ordinates.
         * @returns List of item properties that are within the given radius.
         */
        fetchInRadius(x: number, y: number, radius: number): Promise<MapItemProperties[]>

        /**
         * Gets the animations of an object as a JSON string.
         * @param id Identifier of the object to get animations for.
         * @returns JSON string of all animations associated with this object.
         */
        getAnimations(id: string): Promise<string>

        /**
         * Register a component so that it can be attached to objects.
         * @param component Component to register.
         * @param info Information about the component.
         */
        registerComponent(component: BaseComponent, info: ComponentInfo): Promise<void>

        /**
         * Moves an object to a position.
         * @param targetPosition Position to move the object to.
         * @param speed Speed to move the object at.
         * @param id Identifier of the object to move.
         */
        move(targetPosition: Vector3, speed: number, id: string): void

        /**
         * Toggles your avatar to follow a user or object.
         * @param id Identifier of the user or object that you would like to follow.
         */
        toggleFollow(id: string): void

        /**
         * Sends a click to the object matching the given identifier.
         *
         * **Note**: When using this method, the object that needs to be clicked
         * should be within rendering range, otherwise the click will not be sent
         * to that object.
         *
         * @param id Identifier of the object to send a click to.
         * @returns `true` if the click was sent to the object, `false` otherwise.
         */
        sendClick(id: string): Promise<boolean>

        /**
         * Registers the specified animations with the system.
         * @param url URL of the animations that you wish to register.
         */
        registerAnimations(url: string): Promise<void>

    }

    /** Handles the manual creation of textures */
    class Textures {

        /**
         * Creates a new texture. The `id` property of the OffscreenCanvas can be used as the `url` of an object.
         * @param options Options for the texture.
         * @returns Offscreen canvas element that can be drawn to.
         */
        create(options: TextureOptions): Promise<OffscreenCanvas>

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

        /** @returns Position that the current user will be in when they enter the space */
        getInitialPosition(): Promise<Vector3>

        /** @returns Position of the current user */
        getPosition(): Promise<Vector3>

        /**
         * Sets the position of the current user.
         * @param x Position in the x direction.
         * @param y Position in the y direction.
         * @param z Position in the z direction.
         * @param instant `true` to move instantly to the given position, `false` to glide to the given position. Default is `false`.
         * @param keepFollow `true` to keep following the user you are currently following (if any), `false` to disconnect the follow. Default is `true`.
         */
        setPosition(x: number, y: number, z: number, instant: boolean = false, keepFollow: boolean = true): Promise<void>

        /**
         * Gets the current user rotation.
         * @param deg `true` to return rotation in degrees, `false` to return in radians. Default is `false`.
         * @returns Rotation in radians (or degrees if `deg === true`).
         */
        getRotation(deg: boolean = false): Promise<number>

        /**
         * Sets the current user rotation.
         * @param r Rotation to set the user to.
         * @param deg `true` to indicate that the given rotation is in degrees, `false` to indicate that it is in radians. Default is `false`.
         */
        setRotation(r: number, deg: boolean = false): void

        /**
         * Gets the orientation of the current user.
         * @param deg `true` to return the orientation in degrees, `false` to return in radians. Default is `false`.
         * @returns Orientation in radians (or degrees if `deg === true`).
         */
        getOrientation(deg: boolean = false): Promise<number>

        /**
         * Sets the orientation of the current user.
         * @param orient Orientation to set for the current user.
         * @param deg `true` to indicate that the given orientation is in degrees, `false` to indicate that it is in radians. Default is `false`.
         */
        setOrientation(orient: number, deg: boolean = false): void

        /**
         * Gets the tilt value of the current user.
         * @param deg `true` to return the tilt in degrees, `false` to return in radians. Default is `false`.
         * @returns Tilt value in radians (or degrees if `deg === true`).
         */
        getTilt(deg: boolean = false): Promise<number>

        /**
         * Sets current user tilt.
         * @param tilt Tilt value to set for the user.
         * @param deg `true` to indicate that the given tilt is in degrees, `false` to indicate that it is in radians. Default is `false`.
         */
        setTilt(tilt: number, deg: boolean = false): void

        /**
         * Gets the zoom level of the current user.
         * @returns Zoom level of the current user.
         */
        getZoom(): Promise<number>

        /**
         * Sets the zoom level for the current user.
         * @param zoom New zoom level.
         * @returns `true` if the zoom has been successfully set, `false` otherwise.
         */
        setZoom(zoom: number): Promise<boolean>

        /**
         * Gets the view mode of the current user.
         * @returns View mode of the current user.
         */
        getViewMode(): Promise<ViewMode>

        /**
         * Sets the view mode of the current user.
         * @param mode New view mode to use.
         * @param options Options relating to the view mode.
         * @returns `true` if the view mode has been set successfully, `false` otherwise.
         */
        setViewMode(mode: ViewMode, options?: ViewModeOptions): Promise<boolean>

        /** @returns Identifier of the current user */
        getID(): Promise<string>

        /** @returns Display name of the current user */
        getDisplayName(): Promise<string>

        /** @returns `true` if this user is an admin in the space, `false` otherwise */
        isAdmin(): Promise<boolean>

        /** @returns `true` if your user is following another user or object, `false` otherwise */
        getFollow(): Promise<boolean>

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
        getProperty(id?: string, propertyName?: string): Promise<any | null>

        /**
         * Gets user properties specific to this plugin.
         * @param id Identifier of the user to get properties from. Leave blank for the current user.
         * @returns Properties for the given user, or `null` if something went wrong.
         */
        getProperties(id?: string): Promise<any | null>

        /**
         * Sets user properties specific to this plugin.
         * @param props Properties to set.
         */
        setProperties(props: {}): Promise<void>

        /**
         * Registers a new avatar.
         * @param avatar Information about the avatar to register.
         */
        registerAvatar(avatar: AvatarData): Promise<void>

        /**
         * Removes a registered avatar.
         * @param id Identifier of the avatar you wish to remove.
         */
        unregisterAvatar(id: string): void

        /** @returns Avatar data for the current user, or `null` if using the default avatar. */
        getAvatarData(): Promise<AvatarData | null>

        /**
         * Asks the user to immediately switch to the specified avatar data.
         * Returns `false` if the user denied the change request.
         * @param avatar Avatar you wish to set new data for.
         */
        setAvatarData(avatar: AvatarData): Promise<boolean | void>

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
        getUserLocation(id: string): Promise<Vector3 | null>

        /**
         * Gets a list of nearby users.
         * @param maxDistance Maximum distance away, in metres, to search for users. If no value is specified, all users within rendering range will be returned.
         * @returns List of users that were found.
         */
        getNearbyUsers(maxDistance?: number): Promise<UserData[]>

        /**
         * Show a shut down screen for user.
         * @param message Message you wish to display on the shut down screen.
         * @param title Title you wish to display on the shut down screen.
         * @param buttonText Text of the button shown on the shut down screen. Default is "Try again".
         * @param buttonAction Action you wish the shut down screen button to take when clicked. Default is `e => location.reload()`.
         */
        showShutDownScreen(message: string, title: string, buttonText?: string, buttonAction?: (evt: Event) => void): void

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
        getID(): Promise<string>

        /** @returns Identifier for this space instance. */
        getInstanceID(): Promise<string>

        /** @returns Unique session identifier for the current session. */
        getSessionID(): Promise<string>

        /** @returns Name of the space the user is currently in. */
        getSpaceName(): Promise<string>

        /**
         * Performs a raycast and returns the hit object(s).
         * @param options Configurable options for the raycast.
         * @returns Object(s) that have been hit by the raycast.
         */
        raycast(options?: RaycastOptions): Promise<RaycastHit[]>

        /**
         * Transports the user to the given URL.
         * @param url URL to travel to. Can be either a full URL (e.g. `"https://www.google.com"`) or a space name (e.g. `"@space"`).
         */
        travelTo(url: string): Promise<void>

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
        put(bucket: BucketType, path: string, url: string): Promise<string | null>

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
         * Called when a button has been clicked in the component settings.
         * @param id Identifier of the button that has been clicked.
         */
        onAction(id: string): void

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
