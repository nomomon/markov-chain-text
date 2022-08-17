import useAnalyticsEventTracker from "./useAnalyticsEventTracker";

function Checkbox({ settingName, settings, setSettings }) {
    const gaEventTracker = useAnalyticsEventTracker('markov-chain-text-generator');
    let id = settingName.toLowerCase().replace(" ", "-");

    function handleEvent(event) {
        gaEventTracker('click', id);
        settings[id] = event.target.checked;
        setSettings(settings);
    }

    return (
        <div className="Checkbox">
            <input type="checkbox" id={id} name={id} value={id} onChange={handleEvent} />
            <label for={id}>{settingName}</label>
        </div>
    );
}

function Settings({ settings, setSettings }) {
    return (
        <div className="Settings">
            <Checkbox
                settingName="Punctuation"
                settings={settings}
                setSettings={setSettings}
            />
            <Checkbox
                settingName="Capital letters"
                settings={settings}
                setSettings={setSettings}
            />
        </div>
    );
}

export default Settings;