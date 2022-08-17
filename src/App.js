// react
import React, { useState, useEffect } from 'react';
import './App.css';

// load in components
import InputArea from "./components/InputArea";
import Settings from "./components/Settings";
import TextButton from "./components/TextButton";
import GeneratedText from "./components/GeneratedText";

// logic
import { preprocess, generate } from "./logic/markov-chain";

// google analytics
import ReactGA from 'react-ga';
const TRACKING_ID = "G-ZEC8LQQV2C";
ReactGA.initialize(TRACKING_ID);



function App() {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    const [inputText, setInputText] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [wordSet, setWordSet] = useState(new Set());
    const [transitionMatrix, setTransitionMatrix] = useState({});
    const [settings, setSettings] = useState({
        'punctuation': false,
        'capital-letters': false
    });

    function preprocessText() {
        const [wordsSet, transitionMatrix] = preprocess(inputText, settings);
        setWordSet(wordsSet);
        setTransitionMatrix(transitionMatrix);

        console.log(
            "wordsSet:", wordsSet,
            "transitionMatrix:", transitionMatrix
        )
    }

    function generateText() {
        const text = generate(wordSet, transitionMatrix, settings);

        setGeneratedText(text);

        console.log([text]);
    }

    return (
        <div className="App" >
            <h1>Markov Chain Text Generator</h1>
            <p>
                This is a simple text generator based on Markov chains. Type in some text and click "Generate" to see what it comes up with. Best results occur when the input has repeating words.
            </p>

            <InputArea
                inputText={inputText}
                setInputText={setInputText}
            />
            <Settings
                settings={settings}
                setSettings={setSettings}
            />
            <TextButton
                text="Generate text"
                func={() => {
                    preprocessText();
                    generateText();
                }}
            />
            <GeneratedText text={generatedText} />
        </div >
    );
}

export default App;
