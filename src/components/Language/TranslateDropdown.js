import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { BsFillVolumeUpFill } from "react-icons/bs";

const TranslateDropdown = (props) => {
  // State to store the selected language
  const [selectedLanguage, setSelectedLanguage] = useState('English en');

  // State to store the list of languages
  const [languages, setLanguages] = useState([]);
    const [translation, setTranslation] = useState('');
  // Function to translate the text to the selected language
  const translateText = async () => {
    // Construct the URL for the MyMemory Translation Memory API
    var text = props.words;
      const url = 'https://api.mymemory.translated.net/get';
      var lang = selectedLanguage.split(' ')[1]
    const params = {
      q: text,
      langpair: `en|${lang}`,
    };
    console.log(params);
    console.log('translating: ' + text)
    // Make the GET request to the MyMemory Translation Memory API
    const response = await axios.get(url, { params });
    const data = response.data;

    // Log the original text and the translated text
    console.log(`Text: ${text}`);
      console.log(`Translation: ${data.responseData.translatedText}`);
      if (data.responseData.translatedText) {
          setTranslation(data.responseData.translatedText);
      }
    };
      // Function to convert the translated text to speech
  const speakTranslation = (text) => {
    // Use the Web Speech API to speak the text in the selected language
      const utterance = new SpeechSynthesisUtterance(translation);
      utterance.lang = selectedLanguage.split(' ')[1];
      console.log(utterance.lang)
      console.log(selectedLanguage.split(' '))
    speechSynthesis.speak(utterance);
  };

  // Use useEffect to fetch the list of languages from the API when the component mounts
  useEffect(() => {
    const fetchLanguages = async () => {
      // Get a list of all countries from the Rest Countries API
      const response = await axios.get('https://restcountries.com/v2/all');
      const countries = response.data;

      // Create a set of all the languages used by the countries
        const languageSet = new Set();
        console.log(countries);
      countries.forEach(country => {
        country.languages.forEach(language => languageSet.add(language.name + " " + language.iso639_1));
      });

      // Convert the set of languages to an array and sort it alphabetically
      const languages = Array.from(languageSet).sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      console.log(languages)
      // Update the state with the array of languages
      setLanguages(languages);
    };

    fetchLanguages();
  }, []);

  return (
    <div style={{alignContent: 'center', justifyContent: 'center'}}>
      <label>Select a language:</label>
      <select onChange={e => setSelectedLanguage(e.target.value)}>
        {languages.map((language, index) => (
          <option key={language+index} value={language}>
            {language}
          </option>
        ))}
      </select>
      <button className='btn btn-primary' style={{marginLeft: 10}} onClick={() => translateText()}>
        Translate
          </button>
          {translation.length > 0 ?
        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', fontSize: '30px'}}>
          The translated result is:&nbsp; <strong>{translation}</strong>           <BsFillVolumeUpFill style={{marginLeft: 10}} onClick={() => speakTranslation()} size={30} color="#000" />

              </div> : ''}

    </div>
  );
};
export default TranslateDropdown;