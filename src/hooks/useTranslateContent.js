import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

/**
 * Hook to translate dynamic AI content using the backend API.
 * @param {string|string[]} content - The text or array of texts to translate
 * @returns {string|string[]} - The translated content
 */
export const useTranslateContent = (content) => {
    const { i18n } = useTranslation();
    const [translatedContent, setTranslatedContent] = useState(content);

    useEffect(() => {
        // If no content or if language is english, return original content
        if (!content || i18n.language === 'en') {
            setTranslatedContent(content);
            return;
        }

        const translateAIContent = async () => {
            try {
                // Handle both single string and array of strings
                const isArray = Array.isArray(content);
                const textsToTranslate = isArray ? content : [content];
                
                // Filter out falsy values
                const validTexts = textsToTranslate.filter(t => t);
                
                if (validTexts.length === 0) {
                    setTranslatedContent(content);
                    return;
                }

                // Call the backend translation endpoint
                const response = await api.post('/translate', {
                    texts: validTexts,
                    targetLang: i18n.language
                });

                const translatedMap = response.data;
                
                if (isArray) {
                    setTranslatedContent(content.map(text => text ? (translatedMap[text] || text) : text));
                } else {
                    setTranslatedContent(translatedMap[content] || content);
                }
            } catch (error) {
                console.error("AI Translation failed:", error);
                // Fallback to original text on error
                setTranslatedContent(content);
            }
        };

        const timerId = setTimeout(() => {
            translateAIContent();
        }, 300);
        
        return () => clearTimeout(timerId);
    }, [JSON.stringify(content), i18n.language]);

    return translatedContent;
};

export default useTranslateContent;
