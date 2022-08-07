import React, { useState } from 'react';
import './App.css';
import InputArea from "./components/InputArea";
import TextButton from "./components/TextButton";
import GeneratedText from "./components/GeneratedText";

import { preprocess, generate } from "./logic/markov-chain";


function App() {
    const [inputText, setInputText] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [wordSet, setWordSet] = useState(new Set());
    const [transitionMatrix, setTransitionMatrix] = useState({});

    return (
        <div className="App">
            <InputArea
                inputText={inputText}
                setInputText={setInputText}
            />
            <TextButton
                text="Preprocess"
                func={() => {
                    const [wordsSet, transitionMatrix] = preprocess(inputText);
                    setWordSet(wordsSet);
                    setTransitionMatrix(transitionMatrix);

                    console.log(
                        "wordsSet:", wordsSet,
                        "transitionMatrix:", transitionMatrix
                    )
                }}
            />
            <TextButton
                text="Generate text"
                func={() => {
                    const text = generate(wordSet, transitionMatrix);

                    console.log(text)

                    setGeneratedText(text);
                }}
            />
            <GeneratedText text={generatedText} />
        </div>
    );
}

export default App;
