import useAnalyticsEventTracker from "./useAnalyticsEventTracker";

function TextButton({ text, func }) {
    const gaEventTracker = useAnalyticsEventTracker('markov-chain-text-generator');

    return (
        <button className="textButton" onClick={() => {
            const buttonId = text.toLowerCase().replace(/ /g, "-");
            gaEventTracker('click', buttonId);
            func();
        }}>
            {text}
        </button>
    );
}

export default TextButton;